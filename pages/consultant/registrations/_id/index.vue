<template>
  <div>
    <header>
      <HeaderNav />
    </header>

    <main>
      <h1>Consultant Registration {{ $route.params.id }}</h1>

      <div class="content-container--wide">
        <div v-if="responseReceived">
          <pre v-if="apiData">{{ apiData }}</pre>
          <pre v-else>null</pre>
        </div>
        <pre v-else>Loading…</pre>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Registration } from '~/types';
import HeaderNav from '~/components/nav/HeaderNav.vue';

@Component({
  middleware: 'consultant/authenticated',
  components: { HeaderNav },
  async asyncData({ $axios, params }) {
    try {
      const response = await $axios.get(
        `${process.env.apiUrl}API/v1/RegistrationStatus/${params.id}`
      );
      return { apiData: response.data, responseReceived: true };
    } catch (error) {
      throw new Error(error);
    }
  },
})
export default class ConsultantRegistrationSingle extends Vue {
  apiData?: Registration.ApiData;
  responseReceived: boolean = false;
}
</script>

<style lang="scss" scoped>
h1 {
  text-align: center;
  margin: 2rem 2rem 4rem;
}
</style>
