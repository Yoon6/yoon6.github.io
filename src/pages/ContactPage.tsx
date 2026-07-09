import { Github, Mail, MapPin } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { profile, type Language, uiCopy } from '../data/profile';

type ContactPageProps = {
  language: Language;
};

export const ContactPage = ({ language }: ContactPageProps) => {
  const copy = uiCopy[language];
  const profileCopy = profile.copy[language];

  return (
    <section className="page-section page-top contact-page">
      <SectionHeading
        eyebrow={copy.contactPage.eyebrow}
        title={copy.contactPage.title}
        description={profileCopy.availability}
        level="h1"
      />
      <div className="contact-layout">
        <a className="contact-link" href={`mailto:${profile.email}`}>
          <Mail size={22} aria-hidden="true" />
          <span>
            <strong>{copy.actions.email}</strong>
            {profile.email}
          </span>
        </a>
        <a className="contact-link" href={profile.githubUrl}>
          <Github size={22} aria-hidden="true" />
          <span>
            <strong>{copy.actions.github}</strong>
            github.com/yoon6
          </span>
        </a>
        <div className="contact-link">
          <MapPin size={22} aria-hidden="true" />
          <span>
            <strong>{copy.actions.location}</strong>
            {profileCopy.location}
          </span>
        </div>
      </div>
    </section>
  );
};
