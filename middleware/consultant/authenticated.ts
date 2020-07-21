import { Middleware } from '@nuxt/types';

const consultantAuthenticated: Middleware = ({ store, redirect }) => {
  if (!store.state.consultant.auth) {
    return redirect('/consultant/login');
  }
};

export default consultantAuthenticated;
