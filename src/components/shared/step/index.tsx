import { component$ } from '@builder.io/qwik';

export default component$(() => {
  return (
    <div class="space-y-2 bg-gray-800 p-4 text-gray-100 dark:bg-gray-100 dark:text-gray-800">
      <h3 class="text-base font-semibold">Step 3: Fill in order details</h3>
      <div class="flex max-w-xs space-x-3">
        <span class="h-2 w-12 rounded-sm bg-violet-400 dark:bg-violet-600"></span>
        <span class="h-2 w-12 rounded-sm bg-violet-400 dark:bg-violet-600"></span>
        <span class="h-2 w-12 rounded-sm bg-gray-100 dark:bg-gray-800"></span>
        <span class="h-2 w-12 rounded-sm bg-gray-600 dark:bg-gray-400"></span>
        <span class="h-2 w-12 rounded-sm bg-gray-600 dark:bg-gray-400"></span>
      </div>
    </div>
  );
});
