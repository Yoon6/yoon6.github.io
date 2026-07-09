import { ProjectCard } from '../components/ProjectCard';
import { SectionHeading } from '../components/SectionHeading';
import { projects, type Language, uiCopy } from '../data/profile';

type ProjectsPageProps = {
  language: Language;
};

export const ProjectsPage = ({ language }: ProjectsPageProps) => {
  const copy = uiCopy[language].projectsPage;

  return (
    <section className="page-section page-top">
      <SectionHeading
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.description}
        level="h1"
      />
      <div className="project-grid">
        {projects.map((project) => (
          <ProjectCard key={project.slug} language={language} project={project} />
        ))}
      </div>
    </section>
  );
};
