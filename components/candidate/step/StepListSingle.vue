<template>
  <component
    :is="type"
    class="step"
    :class="{ 'step--clickable': clickable }"
    @click="onClick"
  >
    <div class="counter-wrapper">
      <div class="counter">{{ counter }}</div>
    </div>

    <div class="title-outer">
      <div class="title-inner">
        <div class="title">{{ step.name }}</div>
        <div class="subtitle">{{ step.label }}</div>
      </div>
      <div v-if="time" class="time">{{ randomTime }} mins</div>
    </div>
  </component>
</template>

<script lang="ts">
import { Component, Prop, Mixins } from 'vue-property-decorator';
import { Step } from '~/types';
import Slugify from '~/mixins/Slugify';
import RandomTime from '~/mixins/RandomTime';

@Component
export default class StepListSingle extends Mixins(Slugify, RandomTime) {
  @Prop({ required: true, type: Object as () => Step.Single })
  readonly step!: Step.Single;

  @Prop({ required: true, type: Number })
  readonly counter!: number;

  @Prop({ required: false, type: Boolean })
  readonly time?: boolean;

  @Prop({ required: false, type: Boolean })
  readonly clickable?: boolean;

  public get type() {
    return this.clickable ? 'button' : 'div';
  }

  public onClick() {
    if (this.clickable) {
      this.$store.commit('registration/setActiveStepId', this.step.id);
      this.$store.dispatch('registration/deactivateTaskIntro');
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/sass/forms/candidate/base';

.step {
  position: relative;
  display: flex;
  align-items: center;
  line-height: 1.2;
  text-decoration: none;
  color: currentColor;
  text-align: left;

  &--clickable {
    @extend %input-reset;
    cursor: pointer;

    &:hover {
      .title {
        text-decoration: underline;
      }

      .counter {
        background-color: black;
        color: white;
        border-color: black;
      }
    }
  }
}

.counter-wrapper {
  flex-shrink: 0;
  margin-right: 1rem;
}

.counter {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25em;
  font-weight: $font-weight-bold;
  width: 2em;
  height: 2em;
  border: 1px solid currentColor;
  border-radius: 50%;
  padding-bottom: 0.2em;
}

.title-outer {
  flex-grow: 1;
  display: flex;
  justify-content: space-between;
}

.title {
  font-weight: bold;
}

.subtitle {
  font-size: 0.8em;
}

.time {
  font-size: 0.8em;
  flex-shrink: 0;
  align-self: flex-end;
  margin-left: 1rem;
}
</style>
