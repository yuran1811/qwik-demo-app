import { PrismaClient } from '@prisma/client';
import path from 'path';

const PrismaClientConfig = {
  datasources: {
    db: {
      url: 'file:' + path.join(process.cwd(), 'prisma/demo.db'),
    },
  },
};

const prismaClientSingleton = () => new PrismaClient(PrismaClientConfig);

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;
