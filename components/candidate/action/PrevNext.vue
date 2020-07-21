<template>
  <div class="step-prev-next">
    <div v-if="showButtons" class="buttons">
      <button
        v-if="showActionSetLoopButton"
        class="next-button button button--primary button--square"
        title="Add action set loop"
        @click="goToNextActionSetLoop"
      >
        Add action set loop
      </button>

      <button
        v-if="showStepOverviewButton"
        class="next-button button button--primary button--square"
        title="Go to step overview"
        @click="goToStepOverview"
      >
        Step overview
      </button>

      <button
        v-if="showNextStepButton"
        class="next-button button button--primary button--square"
        title="Go to next step"
        @click="goToNextStep"
      >
        Next step
      </button>

      <button
        v-if="showNextTaskButton"
        class="next-button button button--primary button--square"
        title="Go to next task"
        @click="goToNextTask"
      >
        Next task
      </button>
    </div>

    <div class="row-between arrows">
      <div class="col-auto">
        <ButtonPrev
          :disabled="previousButtonDisabled"
          :title="previousButtonTitle"
          @click="goToPreviousAction"
        />
      </div>
      <div class="col-auto">
        <ButtonNext
          :disabled="nextButtonDisabled"
          :title="nextButtonTitle"
          @click="goToNextAction"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { mapState, mapGetters } from 'vuex';
import { Action, Step, Task } from '~/types';
import ButtonPrev from '~/components/elements/ButtonPrev.vue';
import ButtonNext from '~/components/elements/ButtonNext.vue';

@Component({
  components: { ButtonPrev, ButtonNext },
  computed: {
    ...mapState('registration', [
      'activeActionSet',
      'activeActionSetAction',
      'activeActionValue',
    ]),
    ...mapGetters('registration', [
      'activeActionObject',
      'activeActionSetIndex',
      'actionIsLastOfActionSet',
    ]),
  },
})
export default class PrevNextButtons extends Vue {
  readonly useArrowKeyNavigation: boolean = false;

  readonly activeActionSet!: Action.ActionSet | null;
  readonly activeActionSetAction!: Action.Any | null;
  readonly activeActionValue!: Action.InputValue.Any | null;

  readonly activeActionObject!: Action.Any | null;
  readonly activeActionSetIndex!: number;
  readonly actionIsLastOfActionSet!: boolean;

  private get previousButtonDisabled(): boolean {
    if (!this.activeActionObject) return true;

    if (
      !this.previousPrimaryAction &&
      !this.activeActionObject.isDependencyQuestion
    ) {
      return true;
    }

    return false;
  }

  private get nextButtonDisabled(): boolean {
    if (this.nextPrimaryAction) {
      return false;
    }

    if (this.activeDependencyQuestions) {
      return false;
    }

    if (this.nextActionSetAction) {
      return false;
    }

    return true;
  }

  private get previousPrimaryAction(): Action.Any | false {
    if (!this.activeActionObject || !this.activeActionObject.id) return false;

    const previousPrimaryAction: Action.Any | false = this.$store.getters[
      'registration/previousPrimaryAction'
    ](this.activeActionObject.id);

    return previousPrimaryAction !== false ? previousPrimaryAction : false;
  }

  private get actionSetIndex(): number {
    if (!this.activeActionSet || !this.activeActionSet.actions) return -1;

    return this.activeActionSet.actions.findIndex((action) => {
      if (action.id && this.activeActionObject && this.activeActionSetAction) {
        return action.id === this.activeActionSetAction.id;
      } else {
        return false;
      }
    });
  }

  private get nextActionSetAction(): Action.Any | null {
    if (!this.activeActionSet || !this.activeActionSet.actions) return null;

    const nextAction = this.activeActionSet.actions[this.actionSetIndex + 1];

    return nextAction || null;
  }

  private get activeDependencyQuestions(): Action.Any | null {
    if (
      !this.activeActionObject ||
      !this.activeActionObject.hasDependencyQuestions ||
      !this.activeActionValue
      // !this.action ||
      // !this.action.choices ||
      // !this.action.choices.choicesList ||
      // this.action.choices.choicesList.length <= 0
    ) {
      return null;
    }

    const dependencyActions = this.$store.getters[
      'registration/allChildActionsOfAction'
    ]({
      actionId: this.activeActionObject.id,
      value: this.activeActionValue,
    });

    if (!dependencyActions || dependencyActions.length < 1) return null;

    return dependencyActions;
  }

