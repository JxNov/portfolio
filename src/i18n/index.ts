import { VITE_APP_LANGUAGE } from '@/definitions';
import { createI18n } from 'vue-i18n';
import type { TLanguage } from '@/types/common.types';
import EN from './en';
import VI from './vi';

const MESSAGES = {
  en: EN,
  vi: VI,
};

export const i18n = createI18n({
  locale: VITE_APP_LANGUAGE,
  fallbackLocale: 'en',
  messages: MESSAGES,
  legacy: false,
  globalInjection: true,
});

export const handleChangeLanguage = (lang: TLanguage) => {
  i18n.global.locale.value = lang;
};
