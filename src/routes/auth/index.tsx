import { component$ } from '@builder.io/qwik';
import type { Cookie, RequestHandler } from '@builder.io/qwik-city';

import LoginRequired from '~/components/shared/login-required';

import { getHeadInfo } from '~/utils';

export const onRequest: RequestHandler = async ({ cookie, redirect }) => {
  const checkAuthorization = (cookie: Cookie) => {
    const cookies = cookie.getAll();
    return Object.keys(cookies).includes('authjs.session-token') || Object.keys(cookies).includes('session');
  };

  const isAuthorized = checkAuthorization(cookie);

  if (!isAuthorized) {
    throw redirect(302, '/auth/login');
  } else {
    throw redirect(303, '/');
  }
};

export default component$(() => <LoginRequired />);

export const head = getHeadInfo('Profile');
