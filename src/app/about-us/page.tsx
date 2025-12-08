"use client";

import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Linkedin, Twitter, Instagram, Facebook, Youtube } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import Image from "next/image";

const teamMembers = [
{
  name: "Faiz Nour El Houda",
  role: "Founder",
  image: "N",
  bio: "Former VP at LinkedIn with 15+ years in recruitment tech. Passionate about leveraging AI to democratize job opportunities.",
  linkedin: "#",
  twitter: "#"
},
{
  name: "Jihan Ahmed",
  role: "Co-Founder & Head Developer",
  image: "J",
  bio: "Ex-Google AI Engineer. Built machine learning systems for Fortune 500 companies. Believes in ethical AI for career advancement.",
  linkedin: "#",
  twitter: "#"
},
{
  name: "Kemai Price",
  role: "Co-Founder & Advisor",
  image: "K",
  bio: "Product leader from Meta. Expert in user experience design. Dedicated to creating intuitive tools that empower job seekers.",
  linkedin: "#",
  twitter: "#"
},
{
  name: "Raiyan Hussain",
  role: "Social Media Manager",
  image: "R",
  bio: "PhD in Computer Science from MIT. Published researcher in NLP and job matching algorithms. Pioneering the future of AI recruitment.",
  linkedin: "#",
  twitter: "#"
},
{
  name: "Hena Ahmed",
  role: "Content Curation Manager",
  image: "H",
  bio: "Career coach with 10+ years helping thousands land dream jobs. Committed to ensuring every user finds their perfect match.",
  linkedin: "#",
  twitter: "#"
},
{
  name: "James Martinez",
  role: "Web Tester",
  image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/Screenshot_8-12-2025_2280_www.instagram.com-1765190250954.jpeg",
  bio: "Full-stack architect from Amazon. Built scalable systems serving millions. Focused on reliable, fast, and secure technology.",
  linkedin: "#",
  twitter: "#"
}];


export default function AboutUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData({ name: "", email: "", message: "" });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              About HireMind
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
              Revolutionizing job search with AI-powered automation that puts you in control of your career destiny.
            </p>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 bg-muted/30">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-center">Our Story</h2>
            <div className="space-y-6 text-base sm:text-lg text-muted-foreground leading-relaxed">
              <p>
                In mid-2025, Founder Faiz Nour El Houda was searching for a better way to connect with students and grow her online teaching business. At the same time, her close friend Jihan Ahmed was struggling to find clients for his video-editing work. After sharing their challenges, Nour proposed creating a tool that could help people easily find clients, students, and opportunities.
              </p>
              <p>
                Jihan expanded the idea, and within two weeks, they developed the first version of an AI system that did exactly that. Soon after, they shared the concept with Kemai Price, who encouraged them to build a full company around it. With his guidance and roadmap, the vision grew into Atlas Infrastructure Group, with Hiremind becoming its first product.
              </p>
              <p>
                Today, Hiremind empowers users to instantly find leads, access data, and connect with clients through email and messaging—helping professionals secure the projects and opportunities they deserve.
              </p>
              <p className="font-semibold text-foreground">
                Our mission is simple: empower every professional with an AI agent that works 24/7 to advance their career, so they 
                can focus on being human.
              </p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center">Meet Our Team</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {teamMembers.map((member, index) => <Card key={index} className="p-6 hover:border-primary/50 transition-all">
                  <div className="flex flex-col items-center text-center">
                    {member.image.startsWith('http') ? (
                      <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                        <Image
                          src={member.image}
                          alt={member.name}
                          width={96}
                          height={96}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-2xl font-bold mb-4">
                        {member.image}
                      </div>
                    )}
                    <h3 className="text-xl font-semibold mb-1 !whitespace-pre-line !whitespace-pre-line !whitespace-pre-line !whitespace-pre-line !whitespace-pre-line">{member.name}</h3>
                    <p className="text-sm text-primary font-medium mb-3 !whitespace-pre-line !whitespace-pre-line !whitespace-pre-line !whitespace-pre-line !whitespace-pre-line !whitespace-pre-line !whitespace-pre-line !whitespace-pre-line">{member.role}</p>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      {member.bio}
                    </p>
                    <div className="flex gap-3">
                      <a href={member.linkedin} className="text-muted-foreground hover:text-primary transition-colors">
                        <Linkedin className="w-5 h-5" />
                      </a>
                      <a href={member.twitter} className="text-muted-foreground hover:text-primary transition-colors">
                        <Twitter className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </Card>)}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20 bg-muted/30">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center">Get In Touch</h2>
            
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Follow Us Section */}
              <div className="flex flex-col justify-center">
                <h3 className="text-xl font-semibold mb-6">Follow Us</h3>
                <div className="flex gap-4">
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    <Instagram className="w-6 h-6" />
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    <Linkedin className="w-6 h-6" />
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    <Facebook className="w-6 h-6" />
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    <Youtube className="w-6 h-6" />
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    <Twitter className="w-6 h-6" />
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Contact Form */}
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-6">Send Us a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Name
                    </label>
                    <Input id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                    required />

                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your.email@example.com"
                      required />

                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="How can we help you?"
                      rows={5}
                      required />

                  </div>

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Card>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border py-8 bg-card">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center text-sm text-muted-foreground">
              <p className="mb-2">
                © {new Date().getFullYear()} HireMind, Inc. All rights reserved.
              </p>
              <p>
                Made with ❤️ in San Francisco | 
                <a href="#" className="hover:text-primary transition-colors ml-1">Privacy Policy</a> | 
                <a href="#" className="hover:text-primary transition-colors ml-1">Terms of Service</a>
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>);

}