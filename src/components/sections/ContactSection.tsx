"use client";

import { portfolioData } from "@/data/portfolio";
import { FadeIn } from "@/components/animations/FadeIn";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Send, Loader2 } from "lucide-react";
import { useState } from "react";

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const formData = new FormData(e.currentTarget);
      const name = formData.get("name") as string;
      const email = formData.get("email") as string;
      const subject = formData.get("subject") as string;
      const message = formData.get("message") as string;

      const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${portfolioData.personal.email}&su=${encodeURIComponent(
        subject || "Portfolio Contact"
      )}&body=${encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
      )}`;

      window.open(gmailLink, '_blank');
      
      setSubmitStatus("success");
      e.currentTarget.reset();
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <FadeIn direction="up">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Get In Touch</h2>
            <div className="h-px bg-border flex-1 ml-4" />
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-8">
            <FadeIn direction="up" delay={0.1}>
              <h3 className="text-2xl font-semibold mb-4">Let&apos;s talk about your next project</h3>
              <p className="text-muted-foreground mb-8">
                I&apos;m currently available for new opportunities. Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">Email</p>
                    <a href={`mailto:${portfolioData.personal.email}`} className="text-foreground hover:text-primary transition-colors font-medium">
                      {portfolioData.personal.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">Phone</p>
                    <a href={`tel:${portfolioData.personal.phone.replace(/\s+/g, '')}`} className="text-foreground hover:text-primary transition-colors font-medium font-mono">
                      {portfolioData.personal.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">Location</p>
                    <p className="text-foreground font-medium">
                      {portfolioData.personal.location}
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <FadeIn direction="up" delay={0.3}>
              <Card className="bg-background border-border/50 shadow-lg">
                <CardContent className="p-6 md:p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">Name</label>
                        <Input id="name" name="name" placeholder="John Doe" required className="bg-secondary/50 focus-visible:ring-primary" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">Email</label>
                        <Input id="email" name="email" type="email" placeholder="john@example.com" required className="bg-secondary/50 focus-visible:ring-primary" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                      <Input id="subject" name="subject" placeholder="Project Inquiry" required className="bg-secondary/50 focus-visible:ring-primary" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">Message</label>
                      <Textarea id="message" name="message" placeholder="How can I help you?" rows={5} required className="bg-secondary/50 focus-visible:ring-primary resize-none" />
                    </div>

                    <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto px-8 h-12">
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </Button>

                    {submitStatus === "success" && (
                      <p className="text-sm text-green-500 mt-4 bg-green-500/10 p-3 rounded-md border border-green-500/20">
                        Message sent successfully! I&apos;ll get back to you soon.
                      </p>
                    )}
                    {submitStatus === "error" && (
                      <p className="text-sm text-destructive mt-4 bg-destructive/10 p-3 rounded-md border border-destructive/20">
                        Something went wrong. Please try again or email me directly.
                      </p>
                    )}
                  </form>
                </CardContent>
              </Card>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
