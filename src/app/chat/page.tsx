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
        eyebrow="Chat"
        title={
          <>
            Talk to <Em>SceneHawk</Em>
          </>
        }
        lead="Describe what you want to feel and get a written recommendation, grounded in films retrieved by mood and plot."
      />

      <ChatPanel />

      <p className="mt-4 text-center text-xs text-fg-faint">
        Recommendations are drawn only from the retrieved candidates — the
        assistant won&apos;t invent films that aren&apos;t in the corpus.
      </p>
    </div>
  );
}
