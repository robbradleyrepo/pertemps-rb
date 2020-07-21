<template>
  <div class="help">
    <button
      class="button button--link button--inline"
      :style="{ color: highlightColour }"
      v-on="$listeners"
    >
      {{ text }}
    </button>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import { Step } from '~/types';

@Component({
  computed: {
    ...mapGetters('registration', ['activeStepObject']),
  },
})
export default class ActionHelp extends Vue {
  @Prop({ required: false, default: 'Need help?', type: String })
  readonly text?: string;

  readonly activeStepObject!: Step.Single | null;

  private get highlightColour(): string {
    if (this.activeStepObject && this.activeStepObject.highlightColour) {
      return this.activeStepObject.highlightColour;
    } else {
      return '';
    }
  }
}
</script>

<style lang="scss" scoped>
.help {
  margin-top: 0.5rem;
}
</style>
