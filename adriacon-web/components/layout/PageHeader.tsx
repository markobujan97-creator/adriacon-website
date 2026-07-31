import { StepLine } from '@/components/ui/StepLine';

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
      <StepLine className="pointer-events-none absolute bottom-0 right-0 h-32 w-2/5 opacity-60" />
      <div className="shell relative py-14 lg:py-20">
        <p className="label">{label}</p>
        <h1 className="mt-4 max-w-3xl text-d1">{title}</h1>
        {lead && <p className="mt-6 max-w-text lead">{lead}</p>}
      </div>
    </section>
  );
}
