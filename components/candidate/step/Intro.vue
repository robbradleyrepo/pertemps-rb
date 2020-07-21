<template>
  <div class="step-intro">
    <div class="top">
      <h1>{{ step.name }}</h1>

      <div v-markdown="description" />
    </div>

    <div class="bottom">
      <button class="start-button button" @click="goToFirstAction">
        Start – {{ step.name }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Step } from '~/types';

@Component
export default class StepIntro extends Vue {
  @Prop({ required: true, type: Object as () => Step.Single })
  readonly step!: Step.Single;

  private goToFirstAction() {
    this.$store.dispatch('registration/deactivateStepIntro');
  }

  private get description(): string {
    if (this.step.description) {
      if (this.$options.filters && this.$options.filters.magiccodes) {
        return this.$options.filters.magiccodes(this.step.description);
      } else {
        return this.step.description;
      }
    } else {
      return '';
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep {
  p {
    font-weight: $font-weight-light;
  }
}

.step-intro {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: var(--step-highlight-colour);
  color: white;
  padding: 4rem 1rem 2rem 1rem;
}

.bottom {
  margin-top: auto;
}

.button {
  width: 100%;
  margin-top: 2rem;
}
</style>
