import { routeKey } from './urls';

export const languages = {
  en: { name: 'English', label: 'Website language', providerCode: 'en' },
  'zh-Hans': { name: '简体中文', label: '网站语言', providerCode: 'zh' },
  ko: { name: '한국어', label: '웹사이트 언어', providerCode: 'ko' },
  es: { name: 'Español', label: 'Idioma del sitio web', providerCode: 'es' },
} as const;

export type WebsiteLanguage = keyof typeof languages;
export const enabledLanguages = ['en', 'zh-Hans'] as const;
export const translationProjectKey = import.meta.env?.VITE_WEGLOT_PROJECT?.trim();
const preferenceKey = 'northstar-website-language';
const privatePaths = ['/patient-forms', '/contact', '/smile-preview', '/terms'];

export function supportsTranslation(path: string) {
  const route = routeKey(path);
  return !privatePaths.some(prefix => route === prefix || route.startsWith(`${prefix}/`));
}

export function isWebsiteLanguage(value: string | null): value is WebsiteLanguage {
  return enabledLanguages.some(language => language === value);
}

export function preferredLanguage(): WebsiteLanguage {
  if (!translationProjectKey) return 'en';
  try {
    const selected = window.sessionStorage.getItem(preferenceKey);
    return isWebsiteLanguage(selected) ? selected : 'en';
  } catch {
    return 'en';
  }
}

export function activeLanguage(): WebsiteLanguage {
  return supportsTranslation(window.location.pathname) ? preferredLanguage() : 'en';
}

export function changeLanguage(language: WebsiteLanguage) {
  window.sessionStorage.setItem(preferenceKey, language);
  window.location.reload();
}
