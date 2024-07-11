import { component$ } from '@builder.io/qwik';

import { QwikLogo } from '~/components/icons/qwik';
import Signup from '~/components/shared/auth/signup';
import Banner from '~/components/shared/banner';
import Card from '~/components/shared/card';
import ConfettiButton from '~/components/shared/confetti-button';
import Err404 from '~/components/shared/err404';
import Hero from '~/components/shared/hero';
import Modal from '~/components/shared/modal';
import Profile from '~/components/shared/profile';
import Step from '~/components/shared/step';
import Tab from '~/components/shared/tab';

import { getHeadInfo } from '~/utils';

export default component$(() => {
  return (
    <>
      <div class="flex w-full flex-col items-center justify-start gap-4">
        <QwikLogo />
        <ConfettiButton />
        <div class="flex w-full flex-row flex-wrap items-center justify-center gap-3">
          <Signup />
          {/* <Login /> */}
        </div>
        <Banner />
        <Card />
        <Err404 />
        <Hero />
        <Modal />
        <Profile />
        <Step />
        <Tab />
      </div>
    </>
  );
});

export const head = getHeadInfo('Demo');
