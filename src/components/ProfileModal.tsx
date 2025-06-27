import React, { useState } from 'react';
import { 
  User, 
  Camera, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Briefcase, 
  Globe, 
  Save, 
  X,
  Upload,
  Edit3,
  Shield,
  Bell,
  Eye,
  Lock
} from 'lucide-react';
import { Modal, ModalHeader, ModalContent, ModalFooter } from './ui/Modal';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Textarea } from './ui/Textarea';
import { Avatar, AvatarFallback, AvatarImage } from './ui/Avatar';
import { Badge } from './ui/Badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/Tabs';
import { cn } from '../utils/cn';

interface ProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isDarkMode: boolean;
}

interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  bio: string;
  location: string;
  website: string;
  jobTitle: string;
  organization: string;
  joinDate: string;
  avatar: string | null;
  coverImage: string | null;
  socialLinks: {
    linkedin: string;
    twitter: string;
    github: string;
  };
  preferences: {
    emailNotifications: boolean;
    pushNotifications: boolean;
    marketingEmails: boolean;
    profileVisibility: 'public' | 'private' | 'students-only';
    showEmail: boolean;
    showPhone: boolean;
  };
  stats: {
    coursesCreated: number;
    totalStudents: number;
    totalRevenue: number;
    avgRating: number;
  };
}

