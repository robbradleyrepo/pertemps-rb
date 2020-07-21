<template>
  <div class="info">
    <div class="top">
      <Logo class="logo" />

      <h1 class="title">{{ stepsText }}</h1>

      <StepList :steps="task.steps" :clickable="false" />
    </div>

    <div class="bottom">
      <div class="button-wrapper">
        <button class="button button--primary" @click="goToFirstTask">
          Let's go
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Task } from '~/types';
import Logo from '~/components/global/Logo.vue';
import StepList from '~/components/candidate/step/StepList.vue';

@Component({
  components: { Logo, StepList },
})
export default class TaskIntro extends Vue {
  @Prop({ required: true, type: Object as () => Task.Single })
  readonly task!: Task.Single;

  public goToFirstTask() {
    this.$store.dispatch('registration/deactivateTaskIntro');
  }

  private get stepsText(): string {
    if (this.task.steps.length === 1) {
      return `There is 1 step to complete our ${this.task.name}`;
    } else {
      return `There are ${this.task.steps.length} steps to complete our ${this.task.name}`;
    }
  }
}
</script>

<style lang="scss" scoped>
.info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 100%;
  padding: 2rem 1rem 0 1rem;
}

.logo {
  color: $p-light-blue;
}

.title {
  font-size: 2rem;
  line-height: 1.2;
}

.top {
  margin-bottom: 2rem;
}

.bottom {
  width: 100%;
  margin-top: auto;
  padding-bottom: 2rem;
}

.button {
  width: 100%;
  margin-top: 2rem;
}
</style>
