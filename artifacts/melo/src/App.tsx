import { type ReactNode, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "@/components/error-boundary";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from "wouter";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HomePage } from "@/pages/HomePage";
import { BlogIndexPage } from "@/pages/BlogIndexPage";
import { BlogPostPage } from "@/pages/BlogPostPage";
import {
  AboutPage,
  FaqPage,
  ContactPage,
  PrivacyPage,
  TermsPage,
  CopyrightPage,
} from "@/pages/StaticPages";
import { ToolLandingPage } from "@/components/tools/ToolLandingPage";
import { TOOLS_DATA } from "@/data/toolsData";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

// Scroll to top on route change
function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return null;
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function AppContent() {
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <Header />
      <main className="flex-1">
        <RoutedErrorBoundary>
          <Switch>
            {/* Homepage */}
            <Route path="/" component={HomePage} />

            {/* Keyword-Targeted Tool Landing Pages */}
            {Object.entries(TOOLS_DATA).map(([slug, tool]) => {
              // Strip trailing slash for flexible route matching
              const pathWithoutSlash = slug.replace(/\/$/, "");
              return (
                <Route key={slug} path={new RegExp(`^${pathWithoutSlash}/?$`)}>
                  {() => <ToolLandingPage tool={tool} />}
                </Route>
              );
            })}

            {/* Blog Pages */}
            <Route path="/blog/" component={BlogIndexPage} />
            <Route path="/blog" component={BlogIndexPage} />
            <Route path="/blog/:slug/" component={BlogPostPage} />
            <Route path="/blog/:slug" component={BlogPostPage} />

            {/* Company & Legal Pages */}
            <Route path="/about/" component={AboutPage} />
            <Route path="/about" component={AboutPage} />
            <Route path="/faq/" component={FaqPage} />
            <Route path="/faq" component={FaqPage} />
            <Route path="/contact/" component={ContactPage} />
            <Route path="/contact" component={ContactPage} />
            <Route path="/privacy/" component={PrivacyPage} />
            <Route path="/privacy" component={PrivacyPage} />
            <Route path="/terms/" component={TermsPage} />
            <Route path="/terms" component={TermsPage} />
            <Route path="/copyright/" component={CopyrightPage} />
            <Route path="/copyright" component={CopyrightPage} />

            {/* Fallback 404 */}
            <Route component={NotFound} />
          </Switch>
        </RoutedErrorBoundary>
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <AppContent />
        </WouterRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
