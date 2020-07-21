<template>
  <div>
    <fieldset>
      <legend class="visually-hidden">{{ data.title }}</legend>
      <div
        v-for="(choice, index) in data.choices"
        :key="`option-${index}`"
        class="choice-wrapper"
      >
        <input
          :id="`action-${data.id}-choice-${index}`"
          v-model="value"
          type="checkbox"
          :name="data.id"
          :value="choice.value"
          :required="data.required"
          class="visually-hidden choice-input"
          :class="{ 'choice-input--active': value.includes(choice.value) }"
        />
        <label :for="`action-${data.id}-choice-${index}`" class="choice-label">
          <!-- <span class="choice-key">
            {{ choice.key | uppercase }}
          </span> -->
          {{ choice.text }}
        </label>
      </div>
    </fieldset>

    <!-- <span :id="`action-hint-${data.id}`">{{ data.label }}</span> -->
  </div>
</template>

<script lang="ts">
import { Component, Prop, Mixins } from 'vue-property-decorator';
import { Action } from '~/types';
import ActionBase from '~/components/candidate/action/types/Base';

@Component
export default class CheckboxAction extends Mixins(ActionBase) {
  @Prop({ required: true, type: Object as () => Action.Checkbox })
  readonly data!: Action.Checkbox;

  value?: Action.InputValue.Checkbox;
}
</script>

<style lang="scss" scoped>
@import '~assets/sass/forms/candidate/base';
</style>
