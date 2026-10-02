import React, { useState } from "react";
import { Link } from "wouter";
import { SeoHead } from "@/components/seo/SeoHead";
import { BLOG_POSTS, BlogPost } from "@/data/blogPosts";
import { BookOpen, Search, ArrowRight, Clock, User, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export function BlogIndexPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Guides", "Audio", "Video", "Compression"];

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="min-h-screen bg-slate-50/40 text-slate-900 flex flex-col font-sans">
      <SeoHead
        title="Melo Blog – Video & Audio Conversion Guides, Codecs & Tutorials"
        description="Comprehensive guides on video downloading, audio extraction, format conversion, and media compression. Learn how to work with MP4, MP3, MOV, and WebM."
        canonicalPath="/blog/"
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Blog", url: "/blog/" },
        ]}
      />

      <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 py-12 flex-1">
        {/* Blog Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200/60 mb-3">
            <BookOpen className="h-3.5 w-3.5" />
            Media Engineering & Guides
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Melo Media Resource Center
          </h1>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Practical tutorials, format comparisons, and expert guides to help you get the most out of your digital audio and video files.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="max-w-2xl mx-auto mb-12 flex flex-col sm:flex-row items-center gap-3">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
            <Input
              type="text"
              placeholder="Search tutorials and guides..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-11 bg-white border-slate-200 rounded-xl text-sm"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? "bg-indigo-600 text-white shadow-xs"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}/`}
              className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs hover:border-indigo-400 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                  <Badge variant="outline" className="bg-indigo-50 border-indigo-200 text-indigo-700 font-semibold text-[10px]">
                    {post.category}
                  </Badge>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {post.readTime}
                  </span>
                </div>

                <h2 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2 leading-snug">
                  {post.title}
                </h2>

                <p className="text-xs text-slate-500 mt-2.5 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 mt-6 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1 text-[11px]">
                  <User className="h-3 w-3" />
                  {post.author}
                </span>
                <span className="font-semibold text-indigo-600 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                  Read article <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-16 bg-white border border-dashed border-slate-200 rounded-2xl max-w-md mx-auto">
            <BookOpen className="h-8 w-8 text-slate-300 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-700">No articles matched your search</p>
            <p className="text-xs text-slate-400 mt-1">Try searching for keywords like "MP3", "MOV", or "compress".</p>
          </div>
        )}
      </div>
    </div>
  );
}
