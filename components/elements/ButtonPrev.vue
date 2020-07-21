<template>
  <button v-on="$listeners">
    <div class="arrow" />
  </button>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class ButtonPrev extends Vue {}
</script>

<style lang="scss" scoped>
button {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  appearance: none;
  margin: 0;
  padding: 0.5rem 1rem;
  background: none;
  border: none;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.arrow {
  display: block;
  position: relative;
  width: 0;
  height: 0;
  border-top: 6px solid transparent;
  border-bottom: 6px solid transparent;
  border-right: 12px solid currentColor;
  pointer-events: none;

  &::before {
    content: '';
    display: block;
    width: 10px;
    height: 1px;
    background-color: currentColor;
    position: absolute;
    top: 50%;
    right: -22px;
    transform: translateY(-50%);
  }
}
</style>
