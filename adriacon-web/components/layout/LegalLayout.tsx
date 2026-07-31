import { PageHeader } from '@/components/layout/PageHeader';

export function LegalLayout({
  label,
  title,
  updated,
  children,
}: {
  label: string;
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <PageHeader label={label} title={title} />
      <section className="py-block">
        <div className="shell">
          <p className="text-[0.85rem] text-ink-light">Stand: {updated}</p>
          <div
            className="mt-8 max-w-2xl space-y-5 text-[0.98rem] leading-relaxed text-ink-soft
              [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-blue
              [&_h2]:mb-3 [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-[1.3rem] [&_h2]:font-medium
              [&_li]:ml-5 [&_li]:list-disc [&_strong]:font-medium [&_strong]:text-navy"
          >
            {children}
          </div>
        </div>
      </section>
    </>
  );
}
