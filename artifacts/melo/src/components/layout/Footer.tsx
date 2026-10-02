import React from "react";
import { Link } from "wouter";
import { Film, ShieldCheck, Globe, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white text-slate-600 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Column */}
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                <Film className="h-4 w-4" />
              </div>
              <span className="font-extrabold text-lg tracking-tight text-slate-900">Melo</span>
            </div>
            <p className="text-slate-500 leading-relaxed max-w-sm mb-4">
              Melo is an international, high-performance online media utility platform. Convert video and audio formats, download permitted files, and optimize media directly in your browser.
            </p>
            <div className="flex items-center gap-4 text-slate-500">
              <span className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200/50">
                <ShieldCheck className="h-3.5 w-3.5" /> 100% Free & Safe
              </span>
              <span className="flex items-center gap-1.5 text-[11px] font-medium text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">
                <Globe className="h-3.5 w-3.5" /> Global CDN
              </span>
            </div>
          </div>

          {/* Video Tools */}
          <div>
            <h4 className="font-bold text-slate-900 mb-3 text-xs uppercase tracking-wider">Video Tools</h4>
            <ul className="space-y-2 text-slate-600">
              <li><Link href="/video-downloader/" className="hover:text-indigo-600">Video Downloader</Link></li>
              <li><Link href="/free-video-downloader/" className="hover:text-indigo-600">Free Video Downloader</Link></li>
              <li><Link href="/video-converter/" className="hover:text-indigo-600">Video Converter</Link></li>
              <li><Link href="/mp4-converter/" className="hover:text-indigo-600">MP4 Converter</Link></li>
              <li><Link href="/mov-to-mp4/" className="hover:text-indigo-600">MOV to MP4</Link></li>
              <li><Link href="/webm-to-mp4/" className="hover:text-indigo-600">WEBM to MP4</Link></li>
              <li><Link href="/mkv-to-mp4/" className="hover:text-indigo-600">MKV to MP4</Link></li>
            </ul>
          </div>

          {/* Audio & Utilities */}
          <div>
            <h4 className="font-bold text-slate-900 mb-3 text-xs uppercase tracking-wider">Audio & Utilities</h4>
            <ul className="space-y-2 text-slate-600">
              <li><Link href="/mp3-converter/" className="hover:text-indigo-600">MP3 Converter</Link></li>
              <li><Link href="/mp4-to-mp3/" className="hover:text-indigo-600">MP4 to MP3</Link></li>
              <li><Link href="/video-to-mp3/" className="hover:text-indigo-600">Video to MP3</Link></li>
              <li><Link href="/audio-converter/" className="hover:text-indigo-600">Audio Converter</Link></li>
              <li><Link href="/video-compressor/" className="hover:text-indigo-600">Video Compressor</Link></li>
              <li><Link href="/compress-video/" className="hover:text-indigo-600">Compress Video</Link></li>
              <li><Link href="/video-to-gif/" className="hover:text-indigo-600">Video to GIF</Link></li>
            </ul>
          </div>

          {/* Company & Legal */}
          <div>
            <h4 className="font-bold text-slate-900 mb-3 text-xs uppercase tracking-wider">Company & Legal</h4>
            <ul className="space-y-2 text-slate-600">
              <li><Link href="/about/" className="hover:text-indigo-600">About Us</Link></li>
              <li><Link href="/blog/" className="hover:text-indigo-600">Blog & Tutorials</Link></li>
              <li><Link href="/faq/" className="hover:text-indigo-600">Frequently Asked Questions</Link></li>
              <li><Link href="/contact/" className="hover:text-indigo-600">Contact Support</Link></li>
              <li><Link href="/privacy/" className="hover:text-indigo-600">Privacy Policy</Link></li>
              <li><Link href="/terms/" className="hover:text-indigo-600">Terms of Service</Link></li>
              <li><Link href="/copyright/" className="hover:text-indigo-600">Copyright Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Disclaimer & Copyright Bar */}
        <div className="pt-8 border-t border-slate-200/80 text-[11px] text-slate-500 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="max-w-2xl text-center md:text-left">
            Disclaimer: Melo is a utility tool designed exclusively for processing direct, publicly accessible media files that you own or have explicit permission to download and convert. Melo does not bypass access control mechanisms, DRM, or encryption.
          </p>
          <p className="shrink-0 text-center md:text-right">
            © {new Date().getFullYear()} Melo Media Platform. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