export function ProfileModal({ open, onOpenChange, isDarkMode }: ProfileModalProps) {
  const [profileData, setProfileData] = useState<ProfileData>({
    firstName: 'Sarah',
    lastName: 'Thompson',
    email: 'sarah.thompson@email.com',
    phone: '+1 (555) 123-4567',
    bio: 'Passionate educator with over 8 years of experience in science education. I love creating engaging content that helps students understand complex concepts through practical examples and interactive learning.',
    location: 'San Francisco, CA',
    website: 'https://sarahteaches.com',
    jobTitle: 'Senior Science Teacher',
    organization: 'Greenwood High School',
    joinDate: '2022-03-15',
    avatar: null,
    coverImage: null,
    socialLinks: {
      linkedin: 'https://linkedin.com/in/sarahthompson',
      twitter: 'https://twitter.com/sarahteaches',
      github: 'https://github.com/sarahthompson'
    },
    preferences: {
      emailNotifications: true,
      pushNotifications: true,
      marketingEmails: false,
      profileVisibility: 'public',
      showEmail: false,
      showPhone: false
    },
    stats: {
      coursesCreated: 12,
      totalStudents: 1247,
      totalRevenue: 24580,
      avgRating: 4.8
    }
  });

  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [tempData, setTempData] = useState(profileData);

  const handleSave = () => {
    setProfileData(tempData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempData(profileData);
    setIsEditing(false);
  };

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setTempData(prev => ({ ...prev, avatar: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCoverUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setTempData(prev => ({ ...prev, coverImage: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Modal open={open} onOpenChange={onOpenChange} className="max-w-4xl">
      <ModalHeader onClose={() => onOpenChange(false)}>
        <div>
          <h2 className={cn(
            "text-2xl font-bold flex items-center gap-2",
            isDarkMode ? "text-white" : "text-gray-900"
          )}>
            <User className="h-6 w-6 text-primary-500" />
            Profile Settings
          </h2>
          <p className={cn(
            "mt-1",
            isDarkMode ? "text-neutral-400" : "text-gray-600"
          )}>
            Manage your profile information and preferences
          </p>
        </div>
      </ModalHeader>

      <ModalContent>
        <div className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="privacy">Privacy</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-6">
              {/* Cover Image */}
              <div className="relative">
                <div className={cn(
                  "h-32 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 relative overflow-hidden",
                  tempData.coverImage && "bg-none"
                )}>
                  {tempData.coverImage && (
                    <img 
                      src={tempData.coverImage} 
                      alt="Cover" 
                      className="w-full h-full object-cover"
                    />
                  )}
                  {isEditing && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <label className="cursor-pointer">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleCoverUpload}
                          className="hidden"
                        />
                        <div className="flex items-center gap-2 text-white bg-black/50 px-4 py-2 rounded-lg hover:bg-black/70 transition-colors">
                          <Camera className="h-4 w-4" />
                          <span>Change Cover</span>
                        </div>
                      </label>
                    </div>
                  )}
                </div>

                {/* Avatar */}
                <div className="absolute -bottom-12 left-6">
                  <div className="relative">
                    <Avatar className="h-24 w-24 border-4 border-white dark:border-neutral-800">
                      {tempData.avatar ? (
                        <AvatarImage src={tempData.avatar} />
                      ) : (
                        <AvatarFallback className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-2xl font-bold">
                          {tempData.firstName[0]}{tempData.lastName[0]}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    {isEditing && (
                      <label className="absolute -bottom-2 -right-2 cursor-pointer">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleAvatarUpload}
                          className="hidden"
                        />
                        <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white hover:bg-primary-600 transition-colors">
                          <Camera className="h-4 w-4" />
                        </div>
                      </label>
                    )}
                  </div>
                </div>

                {/* Edit Button */}
                <div className="absolute top-4 right-4">
                  {!isEditing ? (
                    <Button
                      onClick={() => setIsEditing(true)}
                      variant="outline"
                      size="sm"
                      className="gap-2 bg-white/90 hover:bg-white"
                    >
                      <Edit3 className="h-4 w-4" />
                      Edit Profile
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button
                        onClick={handleCancel}
                        variant="outline"
                        size="sm"
                        className="bg-white/90 hover:bg-white"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleSave}
                        size="sm"
                        className="gap-2"
                      >
                        <Save className="h-4 w-4" />
                        Save
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {/* Profile Info */}
              <div className="pt-16 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={cn(
                      "block text-sm font-medium mb-2",
                      isDarkMode ? "text-neutral-300" : "text-gray-700"
                    )}>
                      First Name
                    </label>
                    <Input
                      value={tempData.firstName}
                      onChange={(e) => setTempData(prev => ({ ...prev, firstName: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <label className={cn(
                      "block text-sm font-medium mb-2",
                      isDarkMode ? "text-neutral-300" : "text-gray-700"
                    )}>
                      Last Name
                    </label>
                    <Input
                      value={tempData.lastName}
                      onChange={(e) => setTempData(prev => ({ ...prev, lastName: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div>
                  <label className={cn(
                    "block text-sm font-medium mb-2",
                    isDarkMode ? "text-neutral-300" : "text-gray-700"
                  )}>
                    Bio
                  </label>
                  <Textarea
                    value={tempData.bio}
                    onChange={(e) => setTempData(prev => ({ ...prev, bio: e.target.value }))}
                    disabled={!isEditing}
                    className="min-h-[100px]"
                    placeholder="Tell students about yourself..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={cn(
                      "block text-sm font-medium mb-2",
                      isDarkMode ? "text-neutral-300" : "text-gray-700"
                    )}>
                      Job Title
                    </label>
                    <Input
                      value={tempData.jobTitle}
                      onChange={(e) => setTempData(prev => ({ ...prev, jobTitle: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <label className={cn(
                      "block text-sm font-medium mb-2",
                      isDarkMode ? "text-neutral-300" : "text-gray-700"
                    )}>
                      Organization
                    </label>
                    <Input
                      value={tempData.organization}
                      onChange={(e) => setTempData(prev => ({ ...prev, organization: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={cn(
                      "block text-sm font-medium mb-2",
                      isDarkMode ? "text-neutral-300" : "text-gray-700"
                    )}>
                      Location
                    </label>
                    <Input
                      value={tempData.location}
                      onChange={(e) => setTempData(prev => ({ ...prev, location: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <label className={cn(
                      "block text-sm font-medium mb-2",
                      isDarkMode ? "text-neutral-300" : "text-gray-700"
                    )}>
                      Website
                    </label>
                    <Input
                      value={tempData.website}
                      onChange={(e) => setTempData(prev => ({ ...prev, website: e.target.value }))}
                      disabled={!isEditing}
                      placeholder="https://yourwebsite.com"
                    />
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-gray-200 dark:border-neutral-700">
                  <div className="text-center">
                    <div className={cn(
                      "text-2xl font-bold",
                      isDarkMode ? "text-white" : "text-gray-900"
                    )}>
                      {profileData.stats.coursesCreated}
                    </div>
                    <div className={cn(
                      "text-sm",
                      isDarkMode ? "text-neutral-400" : "text-gray-600"
                    )}>
                      Courses Created
                    </div>
                  </div>
                  <div className="text-center">
                    <div className={cn(
                      "text-2xl font-bold",
                      isDarkMode ? "text-white" : "text-gray-900"
                    )}>
                      {profileData.stats.totalStudents.toLocaleString()}
                    </div>
                    <div className={cn(
                      "text-sm",
                      isDarkMode ? "text-neutral-400" : "text-gray-600"
                    )}>
                      Total Students
                    </div>
                  </div>
                  <div className="text-center">
                    <div className={cn(
                      "text-2xl font-bold text-green-500"
                    )}>
                      ${profileData.stats.totalRevenue.toLocaleString()}
                    </div>
                    <div className={cn(
                      "text-sm",
                      isDarkMode ? "text-neutral-400" : "text-gray-600"
                    )}>
                      Total Revenue
                    </div>
                  </div>
                  <div className="text-center">
                    <div className={cn(
                      "text-2xl font-bold text-yellow-500"
                    )}>
                      {profileData.stats.avgRating}
                    </div>
                    <div className={cn(
                      "text-sm",
                      isDarkMode ? "text-neutral-400" : "text-gray-600"
                    )}>
                      Avg Rating
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="account" className="space-y-6">
              <div className="space-y-6">
                <div>
                  <h3 className={cn(
                    "text-lg font-semibold mb-4",
                    isDarkMode ? "text-white" : "text-gray-900"
                  )}>
                    Account Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className={cn(
                        "block text-sm font-medium mb-2",
                        isDarkMode ? "text-neutral-300" : "text-gray-700"
                      )}>
                        Email Address
                      </label>
                      <Input
                        type="email"
                        value={tempData.email}
                        onChange={(e) => setTempData(prev => ({ ...prev, email: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className={cn(
                        "block text-sm font-medium mb-2",
                        isDarkMode ? "text-neutral-300" : "text-gray-700"
                      )}>
                        Phone Number
                      </label>
                      <Input
                        type="tel"
                        value={tempData.phone}
                        onChange={(e) => setTempData(prev => ({ ...prev, phone: e.target.value }))}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className={cn(
                    "text-lg font-semibold mb-4",
                    isDarkMode ? "text-white" : "text-gray-900"
                  )}>
                    Social Links
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className={cn(
                        "block text-sm font-medium mb-2",
                        isDarkMode ? "text-neutral-300" : "text-gray-700"
                      )}>
                        LinkedIn
                      </label>
                      <Input
                        value={tempData.socialLinks.linkedin}
                        onChange={(e) => setTempData(prev => ({ 
                          ...prev, 
                          socialLinks: { ...prev.socialLinks, linkedin: e.target.value }
                        }))}
                        placeholder="https://linkedin.com/in/yourprofile"
                      />
                    </div>
                    <div>
                      <label className={cn(
                        "block text-sm font-medium mb-2",
                        isDarkMode ? "text-neutral-300" : "text-gray-700"
                      )}>
                        Twitter
                      </label>
                      <Input
                        value={tempData.socialLinks.twitter}
                        onChange={(e) => setTempData(prev => ({ 
                          ...prev, 
                          socialLinks: { ...prev.socialLinks, twitter: e.target.value }
                        }))}
                        placeholder="https://twitter.com/yourusername"
                      />
                    </div>
                    <div>
                      <label className={cn(
                        "block text-sm font-medium mb-2",
                        isDarkMode ? "text-neutral-300" : "text-gray-700"
                      )}>
                        GitHub
                      </label>
                      <Input
                        value={tempData.socialLinks.github}
                        onChange={(e) => setTempData(prev => ({ 
                          ...prev, 
                          socialLinks: { ...prev.socialLinks, github: e.target.value }
                        }))}
                        placeholder="https://github.com/yourusername"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="privacy" className="space-y-6">
              <div className="space-y-6">
                <div>
                  <h3 className={cn(
                    "text-lg font-semibold mb-4 flex items-center gap-2",
                    isDarkMode ? "text-white" : "text-gray-900"
                  )}>
                    <Shield className="h-5 w-5 text-primary-500" />
                    Privacy Settings
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className={cn(
                        "block text-sm font-medium mb-2",
                        isDarkMode ? "text-neutral-300" : "text-gray-700"
                      )}>
                        Profile Visibility
                      </label>
                      <select
                        value={tempData.preferences.profileVisibility}
                        onChange={(e) => setTempData(prev => ({ 
                          ...prev, 
                          preferences: { 
                            ...prev.preferences, 
                            profileVisibility: e.target.value as 'public' | 'private' | 'students-only'
                          }
                        }))}
                        className={cn(
                          "w-full px-3 py-2 border rounded-xl",
                          isDarkMode 
                            ? "bg-neutral-800 border-neutral-600 text-white" 
                            : "bg-white border-gray-300 text-gray-900"
                        )}
                      >
                        <option value="public">Public - Anyone can see your profile</option>
                        <option value="students-only">Students Only - Only your students can see</option>
                        <option value="private">Private - Only you can see</option>
                      </select>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className={cn(
                            "font-medium",
                            isDarkMode ? "text-white" : "text-gray-900"
                          )}>
                            Show Email Address
                          </p>
                          <p className={cn(
                            "text-sm",
                            isDarkMode ? "text-neutral-400" : "text-gray-600"
                          )}>
                            Allow students to see your email
                          </p>
                        </div>
                        <input
                          type="checkbox"
                          checked={tempData.preferences.showEmail}
                          onChange={(e) => setTempData(prev => ({ 
                            ...prev, 
                            preferences: { ...prev.preferences, showEmail: e.target.checked }
                          }))}
                          className="rounded"
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className={cn(
                            "font-medium",
                            isDarkMode ? "text-white" : "text-gray-900"
                          )}>
                            Show Phone Number
                          </p>
                          <p className={cn(
                            "text-sm",
                            isDarkMode ? "text-neutral-400" : "text-gray-600"
                          )}>
                            Allow students to see your phone number
                          </p>
                        </div>
                        <input
                          type="checkbox"
                          checked={tempData.preferences.showPhone}
                          onChange={(e) => setTempData(prev => ({ 
                            ...prev, 
                            preferences: { ...prev.preferences, showPhone: e.target.checked }
                          }))}
                          className="rounded"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6">
              <div className="space-y-6">
                <div>
                  <h3 className={cn(
                    "text-lg font-semibold mb-4 flex items-center gap-2",
                    isDarkMode ? "text-white" : "text-gray-900"
                  )}>
                    <Bell className="h-5 w-5 text-primary-500" />
                    Notification Preferences
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className={cn(
                          "font-medium",
                          isDarkMode ? "text-white" : "text-gray-900"
                        )}>
                          Email Notifications
                        </p>
                        <p className={cn(
                          "text-sm",
                          isDarkMode ? "text-neutral-400" : "text-gray-600"
                        )}>
                          Receive notifications via email
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        checked={tempData.preferences.emailNotifications}
                        onChange={(e) => setTempData(prev => ({ 
                          ...prev, 
                          preferences: { ...prev.preferences, emailNotifications: e.target.checked }
                        }))}
                        className="rounded"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className={cn(
                          "font-medium",
                          isDarkMode ? "text-white" : "text-gray-900"
                        )}>
                          Push Notifications
                        </p>
                        <p className={cn(
                          "text-sm",
                          isDarkMode ? "text-neutral-400" : "text-gray-600"
                        )}>
                          Receive push notifications in browser
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        checked={tempData.preferences.pushNotifications}
                        onChange={(e) => setTempData(prev => ({ 
                          ...prev, 
                          preferences: { ...prev.preferences, pushNotifications: e.target.checked }
                        }))}
                        className="rounded"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className={cn(
                          "font-medium",
                          isDarkMode ? "text-white" : "text-gray-900"
                        )}>
                          Marketing Emails
                        </p>
                        <p className={cn(
                          "text-sm",
                          isDarkMode ? "text-neutral-400" : "text-gray-600"
                        )}>
                          Receive updates about new features and tips
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        checked={tempData.preferences.marketingEmails}
                        onChange={(e) => setTempData(prev => ({ 
                          ...prev, 
                          preferences: { ...prev.preferences, marketingEmails: e.target.checked }
                        }))}
                        className="rounded"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </ModalContent>

      <ModalFooter>
        <div className="flex items-center justify-between w-full">
          <div className="text-sm text-gray-500">
            Member since {new Date(profileData.joinDate).toLocaleDateString()}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
            <Button onClick={handleSave} className="gap-2">
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </div>
      </ModalFooter>
    </Modal>
  );
}