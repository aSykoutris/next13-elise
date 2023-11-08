import { ReactNode } from 'react';
import { useLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';

import Navbar from './components/Navbar/Navbar';
import AuthProvider from './context/AuthProvider';
import NextUIProvider from './context/NextUIProvider';
import Footer from './components/Footer/Footer';
import './globals.css';

// Define the props type for RootLayout
type RootLayoutProps = {
  children: ReactNode;
  params: {
    locale: string;
  };
};

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const locale = useLocale();

  // * If you manually type in the url a wrong locale, redirect to 404
  if (params.locale !== locale) {
    notFound();
  }

  let messages;
  try {
    // Load messages for the specified locale
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    console.log('Failed to get the localized text', error);
    notFound();
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <meta
        name='viewport'
        content='user-scalable=no, width=device-width, initial-scale=1.0'
      />

      <body>
        <NextUIProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <AuthProvider>
              <div
                id='rootWrapper'
                className='flex flex-col justify-between min-h-screen'
              >
                <Navbar locale={locale} />
                <main className='min-h-[76vh] flex justify-center flex-col'>
                  {children}
                </main>
                <Footer />
              </div>
            </AuthProvider>
          </NextIntlClientProvider>
        </NextUIProvider>
      </body>
    </html>
  );
}
