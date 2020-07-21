<template>
  <div
    class="step-single"
    :style="{ '--step-highlight-colour': step.highlightColour }"
  >
    <div class="top">
      <StepIntro v-if="stepIntroIsActive" :step="step" />
      <StepOutro v-if="stepOutroIsActive" :step="step" />

      <div v-if="isActionSet && actionsAreActive">
        <ActionSetSingle
          :key="activeActionSetLoop"
          :action-set="activeActionSet"
        />
      </div>

      <div v-else-if="actionsAreActive" class="actions">
        <ActionSingle
          v-if="activeAction"
          :action="activeAction"
          :step-name="step.name"
          class="action"
        />
      </div>
    </div>

    <div v-if="!stepIntroIsActive && !stepOutroIsActive" class="bottom">
      <PrevNextButtons />
      <StepProgress />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { mapState } from 'vuex';
import { Step, Action } from '~/types';
import StepIntro from '~/components/candidate/step/Intro.vue';
import ActionSingle from '~/components/candidate/action/Single.vue';
import ActionSetSingle from '~/components/candidate/actionset/Single.vue';
import StepProgress from '~/components/candidate/step/Progress.vue';
import PrevNextButtons from '~/components/candidate/action/PrevNext.vue';
import StepOutro from '~/components/candidate/step/Outro.vue';

@Component({
  components: {
    StepIntro,
    ActionSingle,
    ActionSetSingle,
    StepProgress,
    PrevNextButtons,
    StepOutro,
  },
  computed: {
    ...mapState('registration', [
      'activeActionSetLoop',
      'stepIntroIsActive',
      'stepOutroIsActive',
      'activeActionId',
      'activeActionSet',
    ]),
  },
})
export default class StepSingle extends Vue {
  @Prop({ required: true, type: Object as () => Step.Single })
  readonly step!: Step.Single;

  readonly stepIntroIsActive!: boolean;
  readonly stepOutroIsActive!: boolean;
  readonly activeActionId!: string;
  readonly activeActionSet!: Action.ActionSet | null;

  private get activeActionType(): string {
    return this.activeAction ? this.activeAction.type.toLowerCase() : '';
  }

  private get actionsAreActive(): boolean {
    return !this.stepIntroIsActive && !this.stepOutroIsActive;
  }

  private get isActionSet(): boolean {
    if (!this.activeAction) return false;

    if (this.activeActionType === 'actionset') return true;

    return false;
  }

  private get actionsInSet(): Action.Any[] | null {
    if (
      !this.isActionSet ||
      !this.activeAction ||
      !this.activeAction.actions ||
      this.activeAction.actions.length <= 0
    ) {
      return null;
    }

    return this.activeAction.actions;
  }

  private get allActions(): Action.Any[] | null {
    return this.$store.getters['registration/allActionsOfStep']({
      stepId: this.step.id,
    });
  }

  private get activeAction(): Action.Any | null {
    if (!this.allActions) return null;

    return (
      this.allActions.find((action) => action.id === this.activeActionId) ||
      null
    );
  }

  private created() {
    this.activateFirstAction();
  }

  private beforeUpdate() {
    this.activateFirstAction();
  }

  private activateFirstAction() {
    if (!this.activeActionId && !this.stepIntroIsActive) {
      this.$store.dispatch('registration/activateFirstActionOfStep', {
        stepId: this.step.id,
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.step-single {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
}

.top {
  flex-grow: 1;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  background-color: #f4f4f4;
}

.actions {
  display: flex;
  height: 100%;
  overflow: auto;
}
</style>
