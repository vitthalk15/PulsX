
import React, { useState, useEffect } from 'react';
import { User, Settings, Bell, RefreshCw, Activity, TrendingUp, Calendar, Mail, Phone, MapPin, Edit3, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  joinDate: string;
  totalInvestment: number;
  currentValue: number;
  totalReturns: number;
  activeTrades: number;
  watchlistCount: number;
}

interface NotificationSettings {
  priceAlerts: boolean;
  newsUpdates: boolean;
  portfolioUpdates: boolean;
  marketOpen: boolean;
  emailNotifications: boolean;
}

const ProfileSection = () => {
  const [userProfile, setUserProfile] = useState<UserProfile>({
    id: 'USER001',
    name: 'Test User',
    email: 'test@example.com',
    phone: '+91 98765 43210',
    location: 'Pune, Maharashtra',
    joinDate: '2025-07-01',
    totalInvestment: 500000,
    currentValue: 547500,
    totalReturns: 47500,
    activeTrades: 12,
    watchlistCount: 25
  });

  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    priceAlerts: true,
    newsUpdates: true,
    portfolioUpdates: true,
    marketOpen: false,
    emailNotifications: true
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(userProfile);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const { toast } = useToast();

  useEffect(() => {
    // Simulate real-time data updates
    const interval = setInterval(() => {
      setUserProfile(prev => ({
        ...prev,
        currentValue: prev.currentValue + (Math.random() - 0.5) * 1000,
        totalReturns: prev.totalReturns + (Math.random() - 0.5) * 500,
      }));
      setLastUpdated(new Date());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleSaveProfile = () => {
    setUserProfile(editedProfile);
    setIsEditing(false);
    toast({
      title: 'Profile Updated',
      description: 'Your profile information has been saved successfully.',
    });
  };

  const handleCancelEdit = () => {
    setEditedProfile(userProfile);
    setIsEditing(false);
  };

  const handleNotificationToggle = (key: keyof NotificationSettings) => {
    setNotificationSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
    toast({
      title: 'Settings Updated',
      description: 'Notification preferences have been updated.',
    });
  };

  const refreshData = () => {
    toast({
      title: 'Refreshing Data',
      description: 'Updating your latest portfolio information...',
    });
    
    // Simulate data refresh
    setTimeout(() => {
      setLastUpdated(new Date());
      toast({
        title: 'Data Refreshed',
        description: 'Your portfolio data has been updated.',
      });
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-finance-primary to-blue-600 rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl text-foreground">
                  {userProfile.name}
                </CardTitle>
                <p className="text-muted-foreground">Member since {userProfile.joinDate}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge variant="secondary">Active Trader</Badge>
                  <Badge variant="outline">Verified</Badge>
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={refreshData}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Button 
                variant={isEditing ? "destructive" : "default"} 
                size="sm" 
                onClick={isEditing ? handleCancelEdit : () => setIsEditing(true)}
              >
                {isEditing ? <X className="h-4 w-4 mr-2" /> : <Edit3 className="h-4 w-4 mr-2" />}
                {isEditing ? 'Cancel' : 'Edit'}
              </Button>
              {isEditing && (
                <Button size="sm" onClick={handleSaveProfile}>
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg flex items-center text-foreground">
                <User className="h-5 w-5 mr-2" />
                Personal Information
              </h3>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  {isEditing ? (
                    <Input
                      id="name"
                      value={editedProfile.name}
                      onChange={(e) => setEditedProfile({...editedProfile, name: e.target.value})}
                    />
                  ) : (
                    <p className="text-foreground">{userProfile.name}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    {isEditing ? (
                      <Input
                        id="email"
                        type="email"
                        value={editedProfile.email}
                        onChange={(e) => setEditedProfile({...editedProfile, email: e.target.value})}
                      />
                    ) : (
                      <span className="text-foreground">{userProfile.email}</span>
                    )}
                  </div>
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    {isEditing ? (
                      <Input
                        id="phone"
                        value={editedProfile.phone}
                        onChange={(e) => setEditedProfile({...editedProfile, phone: e.target.value})}
                      />
                    ) : (
                      <span className="text-foreground">{userProfile.phone}</span>
                    )}
                  </div>
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    {isEditing ? (
                      <Input
                        id="location"
                        value={editedProfile.location}
                        onChange={(e) => setEditedProfile({...editedProfile, location: e.target.value})}
                      />
                    ) : (
                      <span className="text-foreground">{userProfile.location}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Portfolio Stats */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg flex items-center text-foreground">
                <TrendingUp className="h-5 w-5 mr-2" />
                Portfolio Statistics
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg border border-border">
                  <p className="text-sm text-blue-600 dark:text-blue-400">Total Investment</p>
                  <p className="font-bold text-lg text-foreground">₹{userProfile.totalInvestment.toLocaleString()}</p>
                </div>
                <div className="bg-green-50 dark:bg-green-900/30 p-3 rounded-lg border border-border">
                  <p className="text-sm text-green-600 dark:text-green-400">Current Value</p>
                  <p className="font-bold text-lg text-foreground">₹{userProfile.currentValue.toLocaleString()}</p>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/30 p-3 rounded-lg border border-border">
                  <p className="text-sm text-purple-600 dark:text-purple-400">Total Returns</p>
                  <p className="font-bold text-lg text-green-600 dark:text-green-400">+₹{userProfile.totalReturns.toLocaleString()}</p>
                </div>
                <div className="bg-orange-50 dark:bg-orange-900/30 p-3 rounded-lg border border-border">
                  <p className="text-sm text-orange-600 dark:text-orange-400">Active Trades</p>
                  <p className="font-bold text-lg text-foreground">{userProfile.activeTrades}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-foreground">
            <Bell className="h-5 w-5 mr-2" />
            Notification Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(notificationSettings).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <div>
                  <Label className="capitalize text-foreground">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    {key === 'priceAlerts' && 'Get notified when stock prices hit your targets'}
                    {key === 'newsUpdates' && 'Receive relevant market news updates'}
                    {key === 'portfolioUpdates' && 'Daily portfolio performance summaries'}
                    {key === 'marketOpen' && 'Market opening and closing notifications'}
                    {key === 'emailNotifications' && 'Send notifications to your email'}
                  </p>
                </div>
                <Switch
                  checked={value}
                  onCheckedChange={() => handleNotificationToggle(key as keyof NotificationSettings)}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Real-time Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-foreground">
            <Activity className="h-5 w-5 mr-2" />
            Real-time Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-foreground">Live Data Active</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              Last Updated: {lastUpdated.toLocaleTimeString()}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileSection;
