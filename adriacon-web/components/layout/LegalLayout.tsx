import { PageHeader } from '@/components/layout/PageHeader';

/** Gemeinsame Hülle für Impressum und Datenschutzerklärung. */
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
            className="mt-8 max-w-2xl text-[0.98rem] leading-relaxed text-ink-soft
              [&>*+*]:mt-5
              [&_a]:text-blue [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-blue-deep
              [&_h2]:mb-3 [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-[1.25rem] [&_h2]:font-medium
              [&_h2:first-child]:mt-0
              [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5
              [&_strong]:font-medium [&_strong]:text-navy"
          >
            {children}
          </div>
        </div>
      </section>
    </>
  );
}
