<template>
  <div class="step-outro">
    <StepBadge />

    <!-- Heading -->
    <h1 class="heading">
      Review all
      <span class="answer">answers</span>
      before submitting
    </h1>

    <!-- Static details from registration API -->
    <div v-if="taskIndex === 0 && stepIndex === 0" class="static-values">
      <OutroSingleAction
        class="static-value"
        title="Name"
        :value="candidateFullName"
      />
      <OutroSingleAction
        class="static-value"
        title="Email"
        :value="candidateEmail"
      />
      <OutroSingleAction
        class="static-value"
        title="Mobile phone"
        :value="candidatePhone"
      />
    </div>

    <!-- Answers -->
    <div v-if="actionValues" class="action-values">
      <OutroSingleAction
        v-for="(action, index) in allStepActions"
        :key="`action-${index}`"
        :action="action"
        class="action-value"
        :class="{ 'action-value--is-dependency': action.isDependencyQuestion }"
      />
    </div>

    <!-- No answers in this step -->
    <div v-else>
      <h4 class="answer">No answers submitted for this section.</h4>
    </div>

    <!-- Next step/task buttons -->
    <!-- <button
      class="next-button button button--primary button--square"
      @click="saveValues"
    >
      Save answers
    </button> -->

    <button
      v-if="nextStep"
      class="next-button button button--primary button--square"
      @click="goToNextStep"
    >
      Next Step {{ nextStepIndex }} of {{ totalSteps }}
    </button>

    <button
      v-if="!nextStep && nextTask"
      class="next-button button button--primary button--square"
      @click="goToNextTask"
    >
      Step complete – Next Task
    </button>

    <button
      v-if="!nextStep && !nextTask"
      class="next-button button button--primary button--square"
      @click="goToFlowOutro"
    >
      Registration complete
    </button>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { mapState } from 'vuex';
import Get from 'lodash/get';
import { Registration, Task, Step, Action } from '~/types';
import StepBadge from '~/components/candidate/step/Badge.vue';
import OutroSingleAction from '~/components/candidate/step/OutroSingleAction.vue';

@Component({
  components: { StepBadge, OutroSingleAction },
  computed: {
    ...mapState('registration', ['apiStatus', 'actionValues', 'activeTaskId']),
  },
})
export default class StepOutro extends Vue {
  @Prop({ required: true, type: Object as () => Step.Single })
  readonly step!: Step.Single;

  readonly apiStatus!: Registration.ApiData;
  readonly actionValues!: Action.SubmitValue.Any | null;
  readonly activeTaskId!: string;

  readonly emptyAnswerValue = '__________';

  private get candidateFullName(): string {
    return (
      this.$store.getters['registration/candidateFullName'] ||
      this.emptyAnswerValue
    );
  }

  private get candidateEmail(): string {
    return Get(this.apiStatus, 'candidate.email') || this.emptyAnswerValue;
  }

  private get candidatePhone(): string {
    return Get(this.apiStatus, 'candidate.phone') || this.emptyAnswerValue;
  }

  private get taskIndex(): number {
    return this.$store.getters['registration/taskIndex'](this.activeTaskId);
  }

  private get stepIndex(): number {
    const activeStepIndex = this.$store.getters['registration/stepIndex'](
      this.step.id
    );

    if (typeof activeStepIndex === 'number') return activeStepIndex;

    return -1;
  }

  private get nextStepIndex(): number | null {
    if (typeof this.stepIndex === 'number' && this.stepIndex >= 0) {
      return this.stepIndex + 2;
    }

    return null;
  }

  private get allStepActions(): Action.Any[] | null {
    return this.$store.getters['registration/allActionsOfStep']({
      stepId: this.step.id,
      onlyCompletedDependencyTrees: true,
    });
  }

  private get childActions() {
    return this.$store.getters['registration/allChildActionsRecursive']({
      actionId: '',
      onlyCompleted: true,
    });
  }

  private get parentTask(): Task.Single | false {
    return this.$store.getters['registration/parentTaskOfStep'](this.step.id);
  }

  private get totalSteps(): number {
    const parentTask: Task.Single | false = this.$store.getters[
      'registration/parentTaskOfStep'
    ](this.step.id);

    if (!parentTask) return 0;

    return parentTask.steps.length;
  }

  private get nextStep(): Step.Single | false {
    return this.$store.getters['registration/nextStep'](this.step.id);
  }

  private get nextTask(): Task.Single | false {
    if (this.parentTask) {
      return this.$store.getters['registration/nextTask'](this.parentTask.id);
    } else {
      return false;
    }
  }

  private goToNextStep() {
    this.$nuxt.$loading.start();

    this.saveValues()
      .then(() => {
        this.$store
          .dispatch('registration/activateNextStep', {
            stepId: this.step.id,
          })
          .then((nextStepExists) => {
            if (nextStepExists) {
              window.scrollTo(0, 0);
            }
          })
          .then(() => {
            this.$nuxt.$loading.finish();
            this.$store.dispatch('registration/deactivateStepOutro');
          });
      })
      .catch((error) => {
        this.$nuxt.$loading.finish();
        throw new Error(error);
      });
  }

  private goToNextTask() {
    this.$nuxt.$loading.start();

    this.saveValues()
      .then(() => {
        if (this.parentTask) {
          this.$store
            .dispatch('registration/activateNextTask', {
              taskId: this.parentTask.id,
              forceShowIntro: true,
            })
            .then((nextTaskExists) => {
              if (nextTaskExists) {
                window.scrollTo(0, 0);
              }
            })
            .then(() => {
              this.$nuxt.$loading.finish();
              this.$store.dispatch('registration/deactivateStepOutro');
            });
        }
      })
      .catch((error) => {
        this.$nuxt.$loading.finish();
        throw new Error(error);
      });
  }

  private goToFlowOutro() {
    this.saveValues()
      .then(() => {
        this.$store.commit('registration/setFlowOutroActive', true);
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  private async saveValues() {
    if (this.actionValues) {
      try {
        const response = await this.$axios({
          method: 'post',
          url: `${process.env.apiUrl}API/v1/RegistrationAutoSave/${this.apiStatus.id}`,
          headers: {
            'Content-Type': 'application/json',
          },
          data: this.actionValues,
        });

        if (response.data.error) {
          Promise.reject(response.data.error);
        } else {
          Promise.resolve('Values saved');
        }
      } catch (error) {
        Promise.reject(error);
      }
    } else {
      Promise.resolve('No actionValues, so nothing to save.');
    }
  }
}
</script>

<style lang="scss" scoped>
.step-outro {
  padding: 4rem 1rem 2rem 1rem;
}

.answer {
  color: $p-light-blue;
}

.heading {
  font-size: 2em;
  line-height: 1.2;
  padding-bottom: 3rem;
  margin: 0;
}

.static-values {
  padding-top: 2rem;
  padding-bottom: 2rem;
  border-top: 1px solid $text-dark;
}

.static-value {
  margin-bottom: 2rem;

  &:last-child {
    margin-bottom: 0;
  }
}

.action-values {
  border-bottom: 1px solid $text-dark;
}

.action-value {
  border-top: 1px solid $text-dark;
  padding-top: 2rem;
  padding-bottom: 2rem;

  &--is-dependency {
    border-top: none;
    padding-top: 0;
  }
}

.next-button {
  width: 100%;
  margin-top: 2rem;
}
</style>
