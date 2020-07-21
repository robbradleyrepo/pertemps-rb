<template>
  <div>
    <StepListSingle
      v-for="(step, index) in steps"
      :key="index"
      class="step"
      :step="step"
      :counter="index + 1"
      :time="time"
      :clickable="clickable"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Step } from '~/types';
import StepListSingle from '~/components/candidate/step/StepListSingle.vue';

@Component({
  components: { StepListSingle },
})
export default class StepList extends Vue {
  @Prop({ required: true, type: Array })
  readonly steps!: Step.Single[];

  @Prop({ required: false, type: Boolean })
  readonly time?: boolean;

  @Prop({ required: false, type: Boolean })
  readonly clickable?: boolean;
}
</script>

<style lang="scss" scoped>
.step {
  // border-top: 1px solid black;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;

  // &:last-child {
  //   border-bottom: 1px solid black;
  // }
}

hr {
  margin-top: 2rem;
  margin-bottom: 3rem;
}
</style>
