import { component$ } from '@builder.io/qwik';
import { Form, routeAction$, z, zod$ } from '@builder.io/qwik-city';

import { getHeadInfo } from '~/utils';

import prisma from '~/libs/prisma';

import Signup from '~/components/shared/auth/signup';

export const useCreateUser = routeAction$(
  async (data) => {
    try {
      const validUser = await prisma.user.findUnique({ where: { username: data.username } });
      if (validUser)
        return {
          success: false,
          message: 'User already exists',
        };

      const user = await prisma.user.create({ data });

      return {
        success: true,
        user,
      };
    } catch (error: any) {
      return {
        success: false,
        message: 'error creating user',
        error: error,
      };
    }
  },
  zod$({
    username: z.string().trim().min(1, { message: 'Username is required' }),
    password: z.string().trim().min(1, { message: 'Password is required' }),
  }),
);

export default component$(() => {
  const action = useCreateUser();

  return (
    <Form action={action} spaReset class="flex items-center justify-center p-6">
      <Signup
        errorMessage={action.value?.message}
        success={action.value?.success}
        fieldErrors={action.value?.fieldErrors}
      />
    </Form>
  );
});

export const head = getHeadInfo('Sign up');
