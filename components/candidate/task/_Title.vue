<template>
  <div>
    <h2 class="title">
      <div class="row">
        <div class="col">Pertemps Registration</div>
        <div class="col task-title">{{ title }}</div>
      </div>
    </h2>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class TaskTitle extends Vue {
  @Prop(String) readonly title!: string;
}
</script>

<style lang="scss" scoped>
.title {
  background-color: black;
  color: white;
  padding: 0.25rem 1rem;
  font-weight: normal;
}

.row {
  justify-content: space-between;
  align-items: flex-end;
}

.task-title {
  text-align: right;
  font-family: monospace;
  font-size: 0.7em;
}
</style>
