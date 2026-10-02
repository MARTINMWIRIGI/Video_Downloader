import React, { useState } from "react";
import { Link } from "wouter";
import { SeoHead } from "@/components/seo/SeoHead";
import {
  ShieldCheck,
  HelpCircle,
  Mail,
  FileText,
  Info,
  CheckCircle2,
  AlertCircle,
  Send,
  Lock,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50/40 text-slate-900 flex flex-col font-sans">
      <SeoHead
        title="About Melo – Our Mission, Technology & Architecture"
        description="Learn about Melo, the modern media utility platform built for high-speed file conversion, audio extraction, and safe downloading worldwide."
        canonicalPath="/about/"
      />
      <div className="max-w-4xl w-full mx-auto px-4 sm:px-6 py-12 flex-1">
        <div className="bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-12 shadow-xs space-y-8">
          <div>
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider bg-indigo-50 px-3 py-1 rounded-full">
              About Us
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3 tracking-tight">
              Media Made Simple for Everyone
            </h1>
            <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
              Melo was engineered with a single goal: to make audio and video conversion, compression, and downloading as fast, clean, and accessible as possible.
            </p>
          </div>

          <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
            <h2 className="text-lg font-bold text-slate-900">Our Core Principles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <h3 className="font-bold text-slate-900 text-sm mb-1">Zero Clutter & Ads</h3>
                <p className="text-xs text-slate-500">
                  Unlike traditional conversion websites crowded with intrusive popups and misleading buttons, Melo provides an uncluttered, distraction-free environment.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <h3 className="font-bold text-slate-900 text-sm mb-1">Guaranteed Privacy</h3>
                <p className="text-xs text-slate-500">
                  We treat user privacy as paramount. Processed files are temporarily staged in isolated memory and automatically purged after 60 minutes.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <h3 className="font-bold text-slate-900 text-sm mb-1">International Accessibility</h3>
                <p className="text-xs text-slate-500">
                  Optimized for reliable usage across Africa, Europe, Asia, and the Americas, including low-bandwidth and mobile connections.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <h3 className="font-bold text-slate-900 text-sm mb-1">Strict Legal Standards</h3>
                <p className="text-xs text-slate-500">
                  We empower users to process files they own or have permitted rights to. We strictly prohibit unauthorized content harvesting or DRM tampering.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FaqPage() {
  const allFaqs = [
    {
      q: "Is Melo really free? Are there any hidden subscription charges?",
      a: "Melo is 100% free with no subscriptions, trials, or hidden fees. You can download and convert permitted media files freely.",
    },
    {
      q: "What video and audio formats are supported?",
      a: "We support MP4, MOV, WEBM, MKV, AVI, and FLV for video inputs and outputs, as well as MP3, WAV, M4A, OGG, and AAC for audio tracks.",
    },
    {
      q: "What is the maximum upload file size?",
      a: "Currently, Melo supports media files up to 100MB per conversion job.",
    },
    {
      q: "Do you store copies of my downloaded or converted files?",
      a: "No. Files are held in temporary server memory exclusively while you download them, and are completely purged after 60 minutes.",
    },
    {
      q: "Does Melo add watermarks to videos?",
      a: "Never. All converted videos and extracted audio tracks remain 100% clean and free of watermarks or branding.",
    },
    {
      q: "Can I download videos from YouTube, TikTok, or Instagram?",
      a: "No. Melo strictly supports permitted direct media files where you have explicit rights. We do not bypass access controls, DRM, or terms of third-party streaming platforms.",
    },
    {
      q: "Can I use Melo on an iPhone or Android phone?",
      a: "Yes! Melo works smoothly in mobile browsers such as Safari and Chrome without needing to install external apps.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50/40 text-slate-900 flex flex-col font-sans">
      <SeoHead
        title="Frequently Asked Questions (FAQ) | Melo"
        description="Got questions about Melo? Find answers about video downloading, supported audio formats, conversion speeds, and privacy policies."
        canonicalPath="/faq/"
        faqs={allFaqs}
      />
      <div className="max-w-3xl w-full mx-auto px-4 sm:px-6 py-12 flex-1">
        <div className="text-center mb-10">
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider bg-indigo-50 px-3 py-1 rounded-full">
            Help Center
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3 tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-slate-600 text-sm mt-2">
            Clear answers to common questions about using Melo
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-3">
          {allFaqs.map((faq, idx) => (
            <AccordionItem
              key={idx}
              value={`item-${idx}`}
              className="border border-slate-200/90 rounded-2xl px-5 bg-white shadow-xs"
            >
              <AccordionTrigger className="text-sm font-bold text-slate-900 hover:no-underline py-4">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-xs sm:text-sm text-slate-600 leading-relaxed pb-4 pt-1">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50/40 text-slate-900 flex flex-col font-sans">
      <SeoHead
        title="Contact Us – Melo Media Support & Feedback"
        description="Reach out to the Melo engineering team with feedback, technical inquiries, or feature suggestions."
        canonicalPath="/contact/"
      />
      <div className="max-w-2xl w-full mx-auto px-4 sm:px-6 py-12 flex-1">
        <div className="bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-10 shadow-xs">
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider bg-indigo-50 px-3 py-1 rounded-full">
            Support & Inquiries
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-3">
            Contact the Melo Team
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Have questions, feedback, or need assistance? Fill out the form below.
          </p>

          {submitted ? (
            <div className="mt-8 p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
              <CheckCircle2 className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
              <h2 className="font-bold text-slate-900 text-sm">Message Sent Successfully</h2>
              <p className="text-xs text-slate-600 mt-1">Thank you for your message. We will review your inquiry shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="contact-name" className="text-xs font-semibold">Your Name</Label>
                <Input id="contact-name" required placeholder="John Doe" className="h-10 rounded-xl" />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="contact-email" className="text-xs font-semibold">Email Address</Label>
                <Input id="contact-email" type="email" required placeholder="you@example.com" className="h-10 rounded-xl" />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="contact-message" className="text-xs font-semibold">Message</Label>
                <Textarea id="contact-message" required placeholder="How can we help you today?" rows={4} className="rounded-xl resize-none text-sm" />
              </div>

              <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold h-11 rounded-xl shadow-xs">
                <Send className="h-4 w-4 mr-2" /> Send Message
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-50/40 text-slate-900 flex flex-col font-sans">
      <SeoHead
        title="Privacy Policy – File Retention & Data Protection | Melo"
        description="Review Melo's privacy policy, our commitment to zero tracking, and our strict 60-minute automatic file deletion policy."
        canonicalPath="/privacy/"
      />
      <div className="max-w-4xl w-full mx-auto px-4 sm:px-6 py-12 flex-1">
        <div className="bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-12 shadow-xs space-y-6 text-sm text-slate-600 leading-relaxed">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Privacy Policy & File Retention
            </h1>
            <p className="text-xs text-slate-400 mt-1">Effective Date: October 2026</p>
          </div>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">1. Temporary File Storage</h2>
            <p>
              When you upload a file or submit a direct media link to Melo, the file is placed in an isolated temporary directory purely to carry out the requested format conversion or download. We automatically and permanently delete all uploaded files and converted media within 60 minutes of creation.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">2. No Account or Personal Data Collection</h2>
            <p>
              You do not need to register, create an account, or provide personal information to use Melo. We do not maintain user profiles, track personal download histories, or sell any data to third parties.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">3. Encryption & Transmission Security</h2>
            <p>
              All interactions with Melo are protected by Transport Layer Security (TLS 1.3), ensuring that your uploads, downloads, and web communications remain confidential and encrypted during transit.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50/40 text-slate-900 flex flex-col font-sans">
      <SeoHead
        title="Terms of Service | Melo Media Platform"
        description="Terms of service and acceptable use agreement governing access to Melo's media conversion and downloading tools."
        canonicalPath="/terms/"
      />
      <div className="max-w-4xl w-full mx-auto px-4 sm:px-6 py-12 flex-1">
        <div className="bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-12 shadow-xs space-y-6 text-sm text-slate-600 leading-relaxed">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Terms of Service
            </h1>
            <p className="text-xs text-slate-400 mt-1">Last Updated: October 2026</p>
          </div>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">1. Acceptance of Terms</h2>
            <p>
              By accessing and using Melo, you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, please do not use the platform.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">2. Permitted Use</h2>
            <p>
              Melo is intended solely for personal, non-commercial use to convert or download media that you own, create, or have explicit legal rights or license to process.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">3. Prohibited Activities</h2>
            <p>
              Users may not utilize Melo to bypass access controls, DRM systems, or platform terms of service. Automated scraping, malicious payload injection, and denial of service attacks are strictly forbidden.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export function CopyrightPage() {
  return (
    <div className="min-h-screen bg-slate-50/40 text-slate-900 flex flex-col font-sans">
      <SeoHead
        title="Copyright & Acceptable Use Policy | Melo"
        description="Melo's copyright guidelines, DMCA notice policy, and acceptable use guidelines for audio and video media."
        canonicalPath="/copyright/"
      />
      <div className="max-w-4xl w-full mx-auto px-4 sm:px-6 py-12 flex-1">
        <div className="bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-12 shadow-xs space-y-6 text-sm text-slate-600 leading-relaxed">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Copyright & Acceptable Use Policy
            </h1>
            <p className="text-xs text-slate-400 mt-1">Melo Intellectual Property & Compliance</p>
          </div>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">Respect for Intellectual Property</h2>
            <p>
              Melo strongly supports and respects the intellectual property rights of creators, musicians, filmmakers, and digital artists. Our tools are designed for legal format shifting and personal media management.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">DMCA Notice & Takedown</h2>
            <p>
              Because Melo does not maintain a public library or permanent hosting of uploaded content, user files expire automatically after 60 minutes. However, if you believe our service is being misused in a way that infringes your copyrights, please contact our agent via the Contact page with detailed verification.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
