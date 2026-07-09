import { ArrowUpRight } from 'lucide-react';
import { statusLabels, type Language, type Project, uiCopy } from '../data/profile';

type ProjectCardProps = {
  project: Project;
  language: Language;
};

export const ProjectCard = ({ project, language }: ProjectCardProps) => {
  const copy = project.copy[language];
  const ui = uiCopy[language];

  return (
    <article className="project-card">
      <div className="project-card-topline">
        <span>{project.year}</span>
        <span className={`status status-${project.status}`}>{statusLabels[language][project.status]}</span>
      </div>
      <h3>{copy.title}</h3>
      <p className="project-subtitle">{copy.subtitle}</p>
      <p>{copy.summary}</p>
      <ul className="tag-list" aria-label={`${copy.title} ${ui.projectDetail.facts.stack}`}>
        {project.stack.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <a className="text-link" href={`#/projects/${project.slug}`}>
        {ui.actions.openProject}
        <ArrowUpRight size={16} aria-hidden="true" />
      </a>
    </article>
  );
};
