import { component$ } from '@builder.io/qwik';

import Err404 from '~/components/shared/err404';

import { getHeadInfo } from '~/utils';

export default component$(() => <Err404 />);

export const head = getHeadInfo('Page not found', {
  meta: [
    {
      name: 'Page not found',
      content: 'Page not found',
    },
  ],
});
