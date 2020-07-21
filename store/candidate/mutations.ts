import { MutationTree } from 'vuex';
import { Candidate } from '~/types';

export default <MutationTree<Candidate.State>>{
  setAuth(state: Candidate.State, auth: Candidate.User | null) {
    state.auth = auth;
  },

  setRegistrationId(state: Candidate.State, registrationId: string) {
    state.registrationId = registrationId;
  },
};
