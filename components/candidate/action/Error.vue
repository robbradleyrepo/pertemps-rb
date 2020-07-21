<template>
  <div class="action-error">
    <h2>
      ACTION ERROR
      <br />
      <small>DATA MISSING</small>
    </h2>
    <pre>{{ action }}</pre>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Action } from '~/types';

@Component
export default class ActionError extends Vue {
  @Prop({ required: true, type: Object as () => Action.Any })
  readonly action!: Action.Any;
}
</script>

<style lang="scss" scoped>
.action-error {
  background-color: rgba(255, 0, 0, 0.2);
  padding: 2rem;
  border-radius: 5px;
  font-family: monospace;
}

small {
  font-weight: normal;
}
</style>
