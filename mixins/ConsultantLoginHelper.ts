import { Vue, Component } from 'vue-property-decorator';

@Component
export default class ConsultantLoginHelper extends Vue {
  loading: boolean = false;
  error: string | null = null;
  email?: string = 'deepak.r@exposure.net';
  password?: string = 'Hello@1234';

  get loginButtonText() {
    return this.loading ? 'Loading…' : 'Login';
  }

  get fakeLoginButtonText() {
    return this.loading ? 'Loading…' : 'Fake login';
  }

  fakeLogin() {
    this.error = null;
    this.loading = true;
    this.$nuxt.$loading.start();

    this.$store.dispatch('consultant/fakeLogin').then(() => {
      this.loading = false;
      this.$nuxt.$loading.finish();
      this.$router.push('/consultant');
    });
  }

  async login() {
    this.error = null;
    this.loading = true;

    const loginFormData = new FormData();

    if (this.email && this.password) {
      loginFormData.set('email', this.email);
      loginFormData.set('password', this.password);

      try {
        const response = await this.$axios({
          method: 'post',
          url: `${process.env.apiUrl}API/v1/ConsultantLogin/`,
          data: loginFormData,
        });

        if (response.data.error) {
          this.loading = false;
          this.error = response.data.error;
        } else {
          this.$store.dispatch('consultant/login', response.data).then(() => {
            this.loading = false;
            this.$router.push('/consultant');
          });
        }
      } catch (error) {
        this.error = error;
      }
    }
  }
}
