<template>
  <button :aria-label="title" />
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class MoreButton extends Vue {
  @Prop({ required: false, type: String })
  readonly title?: string;
}
</script>

<style lang="scss" scoped>
button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2em;
  height: 2em;
  background-color: #f3f3f3;
  border-radius: 1rem;
  border: none;
  cursor: pointer;

  &::after {
    content: '…';
    font-size: 2em;
    line-height: 1;
    margin-top: -0.7em;
    color: #c4c4c4;
  }

  &:hover {
    background-color: #eee;
  }
}
</style>
