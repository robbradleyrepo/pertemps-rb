<template>
  <progress max="100" :value="value">
    <div
      class="bar-back"
      role="progressbar"
      aria-valuemin="0"
      aria-valuemax="100"
      :aria-valuenow="value"
    >
      <div class="bar-front" :style="{ width: `${value}%` }" />
    </div>
  </progress>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class PProgress extends Vue {
  @Prop({ required: true, type: Number })
  readonly value!: number;
}
</script>

<style lang="scss" scoped>
$background: #c3c3c3;
$foreground: $p-light-blue;
$foreground: var(--step-highlight-colour);
$border-radius: 4px;

progress {
  display: block;
  appearance: none;
  width: 100%;
  height: 8px;
  border: none;
  border-radius: $border-radius;
  background-color: $background;
  color: $foreground;

  &::-webkit-progress-bar {
    background-color: $background;
    border-radius: $border-radius;
  }

  &::-webkit-progress-value {
    background-color: $foreground;
    border-radius: $border-radius;
  }

  &::-moz-progress-bar {
    background-color: $foreground;
    border-radius: $border-radius;
  }
}

.bar-back {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 8px;
  background-color: $background;
  border-radius: 4px;
}

.bar-front {
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  background-color: $foreground;
}
</style>
