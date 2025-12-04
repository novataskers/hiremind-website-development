import Header from "@/components/Header";
import { Badge } from "@/components/ui/badge";

export default function AboutUs() {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-16 p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          {/* Coming Soon Badge */}
          <div className="flex justify-center mb-8">
            <Badge variant="secondary" className="text-lg px-6 py-2">
              Coming Soon
            </Badge>
          </div>

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
              About Us
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground">
              We're building the future of job searching with AI
            </p>
          </div>

          {/* Placeholder Content */}
          <div className="text-center text-muted-foreground">
            <p className="text-base sm:text-lg">
              Our story, mission, and team information will be available here soon.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}