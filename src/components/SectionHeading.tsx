type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  level?: 'h1' | 'h2';
};

export const SectionHeading = ({ eyebrow, title, description, level = 'h2' }: SectionHeadingProps) => {
  const HeadingTag = level;

  return (
    <div className="section-heading">
      <span>{eyebrow}</span>
      <HeadingTag>{title}</HeadingTag>
      {description && <p>{description}</p>}
    </div>
  );
};
