import { Vue, Component } from 'vue-property-decorator';

@Component
export default class CandidateLoginHelper extends Vue {
  loading: boolean = false;

  get fakeLoginButtonText() {
    return this.loading ? 'Loading…' : 'Fake login';
  }

  fakeLogin() {
    this.loading = true;

    this.$store.dispatch('candidate/fakeLogin').then(() => {
      this.loading = false;
      this.$router.push('/candidate');
    });
  }
}
