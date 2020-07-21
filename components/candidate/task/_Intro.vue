<template>
  <div>
    <h3 class="title">
      Welcome
      <br />
      <strong>{{ name }}</strong>
    </h3>
    <p>
      To get you started we have a few
      <strong>questions</strong>
      we need to ask and a few
      <strong>documents</strong>
      we have to have on record.
    </p>
    <p>
      Once the registration is completed you'll be a fully fledged member of the
      Pertemps Network.
    </p>
    <div v-if="description">{{ description }}</div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class TaskIntro extends Vue {
  @Prop(String) readonly name?: string;
  @Prop(String) readonly description?: string;
}
</script>

<style lang="scss" scoped>
.title {
  font-weight: normal;
  font-size: 1.5em;
  line-height: 1.2;
}
</style>
