export const APP_NAME = 'syt';

export const PUBLIC_ROUTES = [
  {
    path: '/',
    name: 'Home',
    authRequired: false,
  },
  {
    path: '/redeem',
    name: 'Redeem',
    authRequired: true,
  },
  {
    path: '/profile',
    name: 'Profile',
    authRequired: true,
  },
];
