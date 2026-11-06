import ChatPanel from "@/components/ChatPanel";
import { Em, PageHeader } from "@/components/ui";

export const metadata = { title: "Chat" };

// Conversational recommendation, backed by the Python chatbot sidecar
// (retrieval over the ~995-film Chroma corpus + an LLM-written answer).
// Distinct from /search, which runs the four in-app comparison pipelines
// over the curated 29-film corpus.
export default function ChatPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader
        center
        title={
          <>
            Film recommendations by <Em>chat</Em>
          </>
        }
        lead="Describe what you want to watch and get a written recommendation, based on films retrieved by mood and plot from a set of about 1,000."
      />

      <ChatPanel />

      <p className="mt-4 text-center text-xs text-fg-faint">
        The assistant only recommends films it retrieved, so it won&apos;t
        suggest titles that aren&apos;t in the set.
      </p>
    </div>
  );
}
