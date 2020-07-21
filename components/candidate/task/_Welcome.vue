<template>
  <div class="welcome">
    <!-- Title -->
    <TaskTitle :title="registrationData.title" />

    <div class="column">
      <!-- Intro -->
      <TaskIntro
        :name="candidateName"
        :description="registrationData.description"
      />

      <!-- Buttons -->
      <div class="row">
        <div class="col-6">
          <nuxt-link to="/candidate/registration" class="button button--dark">
            Let's go!
          </nuxt-link>
        </div>
        <div class="col-6">
          <button
            v-show="!stepsVisible"
            class="button button"
            @click="toggleSteps"
          >
            Learn more
          </button>
        </div>
      </div>

      <div v-if="stepsVisible">
        <!-- Steps -->
        <!-- <TaskList
          class="steps"
          :tasks="registrationData.flow"
          :time="true"
          :clickable="true"
        /> -->

        <!-- Buttons -->
        <div class="row">
          <div class="col-6">
            <nuxt-link to="/candidate/registration" class="button button--dark">
              Let's go!
            </nuxt-link>
          </div>
          <div class="col-6">
            <button
              class="button button--link cancel"
              @click="abortRegistration"
            >
              I no longer wish to register
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Registration } from '~/types';
import TaskTitle from '~/components/candidate/task/_Title.vue';
import TaskIntro from '~/components/candidate/task/Intro.vue';
// import TaskList from '~/components/candidate/task/TaskList.vue';

@Component({
  components: { TaskTitle, TaskIntro },
})
export default class TaskWelcome extends Vue {
  stepsVisible: boolean = false;

  @Prop({ required: true, type: Object as () => Registration.ApiData })
  readonly registrationData!: Registration.ApiData;

  public get candidateName(): string | null {
    if (this.registrationData.candidate) {
      return `${this.registrationData.candidate.firstName} ${this.registrationData.candidate.lastName}`;
    } else {
      return null;
    }
  }

  toggleSteps() {
    this.stepsVisible = !this.stepsVisible;
  }

  abortRegistration() {
    this.$store.dispatch('candidate/logout').then(() => {
      this.$router.push('/');
    });
  }
}
</script>

<style lang="scss" scoped>
.welcome {
  border: 1px solid black;
  padding: 0.5rem;
  margin-bottom: 4rem;
}

.column {
  max-width: 30rem;
  max-width: 45ch;
  padding: 1rem;
}

.steps {
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
}

.button {
  width: 100%;
}

.cancel {
  font-size: 0.8em;
}
</style>
