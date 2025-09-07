import type { Metadata } from 'next';
import './globals.css';
import React from 'react';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { theme } from '@/theme';
import AppShell from '@/components/layout/app-shell';

export const metadata: Metadata = {
  title: 'Vire',
  description: '',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <MantineProvider theme={theme} defaultColorScheme="dark">
          <AppShell>
            <main>{children}</main>
          </AppShell>
        </MantineProvider>
      </body>
    </html>
  );
}
