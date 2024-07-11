import needAuth, { onRequest } from '~/components/shared/need-auth';

import { getHeadInfo } from '~/utils';

export { onRequest };

export default needAuth;

export const head = getHeadInfo('Profile');
