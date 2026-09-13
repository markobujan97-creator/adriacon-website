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
      <RopeLine tone="light" className="absolute inset-x-0 bottom-0" height={72} />
      <div className="shell relative pb-28 pt-14 lg:pb-32 lg:pt-20">
        <p className="label">{label}</p>
        <h1 className="mt-4 max-w-3xl text-d1">{title}</h1>
        {lead && <p className="mt-6 max-w-text lead">{lead}</p>}
      </div>
    </section>
  );
}
