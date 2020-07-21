<template>
  <div class="container content-container">
    <!-- Top -->
    <div>
      <Logo />

      <h1 class="intro">
        <div class="intro__title">Welcome</div>
        <div class="intro__name">{{ name }}</div>
      </h1>
    </div>

    <!-- Bottom -->
    <div>
      <div class="buttons">
        <button
          class="start-button button button--primary"
          @click="goToRegistration()"
        >
          Get started
        </button>

        <button class="info-button button" @click="goToRegistration(true)">
          Learn more
        </button>

        <button
          class="cancel-button button button--link"
          @click="abortRegistration"
        >
          Cancel registration
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Get from 'lodash/get';
import Logo from '~/components/global/Logo.vue';

@Component({
  components: { Logo },
})
export default class RegistrationIntro extends Vue {
  public get name() {
    const firstName = Get(
      this.$store.state.registration,
      'apiStatus.candidate.firstName'
    );

    return firstName || '';
  }

  goToRegistration(forceShowIntro?: boolean) {
    if (forceShowIntro === true) {
      this.$store.dispatch('registration/activateTaskIntro');
    } else {
      this.$store.dispatch('registration/deactivateTaskIntro');
    }

    this.$router.push('/candidate/registration');
  }

  abortRegistration() {
    this.$store.dispatch('candidate/logout').then(() => {
      this.$router.push('/');
    });
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/sass/forms/candidate/base';

.container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: 2rem 2rem 1rem 2rem;
}

.intro {
  line-height: 1;
  margin-top: 1rem;
  font-size: 1.5rem;

  &__title {
    font-weight: $font-weight-light;
  }

  &__name {
    font-size: 2em;
    font-weight: $font-weight-bold;
  }
}

.buttons {
  text-align: center;
}

.button {
  width: 100%;
  max-width: 20rem;
}

.info-button {
  margin-top: 1rem;
}
</style>
