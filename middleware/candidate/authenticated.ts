import { Middleware } from '@nuxt/types';

const candidateAuthenticated: Middleware = ({ store, redirect }) => {
  if (!store.state.candidate.auth) {
    return redirect('/candidate/login');
  }
};

export default candidateAuthenticated;
