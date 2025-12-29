import PageShell from "../components/PageShell";
import PlaceholderPage from "../components/PlaceholderPage";

export default function AboutRoute() {
  return (
    <PageShell>
      <PlaceholderPage
        title="About"
        description="This is a placeholder for the About page. Share your story, mission, and team details here."
      />
      <div className="bg-background text-foreground font-sans p-6 text-2xl">
  Tailwind is working
</div>
    </PageShell>
  );
}
