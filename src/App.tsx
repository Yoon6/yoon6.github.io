import { useEffect, useMemo, useState } from 'react';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { ContactPage } from './pages/ContactPage';
import { HomePage } from './pages/HomePage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ResumePage } from './pages/ResumePage';
import { defaultLanguage, type Language, projects, uiCopy } from './data/profile';

export type Route =
  | { name: 'home' }
  | { name: 'projects' }
  | { name: 'project'; slug: string }
  | { name: 'resume' }
  | { name: 'contact' };

const parseHash = (): Route => {
  const segments = window.location.hash.replace(/^#\/?/, '').split('/').filter(Boolean);

  if (segments[0] === 'projects' && segments[1]) {
    return { name: 'project', slug: segments[1] };
  }

  if (segments[0] === 'projects') {
    return { name: 'projects' };
  }

  if (segments[0] === 'resume') {
    return { name: 'resume' };
  }

  if (segments[0] === 'contact') {
    return { name: 'contact' };
  }

  return { name: 'home' };
};

const getInitialLanguage = (): Language => {
  const storedLanguage = window.localStorage.getItem('portfolio-language');
  return storedLanguage === 'ko' || storedLanguage === 'en' ? storedLanguage : defaultLanguage;
};

export const App = () => {
  const [route, setRoute] = useState<Route>(parseHash);
  const [language, setLanguage] = useState<Language>(getInitialLanguage);

  useEffect(() => {
    const onHashChange = () => setRoute(parseHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    window.localStorage.setItem('portfolio-language', language);
    document.documentElement.lang = language;
    document.title = uiCopy[language].document.title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', uiCopy[language].document.description);
  }, [language]);

  const selectedProject = useMemo(() => {
    if (route.name !== 'project') {
      return undefined;
    }

    return projects.find((project) => project.slug === route.slug);
  }, [route]);

  return (
    <div className="site-shell">
      <Header route={route} language={language} onLanguageChange={setLanguage} />
      <main>
        {route.name === 'home' && <HomePage language={language} />}
        {route.name === 'projects' && <ProjectsPage language={language} />}
        {route.name === 'project' && (
          <ProjectDetailPage language={language} project={selectedProject} />
        )}
        {route.name === 'resume' && <ResumePage language={language} />}
        {route.name === 'contact' && <ContactPage language={language} />}
      </main>
      <Footer language={language} />
    </div>
  );
};
