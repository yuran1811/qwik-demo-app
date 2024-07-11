import type { Provider } from '@auth/core/providers';
import type { Awaitable, User } from '@auth/core/types';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { QwikAuth$ } from '@auth/qwik';
import Credentials from '@auth/qwik/providers/credentials';
import type { User as PrismaUser } from '@prisma/client';

import prisma from '~/libs/prisma';

export const { onRequest, useSession, useSignIn, useSignOut } = QwikAuth$(({ env }) => ({
  secret: env.get('AUTH_SECRET') || 'secret',
  adapter: PrismaAdapter(prisma),
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
      authorize: async (credentials) => {
        if (!credentials || !(credentials?.username as string).length || !(credentials?.password as string).length)
          return null;
        console.log('credentials: ', credentials);

        try {
          await prisma.redeemItem.findMany();
          return null;

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
        } catch (error) {
          console.error(`[err][plugin@auth]: ${error}\n######`);
          return null;
        }
      },
    }),
  ] as Provider[],
  pages: {
    signIn: '/auth/login',
  },
}));
