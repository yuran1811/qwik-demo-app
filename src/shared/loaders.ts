import { routeLoader$ } from '@builder.io/qwik-city';

import prisma from '~/libs/prisma';

export const useServerTime = routeLoader$(() => new Date());

export const usePathname = routeLoader$(({ pathname }) => pathname);

export const useUserProfile = routeLoader$(async ({ params }) => {
  const userId = params.userId;

  const user = await prisma.user.findUnique({ where: { id: +userId } });
  if (!user) return null;

  const redeemHistory = await prisma.redeemHistory.findMany({ where: { userId: +userId } });

  return {
    username: user.username,
    points: user.points,
    redeemHistory,
  };
});

export const useRedeemItem = routeLoader$(async () => {
  const redeemItems = await prisma.redeemItem.findMany({ cacheStrategy: { ttl: 60 * 5 } });
  return redeemItems;
});
