<template>
  <div>
    <!-- <label :for="`action-${data.id}`">{{ data.title }}:</label> -->

    <div class="input-wrapper">
      <textarea
        :id="`action-${data.id}`"
        ref="input"
        v-model.trim="value"
        :name="data.id"
        :required="data.required"
        rows="5"
        autocapitalize="sentences"
        autocomplete="on"
        spellcheck="true"
        wrap="soft"
        :class="{ 'input--not-empty': !valueIsEmpty }"
        class="input"
      />

      <label :for="`action-${data.id}`" class="smart-label">
        {{ data.name }}
      </label>
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
export default class TextAreaAction extends Mixins(ActionBase) {
  @Prop({ required: true, type: Object as () => Action.Textarea })
  readonly data!: Action.Textarea;

  value?: Action.InputValue.Textarea;
}
</script>

<style lang="scss" scoped>
@import '~assets/sass/forms/candidate/base';

textarea {
  @extend %input-reset;
  border-left: 3px solid $text-dark;
  margin-left: -6px;
  padding: 1rem;
  padding-left: calc(1rem + 6px);
  width: 100%;
}
</style>
