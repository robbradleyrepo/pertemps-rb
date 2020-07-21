import { ActionTree } from 'vuex';
import { Candidate } from '~/types';

const defaultRegistrationId = '80F5A952-6A6C-4CE3-A992-156960D69389';

const exampleUserData: Candidate.User = {
  id: 1,
  firstName: 'John',
  lastName: 'Smith',
  email: 'peter.squirrel@googlemail.com',
  phone: '00447896207506',
  dob: '1979-07-18',
};

export default <ActionTree<Candidate.State, Candidate.State>>{
  fakeLogin({ commit }) {
    commit('setAuth', exampleUserData);
  },

  logout({ commit }) {
    commit('setAuth', null);
    commit('setRegistrationId', defaultRegistrationId);
  },
};
