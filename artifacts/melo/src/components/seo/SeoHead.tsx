import { useEffect } from "react";

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface FaqItem {
  q: string;
  a: string;
}

interface SeoHeadProps {
  title: string;
  description: string;
  canonicalPath?: string;
  ogType?: "website" | "article";
  breadcrumbs?: BreadcrumbItem[];
  faqs?: FaqItem[];
  article?: {
    publishedTime: string;
    author: string;
  };
}

export function SeoHead({
  title,
  description,
  canonicalPath = "/",
  ogType = "website",
  breadcrumbs = [],
  faqs = [],
  article,
}: SeoHeadProps) {
  useEffect(() => {
    // 1. Update Title
    document.title = title;

    // 2. Helper to set or update meta tag
    const setMeta = (name: string, content: string, isProperty = false) => {
      let el = document.querySelector(
        isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`
      );
      if (!el) {
        el = document.createElement("meta");
        if (isProperty) {
          el.setAttribute("property", name);
        } else {
          el.setAttribute("name", name);
        }
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("description", description);
    setMeta("og:title", title, true);
    setMeta("og:description", description, true);
    setMeta("og:type", ogType, true);
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);

    // 3. Update Canonical Link
    const origin = window.location.origin;
    const fullCanonical = `${origin}${canonicalPath.startsWith("/") ? canonicalPath : `/${canonicalPath}`}`;
    setMeta("og:url", fullCanonical, true);

    let canonicalEl = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalEl) {
      canonicalEl = document.createElement("link");
      canonicalEl.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute("href", fullCanonical);

    // 4. Update Schema.org JSON-LD scripts
    const scriptId = "melo-structured-data";
    let scriptEl = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!scriptEl) {
      scriptEl = document.createElement("script");
      scriptEl.id = scriptId;
      scriptEl.type = "application/ld+json";
      document.head.appendChild(scriptEl);
    }

    const schemas: any[] = [
      {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Melo Media Downloader & Converter",
        url: origin,
        applicationCategory: "MultimediaApplication",
        operatingSystem: "All",
        description:
          "Free online video downloader and media format converter for permitted files.",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
      },
    ];

    if (breadcrumbs.length > 0) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbs.map((crumb, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: crumb.name,
          item: `${origin}${crumb.url}`,
        })),
      });
    }

    if (faqs.length > 0) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: f.a,
          },
        })),
      });
    }

    if (ogType === "article" && article) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title,
        description: description,
        author: {
          "@type": "Organization",
          name: article.author || "Melo",
        },
        datePublished: article.publishedTime,
      });
    }

    scriptEl.textContent = JSON.stringify(schemas);
  }, [title, description, canonicalPath, ogType, breadcrumbs, faqs, article]);

  return null;
}
