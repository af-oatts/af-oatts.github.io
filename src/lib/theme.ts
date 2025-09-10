export type Theme = 'light' | 'dark' | 'system';

const KEY = 'theme';
const bus = new EventTarget();

function read(): Theme {
  try {
    return (JSON.parse(localStorage.getItem(KEY) || '""') as Theme) || 'system';
  } catch {
    return 'system';
  }
}
function write(v: Theme) {
  localStorage.setItem(KEY, JSON.stringify(v));
}

export function resolve(mode: Theme): 'light' | 'dark' {
  const prefersDark = matchMedia('(prefers-color-scheme: dark)').matches;
  return mode === 'system' ? (prefersDark ? 'dark' : 'light') : mode;
}

export function getTheme(): Theme {
  return read();
}

export function setTheme(next: Theme) {
  write(next);
  bus.dispatchEvent(new CustomEvent<Theme>('theme-change', { detail: next }));
  let actualTheme = resolve(next);
  document.documentElement.dataset.theme = actualTheme;
  applyThemeToDom(actualTheme, true);
}


function applyThemeToDom(t: Theme, animate: boolean = false) {
  const html = document.documentElement;
  const run = () => {
    if (typeof document === 'undefined') return;
    html.setAttribute('data-bs-theme', t);
    html.style.colorScheme = t;
  }
  animate ? withTransition(html, run) : run();
}
export function subscribe(cb: (v: Theme) => void): () => void {
  const handler = (e: Event) => cb((e as CustomEvent<Theme>).detail);
  bus.addEventListener('theme-change', handler);
  const storageHandler = (e: StorageEvent) => {
    if (e.key === KEY) {
      try {
        const v = e.newValue ? (JSON.parse(e.newValue) as Theme) : 'system';
        cb(v);
      } catch {}
    }
  };
  window.addEventListener('storage', storageHandler);

  cb(read());

  return () => {
    bus.removeEventListener('theme-change', handler);
    window.removeEventListener('storage', storageHandler);
  };
}


function withTransition(html: HTMLElement, fn: () => void) {
  html.classList.add('theme-transition');
  try { fn(); } finally { setTimeout(() => html.classList.remove('theme-transition'), 300); }
}