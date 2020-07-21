<template>
  <div :id="slugify(task.name)" class="task-single">
    <!-- <h2>{{ task.name }}</h2>
    <p>{{ task.label }} – {{ task.title }}</p>

    <div v-if="task.description">{{ task.description }}</div> -->

    <TaskIntro v-if="taskIntroIsActive" :task="task" />

    <div v-else class="steps">
      <StepSingle
        v-for="(step, index) in activeStep"
        :key="`step-${index}`"
        :step="step"
      />

      <!-- <button
        v-if="nextTask"
        class="next-task button button--primary"
        @click="goToNextTask"
      >
        Next task – {{ nextTask.name }}
      </button>

      <button v-else class="next-task button" disabled @click="goToNextTask">
        Final task
      </button> -->
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Mixins } from 'vue-property-decorator';
import { Task, Step } from '~/types';
import Slugify from '~/mixins/Slugify';
import TaskIntro from '~/components/candidate/task/Intro.vue';
import StepSingle from '~/components/candidate/step/Single.vue';

@Component({
  components: { TaskIntro, StepSingle },
})
export default class TaskSingle extends Mixins(Slugify) {
  @Prop({ required: true, type: Object as () => Task.Single })
  readonly task!: Task.Single;

  private get taskIntroIsActive(): boolean {
    return this.$store.state.registration.taskIntroIsActive;
  }

  private get activeStepId(): string {
    return this.$store.state.registration.activeStepId;
  }

  private get allSteps(): Step.Single[] {
    const stepColours = ['#6dabe4', '#ce0058', '#262626', '#ffb513', '#02b2a9'];
    const stepsWithColours = this.task.steps.map(
      (step: Step.Single, index: number) => {
        if (index > stepColours.length) {
          step.highlightColour = stepColours[index];
        } else {
          step.highlightColour = stepColours[index % stepColours.length];
        }

        return step;
      }
    );

    return stepsWithColours;
  }

  private get activeStep(): Step.Single[] {
    return this.allSteps.filter((step) => step.id === this.activeStepId);
  }

  private get nextTask(): Task.Single | false {
    const nextTask: Task.Single | false = this.$store.getters[
      'registration/nextTask'
    ](this.task.id);

    return nextTask !== false ? nextTask : false;
  }

  private goToNextTask() {
    this.$store
      .dispatch('registration/activateNextTask', { taskId: this.task.id })
      .then((nextTaskExists) => {
        if (nextTaskExists) {
          window.scrollTo(0, 0);
        }
      });
  }

  private created() {
    this.activateFirstStep();
  }

  private beforeUpdate() {
    this.activateFirstStep();
  }

  private activateFirstStep() {
    if (!this.activeStepId && !this.taskIntroIsActive) {
      this.$store.dispatch('registration/activateFirstStepOfTask', {
        taskId: this.task.id,
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.task-single {
  height: 100%;
}

.steps {
  height: 100%;
}

.button {
  width: 100%;
}

.next-task {
  margin-top: 2rem;
}
</style>
