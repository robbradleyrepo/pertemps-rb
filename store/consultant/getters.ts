import { GetterTree } from 'vuex';
import { Consultant } from '~/types';

export default <GetterTree<Consultant.State, Consultant.State>>{
  fullName(state: Consultant.State) {
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
