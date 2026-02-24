"use client";

import { PracticeAreaDetail } from "@/src/pages/PracticeAreas";
import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams();
  const slug = params?.slug as string; // Add optional chaining and type assertion

  if (!slug) {
    return null; // or a loading state
  }

  return <PracticeAreaDetail slug={slug} />;
}