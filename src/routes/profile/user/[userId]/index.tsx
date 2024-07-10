import { component$, useContext } from '@builder.io/qwik';
import { Form } from '@builder.io/qwik-city';

import LoginRequired from '~/components/shared/login-required';
import Profile from '~/components/shared/profile';
import RedeemHistory from '~/components/shared/redeem-history';

import { UserContext } from '~/routes/layout';

import { getHeadInfo } from '~/utils';

import { useUpdatePoints } from '~/shared/actions';
export { useUpdatePoints } from '~/shared/actions';

import { useRedeemItem, useUserProfile } from '~/shared/loaders';
export { useRedeemItem, useUserProfile } from '~/shared/loaders';

export default component$(() => {
  const userProfile = useUserProfile();
  const redeemItems = useRedeemItem();

  const userContext = useContext(UserContext);

  const updatePoints = useUpdatePoints();

  return (
    <>
      {!userProfile.value || !userContext.value || userProfile.value?.username !== userContext.value?.username ? (
        <LoginRequired />
      ) : (
        <div class="container mx-auto flex flex-col items-center justify-center gap-4 p-4 pt-12 md:flex-row md:items-start">
          <Profile name={userProfile.value.username}>
            <div class="space-y-4 divide-y divide-gray-700 text-center dark:divide-gray-300">
              <div class="my-2 space-y-1">
                <h2 class="text-xl font-semibold sm:text-2xl">Redeem Points</h2>
                <p class="px-5 text-xs text-gray-400 dark:text-gray-600 sm:text-base">
                  You have {userProfile.value.points} points.
                </p>
              </div>

              <Form class="flex flex-col items-center justify-center gap-4 py-4" action={updatePoints} spaReset>
                <input class="hidden" type="text" name="username" value={userProfile.value.username} />
                <input
                  type="text"
                  name="points"
                  class="w-full max-w-64 rounded-md bg-gray-800 py-2 text-gray-100 focus:border-violet-400 focus:bg-gray-900 focus:outline-none dark:bg-gray-100 dark:text-gray-800 focus:dark:border-violet-600 focus:dark:bg-gray-50"
                  placeholder="Amount of points"
                />
                <button
                  type="submit"
                  class="w-max rounded bg-gray-100 px-6 py-3 font-semibold text-gray-800 dark:bg-gray-800 dark:text-gray-100"
                >
                  Accumulate point
                </button>
              </Form>
            </div>
          </Profile>

          <RedeemHistory
            redeemItems={redeemItems.value || []}
            redeemHistories={userProfile.value?.redeemHistory || []}
          />
        </div>
      )}
    </>
  );
});

export const head = getHeadInfo('Redeem');
