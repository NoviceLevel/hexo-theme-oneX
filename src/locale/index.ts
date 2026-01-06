import zh_CN from './zh_CN';
import en_US from './en_US';
import ja_JP from './ja_JP';

export type LocaleKey = keyof typeof zh_CN;

export const locales = {
  zh_CN,
  en_US,
  ja_JP,
};

export type LocaleType = keyof typeof locales;

export default locales;
