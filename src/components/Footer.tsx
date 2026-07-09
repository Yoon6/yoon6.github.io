import { Github, Mail, MapPin } from 'lucide-react';
import { profile, type Language, uiCopy } from '../data/profile';

type FooterProps = {
  language: Language;
};

export const Footer = ({ language }: FooterProps) => {
  const copy = uiCopy[language];
  const profileCopy = profile.copy[language];

  return (
    <footer className="site-footer">
      <div>
        <strong>{profile.name}</strong>
        <p>{profileCopy.summary}</p>
      </div>
      <div className="footer-links">
        <span>
          <MapPin size={16} aria-hidden="true" />
          {profileCopy.location}
        </span>
        <a href={profile.githubUrl}>
          <Github size={16} aria-hidden="true" />
          {copy.actions.github}
        </a>
        <a href={`mailto:${profile.email}`}>
          <Mail size={16} aria-hidden="true" />
          {copy.actions.email}
        </a>
      </div>
    </footer>
  );
};
