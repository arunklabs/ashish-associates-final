import dynamic from "next/dynamic";

const PracticeAreas = dynamic(() => import("@/src/pages/PracticeAreas").then((m) => m.PracticeAreas), {
  ssr: true,
  loading: () => (
    <div className="min-h-[60vh] flex items-center justify-center bg-background">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent" />
    </div>
  ),
});

export default function Page() {
  return <PracticeAreas />;
}
