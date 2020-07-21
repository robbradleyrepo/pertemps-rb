import { Middleware } from '@nuxt/types';

const candidateNotAuthenticated: Middleware = ({ store, redirect }) => {
  if (store.state.candidate.auth) {
    return redirect('/candidate');
  }
};

export default candidateNotAuthenticated;
