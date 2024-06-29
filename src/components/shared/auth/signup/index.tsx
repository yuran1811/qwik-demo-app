import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';

export default component$(() => {
  return (
    <div class="flex w-full max-w-sm flex-col rounded-md bg-gray-900 p-6 text-gray-100 dark:bg-gray-50 dark:text-gray-800 sm:p-10">
      <div class="mb-8 text-center">
        <h1 class="my-3 text-4xl font-bold">Sign up</h1>
        <p class="text-sm text-gray-400 dark:text-gray-600">Create new account</p>
      </div>
      <div class="space-y-12">
        <div class="space-y-4">
          <div>
            <label for="username" class="mb-2 block text-sm">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Type your username"
              class="w-full rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-gray-100 dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
            />
          </div>
          <div>
            <div class="mb-2 flex justify-between">
              <label for="password" class="text-sm">
                Password
              </label>
            </div>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Type your password"
              class="w-full rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-gray-100 dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
            />
          </div>
        </div>
        <div class="space-y-2">
          <div>
            <button
              type="submit"
              class="w-full rounded-md bg-violet-400 px-8 py-3 font-semibold text-gray-900 dark:bg-violet-600 dark:text-gray-50"
            >
              Sign up
            </button>
          </div>
          <p class="px-6 text-center text-sm text-gray-400 dark:text-gray-600">
            Already have an account?{' '}
            <Link href="/auth/login" class="text-violet-400 hover:underline dark:text-violet-600">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
});
