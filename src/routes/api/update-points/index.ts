import type { RequestHandler } from '@builder.io/qwik-city';
import { type User } from '@prisma/client';

import prisma from '~/libs/prisma';

export const onPost: RequestHandler = async ({ parseBody, json }) => {
  const body = (await parseBody()) as User;
  const { points, username, password } = body;

  try {
    await prisma.user.update({
      where: {
        username,
        password,
      },
      data: {
        points: { increment: +points },
      },
    });

    json(200, { success: true });
  } catch (error) {
    json(400, { success: false });
  }
};
