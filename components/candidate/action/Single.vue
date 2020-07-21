<template>
  <div class="action-single">
    <div class="content">
      <StepBadge />

      <ActionTitle v-if="action.label" :title="action.label" />

      <ActionDescription v-if="action.description" :text="action.description" />

      <div class="action-wrapper">
        <ActionError
          v-if="(!action || !action.type) && !action.actions"
          :action="action"
        />
        <ActionSingleInput v-else :action="action" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Action } from '~/types';
import StepBadge from '~/components/candidate/step/Badge.vue';
import ActionTitle from '~/components/candidate/action/Title.vue';
import ActionDescription from '~/components/candidate/action/Description.vue';
import ActionError from '~/components/candidate/action/Error.vue';
import ActionSingleInput from '~/components/candidate/action/SingleInput.vue';

@Component({
  components: {
    StepBadge,
    ActionTitle,
    ActionDescription,
    ActionError,
    ActionSingleInput,
  },
})
export default class ActionSingle extends Vue {
  @Prop({ required: true, type: Object as () => Action.Any })
  readonly action!: Action.Any;
}
</script>

<style lang="scss" scoped>
@import '~assets/sass/forms/candidate/base';

.action-single {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
}

.content {
  flex-grow: 1;
  padding: 4rem 1rem;
}

.action-wrapper {
  margin-top: 2rem;
}

.button {
  width: 100%;
  flex-direction: column;
  line-height: 1;
}

.next-action {
  margin-top: 2rem;
}
</style>
