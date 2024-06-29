import { type PropFunction, component$ } from '@builder.io/qwik';
import type { RedeemItem } from '@prisma/client';
import { Modal } from '@qwik-ui/headless';

import Card from '~/components/shared/card';

export const RedeemItemCard = component$(
  (props: {
    currentPoints: number;
    redeemItem: RedeemItem;
    updatePickedRedeemItem$: PropFunction<(p: RedeemItem) => void>;
  }) => (
    <Card>
      <span q:slot="title">{props.redeemItem.name}</span>
      <span q:slot="description">{props.redeemItem.description}</span>
      <Modal.Trigger
        q:slot="button"
        class="w-full appearance-none rounded-md bg-violet-400 p-3 text-gray-900 disabled:bg-slate-500 dark:bg-violet-600 dark:text-gray-50"
        disabled={props.currentPoints < props.redeemItem.cost}
        onClick$={() => props.updatePickedRedeemItem$(props.redeemItem)}
      >
        Redeem
      </Modal.Trigger>
    </Card>
  ),
);

export default component$(
  (props: {
    currentPoints: number;
    redeemItems: RedeemItem[];
    updatePickedRedeemItem$: PropFunction<(p: RedeemItem) => void>;
  }) => (
    <>
      {props.redeemItems.map((redeemItem) => (
        <RedeemItemCard
          key={redeemItem.id}
          currentPoints={props.currentPoints}
          redeemItem={redeemItem}
          updatePickedRedeemItem$={props.updatePickedRedeemItem$}
        />
      ))}
    </>
  ),
);
