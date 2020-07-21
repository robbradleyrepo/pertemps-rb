<template>
  <div>
    <ActionSingle
      v-if="activeActionSetAction"
      :key="activeActionSetAction.id"
      :action="activeActionSetAction"
      class="action"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { mapState } from 'vuex';
import { Action } from '~/types';
import ActionSingle from '~/components/candidate/action/Single.vue';

@Component({
  components: { ActionSingle },
  computed: {
    ...mapState('registration', [
      'activeActionSetAction',
      'activeActionSetLoop',
    ]),
  },
})
export default class ActionSetSingle extends Vue {
  @Prop({ required: true, type: Object as () => Action.ActionSet })
  readonly actionSet!: Action.ActionSet;

  readonly activeActionSetAction!: Action.Any | null;
  readonly activeActionSetLoop!: number | null;

  private created() {
    this.activateFirstAction();
    this.activateFirstLoop();
  }

  private beforeUpdate() {
    // this.activateFirstAction();
    this.activateFirstLoop();
  }

  private destroyed() {
    // this.$store.dispatch('registration/deactivateActionSetLoop');
  }

  private activateFirstAction() {
    if (
      this.actionSet &&
      this.actionSet.actions &&
      this.actionSet.actions.length > 0
    ) {
      this.$store.dispatch('registration/activateFirstActionOfActionSet');
    }
  }

  private activateFirstLoop() {
    if (typeof this.activeActionSetLoop !== 'number') {
      this.$store.dispatch('registration/activateFirstActionSetLoop');
    }
  }
}
</script>
