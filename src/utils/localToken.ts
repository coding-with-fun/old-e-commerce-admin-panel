import env from '../env';

export const getUserToken = (): string | null => {
    return localStorage.getItem(env.app.token_id);
};

export const setUserToken = (token: string = ''): void => {
    localStorage.setItem(env.app.token_id, token);
};
