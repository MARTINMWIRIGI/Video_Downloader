import React from "react";
import { Link } from "wouter";
import { ToolDefinition, TOOLS_DATA } from "@/data/toolsData";
import { SeoHead } from "@/components/seo/SeoHead";
import { MediaUtility } from "./MediaUtility";
import {
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Zap,
  HelpCircle,
  ArrowRight,
  FileCheck,
  Layers,
  Sparkles,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

interface ToolLandingPageProps {
  tool: ToolDefinition;
}

export function ToolLandingPage({ tool }: ToolLandingPageProps) {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: tool.h1, url: tool.slug },
  ];

  const relatedTools = tool.relatedSlugs
    .map((slug) => TOOLS_DATA[slug])
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-slate-50/40 text-slate-900 flex flex-col font-sans">
      <SeoHead
        title={tool.title}
        description={tool.metaDescription}
        canonicalPath={tool.slug}
        breadcrumbs={breadcrumbs}
        faqs={tool.faqs}
      />

      <div className="max-w-5xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12 flex-1">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-400 mb-6 font-medium">
          <Link href="/" className="hover:text-indigo-600 transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-slate-800 font-semibold">{tool.h1}</span>
        </nav>

        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200/50 mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            {tool.badge}
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 sm:leading-tight">
            {tool.h1}
          </h1>
          <p className="mt-3.5 text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            {tool.intro}
          </p>
        </div>

        {/* Interactive Tool Area */}
        <div className="max-w-3xl mx-auto mb-16">
          <MediaUtility
            initialTab={tool.defaultMode}
            initialFormat={tool.defaultFormat}
            customTitle={tool.h1}
            customDescription={tool.metaDescription}
          />
        </div>

        {/* Step-by-Step Instructions */}
        <section className="mb-16 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              How to Use {tool.h1}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Simple 3-step workflow to get your media processed in seconds
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tool.howToSteps.map((step, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs relative"
              >
                <div className="h-8 w-8 rounded-lg bg-indigo-100 text-indigo-700 font-bold text-sm flex items-center justify-center mb-4">
                  0{idx + 1}
                </div>
                <h3 className="font-bold text-slate-900 text-sm mb-1.5">{step.step}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Formats Matrix */}
        <section className="mb-16 max-w-4xl mx-auto bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs">
          <div className="flex items-center gap-2 mb-6">
            <Layers className="h-5 w-5 text-indigo-600" />
            <h2 className="text-lg font-bold text-slate-900">Supported Media Formats & Specifications</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                Supported Input Types
              </span>
              <div className="flex flex-wrap gap-1.5">
                {tool.supportedInputs.map((input, idx) => (
                  <Badge key={idx} variant="outline" className="bg-white border-slate-200 text-slate-700 font-medium">
                    {input}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-indigo-50/50 border border-indigo-100/60">
              <span className="text-xs font-bold text-indigo-900 uppercase tracking-wider block mb-2">
                Target Output Formats
              </span>
              <div className="flex flex-wrap gap-1.5">
                {tool.supportedOutputs.map((output, idx) => (
                  <Badge key={idx} variant="outline" className="bg-white border-indigo-200 text-indigo-700 font-medium">
                    {output}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Feature Highlights */}
        <section className="mb-16 max-w-4xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 text-center mb-8">
            Why Choose Melo for Your Media Needs
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {tool.features.map((feat, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-white border border-slate-200/90">
                <div className="h-8 w-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">{feat.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{feat.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQs */}
        {tool.faqs.length > 0 && (
          <section className="mb-16 max-w-3xl mx-auto">
            <div className="text-center mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center justify-center gap-2">
                <HelpCircle className="h-5 w-5 text-indigo-600" />
                Frequently Asked Questions
              </h2>
              <p className="text-xs text-slate-500 mt-1">Everything you need to know about {tool.h1}</p>
            </div>

            <Accordion type="single" collapsible className="w-full space-y-2">
              {tool.faqs.map((faq, idx) => (
                <AccordionItem
                  key={idx}
                  value={`item-${idx}`}
                  className="border border-slate-200/90 rounded-xl px-4 bg-white"
                >
                  <AccordionTrigger className="text-xs sm:text-sm font-bold text-slate-800 text-left hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-xs text-slate-600 leading-relaxed pt-1 pb-4">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        )}

        {/* Related Tools Internal Linking */}
        {relatedTools.length > 0 && (
          <section className="border-t border-slate-200/80 pt-10 max-w-4xl mx-auto">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4 text-center">
              Explore Related Media Utilities
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedTools.map((rel) => (
                <Link
                  key={rel.slug}
                  href={rel.slug}
                  className="p-4 rounded-xl border border-slate-200 bg-white hover:border-indigo-400 hover:shadow-xs transition-all group"
                >
                  <div className="font-bold text-xs text-slate-900 group-hover:text-indigo-600 transition-colors flex items-center justify-between">
                    <span>{rel.h1}</span>
                    <ArrowRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                    {rel.metaDescription}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
