import { Middleware } from '@nuxt/types';

const consultantNotAuthenticated: Middleware = ({ store, redirect }) => {
  if (store.state.consultant.auth) {
    return redirect('/consultant');
  }
};

export default consultantNotAuthenticated;
