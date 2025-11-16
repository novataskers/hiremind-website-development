"use client";

import Sidebar from "@/components/Sidebar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Clock, CheckCircle2, XCircle } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Applications() {
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
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!session?.user) return null;

  const applications = [
    { company: "TechCorp", role: "Senior Developer", status: "pending", date: "2 days ago" },
    { company: "StartupXYZ", role: "Product Manager", status: "interview", date: "5 days ago" },
    { company: "Innovation Labs", role: "UX Designer", status: "accepted", date: "1 week ago" },
    { company: "Digital Agency", role: "Marketing Lead", status: "rejected", date: "2 weeks ago" },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "accepted":
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case "rejected":
        return <XCircle className="w-5 h-5 text-red-500" />;
      case "interview":
        return <Clock className="w-5 h-5 text-primary" />;
      default:
        return <Clock className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "accepted":
        return "bg-green-500/10 text-green-500";
      case "rejected":
        return "bg-red-500/10 text-red-500";
      case "interview":
        return "bg-primary/10 text-primary";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
              <FileText className="w-10 h-10" />
              Applications
            </h1>
            <p className="text-muted-foreground">Track all your job applications</p>
          </div>

          <div className="space-y-4">
            {applications.map((app, idx) => (
              <Card key={idx} className="p-6 hover:border-primary/50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    {getStatusIcon(app.status)}
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{app.role}</h3>
                      <p className="text-muted-foreground mb-2">{app.company}</p>
                      <p className="text-sm text-muted-foreground">{app.date}</p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(app.status)}>
                    {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}