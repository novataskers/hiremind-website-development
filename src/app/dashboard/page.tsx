"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Briefcase, TrendingUp, Upload, FileText, Sparkles, Users, Mail, Loader2, CheckCircle2, Brain } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface CVAnalysis {
  id: number;
  fullName: string | null;
  email: string | null;
  phone: string | null;
  skills: string[];
  expertise: string | null;
  jobTitles: string[];
  experienceYears: number | null;
  education: any[];
  summary: string | null;
  analyzedAt: string;
}

interface LeadStats {
  total: number;
  new: number;
  contacted: number;
  replied: number;
  qualified: number;
  rejected: number;
}

export default function Dashboard() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  
  const [cvAnalysis, setCvAnalysis] = useState<CVAnalysis | null>(null);
  const [leadStats, setLeadStats] = useState<LeadStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [cvText, setCvText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isGeneratingLeads, setIsGeneratingLeads] = useState(false);

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  useEffect(() => {
    if (session?.user) {
      fetchCVAnalysis();
      fetchLeadStats();
    }
  }, [session]);

  const fetchCVAnalysis = async () => {
    try {
      const token = localStorage.getItem("bearer_token");
      const response = await fetch("/api/cv-analysis?limit=1", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data && data.length > 0) {
          const analysis = data[0];
          // Parse JSON fields
          setCvAnalysis({
            ...analysis,
            skills: typeof analysis.skills === 'string' ? JSON.parse(analysis.skills) : analysis.skills,
            jobTitles: typeof analysis.jobTitles === 'string' ? JSON.parse(analysis.jobTitles) : analysis.jobTitles,
            education: typeof analysis.education === 'string' ? JSON.parse(analysis.education) : analysis.education,
          });
        }
      }
    } catch (error) {
      console.error("Error fetching CV analysis:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchLeadStats = async () => {
    try {
      const token = localStorage.getItem("bearer_token");
      const response = await fetch("/api/leads/stats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setLeadStats(data);
      }
    } catch (error) {
      console.error("Error fetching lead stats:", error);
    }
  };

  const handleAnalyzeCV = async () => {
    if (!cvText.trim()) {
      toast.error("Please paste your CV text");
      return;
    }

    setIsAnalyzing(true);
    try {
      const token = localStorage.getItem("bearer_token");
      const response = await fetch("/api/cv-analysis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ cvText }),
      });

      if (!response.ok) throw new Error("Failed to analyze CV");

      const data = await response.json();
      setCvAnalysis({
        ...data,
        skills: typeof data.skills === 'string' ? JSON.parse(data.skills) : data.skills,
        jobTitles: typeof data.jobTitles === 'string' ? JSON.parse(data.jobTitles) : data.jobTitles,
        education: typeof data.education === 'string' ? JSON.parse(data.education) : data.education,
      });
      
      toast.success("CV analyzed successfully!");
      setIsUploadDialogOpen(false);
      setCvText("");
    } catch (error) {
      toast.error("Failed to analyze CV");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleGenerateLeads = async () => {
    if (!cvAnalysis) {
      toast.error("Please upload and analyze your CV first");
      return;
    }

    setIsGeneratingLeads(true);
    try {
      const token = localStorage.getItem("bearer_token");
      const response = await fetch("/api/leads/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          cvAnalysisId: cvAnalysis.id,
          count: 10,
        }),
      });

      if (!response.ok) throw new Error("Failed to generate leads");

      toast.success("Successfully generated 10 new leads!");
      fetchLeadStats();
      router.push("/leads");
    } catch (error) {
      toast.error("Failed to generate leads");
    } finally {
      setIsGeneratingLeads(false);
    }
  };

  if (isPending || isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!session?.user) return null;

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      
      <main className="flex-1 lg:ml-64 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-6 lg:mb-8 mt-16 lg:mt-0">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-2">
              <h1 className="text-3xl sm:text-4xl font-bold">Dashboard</h1>
              <div className="text-left sm:text-right">
                <div className="text-sm text-muted-foreground">Welcome, {session.user.name}</div>
              </div>
            </div>
            <p className="text-muted-foreground">
              AI-powered job search and lead generation
            </p>
          </div>

          {/* CV Analysis Section */}
          {!cvAnalysis ? (
            <Card className="p-6 sm:p-8 mb-6 lg:mb-8 text-center border-dashed border-2">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Upload className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold mb-2">Upload Your CV</h2>
                <p className="text-muted-foreground mb-6 text-sm sm:text-base">
                  Let AI analyze your CV to extract your skills, expertise, and experience. 
                  We'll then find companies and leads that match your profile.
                </p>
                <Button size="lg" onClick={() => setIsUploadDialogOpen(true)} className="w-full sm:w-auto">
                  <Upload className="w-4 h-4 mr-2" />
                  Analyze CV
                </Button>
              </div>
            </Card>
          ) : (
            <Card className="p-4 sm:p-6 mb-6 lg:mb-8">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold mb-2 flex items-center gap-2">
                    <Brain className="w-6 h-6 text-primary" />
                    CV Analysis
                  </h2>
                  <p className="text-muted-foreground text-sm">AI-extracted profile information</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => setIsUploadDialogOpen(true)} className="w-full sm:w-auto">
                  <Upload className="w-4 h-4 mr-2" />
                  Re-analyze
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
                {/* Profile Info */}
                <div className="space-y-2">
                  <h3 className="font-semibold text-xs sm:text-sm text-muted-foreground uppercase">Profile</h3>
                  {cvAnalysis.fullName && (
                    <p className="text-base sm:text-lg font-semibold">{cvAnalysis.fullName}</p>
                  )}
                  {cvAnalysis.email && (
                    <p className="text-xs sm:text-sm text-muted-foreground break-all">{cvAnalysis.email}</p>
                  )}
                  {cvAnalysis.phone && (
                    <p className="text-xs sm:text-sm text-muted-foreground">{cvAnalysis.phone}</p>
                  )}
                </div>

                {/* Expertise */}
                <div className="space-y-2">
                  <h3 className="font-semibold text-xs sm:text-sm text-muted-foreground uppercase">Expertise</h3>
                  <Badge variant="outline" className="bg-primary/10 text-primary">
                    {cvAnalysis.expertise}
                  </Badge>
                  {cvAnalysis.experienceYears && (
                    <p className="text-xs sm:text-sm text-muted-foreground">{cvAnalysis.experienceYears}+ years experience</p>
                  )}
                </div>

                {/* Job Titles */}
                <div className="space-y-2">
                  <h3 className="font-semibold text-xs sm:text-sm text-muted-foreground uppercase">Roles</h3>
                  <div className="flex flex-wrap gap-2">
                    {cvAnalysis.jobTitles.slice(0, 3).map((title, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">{title}</Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div className="mb-6">
                <h3 className="font-semibold text-xs sm:text-sm text-muted-foreground uppercase mb-3">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {cvAnalysis.skills.slice(0, 12).map((skill, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">{skill}</Badge>
                  ))}
                  {cvAnalysis.skills.length > 12 && (
                    <Badge variant="outline" className="text-xs">+{cvAnalysis.skills.length - 12} more</Badge>
                  )}
                </div>
              </div>

              {/* Summary */}
              {cvAnalysis.summary && (
                <div className="mb-6">
                  <h3 className="font-semibold text-xs sm:text-sm text-muted-foreground uppercase mb-3">Professional Summary</h3>
                  <p className="text-xs sm:text-sm leading-relaxed">{cvAnalysis.summary}</p>
                </div>
              )}

              {/* Action Button */}
              <div className="pt-4 border-t border-border">
                <Button 
                  size="lg" 
                  onClick={handleGenerateLeads}
                  disabled={isGeneratingLeads}
                  className="w-full"
                >
                  {isGeneratingLeads ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Generating Leads...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate Leads
                    </>
                  )}
                </Button>
              </div>
            </Card>
          )}

          {/* Stats Grid */}
          {leadStats && leadStats.total > 0 && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 lg:mb-8">
              <Card className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-2">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Users className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-muted-foreground">Total Leads</p>
                    <p className="text-xl sm:text-2xl font-bold">{leadStats.total}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-2">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-muted-foreground">New</p>
                    <p className="text-xl sm:text-2xl font-bold text-blue-500">{leadStats.new}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-2">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-muted-foreground">Qualified</p>
                    <p className="text-xl sm:text-2xl font-bold text-green-500">{leadStats.qualified}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-2">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-purple-500/10 flex items-center justify-center">
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-muted-foreground">Replied</p>
                    <p className="text-xl sm:text-2xl font-bold text-purple-500">{leadStats.replied}</p>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <Card className="p-4 sm:p-6 hover:border-primary/50 transition-colors cursor-pointer" onClick={() => router.push("/leads")}>
              <div className="flex items-center gap-3 sm:gap-4 mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-base sm:text-lg">Manage Leads</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">View and contact your leads</p>
                </div>
              </div>
              <Button variant="ghost" className="w-full text-sm">
                View All Leads →
              </Button>
            </Card>

            <Card className="p-4 sm:p-6 hover:border-primary/50 transition-colors cursor-pointer" onClick={() => router.push("/campaigns")}>
              <div className="flex items-center gap-3 sm:gap-4 mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-base sm:text-lg">Email Campaigns</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">Track email outreach</p>
                </div>
              </div>
              <Button variant="ghost" className="w-full text-sm">
                View Campaigns →
              </Button>
            </Card>

            <Card className="p-4 sm:p-6 hover:border-primary/50 transition-colors cursor-pointer" onClick={() => router.push("/applications")}>
              <div className="flex items-center gap-3 sm:gap-4 mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0">
                  <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-base sm:text-lg">Applications</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">Track job applications</p>
                </div>
              </div>
              <Button variant="ghost" className="w-full text-sm">
                View Applications →
              </Button>
            </Card>
          </div>
        </div>
      </main>

      {/* Upload CV Dialog */}
      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogContent className="max-w-2xl mx-4">
          <DialogHeader>
            <DialogTitle>Analyze Your CV</DialogTitle>
            <DialogDescription>
              Paste your CV text below. Our AI will extract your skills, expertise, job titles, and experience to help generate relevant leads.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="cv-text">CV Text</Label>
              <Textarea
                id="cv-text"
                rows={15}
                value={cvText}
                onChange={(e) => setCvText(e.target.value)}
                placeholder="Paste your CV content here...&#10;&#10;Example:&#10;John Doe&#10;Senior Software Engineer&#10;john@example.com | +1 (555) 123-4567&#10;&#10;Professional Summary:&#10;Experienced software engineer with 8+ years in full-stack development...&#10;&#10;Skills: JavaScript, React, Node.js, Python, AWS..."
                className="font-mono text-sm"
              />
            </div>
            <div className="flex flex-col-reverse sm:flex-row gap-2 justify-end">
              <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)} disabled={isAnalyzing} className="w-full sm:w-auto">
                Cancel
              </Button>
              <Button onClick={handleAnalyzeCV} disabled={isAnalyzing} className="w-full sm:w-auto">
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Brain className="w-4 h-4 mr-2" />
                    Analyze CV
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}