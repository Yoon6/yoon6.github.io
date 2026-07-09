import { FileText, Github, Mail } from 'lucide-react';
import type { Route } from '../App';
import { languageOptions, profile, type Language, uiCopy } from '../data/profile';

type HeaderProps = {
  route: Route;
  language: Language;
  onLanguageChange: (language: Language) => void;
};

const isActive = (route: Route, target: 'home' | 'projects' | 'resume' | 'contact') => {
  if (target === 'projects') {
    return route.name === 'projects' || route.name === 'project';
  }

  return route.name === target;
};

export const Header = ({ route, language, onLanguageChange }: HeaderProps) => {
  const copy = uiCopy[language];
  const profileCopy = profile.copy[language];

  return (
    <header className="site-header">
      <a className="brand" href="#/" aria-label={copy.aria.home}>
        <span className="brand-mark">MY</span>
        <span>
          <strong>{profile.name}</strong>
          <small>{profileCopy.title}</small>
        </span>
      </a>

      <nav className="site-nav" aria-label={copy.nav.label}>
        <a className={isActive(route, 'home') ? 'active' : ''} href="#/">
          {copy.nav.home}
        </a>
        <a className={isActive(route, 'projects') ? 'active' : ''} href="#/projects">
          {copy.nav.projects}
        </a>
        <a className={isActive(route, 'resume') ? 'active' : ''} href="#/resume">
          {copy.nav.resume}
        </a>
        <a className={isActive(route, 'contact') ? 'active' : ''} href="#/contact">
          {copy.nav.contact}
        </a>
      </nav>

      <div className="header-actions" aria-label={copy.aria.externalLinks}>
        <div className="language-switch" role="group" aria-label={copy.aria.language}>
          {languageOptions.map((option) => (
            <button
              className={option.code === language ? 'active' : ''}
              key={option.code}
              type="button"
              aria-pressed={option.code === language}
              onClick={() => onLanguageChange(option.code)}
            >
              {option.shortLabel}
            </button>
          ))}
        </div>
        <a className="icon-button" href={profile.githubUrl} aria-label={copy.aria.github}>
          <Github size={18} aria-hidden="true" />
        </a>
        <a className="icon-button" href={`mailto:${profile.email}`} aria-label={copy.aria.email}>
          <Mail size={18} aria-hidden="true" />
        </a>
        <a className="button button-compact" href="#/resume">
          <FileText size={16} aria-hidden="true" />
          {copy.actions.resume}
        </a>
      </div>
    </header>
  );
};
