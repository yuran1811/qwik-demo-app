import { component$ } from '@builder.io/qwik';
import { Form, routeAction$, z, zod$ } from '@builder.io/qwik-city';

import Signup from '~/components/shared/auth/signup';

import prisma from '~/libs/prisma';
import { supabase } from '~/libs/supabase';

import { getHeadInfo } from '~/utils';

export const useCreateUser = routeAction$(
  async (data) => {
    const authResponse = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          displayName: data.username,
          username: data.username,
        },
        emailRedirectTo: '/profile',
      },
    });

    console.log('authResponse: ', authResponse);

    if (authResponse.error)
      return {
        success: false,
        message: authResponse.error.message,
      };

    // const validUser = await prisma.user.findUnique({ where: { username: data.username } });
    // if (validUser)
    //   return {
    //     success: false,
    //     message: 'User already exists',
    //   };

    const userBasic = await prisma.user.create({ data: { username: data.username, password: data.password } });

    return {
      success: true,
      user: authResponse.data.user,
      userBasic,
    };
  },
  zod$({
    email: z.string().email(),
    username: z.string().trim().min(1),
    password: z.string().trim().min(6),
  }),
);

export default component$(() => {
  const action = useCreateUser();

  return (
    <>
      <Form action={action} spaReset class="flex items-center justify-center p-6">
        <Signup />
      </Form>
    </>
  );
});

export const head = getHeadInfo('Sign up');
