import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';

export default component$(() => {
  return (
    <section class="bg-gray-800 text-gray-100 dark:bg-gray-100 dark:text-gray-800">
      <div class="container mx-auto flex flex-col items-center px-4 py-16 text-center md:px-10 md:py-32 lg:px-32 xl:max-w-3xl">
        <h1 class="text-4xl font-bold leading-none sm:text-5xl">
          Stay <span class="text-violet-400 dark:text-violet-600">away</span> from your device
        </h1>
        <p class="mb-12 mt-8 px-8 text-lg">
          Redeem gifts, earn points, and get discounts by staying away from your device.
        </p>
        <div class="flex flex-wrap justify-center">
          <Link
            target="_parent"
            href="/auth/login"
            class="m-2 rounded bg-violet-400 px-8 py-3 text-lg font-semibold text-gray-900 dark:bg-violet-600 dark:text-gray-50"
          >
            Get started
          </Link>
          <button class="m-2 hidden rounded border border-gray-700 px-8 py-3 text-lg text-gray-50 dark:border-gray-300 dark:text-gray-900">
            Learn more
          </button>
        </div>
      </div>
    </section>
  );
});
