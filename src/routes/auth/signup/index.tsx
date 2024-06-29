import { component$ } from '@builder.io/qwik';
import { Form, routeAction$, z, zod$ } from '@builder.io/qwik-city';

import prisma from '~/libs/prisma';

import Signup from '~/components/shared/auth/signup';

import { getHeadInfo } from '~/utils';

export const useCreateUser = routeAction$(
  async (data) => {
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
  },
  zod$({
    username: z.string().trim().min(1),
    password: z.string().trim().min(1),
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
