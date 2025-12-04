"use client";

import { useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, FileText, BarChart3, Settings } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!session?.user) return null;

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      
      <main className="flex-1 lg:ml-64 p-4 sm:p-6 lg:p-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-8 lg:mb-12 mt-16 lg:mt-0">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
              Welcome back, {session.user.name}
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground">
              Your AI job agent is ready to help you get hired
            </p>
          </div>

          {/* Feature Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {/* HireMind Chat - Active */}
            <Card 
              className="p-6 sm:p-8 lg:p-10 hover:border-primary/50 transition-all cursor-pointer group"
              onClick={() => router.push("/hiremind")}
            >
              <div className="mb-4 sm:mb-6">
                <MessageSquare className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-primary" />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3 group-hover:text-primary transition-colors">
                HireMind Chat
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Chat with your AI agent to find and apply to jobs automatically
              </p>
            </Card>

            {/* Upload Resume - Coming Soon */}
            <Card className="p-6 sm:p-8 lg:p-10 relative opacity-75">
              <div className="mb-4 sm:mb-6">
                <FileText className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-muted-foreground" />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3 text-muted-foreground">
                Upload Resume
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Upload your resume to help AI find the best matches
              </p>
              <Badge 
                variant="secondary" 
                className="absolute top-4 sm:top-6 right-4 sm:right-6 text-xs"
              >
                Coming soon
              </Badge>
            </Card>

            {/* Analytics - Coming Soon */}
            <Card className="p-6 sm:p-8 lg:p-10 relative opacity-75">
              <div className="mb-4 sm:mb-6">
                <BarChart3 className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-muted-foreground" />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3 text-muted-foreground">
                Analytics
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                View insights and statistics about your job search
              </p>
              <Badge 
                variant="secondary" 
                className="absolute top-4 sm:top-6 right-4 sm:right-6 text-xs"
              >
                Coming soon
              </Badge>
            </Card>

            {/* Settings - Coming Soon */}
            <Card className="p-6 sm:p-8 lg:p-10 relative opacity-75">
              <div className="mb-4 sm:mb-6">
                <Settings className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-muted-foreground" />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3 text-muted-foreground">
                Settings
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Manage your profile, preferences, and account settings
              </p>
              <Badge 
                variant="secondary" 
                className="absolute top-4 sm:top-6 right-4 sm:right-6 text-xs"
              >
                Coming soon
              </Badge>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}