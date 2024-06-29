import { component$ } from '@builder.io/qwik';

export default component$(() => {
  return (
    <div class="bg-violet-400 p-6 py-12 text-gray-900 dark:bg-violet-600 dark:text-gray-50">
      <div class="container mx-auto">
        <div class="flex flex-col items-center justify-between lg:flex-row">
          <h2 class="text-center text-6xl font-bold tracking-tighter">
            Up to <br class="sm:hidden" />
            50% Off
          </h2>
          <div class="space-x-2 py-2 text-center lg:py-0">
            <span>Plus free shipping! Use code:</span>
            <span class="text-lg font-bold">MAMBA</span>
          </div>
          <a
            href="#"
            rel="noreferrer noopener"
            class="mt-4 block rounded-md border border-gray-400 bg-gray-50 px-5 py-3 text-gray-900 lg:mt-0 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-50"
          >
            Shop Now
          </a>
        </div>
      </div>
    </div>
  );
});
