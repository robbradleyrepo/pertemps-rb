<template>
  <div>
    <!-- <label :for="`action-${data.id}`">{{ data.title }}:</label> -->

    <pre>StartEndDate</pre>

    <!-- <div class="row">
      <div class="col-9">
        <div class="input-wrapper">
          <input
            :id="`action-${data.id}`"
            ref="input"
            v-model.trim="value.startDate"
            type="date"
            :name="data.id"
            :placeholder="null"
            :required="data.required"
            :class="{ 'input--not-empty': !valueIsEmpty }"
            class="input"
          />

          <label :for="`action-${data.id}`" class="smart-label">
            Start date
          </label>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-9">
        <div class="input-wrapper">
          <input
            :id="`action-${data.id}`"
            ref="input"
            v-model.trim="value.endDate"
            type="date"
            :name="data.id"
            :placeholder="null"
            :required="data.required"
            :class="{ 'input--not-empty': !valueIsEmpty }"
            class="input"
          />

          <label :for="`action-${data.id}`" class="smart-label">
            End date
          </label>
        </div>
      </div>
    </div> -->

    <!-- <br />
    <span :id="`action-hint-${data.id}`">{{ data.label }}</span> -->
  </div>
</template>

<script lang="ts">
import { Component, Prop, Mixins } from 'vue-property-decorator';
import { Action } from '~/types';
import ActionBase from '~/components/candidate/action/types/Base';

@Component
export default class StartEndDateAction extends Mixins(ActionBase) {
  @Prop({ required: true, type: Object as () => Action.StartEndDate })
  readonly data!: Action.StartEndDate;

  value?: Action.InputValue.StartEndDate;
}
</script>

<style lang="scss" scoped>
@import '~assets/sass/forms/candidate/base';
</style>
