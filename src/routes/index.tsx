import { component$ } from '@builder.io/qwik';

import Hero from '~/components/shared/hero';

import { getHeadInfo } from '~/utils';

export default component$(() => (
  <>
    <Hero />
  </>
));

export const head = getHeadInfo('Home', {
  meta: [
    {
      name: 'Home',
      content: 'syt homepage',
    },
  ],
});
