import React from "react";
import { Link, useRoute } from "wouter";
import { SeoHead } from "@/components/seo/SeoHead";
import { BLOG_POSTS } from "@/data/blogPosts";
import { TOOLS_DATA } from "@/data/toolsData";
import { ChevronRight, ArrowLeft, Clock, Calendar, User, Zap, ArrowRight, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function BlogPostPage() {
  const [, params] = useRoute("/blog/:slug/");
  const slug = params?.slug;

  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Article Not Found</h1>
          <p className="text-xs text-slate-500 mt-2">The requested guide could not be located.</p>
          <Link href="/blog/">
            <Button className="mt-4 bg-indigo-600 text-white text-xs">Return to Blog</Button>
          </Link>
        </div>
      </div>
    );
  }

  const tool = TOOLS_DATA[post.relatedTool];

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog/" },
    { name: post.title, url: `/blog/${post.slug}/` },
  ];

  return (
    <div className="min-h-screen bg-slate-50/40 text-slate-900 flex flex-col font-sans">
      <SeoHead
        title={`${post.title} | Melo Guide`}
        description={post.excerpt}
        canonicalPath={`/blog/${post.slug}/`}
        ogType="article"
        breadcrumbs={breadcrumbs}
        article={{
          publishedTime: "2026-10-01T00:00:00Z",
          author: post.author,
        }}
      />

      <article className="max-w-4xl w-full mx-auto px-4 sm:px-6 py-10 flex-1">
        {/* Navigation Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-400 mb-6 font-medium">
          <Link href="/" className="hover:text-indigo-600">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/blog/" className="hover:text-indigo-600">Blog</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-slate-800 font-semibold truncate max-w-xs">{post.title}</span>
        </nav>

        {/* Article Header */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 mb-8 shadow-xs">
          <div className="flex items-center gap-3 text-xs text-indigo-700 font-bold mb-3">
            <span className="bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200/60">
              {post.category}
            </span>
            <span className="text-slate-400">•</span>
            <span className="flex items-center gap-1 text-slate-500 font-normal">
              <Clock className="h-3.5 w-3.5" />
              {post.readTime}
            </span>
            <span className="text-slate-400">•</span>
            <span className="flex items-center gap-1 text-slate-500 font-normal">
              <Calendar className="h-3.5 w-3.5" />
              {post.date}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {post.title}
          </h1>

          <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed border-l-2 border-indigo-500 pl-4">
            {post.excerpt}
          </p>

          <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">
                M
              </div>
              <span className="font-semibold text-slate-800">{post.author}</span>
            </div>
            <Link href="/blog/" className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-700 font-semibold">
              <ArrowLeft className="h-3.5 w-3.5" /> Back to All Articles
            </Link>
          </div>
        </div>

        {/* Article Body */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 mb-8 shadow-xs space-y-8 leading-relaxed text-sm sm:text-base text-slate-700">
          {post.content.map((sec, idx) => (
            <section key={idx} className="space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                {sec.h2}
              </h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                {sec.text}
              </p>
            </section>
          ))}
        </div>

        {/* Related Tool CTA */}
        {tool && (
          <div className="bg-gradient-to-br from-indigo-50 via-white to-violet-50 border border-indigo-200/70 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-700 uppercase tracking-wider mb-1">
                <Zap className="h-3.5 w-3.5" /> Try The Corresponding Tool
              </div>
              <h3 className="text-lg font-bold text-slate-900">{tool.h1}</h3>
              <p className="text-xs text-slate-600 mt-1 max-w-lg">
                {tool.metaDescription}
              </p>
            </div>
            <Link href={tool.slug}>
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs h-10 px-5 rounded-xl shadow-xs shrink-0">
                Open {tool.h1} <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
              </Button>
            </Link>
          </div>
        )}
      </article>
    </div>
  );
}
