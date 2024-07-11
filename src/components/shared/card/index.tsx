import { component$, Slot } from '@builder.io/qwik';

export default component$(() => {
  return (
    <div class="max-w-xs rounded-md bg-gray-900 text-gray-100 shadow-md dark:bg-gray-50 dark:text-gray-800">
      <div class="gradient-bg-2 h-40 w-full rounded-t-md bg-gray-500 object-cover object-center dark:bg-gray-500" />
      <div class="flex flex-col justify-between space-y-8 p-6">
        <div class="space-y-2">
          <h2 class="text-2xl font-semibold tracking-wide">
            <Slot name="title" />
          </h2>
          <p class="text-gray-100 dark:text-gray-800">
            <Slot name="description" />
          </p>
        </div>
        <div class="flex w-full cursor-pointer items-center justify-center font-semibold tracking-wide">
          <Slot name="button" />
        </div>
      </div>
    </div>
  );
});
