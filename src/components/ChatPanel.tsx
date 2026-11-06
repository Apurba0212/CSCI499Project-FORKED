"use client";

import { useEffect, useRef, useState } from "react";
import { buttonClass, inputClass, pillClass } from "@/components/ui";

interface RetrievedFilm {
  title?: string;
  year?: number | string;
  rating?: number;
  pacing?: string;
  pool?: string;
  summary?: string;
  similarity?: number;
}

interface Turn {
  role: "user" | "assistant";
  text: string;
  films?: RetrievedFilm[];
}

const STARTERS = [
  "something cozy for a rainy Sunday",
  "a tense slow-burn that builds dread",
  "a melancholic film about loneliness",
  "an underrated sci-fi that's more thoughtful than action",
];

export default function ChatPanel() {
  const [input, setInput] = useState("");
  const [turns, setTurns] = useState<Turn[]>([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [turns, loading]);

  async function send(text: string) {
    const message = text.trim();
    if (!message || loading) return;
    setInput("");
    setTurns((prev) => [...prev, { role: "user", text: message }]);
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const data = (await res.json()) as { reply?: string; films?: RetrievedFilm[] };
      setTurns((prev) => [
        ...prev,
        {
          role: "assistant",
          text: data.reply ?? "No reply came back. Try sending your message again.",
          films: data.films,
        },
      ]);
    } catch {
      setTurns((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "I couldn’t reach the recommendation service. Check that the chatbot server is running, then send your message again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    send(input);
  }

  return (
    <div className="rounded-xl border border-line bg-surface shadow-[0_8px_40px_-12px_rgb(0_0_0/0.6)]">
      {/* Conversation */}
      <div
        ref={scrollRef}
        role="log"
        aria-live="polite"
        aria-label="Conversation"
        className="max-h-[55vh] overscroll-contain min-h-[220px] space-y-5 overflow-y-auto px-5 py-6 sm:px-6"
      >
        {turns.length === 0 && (
          <div className="py-6 text-center">
            <p className="text-sm text-fg-subtle">
              Ask for a film by mood, pacing or tone.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              {STARTERS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => send(s)}
                  className={pillClass()}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {turns.map((t, i) =>
          t.role === "user" ? (
            <div key={i} className="flex justify-end">
              <div className="max-w-[85%] break-words rounded-2xl rounded-br-sm bg-accent px-4 py-2.5 text-sm text-canvas">
                {t.text}
              </div>
            </div>
          ) : (
            <div key={i} className="flex justify-start">
              <div className="min-w-0 max-w-[90%] space-y-3">
                <div className="whitespace-pre-wrap break-words rounded-2xl rounded-bl-sm border border-line bg-canvas px-4 py-3 text-sm leading-relaxed text-fg">
                  {t.text}
                </div>
                {t.films && t.films.length > 0 && (
                  <div>
                    <p className="mb-2 text-xs font-medium text-fg-subtle">
                      Films retrieved
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {t.films.map((f, j) => (
                        <span
                          key={j}
                          title={f.summary ?? ""}
                          className="rounded-md border border-line-strong/70 bg-surface-2 px-2 py-0.5 text-[11px] leading-5 text-fg-muted"
                        >
                          {f.title}
                          {f.year ? (
                            <span className="text-fg-faint"> · {f.year}</span>
                          ) : null}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ),
        )}

        {loading && (
          <div className="flex justify-start">
            <div className="rounded-2xl rounded-bl-sm border border-line bg-canvas px-4 py-3 text-sm text-fg-subtle">
              Searching the corpus…
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <form
        onSubmit={onSubmit}
        className="flex gap-3 border-t border-line p-4"
      >
        <label htmlFor="chat-input" className="sr-only">
          Message
        </label>
        <input
          id="chat-input"
          name="message"
          autoComplete="off"
          enterKeyHint="send"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="A tense slow-burn that builds dread…"
          className={`${inputClass} flex-1 bg-canvas`}
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className={buttonClass("primary")}
        >
          {loading ? "Sending…" : "Send"}
        </button>
      </form>
    </div>
  );
}
