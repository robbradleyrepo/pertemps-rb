<template>
  <nuxt-link to="/" class="logo">
    <LogoSvg />
  </nuxt-link>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import LogoSvg from '~/assets/svg/pertemps-logo.svg';

@Component({
  components: { LogoSvg },
})
export default class Logo extends Vue {}
</script>

<style lang="scss" scoped>
.logo {
  display: inline-block;
  padding: 0.5rem 0;
  color: currentColor;
}
</style>
