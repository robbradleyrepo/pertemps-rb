<template>
  <div v-if="title" class="step-badge">{{ title }}</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Step } from '~/types';

@Component
export default class StepBadge extends Vue {
  @Prop({ required: false, type: String })
  readonly name?: string;

  private get activeStep(): Step.Single | false {
    return this.$store.getters['registration/activeStepObject'];
  }

  private get title(): string {
    if (this.name) return this.name;
    return this.activeStep ? this.activeStep.name : '';
  }
}
</script>

<style lang="scss" scoped>
.step-badge {
  color: $p-light-blue;
  color: var(--step-highlight-colour);
  display: inline-block;
  position: relative;
  font-size: 0.8em;
  padding: 0.25em 1em;
  width: auto;
  margin-bottom: 1rem;

  &::before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: currentColor;
    opacity: 0.2;
    filter: brightness(120%);
  }
}
</style>