  private get nextPrimaryAction(): Action.Any | null {
    if (!this.activeActionObject || !this.activeActionObject.id) return null;

    return this.$store.getters['registration/nextPrimaryAction'](
      this.activeActionObject.id
    );
  }

  private get parentAction(): Action.Any | null {
    if (
      !this.activeActionObject ||
      !this.activeActionObject.isDependencyQuestion
    )
      return null;

    return this.$store.getters['registration/parentActionOfAction'](
      this.activeActionObject.id
      // return this.action.choices.choicesList.some(
      //   (choice) =>
      //     choice.dependencyQuestions && choice.dependencyQuestions.length > 0
    );
  }

  private get previousButtonTitle(): string {
    return this.previousPrimaryAction !== false
      ? 'Go to previous question'
      : 'This is the first question of the current step';
  }

  private get nextButtonTitle(): string {
    return this.nextPrimaryAction ||
      (this.activeActionObject &&
        this.activeActionObject.hasDependencyQuestions)
      ? 'Go to next question'
      : 'This is the last question of the current step';
  }

  private get parentStep(): Step.Single | false {
    if (!this.activeActionObject || !this.activeActionObject.id) return false;

    return this.$store.getters['registration/parentStepOfAction'](
      this.activeActionObject.id
    );
  }

  private get nextStep(): Step.Single | null {
    if (this.parentStep !== false) {
      return this.$store.getters['registration/nextStep'](this.parentStep.id);
    } else {
      return null;
    }
  }

  private get parentTask(): Task.Single | false {
    if (this.parentStep !== false) {
      return this.$store.getters['registration/parentTaskOfStep'](
        this.parentStep.id
      );
    } else {
      return false;
    }
  }

  private get nextTask(): Task.Single | null {
    if (this.parentTask !== false) {
      return this.$store.getters['registration/nextTask'](this.parentTask.id);
    } else {
      return null;
    }
  }

  private get showActionSetLoopButton(): boolean {
    if (this.activeActionSet && !this.nextActionSetAction) return true;

    return false;
  }

  private get showStepOverviewButton(): boolean {
    if (this.activeActionSet && !this.actionIsLastOfActionSet) {
      return false;
    }

    if (!this.activeActionValue) {
      return false;
    }

    if (
      this.activeActionObject &&
      this.activeActionObject.hasDependencyQuestions &&
      this.nextPrimaryAction
    ) {
      return false;
    }

    if (this.nextPrimaryAction) {
      return false;
    }

    if (this.parentStep && this.parentStep.showSummaryScreen === true) {
      return true;
    }

    return false;
  }

  private get showNextStepButton(): boolean {
    if (this.activeActionSet && !this.actionIsLastOfActionSet) {
      return false;
    }

    if (!this.activeActionValue) {
      return false;
    }

    if (
      this.activeActionObject &&
      this.activeActionObject.hasDependencyQuestions &&
      this.nextPrimaryAction
    ) {
      return false;
    }

    if (this.nextPrimaryAction) {
      return false;
    }

    if (!this.showStepOverviewButton && this.nextStep) {
      return true;
    }

    return false;
  }

  private get showNextTaskButton(): boolean {
    if (this.activeActionSet && !this.actionIsLastOfActionSet) {
      return false;
    }

    if (!this.activeActionValue) {
      return false;
    }

    if (
      this.activeActionObject &&
      this.activeActionObject.hasDependencyQuestions
      // private getActiveChoice(): Action.ChoiceSingle | null {
      //   if (
      //     !this.action ||
      //     !this.action.choices ||
      //     !this.action.choices.choicesList ||
      //     this.action.choices.choicesList.length <= 0
    ) {
      return false;
    }

    if (this.nextPrimaryAction) {
      return false;
    }

    if (
      !this.showStepOverviewButton &&
      !this.showNextStepButton &&
      this.nextTask
    ) {
      return true;
    }

    return false;
  }

  private get showButtons(): boolean {
    return (
      this.showActionSetLoopButton ||
      this.showStepOverviewButton ||
      this.showNextStepButton ||
      this.showNextTaskButton
      // this.action.choices.choicesList.find(
      //   (choice) => choice.value === actionValue
      // ) || null
    );
  }

  private goToNextActionSetLoop() {
    this.$store.dispatch('registration/activateNextActionSetLoop');
  }

