import { getOsEnv } from './libs/env';

const env = {
    env: getOsEnv('VITE_ENV'),

    app: {
        backend_url: getOsEnv('VITE_BACKEND_URL'),
        api_prefix: getOsEnv('VITE_API_PREFIX'),
        token_id: getOsEnv('VITE_TOKEN_ID'),
        app_name: getOsEnv('VITE_APP_NAME'),
    },
};

export default env;
