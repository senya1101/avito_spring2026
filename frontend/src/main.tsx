import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
const currentTheme =
  localStorage.getItem('theme') ||
  (window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light');

document.documentElement.classList.toggle('dark', currentTheme === 'dark');
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
