import { MutationTree } from 'vuex';
import { Consultant } from '~/types';

export default <MutationTree<Consultant.State>>{
  setAuth(state: Consultant.State, auth: Consultant.User) {
    state.auth = auth;
  },
};
