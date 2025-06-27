import React, { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Settings, SkipBack, SkipForward } from 'lucide-react';
import { Button } from './ui/Button';
import { cn } from '../utils/cn';

interface VideoPlayerProps {
  src: string;
  title: string;
  onProgress?: (progress: number) => void;
  onComplete?: () => void;
}

export function VideoPlayer({ src, title, onProgress, onComplete }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [quality, setQuality] = useState('720p');
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      setCurrentTime(current);
      if (onProgress) {
        onProgress((current / duration) * 100);
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const newTime = (clickX / rect.width) * duration;
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const skipTime = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(0, Math.min(duration, currentTime + seconds));
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoRef.current.requestFullscreen();
      }
    }
  };

  return (
    <div 
      className="relative bg-black rounded-lg overflow-hidden group"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <video
        ref={videoRef}
        src={src}
        className="w-full aspect-video"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => {
          setIsPlaying(false);
          if (onComplete) onComplete();
        }}
        onClick={togglePlay}
      />

      {/* Play/Pause Overlay */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <Button
            onClick={togglePlay}
            size="icon"
            className="h-16 w-16 rounded-full bg-white/20 hover:bg-white/30"
          >
            <Play className="h-8 w-8 text-white ml-1" />
          </Button>
        </div>
      )}

      {/* Controls */}
      <div className={cn(
        "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300",
        showControls ? "opacity-100" : "opacity-0"
      )}>
        {/* Progress Bar */}
        <div 
          className="w-full h-1 bg-white/30 rounded-full mb-4 cursor-pointer"
          onClick={handleSeek}
        >
          <div 
            className="h-full bg-white rounded-full transition-all duration-150"
            style={{ width: `${(currentTime / duration) * 100}%` }}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              onClick={togglePlay}
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </Button>

            <Button
              onClick={() => skipTime(-10)}
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
            >
              <SkipBack className="h-4 w-4" />
            </Button>

            <Button
              onClick={() => skipTime(10)}
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
            >
              <SkipForward className="h-4 w-4" />
            </Button>

            <div className="flex items-center gap-2">
              <Button
                onClick={toggleMute}
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
              >
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-16 accent-white"
              />
            </div>

            <span className="text-white text-sm">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Playback Speed */}
            <select
              value={playbackSpeed}
              onChange={(e) => {
                const speed = parseFloat(e.target.value);
                setPlaybackSpeed(speed);
                if (videoRef.current) {
                  videoRef.current.playbackRate = speed;
                }
              }}
              className="bg-transparent text-white text-sm border border-white/30 rounded px-2 py-1"
            >
              <option value={0.5}>0.5x</option>
              <option value={0.75}>0.75x</option>
              <option value={1}>1x</option>
              <option value={1.25}>1.25x</option>
              <option value={1.5}>1.5x</option>
              <option value={2}>2x</option>
            </select>

            {/* Quality */}
            <select
              value={quality}
              onChange={(e) => setQuality(e.target.value)}
              className="bg-transparent text-white text-sm border border-white/30 rounded px-2 py-1"
            >
              <option value="360p">360p</option>
              <option value="480p">480p</option>
              <option value="720p">720p</option>
              <option value="1080p">1080p</option>
            </select>

            <Button
              onClick={toggleFullscreen}
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
            >
              <Maximize className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Title Overlay */}
      <div className="absolute top-4 left-4">
        <h3 className="text-white font-medium text-lg">{title}</h3>
      </div>
    </div>
  );
}