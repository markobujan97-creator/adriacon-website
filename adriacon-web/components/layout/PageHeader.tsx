import { RopeLine } from '@/components/ui/RopeLine';

export function PageHeader({
  label,
  title,
  lead,
}: {
  label: string;
  title: string;
  lead?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-shell">
      <RopeLine tone="shell" className="absolute inset-x-0 bottom-0 opacity-70" knotWidth={210} />
      <div className="shell relative pb-36 pt-14 lg:pb-40 lg:pt-20">
        <p className="label">{label}</p>
        <h1 className="mt-4 max-w-3xl text-d1">{title}</h1>
        {lead && <p className="mt-6 max-w-text lead">{lead}</p>}
      </div>
    </section>
  );
}
