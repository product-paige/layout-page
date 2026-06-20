// Re-mounts on every navigation → gives each route a soft fade-in
// (the smooth page transition, native to client-side nav).
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="lp-page-enter">{children}</div>;
}
