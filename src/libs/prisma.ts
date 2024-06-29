import { PrismaClient } from '@prisma/client';
import path from 'path';

declare const globalThis: { prismaGlobal: PrismaClient } & typeof global;

const filePath = path.join(process.cwd(), 'prisma/demo.db');

const PrismaClientConfig = {
  datasources: {
    db: { url: `file:${filePath}` },
  },
};

if (process.env.NODE_ENV !== 'production') {
  if (!globalThis.prismaGlobal) {
    globalThis.prismaGlobal = new PrismaClient(PrismaClientConfig);
  }
}

const prisma = globalThis.prismaGlobal ?? new PrismaClient(PrismaClientConfig);

export default prisma;
