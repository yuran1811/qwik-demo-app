import { component$ } from '@builder.io/qwik';
import type { Cookie, RequestHandler } from '@builder.io/qwik-city';

import LoginRequired from '~/components/shared/login-required';

export const onRequest: RequestHandler = async ({ cookie, redirect }) => {
  const checkAuthorization = (cookie: Cookie) => {
    const cookies = cookie.getAll();
    return Object.keys(cookies).includes('authjs.session-token');
  };

  const isAuthorized = checkAuthorization(cookie);

  if (!isAuthorized) {
    throw redirect(302, '/auth/login');
  } else {
    throw redirect(303, '/');
  }
};

export default component$(() => <LoginRequired />);
