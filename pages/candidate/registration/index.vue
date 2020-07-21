<template>
  <main class="registration">
    <!-- <HeaderNav /> -->
    <!-- <h1 class="title">Candidate Registration</h1> -->

    <FlowSingle :flow="apiData.flow" />

    <FlowStateDebugger v-if="showDebugger" />

    <!-- <pre>{{ apiData }}</pre> -->
  </main>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Registration } from '~/types';
import HeaderNav from '~/components/nav/HeaderNav.vue';
import FlowSingle from '~/components/candidate/flow/Single.vue';
import FlowStateDebugger from '~/components/candidate/flow/FlowStateDebugger.vue';
import { getFakeData } from '~/assets/api/RegistrationStatus';

const useFakeData = false;

@Component({
  middleware: 'candidate/authenticated',
  components: { HeaderNav, FlowSingle, FlowStateDebugger },
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
          store.commit('registration/setApiStatus', response.data);
        }
      } catch (error) {
        throw new Error(error);
      }
    }
  },
})
export default class CandidateRegistration extends Vue {
  private get activeTaskId(): string {
    return this.$store.state.registration.activeTaskId;
  }

  private get activeStepId(): string {
    return this.$store.state.registration.activeStepId;
  }

  private get activeActionId(): string {
    return this.$store.state.registration.activeActionId;
  }

  private get apiData(): Registration.ApiData {
    return this.$store.state.registration.apiStatus;
  }

  private get showDebugger(): boolean {
    return 'debug' in this.$route.query && this.$route.query.debug !== 'false';
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/sass/forms/candidate/base';
.registration {
  height: 100%;
}
</style>
