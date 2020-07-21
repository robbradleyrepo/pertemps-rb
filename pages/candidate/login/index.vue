<template>
  <div class="container">
    <header>
      <HeaderNav />
    </header>

    <main>
      <h1>Candidate login</h1>

      <div class="registration-wrapper">
        <label for="registration-id">Registration ID:</label>
        <input
          id="registration-id"
          v-model="registrationId"
          name="registration-id"
          type="text"
          class="registration-id"
        />
      </div>

      <button class="button" @click="fakeLogin">
        {{ fakeLoginButtonText }}
      </button>
    </main>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import CandidateLoginHelper from '~/mixins/CandidateLoginHelper';
import HeaderNav from '~/components/nav/HeaderNav.vue';

@Component({
  middleware: 'candidate/notAuthenticated',
  components: { HeaderNav },
})
export default class CandidateLogin extends Mixins(CandidateLoginHelper) {
  private get registrationId(): string | null {
    return this.$store.state.candidate.registrationId;
  }

  private set registrationId(value: string | null) {
    this.$store.commit('candidate/setRegistrationId', value);
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/sass/forms/candidate/base';
.container {
  text-align: center;
}

.registration-wrapper {
  max-width: 30rem;
  margin: 0 auto;
  padding-bottom: 2rem;
}

.registration-id {
  width: 100%;
  text-align: center;
}
</style>
