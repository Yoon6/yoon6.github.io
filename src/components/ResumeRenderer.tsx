import { useCallback, useEffect, useRef, useState } from 'react';
import { type Language } from '../data/profile';
import resumeSource from '../data/resume-cur.typ?raw';
import { renderTypstToSvg } from '../lib/typst';

type RenderStatus = 'idle' | 'rendering' | 'ready' | 'error';

type ResumeRendererProps = {
  language: Language;
  loadingLabel: string;
  errorTitle: string;
  fallbackError: string;
  ariaLabel: string;
  placeholderLabel: string;
};

const getRenderErrorMessage = (unknownError: unknown, fallbackError: string) => {
  if (unknownError instanceof Error) {
    return unknownError.message;
  }

  if (typeof unknownError === 'string') {
    return unknownError.replace(/^'|'$/g, '');
  }

  try {
    return JSON.stringify(unknownError);
  } catch {
    return fallbackError;
  }
};

const setTypstLanguageVariable = (source: string, language: Language) => {
  const langDeclaration = /^#let\s+lang\s*=\s*"(en|ko)"\s*;?\s*$/m;

  if (!langDeclaration.test(source)) {
    throw new Error(
      'Missing uncommented `#let lang = "en"` or `#let lang = "ko"` in resume-cur.typ.',
    );
  }

  return source.replace(langDeclaration, `#let lang = "${language}"`);
};

export const ResumeRenderer = ({
  language,
  loadingLabel,
  errorTitle,
  fallbackError,
  ariaLabel,
  placeholderLabel,
}: ResumeRendererProps) => {
  const [svg, setSvg] = useState('');
  const [status, setStatus] = useState<RenderStatus>('idle');
  const [error, setError] = useState('');
  const renderRun = useRef(0);

  const render = useCallback(async () => {
    const runId = renderRun.current + 1;
    renderRun.current = runId;
    setStatus('rendering');
    setError('');

    try {
      const nextSvg = await renderTypstToSvg(setTypstLanguageVariable(resumeSource, language));
      if (renderRun.current !== runId) {
        return;
      }

      setSvg(nextSvg);
      setStatus('ready');
    } catch (unknownError) {
      if (renderRun.current !== runId) {
        return;
      }

      setStatus('error');
      setError(getRenderErrorMessage(unknownError, fallbackError));
    }
  }, [fallbackError, language]);

  useEffect(() => {
    setSvg('');
    void render();
  }, [render]);

  return (
    <section className="resume-workspace" aria-label={ariaLabel}>
      <div className="resume-preview">
        {status === 'error' && (
          <div className="render-message" role="alert">
            <strong>{errorTitle}</strong>
            <p>{error}</p>
          </div>
        )}
        {svg ? (
          <div dangerouslySetInnerHTML={{ __html: svg }} />
        ) : (
          <div className="resume-placeholder" aria-label={placeholderLabel} />
        )}
      </div>
      {status === 'rendering' && (
        <div className="resume-loading" role="status">
          {loadingLabel}
        </div>
      )}
    </section>
  );
};
