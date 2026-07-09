import { FileText, Github, Mail } from 'lucide-react';
import type { Route } from '../App';
import { languageOptions, profile, type Language, uiCopy } from '../data/profile';

type HeaderProps = {
  route: Route;
  language: Language;
  onLanguageChange: (language: Language) => void;
};

const isActive = (route: Route, target: 'home' | 'projects' | 'resume') => {
  if (target === 'projects') {
    return route.name === 'projects' || route.name === 'project';
  }

  return route.name === target;
};

export const Header = ({ route, language, onLanguageChange }: HeaderProps) => {
  const copy = uiCopy[language];

  return (
    <header className="site-header">
      <div className="header-language">
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
      </div>

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
      </nav>

      <div className="header-actions" aria-label={copy.aria.externalLinks}>
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
