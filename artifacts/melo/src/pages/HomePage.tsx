import React from "react";
import { Link } from "wouter";
import { SeoHead } from "@/components/seo/SeoHead";
import { MediaUtility } from "@/components/tools/MediaUtility";
import { BLOG_POSTS } from "@/data/blogPosts";
import { TOOLS_DATA } from "@/data/toolsData";
import {
  Sparkles,
  Zap,
  ArrowRight,
  ShieldCheck,
  Film,
  Video,
  Music,
  Minimize2,
  FileCheck,
  CheckCircle2,
  HelpCircle,
  Scissors,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function HomePage() {
  const homeFaqs = [
    {
      q: "What is Melo and what does it do?",
      a: "Melo is a free online media utility platform. It allows you to download permitted direct media files, convert videos between formats like MP4, MOV, and WEBM, extract audio to high-quality MP3/WAV, and compress video file size directly in your browser.",
    },
    {
      q: "Is Melo completely free to use?",
      a: "Yes! Melo provides full access to video downloading, format conversion, audio extraction, and compression with no subscriptions, accounts, or hidden fees.",
    },
    {
      q: "Are my uploaded and downloaded files private?",
      a: "Yes. All uploaded files and processed downloads are stored in temporary, isolated storage and automatically permanently deleted within 60 minutes. We never view, index, or share your media.",
    },
    {
      q: "Which file formats can I convert?",
      a: "Melo supports MP4, MOV, WEBM, MKV, AVI, and FLV for video, as well as MP3, WAV, M4A, OGG, and AAC for audio tracks.",
    },
    {
      q: "Can I use Melo on my mobile phone?",
      a: "Yes, Melo is 100% responsive and optimized for mobile devices, including iPhone (iOS) and Android smartphones and tablets.",
    },
  ];

  const popularTools = [
    { name: "Free Video Downloader", href: "/video-downloader/", desc: "Save direct video files", icon: Video },
    { name: "Online Video Converter", href: "/video-converter/", desc: "Switch video formats", icon: Film },
    { name: "MP4 to MP3 Converter", href: "/mp4-to-mp3/", desc: "Extract pristine audio", icon: Music },
    { name: "MOV to MP4 Converter", href: "/mov-to-mp4/", desc: "Apple video converter", icon: FileCheck },
    { name: "Video Compressor", href: "/video-compressor/", desc: "Shrink file sizes", icon: Minimize2 },
    { name: "WEBM to MP4", href: "/webm-to-mp4/", desc: "Web recordings to MP4", icon: Zap },
  ];

  return (
    <div className="min-h-screen bg-slate-50/40 text-slate-900 flex flex-col font-sans">
      <SeoHead
        title="Free Video Downloader & Online Video Converter | Melo"
        description="Your free online media toolkit. Download permitted videos, convert MP4, MOV, WEBM, and extract MP3 audio in seconds."
        canonicalPath="/"
        faqs={homeFaqs}
      />

      <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 py-10 sm:py-16 flex-1">
        {/* Hero Section */}
        <section className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200/60 mb-4 shadow-xs">
            <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
            Next-Generation Media Utility Platform
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.15]">
            Download, Convert & Optimize Your Media — All in One Place.
          </h1>

          <p className="mt-4 text-slate-600 text-sm sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Your free online media toolkit. Convert videos, extract audio from files you own, change formats, and optimize your media in just a few clicks.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a href="#media-tool">
              <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm h-12 px-7 rounded-xl shadow-md shadow-indigo-600/20">
                <Zap className="h-4 w-4 mr-2" />
                Start Converting
              </Button>
            </a>
            <a href="#all-tools">
              <Button size="lg" variant="outline" className="bg-white border-slate-200 text-slate-700 font-semibold text-sm h-12 px-6 rounded-xl hover:bg-slate-50">
                Explore All Tools
              </Button>
            </a>
          </div>
        </section>

        {/* Centerpiece Media Utility */}
        <section id="media-tool" className="max-w-3xl mx-auto mb-20">
          <MediaUtility
            initialTab="url"
            initialFormat="original"
            customTitle="Melo Universal Media Tool"
            customDescription="Paste a direct media link or upload any audio/video file below to start processing."
          />
        </section>

        {/* Popular Tools Grid */}
        <section id="all-tools" className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Popular Media Tools & Converters
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Select a specialized tool designed specifically for your format requirements
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {popularTools.map((tool) => {
              const Icon = tool.icon;
              return (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-indigo-500/60 hover:shadow-md transition-all group flex items-start gap-4"
                >
                  <div className="h-10 w-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-sm text-slate-900 group-hover:text-indigo-600 transition-colors">
                        {tool.name}
                      </h3>
                      <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all" />
                    </div>
                    <p className="text-xs text-slate-500 mt-1">{tool.desc}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Why Melo Feature Section */}
        <section className="mb-20 bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-12 shadow-xs">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
              Engineered for Simplicity
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3">
              Fast, Private, and Watermark-Free
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Built on modern web technologies to give you desktop-grade conversion power directly inside your browser.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <div className="h-11 w-11 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Zap className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Instant Processing</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Optimized encoding pipelines process media files in seconds, so you never have to wait in slow conversion queues.
              </p>
            </div>

            <div className="space-y-3">
              <div className="h-11 w-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">100% Data Privacy</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Files are isolated in secure temporary memory and automatically erased 60 minutes after generation. Your media stays yours.
              </p>
            </div>

            <div className="space-y-3">
              <div className="h-11 w-11 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center">
                <Globe className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Worldwide Compatibility</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Engineered for users in Kenya, Africa, Europe, the Americas, and Asia with low bandwidth overhead and responsive UI.
              </p>
            </div>
          </div>
        </section>

        {/* Latest Blog & Guides Preview */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                Latest Media Guides & Tutorials
              </h2>
              <p className="text-xs text-slate-500">Expert tips on codecs, audio extraction, and video compression</p>
            </div>
            <Link href="/blog/" className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
              View All Guides <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BLOG_POSTS.slice(0, 3).map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}/`}
                className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs hover:border-slate-300 hover:shadow-sm transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-3">
                    <span className="font-semibold text-indigo-600 uppercase tracking-wider">{post.category}</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-2 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between text-xs text-slate-400">
                  <span>{post.date}</span>
                  <span className="font-semibold text-indigo-600 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                    Read article <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Homepage FAQ Section */}
        <section className="max-w-3xl mx-auto mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center justify-center gap-2">
              <HelpCircle className="h-5 w-5 text-indigo-600" />
              Frequently Asked Questions
            </h2>
            <p className="text-xs text-slate-500 mt-1">Common questions regarding Melo media operations</p>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-2.5">
            {homeFaqs.map((faq, idx) => (
              <AccordionItem
                key={idx}
                value={`faq-${idx}`}
                className="border border-slate-200/90 rounded-2xl px-5 bg-white shadow-xs"
              >
                <AccordionTrigger className="text-xs sm:text-sm font-bold text-slate-800 text-left hover:no-underline py-4">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-xs text-slate-600 leading-relaxed pb-4 pt-1">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </div>
    </div>
  );
}
