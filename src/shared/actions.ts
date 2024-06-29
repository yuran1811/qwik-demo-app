import { routeAction$, z, zod$ } from '@builder.io/qwik-city';

import prisma from '~/libs/prisma';

export const useUpdatePoints = routeAction$(
  async (data) => {
    const user = await prisma.user.findUnique({ where: { username: data.username } });
    if (!user)
      return {
        success: false,
        message: 'User not found!',
      };

    await prisma.user.update({
      data: {
        points: {
          increment: +data.points,
        },
      },
      where: { username: data.username },
    });

    return { success: true };
  },
  zod$({
    username: z.string().trim().min(1),
    points: z.string().trim().min(1),
  }),
);

export const useRedeem = routeAction$(
  async (data) => {
    const user = await prisma.user.findUnique({ where: { username: data.username } });
    if (!user)
      return {
        success: false,
        message: 'User not found!',
      };

    await prisma.redeemHistory.create({
      data: {
        userId: user.id,
        redeemId: +data.redeemId,
        redeemedAt: new Date().toISOString(),
      },
    });
    await prisma.user.update({
      data: {
        points: {
          decrement: +data.points,
        },
      },
      where: { username: data.username },
    });

    return { success: true };
  },
  zod$({
    username: z.string().trim().min(1),
    points: z.string().trim().min(1),
    redeemId: z.string().trim().min(1),
  }),
);
