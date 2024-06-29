import type { DocumentHead, DocumentHeadValue } from '@builder.io/qwik-city';

import { APP_NAME } from '~/constants';

export const getHeadInfo = (content: string, options?: DocumentHeadValue) =>
  ({
    title: `${APP_NAME} | ${content}`,
    ...options,
  }) as DocumentHead;

export const classnames = (...arg: (string | boolean)[]) => arg.filter(Boolean).join(' ');

export const checkPathInclude = (path: string, pattern: string) =>
  pattern.length === 1 ? path === pattern : path.substring(0, pattern.length) === pattern;
