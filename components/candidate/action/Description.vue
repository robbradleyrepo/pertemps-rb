<template>
  <div>
    <div v-markdown="description" class="action-description" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class ActionDescription extends Vue {
  @Prop({ required: true, type: String })
  readonly text!: string;

  private get description(): string {
    if (this.text) {
      if (this.$options.filters && this.$options.filters.magiccodes) {
        return this.$options.filters.magiccodes(this.text);
      } else {
        return this.text;
      }
    } else {
      return '';
    }
  }
}
</script>

<style lang="scss" scoped>
.action-description {
  font-weight: $font-weight-light;
}
</style>
