"use client";

import { useState } from "react";

export interface FaqItem {
  q: string;
  a: string;
}

export default function Faq({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
              className="group flex w-full items-center gap-4 py-5 text-left"
            >
              <span
                className={`flex-1 text-base transition-colors sm:text-[17px] ${
                  isOpen ? "text-fg" : "text-fg-muted group-hover:text-fg"
                }`}
              >
                {item.q}
              </span>
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-200 ${
                  isOpen
                    ? "rotate-45 border-accent text-accent"
                    : "border-line-strong text-fg-subtle"
                }`}
                aria-hidden
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path
                    d="M5 1v8M1 5h8"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </button>
            {isOpen && (
              <div className="pb-6 pr-11 text-sm leading-relaxed text-fg-subtle">
                {item.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
