import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';

const makePrisma = () => new PrismaClient().$extends(withAccelerate());

declare const globalThis: { prismaGlobal: ReturnType<typeof makePrisma> } & typeof global;

if (process.env.NODE_ENV !== 'production') {
  if (!globalThis.prismaGlobal) {
    globalThis.prismaGlobal = makePrisma();
  }
}

const prisma = globalThis.prismaGlobal ?? makePrisma();

export default prisma;
