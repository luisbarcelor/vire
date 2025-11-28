'use server';

import { LoginFormData } from '@/server/models';
import { loginSchema } from '@/server/validation/schemas';
import { loginUser } from '@/server/services/auth-service';
import { redirect } from 'next/navigation';
import { getFieldErrors } from '@/server/validation/helpers';


interface LoginActionState {
  genericError?: string;
  emailError: string;
}

export const loginAction = async (prevState: LoginActionState, formData: FormData): Promise<LoginActionState> => {
  const loginFormData: LoginFormData = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const validatedLoginData = loginSchema.safeParse(loginFormData);

  if (!validatedLoginData.success) {
    return {
      emailError: getFieldErrors(validatedLoginData.error)['email'],
    }
  }

  const { email, password } = validatedLoginData.data;
  const login: boolean = await loginUser(email, password);

  if (!login) {
    return { genericError: 'Invalid email or password', emailError: '' };
  }

  redirect('/dashboard');
}