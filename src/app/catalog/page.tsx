import { Card, Em, PageHeader, Tag } from "@/components/ui";
import { getFilmRepository } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata = { title: "Analysis Index" };

// The corpus as an index — every film's analytical profile at a glance.
// This is what makes SceneHawk different from a metadata catalog:
// each entry is really five short essays + structured attributes.
export default async function CatalogPage() {
  const films = await getFilmRepository().listFilms();

  return (
    <div>
      <PageHeader
        eyebrow="Analysis"
        title={
          <>
            The corpus, <Em>analyzed.</Em>
          </>
        }
        lead={`${films.length} films — each with structured attributes and five analytical dimensions (themes, atmosphere, narrative, visual language, inner lives). Deliberately small but deep.`}
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {films.map((f) => (
          <Card key={f.id} href={`/film/${f.id}`} className="flex flex-col p-5">
            <div className="flex items-start justify-between gap-3">
              <p className="font-display text-lg font-semibold leading-snug transition-colors group-hover:text-accent">
                {f.metadata.title}
              </p>
              <span className="shrink-0 pt-1 text-xs tabular-nums text-fg-faint">
                {f.metadata.year}
              </span>
            </div>
            <p className="mt-1 text-xs text-fg-subtle">{f.metadata.director}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {f.atmosphere.slice(0, 3).map((a) => (
                <Tag key={a}>{a}</Tag>
              ))}
            </div>
            <p className="mt-auto pt-4 text-[10px] uppercase tracking-wider text-fg-faint">
              {f.metadata.popularity} · {f.narrative.pacing}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
}
