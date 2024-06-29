import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';

const makePrisma = () => new PrismaClient().$extends(withAccelerate());

const globalForPrisma = global as unknown as {
  prisma: ReturnType<typeof makePrisma>;
};

export const prisma = globalForPrisma.prisma ?? makePrisma();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = makePrisma();

export default prisma;
