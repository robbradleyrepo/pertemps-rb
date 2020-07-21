<template>
  <div>
    <label :for="`action-${data.id}`">{{ data.title }}:</label>

    <input
      :id="`action-${data.id}`"
      ref="input"
      type="file"
      :name="data.id"
      :required="data.required"
      :aria-describedby="`action-hint-${data.id}`"
      :accept="data.accept"
      class="input"
      @change="onFileChange"
    />

    <br />
    <span :id="`action-hint-${data.id}`">{{ data.label }}</span>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Action } from '~/types';

@Component
export default class FileAction extends Vue {
  @Prop({ required: true, type: Object as () => Action.File })
  readonly data!: Action.File;

  value?: Action.InputValue.File;

  onFileChange(event: Event) {
    const target = event.target as HTMLInputElement;

    this.value = [];

    if (target.files) {
      this.value = target.files;
    }

    console.log(target.files);
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/sass/forms/candidate/base';
</style>
