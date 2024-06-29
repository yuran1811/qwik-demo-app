import { component$ } from '@builder.io/qwik';
import { Form } from '@builder.io/qwik-city';

import Login from '~/components/shared/auth/login';

import { useAuthSignin } from '~/routes/plugin@auth';

import { getHeadInfo } from '~/utils';

export default component$(() => {
  const action = useAuthSignin();

  return (
    <>
      <Form action={action} spaReset class="flex items-center justify-center p-6">
        <input type="hidden" name="providerId" value="credentials" />
        <input type="hidden" name="options.callbackUrl" value="/" />
        <Login />
      </Form>
    </>
  );
});

export const head = getHeadInfo('Login');
