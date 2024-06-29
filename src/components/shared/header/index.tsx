import type { Session } from '@auth/core/types';
import { $, component$, useSignal } from '@builder.io/qwik';
import { Form, Link } from '@builder.io/qwik-city';

import ThemeToggle from '~/components/shared/theme-toggle';
import NavLink, { NavLinkMobile } from '../nav-link';

import { useAuthSignout } from '~/routes/plugin@auth';

import { classnames } from '~/utils';

const beforeStyle = (active: boolean) =>
  `before:transition-all before:content-[""] before:absolute before:bg-white before:w-full before:h-[0.5rem] before:top-[1.2rem] before:rounded-md before:left-0 ${
    active ? 'before:rotate-[135deg] before:top-[2rem]' : 'before:!bg-white'
  }`;

const afterStyle = (active: boolean) =>
  `after:transition-all after:content-[""] after:absolute after:bg-white after:w-full after:h-[0.5rem] after:bottom-[1.2rem] after:left-0 after:rounded-md ${
    active ? 'after:rotate-[-135deg] after:top-[2rem]' : 'after:!bg-white'
  }`;

export default component$((props: { pathname?: string; session?: Session }) => {
  const signoutAction = useAuthSignout();
  const showMenu = useSignal(false);

  const handleChange$ = $(() => (showMenu.value = !showMenu.value));

  return (
    <header class="sticky left-0 right-0 top-0 bg-gray-800 p-4 text-gray-100 dark:bg-gray-100 dark:text-gray-800">
      <div class="container mx-auto flex h-14 justify-between">
        <div class="flex">
          <NavLink pathname={props.pathname} />
        </div>

        <div class="flex flex-shrink-0 items-center gap-6">
          <ThemeToggle />

          {!props.session?.user ? (
            <>
              <Link href="/auth/signup">
                <button class="rounded border-2 border-violet-400 px-5 py-3 font-semibold text-violet-400 dark:border-violet-600 dark:text-violet-600">
                  Sign up
                </button>
              </Link>

              <Link href="/auth/login">
                <button class="rounded bg-violet-400 px-5 py-3 font-semibold text-gray-900 dark:bg-violet-600 dark:text-gray-50">
                  Log in
                </button>
              </Link>
            </>
          ) : (
            <Form action={signoutAction}>
              <div class="container">
                <input type="hidden" name="provider" value="credentials" />
                <button class="rounded bg-violet-400 px-5 py-3 font-semibold text-gray-900 dark:bg-violet-600 dark:text-gray-50">
                  Sign out
                </button>
              </div>
            </Form>
          )}
        </div>

        <button
          class={classnames(
            'relative flex h-[4rem] min-h-[4rem] w-[4rem] min-w-[4rem] scale-50 cursor-pointer items-center justify-center p-4 transition-all sm:hidden',
            beforeStyle(showMenu.value),
            afterStyle(showMenu.value),
          )}
          onClick$={() => (showMenu.value = !showMenu.value)}
        />
      </div>

      {showMenu.value && (
        <div class="fixed left-0 right-0 top-[88px] z-50 w-screen bg-gray-800 pb-12">
          <NavLinkMobile pathname={props.pathname} handleChange$={handleChange$} />
        </div>
      )}
    </header>
  );
});
