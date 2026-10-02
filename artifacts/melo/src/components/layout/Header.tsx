import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import {
  Film,
  Menu,
  X,
  Video,
  Music,
  Zap,
  BookOpen,
  HelpCircle,
  Info,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Video Downloader", href: "/video-downloader/" },
    { label: "Video Converter", href: "/video-converter/" },
    { label: "MP3 Converter", href: "/mp3-converter/" },
    { label: "Audio Converter", href: "/audio-converter/" },
    { label: "Compressor", href: "/video-compressor/" },
    { label: "Blog", href: "/blog/" },
    { label: "FAQ", href: "/faq/" },
    { label: "About", href: "/about/" },
  ];

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className="border-b border-slate-200/80 bg-white/95 backdrop-blur-md sticky top-0 z-50 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" onClick={closeMenu} className="flex items-center gap-3 group">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-700 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/20 group-hover:scale-105 transition-transform">
            <Film className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl tracking-tight text-slate-900">Melo</span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200/60">
                Media
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">Media made simple</p>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((item) => {
            const isActive = location === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  isActive
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA Action */}
        <div className="hidden sm:flex items-center gap-3">
          <Link href="/video-downloader/">
            <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-xs px-4 h-9">
              <Zap className="h-3.5 w-3.5 mr-1.5 text-indigo-200" />
              Start Converting
            </Button>
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex lg:hidden items-center gap-2">
          <Link href="/video-downloader/" onClick={closeMenu}>
            <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs px-3 h-8">
              Convert
            </Button>
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 focus:outline-hidden"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200/90 bg-white px-4 pt-3 pb-6 space-y-1 shadow-lg animate-in slide-in-from-top-2">
          <div className="grid grid-cols-2 gap-1 pb-3 mb-2 border-b border-slate-100">
            <Link
              href="/video-downloader/"
              onClick={closeMenu}
              className="flex items-center gap-2 p-2.5 rounded-lg text-xs font-semibold text-indigo-700 bg-indigo-50/70"
            >
              <Video className="h-4 w-4" /> Video Downloader
            </Link>
            <Link
              href="/mp3-converter/"
              onClick={closeMenu}
              className="flex items-center gap-2 p-2.5 rounded-lg text-xs font-semibold text-violet-700 bg-violet-50/70"
            >
              <Music className="h-4 w-4" /> MP3 Converter
            </Link>
          </div>
          {navLinks.map((item) => {
            const isActive = location === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className={`block px-3 py-2 rounded-md text-sm font-medium ${
                  isActive
                    ? "bg-indigo-50 text-indigo-700 font-semibold"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
