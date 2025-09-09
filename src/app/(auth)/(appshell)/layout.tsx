import React from 'react';
import AppShell from '@/components/layout/app-shell';

export default function AppShellLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AppShell>{children}</AppShell>;
}
