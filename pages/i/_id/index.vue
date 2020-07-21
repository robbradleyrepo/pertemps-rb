<template>
  <div class="invitation-link">
    <div v-if="linkInvalid" class="link-invalid">
      This is not a valid registration link.
    </div>
    <div v-if="expired && !newLinkGenerated" class="expired">
      <p>This link has expired. Please generate a new link.</p>
      <button v-if="!generatingLink" @click.prevent="generateNewLink">
        Generate new link
      </button>
      <button v-if="generatingLink">Generating...</button>
    </div>

    <div v-if="expired && newLinkGenerated" class="link-generated">
      The new invitation link has been generated. Please check your email or
      text messages.
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class ConsultantRegistrationSingle extends Vue {
  private expired: boolean = false;
  private newLinkGenerated: boolean = false;
  private linkInvalid: boolean = false;
  private generatingLink: boolean = false;

  /**
   * Component mounted
   * Grabs shortcode from the router and validates it. If the link is valid
   * sets candidate data to store and redirects to candidate flow. Otherwise
   * shows a message with an option to regenerate link.
   */
  private async mounted() {
    const base: string | undefined = process.env.apiUrl;
    const shortcode: string = String(this.$route.params.id);
    const url: string = `${base}API/v1/ValidateInvitationLink/${shortcode}`;

    if (!shortcode) {
      this.linkInvalid = true;
      return;
    }

    try {
      const resp = await this.$axios.get(url);

      // see if expired
      const expires = Date.parse(resp.data.expiryDate);
      if (expires <= Date.now()) {
        this.expired = true;
        return;
      }

      // link valid
      const registrationId = resp.data.registrationId;
      if (registrationId) {
        this.$store.commit('candidate/setRegistrationId', registrationId);
      } else {
        console.error('Unable to get registration id');
        return;
      }
      const candidate = resp.data.candidate;
      if (candidate) {
        this.$store.commit('candidate/setAuth', candidate);
      } else {
        console.error('Unable to get candidate data id');
        return;
      }

      // got everything? redirect to registration
      this.$router.push('/candidate');
      return;
    } catch (error) {
      const resp = error.response;

      // catch 400 (invalid link)
      if (resp.status === 400) {
        this.linkInvalid = true;
        return;
      }

      // otherwise show error
      throw new Error(error);
    }
  }

  /**
   * Generate new link
   * Asks the API to generate and send new link
   */
  private async generateNewLink() {
    const base: string | undefined = process.env.apiUrl;
    const shortcode: string = this.$route.params.id;
    const url: string = `${base}API/v1/ResendInvitationLink/${shortcode}`;
    this.generatingLink = true;
    try {
      await this.$axios.get(url);
      this.generatingLink = false;
      this.newLinkGenerated = true;
    } catch (error) {
      this.generatingLink = false;
      throw new Error(error);
    }
  }
}
</script>
<style lang="scss" scoped>
.invitation-link {
  height: 100%;
}
</style>
