"use client";

import { usePathname } from "next/navigation";
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
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Scroll to top (only when accepted so we have a DOM to scroll)
  useEffect(() => {
    if (accepted) window.scrollTo(0, 0);
  }, [pathname, accepted]);

  // Access gate: only from localStorage on load or from handleAccept
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hasAccepted = localStorage.getItem("legalDisclaimerAccepted") === "true";
      const timer = setTimeout(() => {
        if (hasAccepted) {
          setAccepted(true);
        } else {
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
      setAccepted(true);
      setShowDisclaimer(false);
    } catch (error) {
      if (process.env.NODE_ENV === 'development') console.error("Error saving to localStorage:", error);
      setAccepted(true);
      setShowDisclaimer(false);
    }
  };

  const handleDecline = () => {
    try {
      if (window.history.length > 1) {
        window.history.back();
      } else {
        window.location.href = "https://www.google.com";
      }
    } catch {
      window.location.href = "https://www.google.com";
    }
  };

  if (isLoading) {
    return null;
  }

  // Not accepted: show only modal; do not render app content
  if (!accepted) {
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
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <LegalDisclaimerModal
          isOpen={false}
          onAccept={handleAccept}
          onDecline={handleDecline}
        />
        {children}
      </TooltipProvider>
    </QueryClientProvider>
  );
}