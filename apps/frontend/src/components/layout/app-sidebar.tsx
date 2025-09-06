'use client';

import React from 'react';
import { useDisclosure } from '@mantine/hooks';
import { Button, Drawer, Text } from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';

const AppSidebar = () => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <Drawer
        position="right"
        opened={opened}
        onClose={close}
        title={<span className="text-2xl">Welcome to Vire</span>}
      >
        <Text>App sidebar component</Text>
      </Drawer>

      <Button rightSection={<IconArrowRight size={14} />} onClick={open}>Open Drawer</Button>
    </>
  );
};

export default AppSidebar;
