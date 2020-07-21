import { GetterTree } from 'vuex';
import { Registration } from '~/types';
import Get from 'lodash/get';

export default <GetterTree<Registration.State, Registration.State>>{
  /**
   * Get the full name of the registration candidate
   *
   * @param {Registration.State} state
   * @returns {(string | null)}
   */
  candidateFullName(state: Registration.State): string | null {
    if (!state.apiStatus) return null;

    const firstName = Get(state, 'apiStatus.candidate.firstName');
    const lastName = Get(state, 'apiStatus.candidate.lastName');

    let name = `${firstName} ${lastName}`.trim();

    return name.length > 0 ? name : null;
  },
};
