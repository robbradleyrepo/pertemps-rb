<template>
  <div class="container">
    <header>
      <HeaderNav />
    </header>
    <main>
      <h1>Pertemps Profile</h1>
      <ul class="plain-list">
        <li>
          <nuxt-link to="/candidate" class="button">
            Candidate
          </nuxt-link>
          <span class="spacer">–></span>
          <button class="button" @click="fakeLogin">
            {{ fakeLoginButtonText }}
          </button>
        </li>
        <li>
          <nuxt-link to="/consultant" class="button">
            Consultant
          </nuxt-link>
        </li>
      </ul>
    </main>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import CandidateLoginHelper from '~/mixins/CandidateLoginHelper';
import HeaderNav from '~/components/nav/HeaderNav.vue';

@Component({
  components: { HeaderNav },
})
export default class PageHome extends Mixins(CandidateLoginHelper) {}
</script>

<style lang="scss" scoped>
@import '~assets/sass/forms/candidate/base';
.container {
  text-align: center;
}

li {
  margin: 1rem;
}

.spacer {
  margin: 0 1rem;
}
</style>
