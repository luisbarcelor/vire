import { GlossaryView } from "@/components/GlossaryView";
import { loadGlossaryTerms } from "@/lib/glossary-loader";

export default function GlossaryPage() {
  const terms = loadGlossaryTerms();
  return <GlossaryView terms={terms} />;
}
