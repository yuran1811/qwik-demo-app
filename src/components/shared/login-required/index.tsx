import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';

export default component$(() => {
  return (
    <section class="flex h-full items-center p-16 text-gray-100 dark:text-gray-800">
      <div class="container mx-auto my-8 flex flex-col items-center justify-center px-5">
        <div class="flex w-full max-w-xl flex-col items-center gap-3 text-center">
          <h2 class="text-4xl font-extrabold text-gray-200 dark:text-gray-500">Login required</h2>
          <p class="text-lg md:text-xl">Please login to continue</p>
          <Link
            href="/auth/login"
            class="mt-4 w-max rounded bg-violet-400 px-8 py-3 font-semibold text-gray-900 dark:bg-violet-600 dark:text-gray-50"
          >
            Login
          </Link>
        </div>
      </div>
    </section>
  );
});
