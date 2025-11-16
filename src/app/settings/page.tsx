"use client";

import Sidebar from "@/components/Sidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Settings as SettingsIcon, User, Bell, Lock, CreditCard } from "lucide-react";

export default function Settings() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      
      <main className="flex-1 lg:ml-64 p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 lg:mb-8 mt-16 lg:mt-0">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2 flex items-center gap-3">
              <SettingsIcon className="w-8 h-8 sm:w-10 sm:h-10" />
              Settings
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base">Manage your account and preferences</p>
          </div>

          <div className="space-y-4 sm:space-y-6">
            {/* Profile Settings */}
            <Card className="p-4 sm:p-6">
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <User className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                <h2 className="text-xl sm:text-2xl font-semibold">Profile</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-sm">Full Name</Label>
                  <Input id="name" defaultValue="Sarmag" className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="email" className="text-sm">Email</Label>
                  <Input id="email" type="email" defaultValue="sarmag@example.com" className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="title" className="text-sm">Current Title</Label>
                  <Input id="title" defaultValue="Marketing Manager" className="mt-2" />
                </div>
                <Button className="w-full sm:w-auto">Save Changes</Button>
              </div>
            </Card>

            {/* Notification Settings */}
            <Card className="p-4 sm:p-6">
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                <h2 className="text-xl sm:text-2xl font-semibold">Notifications</h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <Label className="text-sm">Email Notifications</Label>
                    <p className="text-xs sm:text-sm text-muted-foreground">Receive email updates about your applications</p>
                  </div>
                  <Switch defaultChecked className="flex-shrink-0" />
                </div>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <Label className="text-sm">New Job Matches</Label>
                    <p className="text-xs sm:text-sm text-muted-foreground">Get notified when new jobs match your profile</p>
                  </div>
                  <Switch defaultChecked className="flex-shrink-0" />
                </div>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <Label className="text-sm">Application Updates</Label>
                    <p className="text-xs sm:text-sm text-muted-foreground">Alerts for application status changes</p>
                  </div>
                  <Switch defaultChecked className="flex-shrink-0" />
                </div>
              </div>
            </Card>

            {/* AI Settings */}
            <Card className="p-4 sm:p-6">
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <Lock className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                <h2 className="text-xl sm:text-2xl font-semibold">AI Settings</h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <Label className="text-sm">Auto-apply to Jobs</Label>
                    <p className="text-xs sm:text-sm text-muted-foreground">Let AI automatically apply to matching positions</p>
                  </div>
                  <Switch defaultChecked className="flex-shrink-0" />
                </div>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <Label className="text-sm">AI Follow-ups</Label>
                    <p className="text-xs sm:text-sm text-muted-foreground">Allow AI to send follow-up messages</p>
                  </div>
                  <Switch defaultChecked className="flex-shrink-0" />
                </div>
                <div>
                  <Label htmlFor="applications" className="text-sm">Max Applications per Week</Label>
                  <Input id="applications" type="number" defaultValue="50" className="mt-2" />
                </div>
              </div>
            </Card>

            {/* Subscription */}
            <Card className="p-4 sm:p-6">
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <CreditCard className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                <h2 className="text-xl sm:text-2xl font-semibold">Subscription</h2>
              </div>
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex-1">
                    <Label className="text-base sm:text-lg">Pro Plan</Label>
                    <p className="text-xs sm:text-sm text-muted-foreground">Unlimited AI applications and priority support</p>
                  </div>
                  <Badge className="bg-primary w-fit">Active</Badge>
                </div>
                <Button variant="outline" className="w-full sm:w-auto">Manage Subscription</Button>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${className}`}>
      {children}
    </span>
  );
}