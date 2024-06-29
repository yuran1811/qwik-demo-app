import type { Provider } from '@auth/core/providers';
import Credentials from '@auth/core/providers/credentials';
import type { Awaitable, User } from '@auth/core/types';
import { serverAuth$ } from '@builder.io/qwik-auth';
import type { User as PrismaUser } from '@prisma/client';

import prisma from '~/libs/prisma';

export const { onRequest, useAuthSession, useAuthSignin, useAuthSignout } = serverAuth$(({ env }) => ({
  secret: env.get('AUTH_SECRET') || 'secret',
  trustHost: true,
  callbacks: {
    async jwt({ token, user }) {
      user && (token.user = user);
      return token;
    },
    async session({ session, token }: any) {
      session.user = token.user;
      return Promise.resolve(session);
    },
  },
  providers: [
    Credentials({
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const user = await prisma.user.findUnique({
          where: {
            username: ((credentials.username as string) || '').trim(),
            password: ((credentials.password as string) || '').trim(),
          },
        });
        if (!user) return null;

        return {
          id: user?.id,
          username: user?.username,
          points: user?.points,
        } as Awaitable<(User & PrismaUser) | null>;
      },
    }),
  ] as Provider[],
  pages: {
    signIn: '/auth/login',
  },
}));
