'use client';

import React, { useState } from 'react';
import { ActionIcon, Button, Flex, TextInput, Title } from '@mantine/core';
import {
  IconEye,
  IconEyeClosed,
  IconLock,
  IconMail,
} from '@tabler/icons-react';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  }

  return (
    <Flex
      justify="center"
      align="center"
      className="bg-[var(--colors-uranian-blue)] h-screen m-0"
    >
      <Flex
        justify="center"
        direction="column"
        gap="md"
        className="bg-[var(--colors-cream)] p-6 w-xl"
      >
        <Title order={1} className="text-center text-[var(--colors-gunmetal)]">
          Login
        </Title>

        <form className="flex flex-col gap-4">
          <TextInput
            styles={{
              label: { color: 'var(--colors-gunmetal)' }
            }}
            label="Email"
            placeholder="Email address"
            leftSection={<IconMail size={16} />}
            type="email"
            required
          />
          <TextInput
            styles={{
              label: { color: 'var(--colors-gunmetal)' }
            }}
            label="Password"
            placeholder="Password"
            leftSection={<IconLock size={16} />}
            rightSection={
              <ActionIcon radius="md" variant="subtle" onClick={handleTogglePassword}>
                {showPassword ? <IconEyeClosed size={16} /> : <IconEye size={16} />}
              </ActionIcon>
            }
            type={showPassword ? 'text' : 'password'}
            required
          />

          <Button className="mt-8 ml-auto" type="submit">Log In</Button>
        </form>
      </Flex>
    </Flex>
  );
};

export default LoginPage;
