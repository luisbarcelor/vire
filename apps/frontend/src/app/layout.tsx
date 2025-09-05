import type { Metadata } from 'next';
import './globals.css';
import React from 'react';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { theme } from '@/theme';

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
        <MantineProvider theme={theme}>{children}</MantineProvider>
      </body>
    </html>
  );
}
