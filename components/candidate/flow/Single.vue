<template>
  <div class="flow">
    <!-- <TaskIntro v-if="taskIntroIsActive" /> -->

    <div v-if="!flowOutroIsActive" class="tasks">
      <TaskSingle v-if="activeTask" :task="activeTask" />
    </div>

    <FlowOutro v-if="flowOutroIsActive" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Flow, Task } from '~/types';
// import TaskIntro from '~/components/candidate/task/Intro.vue';
import TaskSingle from '~/components/candidate/task/Single.vue';
import FlowOutro from '~/components/candidate/flow/Outro.vue';

@Component({
  components: { TaskSingle, FlowOutro },
})
export default class FlowSingle extends Vue {
  @Prop({ required: true, type: Object as () => Flow.Single })
  readonly flow!: Flow.Single;

  // private get taskIntroIsActive(): boolean {
  //   return this.$store.state.registration.taskIntroIsActive;
  // }

  private get flowOutroIsActive(): boolean {
    return this.$store.state.registration.flowOutroIsActive;
  }

  private get activeTaskId(): string {
    return this.$store.state.registration.activeTaskId;
  }

  private get activeTask(): Task.Single | null {
    return this.$store.getters['registration/activeTaskObject'];
  }

  private get taskIntroIsActive(): boolean | null {
    return this.$store.state.registration.taskIntroIsActive;
  }

  private created() {
    this.activateFirstTask();
  }

  private beforeUpdate() {
    this.activateFirstTask();
  }

  private activateFirstTask() {
    const forceShowIntro = this.taskIntroIsActive || false;

    if (!this.activeTaskId) {
      this.$store.dispatch('registration/activateFirstTask', {
        forceShowIntro,
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.flow {
  // max-width: 60rem;
  // margin: 0 auto;
  height: 100%;
}

.tasks {
  height: 100%;
}
</style>
