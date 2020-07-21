import { Candidate } from '~/types';
import { GetterTree } from 'vuex';

export default <GetterTree<Candidate.State, Candidate.State>>{
  fullName(state: Candidate.State) {
    if (!state.auth) return null;

    let name = '';

    if (state.auth.firstName) {
      name += state.auth.firstName;
    }

    if (state.auth.lastName) {
      name += ` ${state.auth.lastName}`;
    }

    return name.length > 0 ? name : null;
  },
};
