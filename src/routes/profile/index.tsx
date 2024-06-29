import { component$ } from '@builder.io/qwik';
import type { CookieValue, RequestHandler } from '@builder.io/qwik-city';

import LoginRequired from '~/components/shared/login-required';

import { getHeadInfo } from '~/utils';

export const onRequest: RequestHandler = async ({ cookie, redirect }) => {
  const checkAuthorization = (cookie: CookieValue | null) => !!cookie;

  const isAuthorized = checkAuthorization(cookie.get('authjs.session-token'));

  if (!isAuthorized) {
    throw redirect(302, '/auth/login');
  } else {
    throw redirect(303, '/');
  }
};

export default component$(() => <LoginRequired />);

export const head = getHeadInfo('Profile');
