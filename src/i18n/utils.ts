import en from './en';
import fr from './fr';
import ko from './ko';
import aiEn from './ai-en';
import aiFr from './ai-fr';
import aiKo from './ai-ko';

export type Lang = 'en' | 'fr' | 'ko';
const translations: Record<Lang, Record<string, string>> = { en, fr, ko };
const aiTranslations: Record<Lang, Record<string, string>> = { en: aiEn, fr: aiFr, ko: aiKo };

export function useTranslations(lang: Lang) {
  return (key: string): string =>
    translations[lang][key] ?? translations.en[key] ?? key;
}

export function useAITranslations(lang: Lang) {
  return (key: string): string =>
    aiTranslations[lang][key] ?? aiTranslations.en[key] ?? key;
}

export function getLangFromUrl(url: URL): Lang {
  const [, seg] = url.pathname.split('/');
  if (seg === 'fr' || seg === 'ko') return seg;
  return 'en';
}

export function localePath(lang: Lang, path: string): string {
  const prefix = lang === 'en' ? '' : `/${lang}`;
  return `${prefix}${path}`;
}
