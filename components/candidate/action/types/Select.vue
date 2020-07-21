<template>
  <div>
    <div class="row">
      <div class="col-9">
        <div class="input-wrapper">
          <label :for="`action-${data.id}`" class="static-label">
            {{ data.name }}
          </label>

          <select
            :id="`action-${data.id}`"
            v-model="value"
            :name="data.id"
            :required="data.required"
            class="input input--not-empty"
          >
            <option value="">---</option>
            <option
              v-for="(choice, index) in data.choices.choicesList"
              :key="`choice-${index}`"
              :value="choice.value"
            >
              {{ choice.text }}
            </option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Mixins } from 'vue-property-decorator';
import { Action } from '~/types';
import ActionBase from '~/components/candidate/action/types/Base';

@Component
export default class Select extends Mixins(ActionBase) {
  @Prop({ required: true, type: Object as () => Action.Select })
  readonly data!: Action.Select;

  value?: Action.InputValue.Select;
}
</script>

<style lang="scss" scoped>
@import '~assets/sass/forms/candidate/base';
</style>
