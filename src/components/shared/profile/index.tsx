import { Slot, component$ } from '@builder.io/qwik';

export default component$((props: { name?: string; addr?: string }) => {
  return (
    <div class="flex w-full max-w-sm flex-col justify-center rounded-xl bg-gray-900 p-6 text-gray-100 shadow-md dark:bg-gray-50 dark:text-gray-800 sm:min-h-[480px] sm:px-12">
      <div class="mx-auto aspect-square h-32 w-32 rounded-full bg-gray-500 dark:bg-gray-500" />
      <div class="space-y-4 divide-y divide-gray-700 text-center dark:divide-gray-300">
        <div class="my-2 space-y-1">
          <h2 class="text-xl font-semibold sm:text-2xl">{props.name || 'Guest'}</h2>
          <p class="px-5 text-xs text-gray-400 dark:text-gray-600 sm:text-base">{props.addr || ''}</p>
        </div>
        <Slot />
      </div>
    </div>
  );
});
