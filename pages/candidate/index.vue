<template>
  <main class="container">
    <RegistrationIntro />
  </main>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Registration } from '~/types';
import RegistrationIntro from '~/components/candidate/registration/Intro.vue';
import { getFakeData } from '~/assets/api/RegistrationStatus';

const useFakeData = false;

@Component({
  components: { RegistrationIntro },
  middleware: 'candidate/authenticated',
  async fetch({ store, isDev, $axios }) {
    if (!store.state.registration.apiStatus) {
      try {
        if (useFakeData && isDev) {
          const response = await getFakeData();
          if (response) store.commit('registration/setApiStatus', response);
        } else {
          const response = await $axios.get(
            `${process.env.apiUrl}API/v1/RegistrationStatus/${store.state.candidate.registrationId}`
          );

          if (response.data.error) {
            throw new Error(response.data.error);
          }

          if (response.data) {
            store.commit('registration/setApiStatus', response.data);
          }
        }
      } catch (error) {
        throw new Error(error);
      }
    }
  },
})
export default class Index extends Vue {
  apiData?: Registration.ApiData;
  responseReceived: boolean = false;
}
</script>

<style lang="scss" scoped>
@import '~assets/sass/forms/candidate/base';
.container {
  height: 100%;
  background-color: #93a6be;
  background-image: linear-gradient(to top, #6a819e, #c2d1e0);
  color: #fff;
}
</style>
