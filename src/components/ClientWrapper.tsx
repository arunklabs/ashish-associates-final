"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { Toaster } from "@/src/components/ui/toaster";
import { Toaster as Sonner } from "@/src/components/ui/sonner";
import { TooltipProvider } from "@/src/components/ui/tooltip";
import LegalDisclaimerModal from "@/src/components/LegalDisclaimerModal";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Disclaimer logic - runs once on mount
  useEffect(() => {
    // Check if running in browser
    if (typeof window !== 'undefined') {
      const hasAccepted = localStorage.getItem("legalDisclaimerAccepted");
      
      // Small delay to ensure smooth rendering
      const timer = setTimeout(() => {
        if (!hasAccepted) {
          setShowDisclaimer(true);
        }
        setIsLoading(false);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem("legalDisclaimerAccepted", "true");
      setShowDisclaimer(false);
    } catch (error) {
      console.error("Error saving to localStorage:", error);
      // Even if localStorage fails, allow access
      setShowDisclaimer(false);
    }
  };

  const handleDecline = () => {
    setShowDisclaimer(false);
    
    // Try multiple methods to leave the site
    try {
      // Method 1: Try to go back in history
      if (window.history.length > 1) {
        window.history.back();
      } else {
        // Method 2: If no history, redirect to a safe page (Google or blank)
        window.location.href = "https://www.google.com";
      }
    } catch (error) {
      // Method 3: Fallback - redirect to Google
      window.location.href = "https://www.google.com";
    }
  };

  // Don't render anything while checking localStorage
  if (isLoading) {
    return null; // or a loading spinner if you prefer
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        <LegalDisclaimerModal
          isOpen={showDisclaimer}
          onAccept={handleAccept}
          onDecline={handleDecline}
        />

        {children}
      </TooltipProvider>
    </QueryClientProvider>
  );
}