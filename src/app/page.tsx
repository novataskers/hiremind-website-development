"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import { Search, Mail, ListChecks, MessageCircle, Zap, Shield, Brain } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const handleGetStarted = () => {
    if (session?.user) {
      router.push("/dashboard");
    } else {
      router.push("/register");
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
            Get hired with your<br />own AI agent
          </h1>
          
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-8 sm:mb-12 max-w-2xl mx-auto px-4">
            Hiremind will find and apply to jobs that match your profile—all on autopilot.
          </p>

          {!isPending && (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4">
              <Button
                size="lg"
                onClick={handleGetStarted}
                className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 h-auto"
              >
                Get started
              </Button>
              {!session?.user && (
                <Link href="/login" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 h-auto"
                  >
                    Sign in
                  </Button>
                </Link>
              )}
            </div>
          )}
        </section>

        {/* Features Grid */}
        <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
            <Card className="p-6 sm:p-8 border-border hover:border-primary/50 transition-colors">
              <Search className="w-10 h-10 sm:w-12 sm:h-12 mb-3 sm:mb-4 text-primary" />
              <h3 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3">Scan for roles</h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                I'll search for openings that are a great fit for your experience.
              </p>
            </Card>

            <Card className="p-6 sm:p-8 border-border hover:border-primary/50 transition-colors">
              <Mail className="w-10 h-10 sm:w-12 sm:h-12 mb-3 sm:mb-4 text-primary" />
              <h3 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3">Auto-apply</h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                I'll submit tailored applications to the best opportunities
              </p>
            </Card>

            <Card className="p-6 sm:p-8 border-border hover:border-primary/50 transition-colors">
              <ListChecks className="w-10 h-10 sm:w-12 sm:h-12 mb-3 sm:mb-4 text-primary" />
              <h3 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3">Track progress</h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                I'll monitor your applications and alert you of responses
              </p>
            </Card>

            <Card className="p-6 sm:p-8 border-border hover:border-primary/50 transition-colors">
              <MessageCircle className="w-10 h-10 sm:w-12 sm:h-12 mb-3 sm:mb-4 text-primary" />
              <h3 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3">Reach out</h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                I'll follow up with recruiters and hiring managers
              </p>
            </Card>
          </div>
        </section>

        {/* Stats Section */}
        <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
          <div className="grid sm:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto text-center">
            <div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                <h4 className="text-xs sm:text-sm font-medium text-muted-foreground">Automates</h4>
              </div>
              <div className="text-3xl sm:text-4xl font-bold">87%</div>
              <div className="text-xs sm:text-sm text-muted-foreground mt-1">of your job search</div>
            </div>

            <div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                <h4 className="text-xs sm:text-sm font-medium text-muted-foreground">GDPR</h4>
              </div>
              <div className="text-3xl sm:text-4xl font-bold">Compliant</div>
              <div className="text-xs sm:text-sm text-muted-foreground mt-1">Secure & private</div>
            </div>

            <div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <Brain className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                <h4 className="text-xs sm:text-sm font-medium text-muted-foreground">Powered by</h4>
              </div>
              <div className="text-3xl sm:text-4xl font-bold">GPT-4</div>
              <div className="text-xs sm:text-sm text-muted-foreground mt-1">Advanced AI</div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}