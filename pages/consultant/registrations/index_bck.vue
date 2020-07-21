<template>
  <div class="container">
    <header>
      <HeaderNav />
    </header>

    <main>
      <hr />

      <h2>Consultant Registrations</h2>
      <ul class="plain-list">
        <li
          v-for="(registration, index) in apiData.registrations"
          :key="`consultant-registration-${index}`"
        >
          <nuxt-link :to="`/consultant/registrations/${registration.id}`">
            Registration {{ registration.id }}
            <br />
            <span v-if="registration.candidate">
              {{ fullName(registration.candidate) }} –
              {{ registration.title || '[NO TITLE]' }} ({{
                registration.status
              }})
            </span>
          </nuxt-link>
        </li>
      </ul>

      <hr />

      <h2>Branch Registrations:</h2>
      <ul class="plain-list">
        <li
          v-for="(registration, index) in apiData.branchRegistrations"
          :key="`branch-registration-${index}`"
        >
          <nuxt-link :to="`/consultant/registrations/${registration.id}`">
            Registration {{ registration.id }}
            <br />
            <span v-if="registration.candidate">
              {{ fullName(registration.candidate) }} –
              {{ registration.title || '[NO TITLE]' }} ({{
                registration.status
              }})
            </span>
          </nuxt-link>
        </li>
      </ul>

      <hr />
    </main>

    <!-- <div v-if="responseReceived">
      <pre v-if="apiData">{{ apiData }}</pre>
      <pre v-else>null</pre>
    </div>
    <pre v-else>Loading…</pre> -->
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Registration, Candidate } from '~/types';
import HeaderNav from '~/components/nav/HeaderNav.vue';

@Component({
  middleware: 'consultant/authenticated',
  components: { HeaderNav },
  async asyncData({ $axios, store }) {
    try {
      const response = await $axios.get(
        `${process.env.apiUrl}API/v1/ConsultantDashboard/${store.state.consultant.auth.id}`
      );
      return { apiData: response.data, responseReceived: true };
    } catch (error) {
      throw new Error(error);
    }
  },
})
export default class ConsultantRegistrations extends Vue {
  apiData?: Registration.ApiData;
  responseReceived: boolean = false;

  private fullName(candidate: Candidate.User): string {
    return `${candidate.firstName} ${candidate.lastName}`;
  }
}
</script>

<style lang="scss" scoped>
.container {
  text-align: center;
}
</style>
