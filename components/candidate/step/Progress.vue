<template>
  <div class="step-progress">
    <div class="text">
      <div>{{ title }}</div>
      <ButtonMore title="Step details" />
    </div>
    <PProgress :value="primaryProgressPercent" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Action, Step } from '~/types';
import PProgress from '~/components/elements/Progress.vue';
import ButtonMore from '~/components/elements/ButtonMore.vue';

@Component({
  components: { PProgress, ButtonMore },
})
export default class StepProgress extends Vue {
  private get activeStep(): Step.Single | false {
    return this.$store.getters['registration/activeStepObject'];
  }

  private get activeActionId(): string {
    return this.$store.state.registration.activeActionId;
  }

  private get activeActionIndex(): number | null {
    const actionIndex = this.$store.getters['registration/activeActionIndex'];

    return actionIndex ? actionIndex + 1 : null;
  }

  private get allPrimaryActions(): Action.Any[] | null {
    if (this.activeStep) {
      return this.$store.getters['registration/allPrimaryActionsOfStep'](
        this.activeStep.id
      );
    } else {
      return null;
    }
  }

  private get allActions(): Action.Any[] | null {
    if (this.activeStep) {
      return this.$store.getters['registration/allActionsOfStep']({
        stepId: this.activeStep.id,
      });
    } else {
      return null;
    }
  }

  private get primaryActionsCount() {
    return this.allPrimaryActions ? this.allPrimaryActions.length : 0;
  }

  private get allActionsCount() {
    return this.allActions ? this.allActions.length : 0;
  }

  private get primaryProgressPercent(): number {
    if (!this.activeActionIndex || !this.primaryActionsCount) return 0;

    const singleStepPercentage = 1 / this.primaryActionsCount;

    return (
      (this.activeActionIndex / this.primaryActionsCount -
        singleStepPercentage) *
      100
    );
  }

  private get title(): string {
    return this.activeStep ? this.activeStep.name : '';
  }

  // created() {
  //   console.log('primary', this.primaryActionsCount);
  //   console.log('all', this.allActionsCount);
  // }
}
</script>

<style lang="scss" scoped>
.step-progress {
  background-color: #fff;
  padding: 1rem 1rem 2rem 1rem;
  border-top: 1px solid #eee;
}

.text {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 0.5rem;
}
</style>
