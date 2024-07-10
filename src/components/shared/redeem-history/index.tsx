import { type HTMLAttributes, component$ } from '@builder.io/qwik';
import type { RedeemHistory, RedeemItem } from '@prisma/client';

export const RedeemHistoryItem = component$(
  (props: { redeemItem?: RedeemItem; redeemHistory: RedeemHistory } & HTMLAttributes<HTMLDivElement>) => {
    return (
      <div
        {...props}
        class="relative flex w-full flex-col items-center justify-between gap-4 rounded-lg bg-gray-800 px-4 py-5 dark:bg-gray-200 dark:text-gray-800"
      >
        {props.redeemItem && (
          <div class="w-full px-3">
            <span class="text-xl font-bold">{props.redeemItem.name}</span>
            <span class="absolute right-0 top-0 bg-gradient-to-b from-white from-20% to-transparent to-90% bg-clip-text p-3 text-7xl font-extrabold text-transparent opacity-45 dark:from-black">
              {props.redeemItem.cost}
            </span>
          </div>
        )}
        <p class="px-3 text-gray-400 dark:text-gray-500">
          {props.redeemHistory.redeemedAt.toLocaleString('vi-VN', { timeZone: 'Asia/Bangkok' })}
        </p>
      </div>
    );
  },
);

export default component$((props: { redeemItems: RedeemItem[]; redeemHistories: RedeemHistory[] }) => {
  const redeemItemMap = new Map(props.redeemItems.map((redeemItem) => [redeemItem.id, redeemItem]));

  return (
    <div class="flex max-h-[480px] w-full max-w-sm flex-col justify-center rounded-xl bg-gray-900 p-6 text-gray-100 shadow-md dark:bg-gray-50 dark:text-gray-800 sm:px-12">
      <h2 class="mb-3 text-center text-xl font-semibold sm:text-2xl"> Redeem History</h2>
      <div class="flex h-full flex-col items-center justify-start gap-4 overflow-y-auto overflow-x-hidden">
        {!props.redeemHistories.length && <div class="text-gray-500">No redeem history.</div>}
        {props.redeemHistories.reverse().map((redeemHistory) => (
          <RedeemHistoryItem
            key={redeemHistory.id}
            redeemItem={redeemItemMap.get(redeemHistory.redeemId)}
            redeemHistory={redeemHistory}
          />
        ))}
      </div>
    </div>
  );
});
