import { Plugin } from '@nuxt/types';
import createPersistedState from 'vuex-persistedstate';
import Cookies from 'js-cookie';

const cookieExpiration: number = 5 / 1440; // 5 mins / 1440 mins in a day

const cookieStorage = {
  getItem: (key: string) => Cookies.getJSON(key),
  setItem: (key: string, value: any) =>
    Cookies.set(key, value, { expires: cookieExpiration, secure: false }),
  removeItem: (key: string) => Cookies.remove(key),
};

const vuexPersist: Plugin = ({ store }) => {
  createPersistedState({
    key: 'pngprf',
    paths: ['candidate.auth', 'candidate.registrationId', 'consultant.auth'],
    storage: cookieStorage,
    getState: cookieStorage.getItem,
    setState: cookieStorage.setItem,
  })(store);
};

export default vuexPersist;
