<template>
  <div>
    <div class="row">
      <div class="col-9">
        <div class="input-wrapper">
          <input
            :id="`action-${data.id}`"
            ref="input"
            v-model.trim="value"
            type="text"
            :name="data.id"
            :placeholder="placeholder"
            :required="data.required"
            :class="{ 'input--not-empty': !valueIsEmpty }"
            class="input"
          />

          <label :for="`action-${data.id}`" class="smart-label">
            {{ data.name }}
          </label>
        </div>
      </div>

      <div class="col-3 salary-period-wrapper">
        <label :for="`action-${data.id}-period`" class="visually-hidden">
          {{ data.name }}
        </label>
        <select
          :id="`action-${data.id}-period`"
          v-model="salaryPeriod"
          :name="`action-${data.id}-period`"
          class="salary-period"
        >
          <option value="hour">per hour</option>
          <option value="week">per week</option>
          <option value="month">per month</option>
          <option value="year">per year</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Mixins } from 'vue-property-decorator';
import { Action } from '~/types';
import ActionBase from '~/components/candidate/action/types/Base';

@Component
export default class SalaryAction extends Mixins(ActionBase) {
  @Prop({ required: true, type: Object as () => Action.Salary })
  readonly data!: Action.Salary;

  value?: Action.InputValue.Salary;

  private salaryPeriod: 'hour' | 'week' | 'month' | 'year' = 'hour';

  private get placeholder(): string | null {
    switch (this.salaryPeriod) {
      case 'hour':
        return '10.00';
      case 'week':
        return '500.00';
      case 'month':
        return '2,000.00';
      case 'year':
        return '30,000.00';
      default:
        return null;
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/sass/forms/candidate/base';

.salary-period-wrapper {
  position: relative;
  align-self: center;
  display: flex;
  align-items: center;
  align-self: flex-end;
  margin-bottom: calc(0.5em + 3px);
}

.salary-period {
  @extend %input-reset;
  font-size: 0.8em;
  width: 100%;
}

.salary-arrow {
  width: 0.4em;
  height: 0.4em;
  margin-left: 0.4em;
  margin-top: 0.3em;

  &::after {
    content: '';
    display: block;
    width: 0;
    height: 0;
    border-left: 0.2em solid transparent;
    border-right: 0.2em solid transparent;
    border-top: 0.4em solid #000;
  }
}

.input-wrapper {
  &::before {
    content: '£';
    display: block;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    margin-top: 3px;
    font-size: 1.5em;
  }
}

input[type='text'].input {
  padding-left: 1.5ch;
}
</style>
