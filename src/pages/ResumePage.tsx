import { SectionHeading } from '../components/SectionHeading';
import { ResumeRenderer } from '../components/ResumeRenderer';
import { type Language, uiCopy } from '../data/profile';

type ResumePageProps = {
  language: Language;
};

export const ResumePage = ({ language }: ResumePageProps) => {
  const copy = uiCopy[language].resumePage;

  return (
    <section className="page-section page-top resume-page">
      <SectionHeading
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.description}
        level="h1"
      />
      <ResumeRenderer
        language={language}
        loadingLabel={copy.loading}
        errorTitle={copy.errorTitle}
        fallbackError={copy.fallbackError}
        ariaLabel={uiCopy[language].aria.renderedResume}
        placeholderLabel={uiCopy[language].aria.resumeLoading}
      />
    </section>
  );
};
