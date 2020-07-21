import Vue from 'vue';
import { Plugin } from '@nuxt/types';

const magicCodes: Plugin = ({ store }) => {
  Vue.filter('magiccodes', (value: string) => {
    return value
      .replace(
        /\*\|CONSULTANT_FIRSTNAME\|\*/g,
        store.state.registration.apiStatus.consultant.firstName
      )
      .replace(
        /\*\|BRANCH_NAME\|\*/g,
        store.state.registration.apiStatus.branch.name
      );
  });
};

export default magicCodes;
