<template>
  <div>
    <!-- <header-nav /> -->
    <nuxt />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import HeaderNav from '~/components/nav/HeaderNav.vue';

import 'sanitize.css';
import 'sanitize.css/forms.css';
import 'sanitize.css/typography.css';

@Component({
  components: { HeaderNav },
})
export default class DefaultLayout extends Vue {}
</script>