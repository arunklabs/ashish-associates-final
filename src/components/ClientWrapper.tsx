"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import LegalDisclaimerModal from "@/src/components/LegalDisclaimerModal";
import { Toaster as Sonner } from "@/src/components/ui/sonner";
import { Toaster } from "@/src/components/ui/toaster";
import { TooltipProvider } from "@/src/components/ui/tooltip";
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
      const hasSeen = localStorage.getItem("legalDisclaimerSeen");
      
      // Small delay to ensure smooth rendering
      const timer = setTimeout(() => {
        // Only show disclaimer if user hasn't accepted or seen it
        if (!hasAccepted && !hasSeen) {
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
    // Simply close the modal and allow access to the app
    setShowDisclaimer(false);
    
    // Mark that the user has seen the disclaimer (even if declined)
    // This prevents it from showing again during the session
    try {
      localStorage.setItem("legalDisclaimerSeen", "true");
    } catch (error) {
      console.error("Error saving to localStorage:", error);
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