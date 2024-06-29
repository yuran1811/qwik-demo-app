import { $, component$, useContext, useSignal } from '@builder.io/qwik';
import { Form } from '@builder.io/qwik-city';
import type { RedeemItem } from '@prisma/client';
import { Modal } from '@qwik-ui/headless';

import LoginRequired from '~/components/shared/login-required';
import RedeemItems from '~/components/shared/redeem-items';

import { UserContext } from '~/routes/layout';

import { getHeadInfo } from '~/utils';

import { useRedeem } from '~/shared/actions';
export { useRedeem } from '~/shared/actions';

import { useRedeemItem, useUserProfile } from '~/shared/loaders';
export { useRedeemItem, useUserProfile } from '~/shared/loaders';

export default component$(() => {
  const userProfile = useUserProfile();
  const redeemItems = useRedeemItem();

  const userContext = useContext(UserContext);

  const redeem = useRedeem();
  const pickedRedeemItem = useSignal<RedeemItem>();

  const updatePickedRedeemItem$ = $((redeemItem: RedeemItem) => {
    pickedRedeemItem.value = redeemItem;
  });

  return (
    <>
      {!userProfile.value || !userContext.value || userProfile.value?.username !== userContext.value?.username ? (
        <LoginRequired />
      ) : (
        <>
          <div class="space-y-5 p-3 py-10 text-center">
            <h2 class="text-3xl font-bold">Redeem gifts</h2>
            <div class="text-xl">Current points: {userProfile.value.points || 0}</div>
          </div>

          <Modal.Root class="container mx-auto flex flex-wrap items-start justify-center gap-6 p-3">
            <RedeemItems
              currentPoints={userProfile.value.points}
              redeemItems={redeemItems.value}
              updatePickedRedeemItem$={updatePickedRedeemItem$}
            />

            <Modal.Panel class="w-full max-w-md rounded-md border-2 border-violet-400 bg-gray-900 p-6 text-gray-100 shadow-xl dark:border-violet-600 dark:bg-gray-50 dark:text-gray-800">
              <Modal.Title class="flex items-center gap-2 text-xl font-semibold leading-tight tracking-wide">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  class="h-6 w-6 shrink-0 fill-current text-violet-400 dark:text-violet-600"
                >
                  <path d="M451.671,348.569,408,267.945V184c0-83.813-68.187-152-152-152S104,100.187,104,184v83.945L60.329,348.568A24,24,0,0,0,81.432,384h86.944c-.241,2.636-.376,5.3-.376,8a88,88,0,0,0,176,0c0-2.7-.135-5.364-.376-8h86.944a24,24,0,0,0,21.1-35.431ZM312,392a56,56,0,1,1-111.418-8H311.418A55.85,55.85,0,0,1,312,392ZM94.863,352,136,276.055V184a120,120,0,0,1,240,0v92.055L417.137,352Z"></path>
                  <rect width="32" height="136" x="240" y="112"></rect>
                  <rect width="32" height="32" x="240" y="280"></rect>
                </svg>
                Confirm redeem action
              </Modal.Title>
              <Modal.Description class="mt-4 flex-1 text-gray-400 dark:text-gray-600">
                Use {pickedRedeemItem.value?.cost || 0} points to redeem this voucher
              </Modal.Description>
              <div class="mt-4 flex flex-col justify-end gap-3 sm:flex-row">
                <Modal.Close class="rounded-sm px-6 py-2">No</Modal.Close>

                <Form action={redeem}>
                  <input class="hidden" type="text" name="username" value={userProfile.value.username} />
                  <input class="hidden" type="number" name="redeemId" value={+(pickedRedeemItem.value?.id || 0)} />
                  <input class="hidden" type="number" name="points" value={+(pickedRedeemItem.value?.cost || 0)} />
                  <Modal.Close
                    type="submit"
                    class="rounded-sm bg-violet-400 px-6 py-2 text-gray-900 shadow-sm dark:bg-violet-600 dark:text-gray-50"
                  >
                    Yes
                  </Modal.Close>
                </Form>
              </div>
            </Modal.Panel>
          </Modal.Root>
        </>
      )}
    </>
  );
});

export const head = getHeadInfo('Redeem');
