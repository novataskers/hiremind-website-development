"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Crown, Zap, Rocket } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const plans = [
  {
    id: "basic",
    name: "Basic",
    icon: Zap,
    price: "$9",
    period: "/month",
    description: "Perfect for getting started with AI-powered job search",
    features: [
      "Up to 20 job applications per month",
      "Basic AI job matching",
      "Email notifications",
      "Resume upload & storage",
      "Application tracking",
      "Community access",
    ],
    color: "from-blue-500 to-cyan-500",
    popular: false,
  },
  {
    id: "pro",
    name: "Pro",
    icon: Crown,
    price: "$29",
    period: "/month",
    description: "Most popular plan for serious job seekers",
    features: [
      "Unlimited job applications",
      "Advanced AI job matching",
      "Priority email & SMS notifications",
      "Multiple resume versions",
      "Advanced analytics dashboard",
      "Auto-follow up with recruiters",
      "Interview preparation AI",
      "Priority customer support",
    ],
    color: "from-purple-500 to-pink-500",
    popular: true,
  },
  {
    id: "ultra",
    name: "Ultra",
    icon: Rocket,
    price: "$79",
    period: "/month",
    description: "Premium experience with dedicated support",
    features: [
      "Everything in Pro",
      "Dedicated account manager",
      "Custom AI training on your profile",
      "Direct recruiter connections",
      "Salary negotiation assistance",
      "Personal branding consultation",
      "LinkedIn profile optimization",
      "Career coaching sessions (2/month)",
      "Exclusive job opportunities",
      "White-glove service",
    ],
    color: "from-orange-500 to-red-500",
    popular: false,
  },
];

export default function PremiumPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/login?redirect=/premium");
    }
  }, [session, isPending, router]);

  const handleUpgrade = (planId: string) => {
    setSelectedPlan(planId);
    toast.success(`Upgrading to ${plans.find(p => p.id === planId)?.name} plan...`, {
      description: "This is a demo. Payment integration coming soon!",
    });
  };

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
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12 lg:mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Crown className="w-8 h-8 text-primary" />
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
                Premium Plans
              </h1>
            </div>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              Unlock the full potential of AI-powered job search. Choose the plan that fits your career goals.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {plans.map((plan) => {
              const IconComponent = plan.icon;
              return (
                <Card
                  key={plan.id}
                  className={`relative p-6 lg:p-8 flex flex-col ${
                    plan.popular 
                      ? "border-primary border-2 shadow-2xl scale-105" 
                      : "border-border"
                  }`}
                >
                  {/* Popular Badge */}
                  {plan.popular && (
                    <Badge 
                      className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground"
                    >
                      Most Popular
                    </Badge>
                  )}

                  {/* Plan Icon */}
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-4`}>
                    <IconComponent className="w-7 h-7 text-white" />
                  </div>

                  {/* Plan Name */}
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  
                  {/* Description */}
                  <p className="text-sm text-muted-foreground mb-4">
                    {plan.description}
                  </p>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground">{plan.period}</span>
                    </div>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Upgrade Button */}
                  <Button
                    onClick={() => handleUpgrade(plan.id)}
                    disabled={selectedPlan === plan.id}
                    className={`w-full ${
                      plan.popular
                        ? `bg-gradient-to-r ${plan.color} hover:opacity-90`
                        : ""
                    }`}
                    variant={plan.popular ? "default" : "outline"}
                    size="lg"
                  >
                    {selectedPlan === plan.id ? "Processing..." : "Upgrade Now"}
                  </Button>
                </Card>
              );
            })}
          </div>

          {/* Footer Info */}
          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground">
              All plans include a 14-day money-back guarantee. Cancel anytime.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Need help choosing? <a href="/about-us" className="text-primary hover:underline">Contact our team</a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
