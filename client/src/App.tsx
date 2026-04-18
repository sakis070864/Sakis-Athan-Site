import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { useEffect } from "react";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";

// SEO constants — single source of truth for title & description
const SEO_TITLE = "Sakis Athan | AI Orchestrator & Developer"; // 41 chars
const SEO_DESCRIPTION =
  "Custom AI solutions for every business — logistics automation, real estate dashboards, Excel automation & full-stack apps. Available worldwide."; // 143 chars

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Ensure document.title and meta description are set correctly at runtime
  // so SEO crawlers and audit tools always read the intended values.
  useEffect(() => {
    document.title = SEO_TITLE;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", SEO_DESCRIPTION);
  }, []);

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark" switchable={true}>
        <TooltipProvider>
          <Toaster richColors position="top-right" />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
