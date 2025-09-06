'use client';

import React from 'react';
import { AppShell as MantineAppShell, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

const AppShell = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <MantineAppShell
      padding="md"
      header={{ height: 60 }}
      navbar={{
        width: 100,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
    >
      <MantineAppShell.Header>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <div>Logo</div>
      </MantineAppShell.Header>

      <MantineAppShell.Navbar>Navbar</MantineAppShell.Navbar>

      <MantineAppShell.Main>{children}</MantineAppShell.Main>
    </MantineAppShell>
  );
};

export default AppShell;
