import { ref, computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { VITE_APP_LANGUAGE } from '@/definitions';
import type { TLanguage } from '@/types/common.types';
import { STORAGE_KEY_LANGUAGE, LANGUAGES } from '@/constants/language';

const currentLanguage = ref<TLanguage>(VITE_APP_LANGUAGE as TLanguage);
const langKeys = Object.keys(LANGUAGES).map(
  key => LANGUAGES[key as keyof typeof LANGUAGES].code
) as TLanguage[];

export const useLanguage = () => {
  const { locale } = useI18n();

  const saveLanguage = (lang: TLanguage) => {
    localStorage.setItem(STORAGE_KEY_LANGUAGE, lang);
  };

  const loadLanguage = (): TLanguage | null => {
    return localStorage.getItem(STORAGE_KEY_LANGUAGE) as TLanguage | null;
  };

  const getDefaultLanguage = (): TLanguage => {
    const saved = loadLanguage();
    if (saved && langKeys.includes(saved)) return saved;

    const envLang = VITE_APP_LANGUAGE as TLanguage;
    if (envLang && langKeys.includes(envLang)) return envLang;

    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('vi')) return 'vi';

    return 'vi';
  };

  const initializeLanguage = () => {
    const defaultLang = getDefaultLanguage();
    currentLanguage.value = defaultLang;
    locale.value = defaultLang;
  };

  const changeLanguage = (lang: TLanguage) => {
    if (!langKeys.includes(lang)) {
      return;
    }

    currentLanguage.value = lang;
    locale.value = lang;
    saveLanguage(lang);
  };

  watch(currentLanguage, newLang => {
    if (locale.value !== newLang) {
      locale.value = newLang;
    }
  });

  const languageLabel = computed(() => {
    const entry = Object.values(LANGUAGES).find(lang => lang.code === currentLanguage.value);
    return entry ? entry.label : '';
  });

  return {
    currentLanguage,
    languageLabel,
    locale,
    changeLanguage,
    initializeLanguage,
  };
};
