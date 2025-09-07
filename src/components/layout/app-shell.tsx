'use client';

import React from 'react';
import { AppShell as MantineAppShell, Burger, NavLink } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconDashboard, IconLogin } from '@tabler/icons-react';
import Link from 'next/link';

const AppShell = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <MantineAppShell
      padding="md"
      header={{ height: 60 }}
      navbar={{
        width: 200,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
    >
      <MantineAppShell.Header>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <div>Logo</div>
      </MantineAppShell.Header>

      <MantineAppShell.Navbar>
        <NavLink
          component={Link}
          href="/"
          label="Dashboard"
          leftSection={<IconDashboard size={16} stroke={1.5} />}
        />
        <NavLink
          component={Link}
          href="/login"
          label="Login"
          leftSection={<IconLogin size={16} stroke={1.5} />}
        />
      </MantineAppShell.Navbar>

      <MantineAppShell.Main>{children}</MantineAppShell.Main>
    </MantineAppShell>
  );
};

export default AppShell;
