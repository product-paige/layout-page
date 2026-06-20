import Link from "next/link";

export type Crumb = { label: string; href?: string };

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="lp-crumbs">
      {items.map((it, i) => {
        const last = i === items.length - 1;
        return (
          <span key={i} className="lp-crumbs-item">
            {it.href && !last ? (
              <Link href={it.href} className="lp-crumb">
                {it.label}
              </Link>
            ) : (
              <span
                className={"lp-crumb" + (last ? " lp-crumb-current" : "")}
                aria-current={last ? "page" : undefined}
              >
                {it.label}
              </span>
            )}
            {!last && (
              <span className="lp-crumb-sep" aria-hidden="true">
                /
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
