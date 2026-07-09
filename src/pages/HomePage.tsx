import { ArrowRight, BriefcaseBusiness, FileText, MapPin } from 'lucide-react';
import { ProjectCard } from '../components/ProjectCard';
import { SectionHeading } from '../components/SectionHeading';
import { focusAreas, profile, projects, timeline, type Language, uiCopy } from '../data/profile';

type HomePageProps = {
  language: Language;
};

export const HomePage = ({ language }: HomePageProps) => {
  const featuredProjects = projects.slice(0, 2);
  const copy = uiCopy[language];
  const profileCopy = profile.copy[language];

  return (
    <>
      <section className="hero-section" style={{ backgroundImage: `url(${profile.heroImage})` }}>
        <div className="hero-content">
          <span className="eyebrow">{copy.home.eyebrow}</span>
          <h1>{profile.name}</h1>
          <p>{profileCopy.summary}</p>
          <div className="hero-meta">
            <span>
              <BriefcaseBusiness size={18} aria-hidden="true" />
              {profileCopy.title}
            </span>
            <span>
              <MapPin size={18} aria-hidden="true" />
              {profileCopy.location}
            </span>
          </div>
          <div className="hero-actions">
            <a className="button" href="#/projects">
              <ArrowRight size={17} aria-hidden="true" />
              {copy.actions.viewProjects}
            </a>
            <a className="button button-secondary" href="#/resume">
              <FileText size={17} aria-hidden="true" />
              {copy.actions.resume}
            </a>
          </div>
        </div>
        <div className="hero-strip">
          <span>{profileCopy.availability}</span>
          <a href={`mailto:${profile.email}`}>{copy.actions.email}</a>
        </div>
      </section>

      <section className="page-section">
        <SectionHeading
          eyebrow={copy.home.selectedEyebrow}
          title={copy.home.selectedTitle}
          description={copy.home.selectedDescription}
        />
        <div className="project-grid two-column">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} language={language} project={project} />
          ))}
        </div>
      </section>

      <section className="page-section focus-band">
        <SectionHeading
          eyebrow={copy.home.focusEyebrow}
          title={copy.home.focusTitle}
          description={copy.home.focusDescription}
        />
        <div className="focus-grid">
          {focusAreas[language].map((area) => (
            <article className={`focus-item focus-${area.accent}`} key={area.title}>
              <h3>{area.title}</h3>
              <p>{area.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="page-section timeline-section">
        <SectionHeading eyebrow={copy.home.timelineEyebrow} title={copy.home.timelineTitle} />
        <div className="timeline">
          {timeline[language].map((item) => (
            <article className="timeline-item" key={item.period}>
              <span>{item.period}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
};
