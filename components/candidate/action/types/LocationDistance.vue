<template>
  <div>
    <!-- <label :for="`action-${data.id}`">{{ data.title }}:</label> -->

    <div class="row">
      <div class="col-9">
        <div class="input-wrapper">
          <input
            :id="`action-${data.id}`"
            ref="input"
            v-model.number="value"
            type="number"
            :name="data.id"
            :placeholder="data.placeholder"
            :required="data.required"
            :min="data.min"
            :max="data.max"
            :step="data.step"
            :class="{ 'input--not-empty': !valueIsEmpty }"
            class="input"
          />

          <label :for="`action-${data.id}`" class="smart-label">
            {{ data.name }}
          </label>
        </div>
      </div>
    </div>

    <!-- <br />
    <span :id="`action-hint-${data.id}`">{{ data.label }}</span> -->
  </div>
</template>

<script lang="ts">
import { Component, Prop, Mixins } from 'vue-property-decorator';
import { Action } from '~/types';
import ActionBase from '~/components/candidate/action/types/Base';

@Component
export default class LocationDistanceAction extends Mixins(ActionBase) {
  @Prop({ required: true, type: Object as () => Action.LocationDistance })
  readonly data!: Action.LocationDistance;

  value?: Action.InputValue.LocationDistance;
}
</script>

<style lang="scss" scoped>
@import '~assets/sass/forms/candidate/base';
</style>
