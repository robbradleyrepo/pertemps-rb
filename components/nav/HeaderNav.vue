<template>
  <nav class="header-nav">
    <ul class="plain-list">
      <li>
        <nuxt-link
          to="/"
          class="button"
          exact-active-class="button--dark button--active"
          no-prefetch
        >
          Home
        </nuxt-link>
      </li>
      <li>
        <div class="links-wrapper">
          <nuxt-link
            to="/candidate"
            class="button"
            active-class="button--dark button--active"
            no-prefetch
          >
            Candidate
            <span
              :class="{ green: candidateLoggedIn, red: !candidateLoggedIn }"
            >
              &nbsp;({{ candidateLoggedInText }})
            </span>
          </nuxt-link>
          <button
            v-if="candidateLoggedIn"
            class="logout button"
            @click="logoutCandidate"
          >
            Logout candidate
          </button>
        </div>
      </li>
      <li>
        <div class="links-wrapper">
          <nuxt-link
            to="/consultant"
            class="button"
            active-class="button--dark button--active"
            no-prefetch
          >
            Consultant
            <span
              :class="{ green: consultantLoggedIn, red: !consultantLoggedIn }"
            >
              &nbsp;({{ consultantLoggedInText }})
            </span>
          </nuxt-link>
          <button
            v-if="consultantLoggedIn"
            class="logout button"
            @click="logoutConsultant"
          >
            Logout consultant
          </button>
        </div>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class HeaderNav extends Vue {
  loading: boolean = false;

  public get logoutButtonText() {
    return this.loading ? 'Logging out…' : 'Logout';
  }

  public get candidateLoggedIn() {
    return !!this.$store.state.candidate.auth;
  }

  public get consultantLoggedIn() {
    return !!this.$store.state.consultant.auth;
  }

  public get candidateLoggedInText() {
    return this.candidateLoggedIn ? 'logged in' : 'logged out';
  }

  public get consultantLoggedInText() {
    return this.consultantLoggedIn ? 'logged in' : 'logged out';
  }

  logoutCandidate() {
    this.loading = true;
    this.$store.dispatch('candidate/logout').then(() => {
      this.loading = false;
      this.$router.push('/candidate/login');
    });
  }

  logoutConsultant() {
    this.loading = true;
    this.$store.dispatch('consultant/logout').then(() => {
      this.loading = false;
      this.$router.push('/consultant/login');
    });
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/sass/forms/candidate/base';
li {
  display: inline-block;
  margin: 0 0.5em;
}

.header-nav {
  text-align: center;
  font-size: 0.8rem;
}

.button {
  padding-left: 2rem;
  padding-right: 2rem;
}

.links-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.logout {
  font-size: 0.8em;
}

.green {
  color: green;
}

.red {
  color: red;
}
</style>
