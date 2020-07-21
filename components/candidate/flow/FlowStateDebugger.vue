<template>
  <div class="flow-state-helper">
    <pre>
  task: {{ activeTaskId }}
 intro: {{ taskIntroIsActive }}

  step: {{ activeStepId }}
 intro: {{ stepIntroIsActive }}
 outro: {{ stepOutroIsActive }}

action: {{ activeActionId }}<!--
    --></pre>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class FlowStateDebugger extends Vue {
  private get activeTaskId(): string {
    return this.$store.state.registration.activeTaskId;
  }

  private get taskIntroIsActive(): boolean {
    return this.$store.state.registration.taskIntroIsActive;
  }

  private get activeStepId(): string {
    return this.$store.state.registration.activeStepId;
  }
  private get stepIntroIsActive(): boolean {
    return this.$store.state.registration.stepIntroIsActive;
  }
  private get stepOutroIsActive(): boolean {
    return this.$store.state.registration.stepOutroIsActive;
  }

  private get activeActionId(): string {
    return this.$store.state.registration.activeActionId;
  }
}
</script>

<style lang="scss" scoped>
.flow-state-helper {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  border-radius: 1rem;
  display: none;

  @media (min-width: 40rem) {
    display: block;
  }
}

pre {
  margin: 0;
}
</style>
