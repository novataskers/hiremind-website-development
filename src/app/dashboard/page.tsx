"use client";

import { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, FileText, BarChart3, BookOpen, Users, Briefcase, Info } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";

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
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-16 p-4 sm:p-6 lg:p-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-8 lg:mb-12">
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

            {/* Hiremind Study - Coming Soon */}
            <Card className="p-6 sm:p-8 lg:p-10 relative opacity-75">
              <div className="mb-4 sm:mb-6">
                <BookOpen className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-muted-foreground" />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3 text-muted-foreground">
                Hiremind Study
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Access resources and guides to improve your job search
              </p>
              <Badge 
                variant="secondary" 
                className="absolute top-4 sm:top-6 right-4 sm:right-6 text-xs"
              >
                Coming soon
              </Badge>
            </Card>

            {/* Workspace - Coming Soon */}
            <Card className="p-6 sm:p-8 lg:p-10 relative opacity-75">
              <div className="mb-4 sm:mb-6">
                <Briefcase className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-muted-foreground" />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3 text-muted-foreground">
                Workspace
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Collaborate with your team and manage shared resources
              </p>
              <Badge 
                variant="secondary" 
                className="absolute top-4 sm:top-6 right-4 sm:right-6 text-xs"
              >
                Coming soon
              </Badge>
            </Card>

            {/* Community - Coming Soon */}
            <Card className="p-6 sm:p-8 lg:p-10 relative opacity-75">
              <div className="mb-4 sm:mb-6">
                <Users className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-muted-foreground" />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3 text-muted-foreground">
                Community
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Connect with other job seekers and share experiences
              </p>
              <Badge 
                variant="secondary" 
                className="absolute top-4 sm:top-6 right-4 sm:right-6 text-xs"
              >
                Coming soon
              </Badge>
            </Card>

            {/* About Us - Active */}
            <Card 
              className="p-6 sm:p-8 lg:p-10 hover:border-primary/50 transition-all cursor-pointer group"
              onClick={() => router.push("/about-us")}
            >
              <div className="mb-4 sm:mb-6">
                <Info className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-primary" />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3 group-hover:text-primary transition-colors">
                About Us
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Learn more about HireMind and our mission
              </p>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}