import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';

export default component$(() => {
  return (
    <section class="flex h-full items-center p-16 text-gray-100 dark:text-gray-800">
      <div class="container mx-auto my-8 flex flex-col items-center justify-center px-5">
        <div class="max-w-md text-center">
          <h2 class="mb-8 text-9xl font-extrabold text-gray-600 dark:text-gray-400">
            <span class="sr-only">Error</span>404
          </h2>
          <p class="text-2xl font-semibold md:text-3xl">Sorry, we couldn't find this page.</p>
          <p class="mb-8 mt-4 text-gray-400 dark:text-gray-600">
            But dont worry, you can find plenty of other things on our homepage.
          </p>
          <Link
            href="/"
            class="rounded bg-violet-400 px-8 py-3 font-semibold text-gray-900 dark:bg-violet-600 dark:text-gray-50"
          >
            Back to homepage
          </Link>
        </div>
      </div>
    </section>
  );
});
