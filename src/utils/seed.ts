import { PrismaClient, type RedeemItem, type User } from '@prisma/client';

const prisma = new PrismaClient();

const usersToCreate: Omit<User, 'id'>[] = [
  {
    username: 'yuran',
    password: '1',
    points: 0,
  },
  {
    username: 'test',
    password: '1',
    points: 0,
  },
  {
    username: 'minh',
    password: '1',
    points: 0,
  },
  {
    username: 'dang',
    password: '1',
    points: 0,
  },
];

const usersToUpdate: Pick<User, 'username' | 'points'>[] = [
  {
    username: 'yuran',
    points: 150,
  },
  {
    username: 'test',
    points: 100,
  },
];

const redeemItemsToCreate: Omit<RedeemItem, 'id'>[] = [
  {
    name: 'Voucher 10k',
    cost: 10,
    description: 'Use 10 points to get 10.000 VND voucher (Shopee/Grab/...)',
  },
  {
    name: 'Voucher 20k',
    cost: 20,
    description: 'Use 20 points to get 20.000 VND voucher (Shopee/Grab/...)',
  },
];

async function createUsers() {
  for (const data of usersToCreate) {
    await prisma.user.create({ data });
  }
}

async function createRedeemItem() {
  for (const data of redeemItemsToCreate) {
    await prisma.redeemItem.create({ data });
  }
}

async function updateUserPoints() {
  for (const user of usersToUpdate) {
    const { points, username } = user;
    await prisma.user.update({
      where: { username },
      data: { points },
    });
  }
}

(async () => {
  try {
    await createRedeemItem();
    await createUsers();

    await updateUserPoints();
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
})();
