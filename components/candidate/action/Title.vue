<template>
  <div>
    <h1 class="action-title">{{ loopTitle }}</h1>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class ActionTitle extends Vue {
  @Prop({ required: true, type: String })
  readonly title!: string;

  private get actionSetLoop(): number | null {
    return this.$store.state.registration.activeActionSetLoop;
  }

  /**
   * @todo add proper string replacement
   */
  private get loopTitle(): string {
    if (typeof this.actionSetLoop === 'number' && this.actionSetLoop > -1) {
      const cleanTitle = this.title
        .replace(/\*\|/g, '[[')
        .replace(/\|\*/g, ']]');

      const splitTitle = cleanTitle.split('|')[this.actionSetLoop];

      return splitTitle || cleanTitle;
    } else {
      return this.title;
    }
  }
}
</script>

<style lang="scss" scoped>
.action-title {
  font-size: 2rem;
  line-height: 1.2;
  font-weight: $font-weight-bold;
  margin-bottom: 1rem;
}
</style>
