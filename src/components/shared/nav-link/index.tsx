import { type PropFunction, component$, useContext } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';

import { PUBLIC_ROUTES } from '~/constants';
import { UserContext } from '~/routes/layout';
import { checkPathInclude, classnames } from '~/utils';

export const NavLinkMobile = component$(
  (props: { pathname?: string; handleChange$: PropFunction<(e: Event) => void> }) => {
    const userContext = useContext(UserContext);

    const extractedPath = props.pathname || '';

    return (
      <ul class={classnames('flex flex-col items-center justify-start gap-4 text-xl sm:hidden')}>
        {PUBLIC_ROUTES.map((_) => (
          <li class="flex" key={`${_.path}--${_.name}`} onClick$={props.handleChange$}>
            <Link
              href={_.path + (_.authRequired && userContext.value ? `/user/${userContext.value.id}` : '')}
              class={classnames(
                'dark:border- -mb-1 flex h-12 items-center px-4 font-medium',
                checkPathInclude(extractedPath, _.path) && 'text-violet-400 dark:text-violet-600',
              )}
            >
              {_.name}
            </Link>
          </li>
        ))}
      </ul>
    );
  },
);

export default component$((props: { pathname?: string }) => {
  const userContext = useContext(UserContext);

  const extractedPath = props.pathname || '';

  return (
    <ul class={classnames('hidden items-stretch space-x-3 sm:flex')}>
      {PUBLIC_ROUTES.map((_) => (
        <li class="flex" key={`${_.path}--${_.name}`}>
          <Link
            href={_.path + (_.authRequired && userContext.value ? `/user/${userContext.value.id}` : '')}
            class={classnames(
              'dark:border- -mb-1 flex items-center border-b-2 px-4 font-medium',
              checkPathInclude(extractedPath, _.path) &&
                'border-violet-400 text-violet-400 dark:border-violet-600 dark:text-violet-600',
            )}
          >
            {_.name}
          </Link>
        </li>
      ))}
    </ul>
  );
});
