import { ActionTree } from 'vuex';
import { Consultant } from '~/types';

export default <ActionTree<Consultant.State, Consultant.State>>{
  fakeLogin({ commit }) {
    return new Promise((resolve) => {
      setTimeout(() => {
        commit('setAuth', require('~/assets/api/ConsultantLogin'));
        resolve();
      }, Math.random() * 1000 + 500);
    });
  },

  login({ commit }, authData: Consultant.User) {
    return new Promise((resolve) => {
      commit('setAuth', authData);
      resolve();
    });
  },

  logout({ commit }) {
    commit('setAuth', null);
  },
};
