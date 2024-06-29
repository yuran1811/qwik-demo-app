import {
  component$,
  createContextId,
  type Signal,
  Slot,
  useContextProvider,
  useSignal,
  useStyles$,
} from '@builder.io/qwik';
import type { RequestHandler } from '@builder.io/qwik-city';
import type { User } from '@prisma/client';

import styles from './styles.css?inline';
import { useAuthSession } from './plugin@auth';

import Footer from '~/components/shared/footer';
import Header from '~/components/shared/header';

import { usePathname, useServerTime } from '~/shared/loaders';
export { usePathname, useServerTime } from '~/shared/loaders';

export const UserContext = createContextId<Signal<User>>('user-context');

export const onGet: RequestHandler = async ({ url, cacheControl }) => {
  // https://qwik.dev/docs/caching/
  cacheControl({
    maxAge: 0,
    sMaxAge: 0,
    staleWhileRevalidate: 0,
  });

  if (url.pathname === '/') {
    cacheControl({
      public: true,
      maxAge: 5,
      staleWhileRevalidate: 60 * 4,
    });
    cacheControl(
      {
        maxAge: 5,
        staleWhileRevalidate: 60 * 4,
      },
      'CDN-Cache-Control',
    );
  }
};

export default component$(() => {
  useStyles$(styles);
  const pathname = usePathname().value;
  const serverTime = useServerTime().value;

  const session = useAuthSession();
  const sessionSignal = useSignal(session?.value?.user as User | undefined);
  useContextProvider(UserContext, sessionSignal);

  return (
    <>
      <Header pathname={pathname} session={session ? session.value || undefined : undefined} />
      <main>
        <Slot />
      </main>
      <Footer year={serverTime.getFullYear()} />
    </>
  );
});
