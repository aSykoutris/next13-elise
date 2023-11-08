import { getRequestConfig } from 'next-intl/server';

export const i18n = {
  defaultLocale: 'el',
  locales: ['el', 'en'],
} as const;

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`./messages/${locale}.json`)).default,
}));
