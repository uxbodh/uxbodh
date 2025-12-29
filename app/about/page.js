import PageShell from "../components/PageShell";
import PlaceholderPage from "../components/PlaceholderPage";

export default function AboutRoute() {
  return (
    <PageShell>
      <PlaceholderPage
        title="About"
        description="This is a placeholder for the About page. Share your story, mission, and team details here."
      />
    </PageShell>
  );
}
