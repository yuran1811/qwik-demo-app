import { component$ } from '@builder.io/qwik';
import { Form, routeAction$, z, zod$ } from '@builder.io/qwik-city';

import Login from '~/components/shared/auth/login';

import { supabase } from '~/libs/supabase';

import { getHeadInfo } from '~/utils';

export const useAuthWithSupabase = routeAction$(
  async (submittedData, req) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: (submittedData.email as string) || '',
      password: (submittedData.password as string) || '',
    });

    if (error)
      return {
        error: error.message,
      };

    req.cookie.set('session', data.session);
    req.cookie.set('user', data.user);

    req.redirect(302, '/');
  },
  zod$({
    email: z.string().email(),
    password: z.string().trim().min(6),
  }),
);

export default component$(() => {
  const action = useAuthWithSupabase();

  return (
    <>
      <Form action={action} spaReset class="flex items-center justify-center p-6">
        <input type="hidden" name="providerId" value="credentials" />
        <input type="hidden" name="callbackUrl" value="/" />
        <Login />
      </Form>
    </>
  );
});

export const head = getHeadInfo('Login');
