import { ArrowLeft, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { statusLabels, type Language, type Project, uiCopy } from '../data/profile';

type ProjectDetailPageProps = {
  project?: Project;
  language: Language;
};

export const ProjectDetailPage = ({ project, language }: ProjectDetailPageProps) => {
  const ui = uiCopy[language];

  if (!project) {
    return (
      <section className="page-section page-top empty-state">
        <h1>{ui.projectDetail.notFoundTitle}</h1>
        <p>{ui.projectDetail.notFoundDescription}</p>
        <a className="button" href="#/projects">
          <ArrowLeft size={17} aria-hidden="true" />
          {ui.projectDetail.backToProjects}
        </a>
      </section>
    );
  }

  const copy = project.copy[language];

  return (
    <article className="project-detail page-top">
      <header className="project-detail-hero">
        <a className="text-link back-link" href="#/projects">
          <ArrowLeft size={16} aria-hidden="true" />
          {ui.projectDetail.backToProjects}
        </a>
        <span className="eyebrow">{statusLabels[language][project.status]}</span>
        <h1>{copy.title}</h1>
        <p>{copy.subtitle}</p>
        <dl className="detail-facts">
          <div>
            <dt>{ui.projectDetail.facts.year}</dt>
            <dd>{project.year}</dd>
          </div>
          <div>
            <dt>{ui.projectDetail.facts.role}</dt>
            <dd>{copy.role}</dd>
          </div>
          <div>
            <dt>{ui.projectDetail.facts.stack}</dt>
            <dd>{project.stack.join(', ')}</dd>
          </div>
        </dl>
      </header>

      <section className="project-detail-section">
        <h2>{ui.projectDetail.overview}</h2>
        <p>{copy.summary}</p>
      </section>

      <section className="project-detail-section">
        <h2>{ui.projectDetail.highlights}</h2>
        <ul className="check-list">
          {copy.highlights.map((highlight) => (
            <li key={highlight}>
              <CheckCircle2 size={18} aria-hidden="true" />
              {highlight}
            </li>
          ))}
        </ul>
      </section>

      <section className="project-detail-section">
        <h2>{ui.projectDetail.outcomes}</h2>
        <div className="outcome-grid">
          {copy.outcomes.map((outcome) => (
            <p key={outcome}>{outcome}</p>
          ))}
        </div>
      </section>

      <section className="project-detail-section">
        <h2>{ui.projectDetail.links}</h2>
        <div className="link-row">
          {project.links.map((link) => (
            <a className="button button-secondary" href={link.href} key={link.href}>
              <ArrowUpRight size={16} aria-hidden="true" />
              {link.label[language]}
            </a>
          ))}
        </div>
      </section>
    </article>
  );
};
