<template>
  <div class="p-input">
    <div class="input-wrapper">
      <input
        :id="id"
        ref="input"
        type="text"
        :value="value"
        :name="id"
        :required="required"
        :disabled="disabled"
        :class="{ 'input--not-empty': !valueIsEmpty }"
        class="input input--no-h-padding"
        @input="$emit('input', $event.target.value)"
      />

      <label :for="id" class="smart-label">
        {{ label }}
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
// import { Action } from '~/types';

@Component
export default class PInput extends Vue {
  @Prop({ required: true, type: String })
  readonly id!: string;

  @Prop({ required: true, type: String })
  readonly label!: string;

  @Prop({ required: false, type: Boolean })
  readonly required?: boolean;

  @Prop({ required: false, type: String })
  readonly value?: string;

  @Prop({ required: false, type: Boolean })
  readonly disabled?: boolean;

  // private value?: Action.InputValue.Any | Action.ActionSetValue[] | null = '';

  public get valueIsEmpty(): boolean {
    // if (this.actionType === 'date') return false;
    if (typeof this.value === 'number') return false;
    if (typeof this.value === 'boolean') return false;
    if (typeof this.value === 'string' && this.value.length > 0) return false;
    if (typeof this.value === 'undefined' || this.value === null) return true;

    return true;
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/sass/forms/candidate/base';
</style>

<style lang="scss" scoped>
.p-input {
  padding-top: 2rem;
}

.input {
  &:disabled {
    opacity: 0.5;
  }
}
</style>
