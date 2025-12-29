import PageShell from "../components/PageShell";
import PlaceholderPage from "../components/PlaceholderPage";

export default function BlogRoute() {
  return (
    <PageShell>
      <PlaceholderPage
        title="Blog"
        description="This is a placeholder for the Blog page. Add your articles, news, and insights here."
      />
    </PageShell>
  );
}
