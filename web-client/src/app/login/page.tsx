'use client';

import React, { useActionState, useState } from 'react';
import {
  ActionIcon,
  Button,
  Flex,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import {
  IconAlertCircle,
  IconEye,
  IconEyeClosed,
  IconLock,
  IconMail,
} from '@tabler/icons-react';
import { loginAction } from '@/server/actions/auth';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginState, loginDispatch] = useActionState(loginAction, {
    emailError: '',
  });

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Flex justify="center" align="center" className="h-screen m-0">
      <Flex
        justify="center"
        direction="column"
        gap="md"
        className="bg-[#3a3a3a] rounded-md p-6 w-xl"
      >
        <Title order={1} className="text-center">
          Login
        </Title>

        <form noValidate action={loginDispatch} className="flex flex-col gap-4">
          <TextInput
            label="Email"
            placeholder="Email address"
            leftSection={<IconMail size={16} />}
            name="email"
            type="email"
            error={!!loginState.genericError || loginState.emailError}
            required
          />
          <TextInput
            label="Password"
            placeholder="Password"
            leftSection={<IconLock size={16} />}
            rightSection={
              <ActionIcon
                radius="md"
                variant="subtle"
                onClick={handleTogglePassword}
              >
                {showPassword ? (
                  <IconEyeClosed size={16} />
                ) : (
                  <IconEye size={16} />
                )}
              </ActionIcon>
            }
            name="password"
            type={showPassword ? 'text' : 'password'}
            error={!!loginState.genericError}
            required
          />
          {loginState.genericError && (
            <Text size="sm" c="red" className="flex items-center gap-2">
              <IconAlertCircle size={16} />
              {loginState.genericError}
            </Text>
          )}
          <Button className="mt-8 ml-auto" type="submit">
            Log In
          </Button>
        </form>
      </Flex>
    </Flex>
  );
};

export default LoginPage;
