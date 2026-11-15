type PagePlaceholderProps = {
  title: string;
  description?: string;
};

/** Nội dung tạm cho route chưa làm. Xoá khi màn hình thật được dựng. */
export function PagePlaceholder({ title, description }: PagePlaceholderProps) {
  return (
    <section className="rounded-lg border border-border bg-surface p-margin">
      <h1 className="text-headline-lg">{title}</h1>
      {description ? (
        <p className="mt-2 text-secondary-text">{description}</p>
      ) : null}
    </section>
  );
}
