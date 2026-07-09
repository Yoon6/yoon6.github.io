type TypstRuntime = {
  svg: (input: { mainContent: string }) => Promise<string>;
  setCompilerInitOptions: (options: { getModule: () => string }) => void;
  setRendererInitOptions: (options: { getModule: () => string }) => void;
  use?: (provider: unknown) => void;
};

type TypstSnippetRuntime = {
  fetchPackageRegistry?: () => unknown;
  preloadFonts?: (fontUrls: string[]) => unknown;
};

declare global {
  interface Window {
    $typst?: TypstRuntime;
    TypstSnippet?: TypstSnippetRuntime;
    __typstRuntimePromise?: Promise<TypstRuntime>;
    __typstRuntimeConfigured?: boolean;
  }
}

const SCRIPT_ID = 'typst-runtime';
const SCRIPT_URL =
  'https://cdn.jsdelivr.net/npm/@myriaddreamin/typst.ts@0.7.0/dist/esm/contrib/all-in-one-lite.bundle.js';
const COMPILER_WASM_URL =
  'https://cdn.jsdelivr.net/npm/@myriaddreamin/typst-ts-web-compiler@0.7.0/pkg/typst_ts_web_compiler_bg.wasm';
const RENDERER_WASM_URL =
  'https://cdn.jsdelivr.net/npm/@myriaddreamin/typst-ts-renderer@0.7.0/pkg/typst_ts_renderer_bg.wasm';
const KOREAN_FONT_URLS = [
  '/fonts/NotoSerifCJKkr-Regular.otf',
  '/fonts/NotoSerifCJKkr-Bold.otf',
  '/fonts/NotoSansCJKkr-Regular.otf',
  '/fonts/NotoSansCJKkr-Bold.otf',
];

const configureRuntime = (runtime: TypstRuntime) => {
  if (window.__typstRuntimeConfigured) {
    return;
  }

  runtime.setCompilerInitOptions({
    getModule: () => COMPILER_WASM_URL,
  });
  runtime.setRendererInitOptions({
    getModule: () => RENDERER_WASM_URL,
  });

  const packageRegistry = window.TypstSnippet?.fetchPackageRegistry?.();
  if (packageRegistry) {
    runtime.use?.(packageRegistry);
  }

  const koreanFonts = window.TypstSnippet?.preloadFonts?.(KOREAN_FONT_URLS);
  if (koreanFonts) {
    runtime.use?.(koreanFonts);
  }

  window.__typstRuntimeConfigured = true;
};

export const loadTypstRuntime = (): Promise<TypstRuntime> => {
  if (window.$typst) {
    configureRuntime(window.$typst);
    return Promise.resolve(window.$typst);
  }

  if (window.__typstRuntimePromise) {
    return window.__typstRuntimePromise;
  }

  const runtimePromise: Promise<TypstRuntime> = new Promise<TypstRuntime>((resolve, reject) => {
    const existingScript = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
    const script = existingScript ?? document.createElement('script');

    const onLoad = () => {
      if (!window.$typst) {
        reject(new Error('Typst runtime loaded, but no runtime API was exposed.'));
        return;
      }

      configureRuntime(window.$typst);
      resolve(window.$typst);
    };

    const onError = () => {
      reject(new Error('Typst runtime could not be loaded.'));
    };

    script.addEventListener(
      'load',
      () => {
        script.dataset.loaded = 'true';
        onLoad();
      },
      { once: true },
    );
    script.addEventListener('error', onError, { once: true });

    if (existingScript?.dataset.loaded === 'true') {
      onLoad();
      return;
    }

    if (!existingScript) {
      script.id = SCRIPT_ID;
      script.type = 'module';
      script.src = SCRIPT_URL;
      document.head.appendChild(script);
    }
  }).catch((error: unknown): never => {
    window.__typstRuntimePromise = undefined;
    throw error;
  });

  window.__typstRuntimePromise = runtimePromise;

  return runtimePromise;
};

export const renderTypstToSvg = async (source: string): Promise<string> => {
  const typst = await loadTypstRuntime();
  return typst.svg({ mainContent: source });
};