  private goToPreviousPrimaryAction() {
    if (!this.activeActionObject || !this.activeActionObject.id) return;

    this.$store
      .dispatch('registration/activatePreviousPrimaryAction', {
        actionId: this.activeActionObject.id,
      })
      .then((previousPrimaryActionExists) => {
        if (previousPrimaryActionExists) {
          window.scrollTo(0, 0);
        }
      });
  }

  private goToPreviousDependencyAction() {
    if (!this.previousPrimaryAction || !this.previousPrimaryAction.id) return;

    this.$store
      .dispatch(
        'registration/activateLastDependencyAction',
        this.previousPrimaryAction.id
      )
      .then((previousDependencyActionExists) => {
        if (previousDependencyActionExists) {
          window.scrollTo(0, 0);
        } else {
          this.goToPreviousPrimaryAction();
        }
      });
  }

  private goToPreviousAction() {
    if (!this.activeActionObject) return;

    if (this.activeActionSetIndex >= 0) {
      this.$store
        .dispatch('registration/activatePreviousActionOfActionSet')
        .then((previousActionOfActionSetExists) => {
          if (!previousActionOfActionSetExists) {
            this.goToPreviousPrimaryAction();
          }
        });
    } else if (
      this.activeActionObject.isDependencyQuestion &&
      this.parentAction
    ) {
      this.$store.dispatch('registration/activateAction', {
        actionId: this.parentAction.id,
      });
    } else {
      if (!this.previousPrimaryAction || !this.previousPrimaryAction.id) return;

      const previousPrimaryAction = this.$store.getters[
        'registration/actionFromId'
      ](this.previousPrimaryAction.id);

      if (previousPrimaryAction.hasDependencyQuestions) {
        this.goToPreviousDependencyAction();
      } else {
        this.goToPreviousPrimaryAction();
      }
    }
  }

  private goToNextPrimaryAction(actionId?: string) {
    if (!this.activeActionObject || !this.activeActionObject.id) return;

    this.$store
      .dispatch('registration/activateNextPrimaryAction', {
        actionId: actionId || this.activeActionObject.id,
      })
      .then((nextActionExists) => {
        if (nextActionExists) {
          window.scrollTo(0, 0);
        }
      });
  }

  private goToNextAction() {
    if (!this.activeActionObject) return;

    if (this.activeActionSetIndex >= 0) {
      this.$store
        .dispatch('registration/activateNextActionOfActionSet')
        .then((nextActionOfActionSetExists) => {
          if (!nextActionOfActionSetExists) {
            this.goToNextPrimaryAction();
          }
        });
    } else if (
      this.activeActionObject.hasDependencyQuestions &&
      this.activeActionValue
    ) {
      this.$store
        .dispatch('registration/activateFirstDependencyAction', {
          actionId: this.activeActionObject.id,
          value: this.activeActionValue,
        })
        .then((firstDependencyActionExists) => {
          if (
            !firstDependencyActionExists &&
            this.activeActionObject &&
            this.activeActionObject.rootActionId
          ) {
            this.goToNextPrimaryAction(this.activeActionObject.rootActionId);
          }
        });
    } else {
      this.goToNextPrimaryAction();
    }
  }

  private goToStepOverview() {
    this.$store.dispatch('registration/activateStepOutro');
  }

  private goToNextStep() {
    if (this.parentStep !== false) {
      this.$store.dispatch('registration/activateNextStep', {
        stepId: this.parentStep.id,
      });
    }
  }

  private goToNextTask() {
    if (this.parentTask) {
      this.$store.dispatch('registration/activateNextTask', {
        taskId: this.parentTask.id,
        forceShowIntro: true,
      });
    }
  }

  private onKeyDown(event: KeyboardEvent) {
    const pressedKey = event.code || event.which || event.keyCode;

    switch (pressedKey) {
      case 'ArrowLeft':
      case 37:
        this.goToPreviousPrimaryAction();
        break;

      case 'ArrowRight':
      case 39:
        this.goToNextAction();
        break;

      default:
        break;
    }
  }

  created() {
    if (this.useArrowKeyNavigation === true) {
      window.addEventListener('keydown', this.onKeyDown);
    }
  }

  beforeDestroy() {
    if (this.useArrowKeyNavigation === true) {
      window.removeEventListener('keydown', this.onKeyDown);
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/sass/forms/candidate/base';
.next-button {
  width: 100%;
}

.arrows {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  border-top: 1px solid #eee;
}

.buttons {
  padding: 1rem;
}

.button {
  + .button {
    margin-top: 1rem;
  }
}
</style>
