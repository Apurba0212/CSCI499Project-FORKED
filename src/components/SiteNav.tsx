"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { buttonClass } from "@/components/ui";

const NAV = [
  { label: "Discover", href: "/search" },
  { label: "Chat", href: "/chat" },
  { label: "Analysis", href: "/catalog" },
  { label: "Collections", href: "/collections" },
];

export default function SiteNav() {
  const path = usePathname();
  const isActive = (href: string) =>
    path === href || path.startsWith(`${href}/`);

  return (
    <nav
      aria-label="Main"
      className="-mx-3 flex items-center gap-1 overflow-x-auto text-sm sm:mx-0"
    >
      {NAV.map((n) => (
        <Link
          key={n.href}
          href={n.href}
          aria-current={isActive(n.href) ? "page" : undefined}
          className={`shrink-0 rounded-md px-3 py-1.5 transition-colors ${
            isActive(n.href)
              ? "bg-surface-2 text-fg"
              : "text-fg-subtle hover:text-fg"
          }`}
        >
          {n.label}
        </Link>
      ))}
      {path !== "/search" && (
        <span className="ml-2 hidden md:block">
          <Link
            href="/search"
            className={`${buttonClass("primary")} !px-4 !py-1.5`}
          >
            Start searching
          </Link>
        </span>
      )}
    </nav>
  );
}
