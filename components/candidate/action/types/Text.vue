<template>
  <div>
    <!-- <label :for="`action-${data.id}`" class="visually-hidden">
      {{ data.title }}:
    </label> -->

    <div class="row">
      <div class="col-9">
        <div class="input-wrapper">
          <input
            :id="`action-${data.id}`"
            ref="input"
            v-model.trim="value"
            type="text"
            :name="data.id"
            :placeholder="null"
            :required="data.required"
            :class="{ 'input--not-empty': !valueIsEmpty }"
            class="input"
          />

          <label :for="`action-${data.id}`" class="smart-label">
            {{ data.name }}
          </label>
        </div>
      </div>
    </div>

    <ActionHelp v-if="data.name === 'Type of Work'" />

    <!-- <pre>{{ value }}</pre>
    <pre>{{ actionStateValue }}</pre> -->

    <!-- <br />
    <span :id="`action-hint-${data.id}`">{{ data.label }}</span> -->

    <!-- <br />
    <br />
    <pre v-if="error" class="error">Error</pre> -->

    <!-- <details>
      <summary>Data</summary>
      <fieldset>
        <legend>Value to submit</legend>
        <pre>{{ valueToSubmit }}</pre>
        <pre>Value has changed = {{ valueHasChanged }}</pre>
      </fieldset>
      <fieldset>
        <legend>Last saved value</legend>
        <pre>{{ lastSavedValue }}</pre>
      </fieldset>
      <fieldset>
        <legend>Original data</legend>
        <pre>{{ data }}</pre>
      </fieldset>
    </details> -->
  </div>
</template>

<script lang="ts">
import { Component, Prop, Mixins } from 'vue-property-decorator';
import { Action } from '~/types';
import ActionBase from '~/components/candidate/action/types/Base';
import ActionHelp from '~/components/candidate/action/Help.vue';

@Component({
  components: { ActionHelp },
})
export default class TextAction extends Mixins(ActionBase) {
  @Prop({ required: true, type: Object as () => Action.Text })
  readonly data!: Action.Text;

  value?: Action.InputValue.Text;

  private lastSavedValue: Action.InputValue.Text | null = null;

  // private get valueHasChanged(): boolean {
  //   if (this.lastSavedValue) {
  //     return (
  //       JSON.stringify(this.valueToSubmit) !==
  //       JSON.stringify(this.lastSavedValue)
  //     );
  //   } else {
  //     return this.value !== this.data.value;
  //   }
  // }

  // private get valueToSubmit(): Action.TextSubmitValue {
  //   return {
  //     [this.data.id]: this.value as string,
  //   };
  // }

  // private focusInputElement() {
  //   if (this.$refs.input) {
  //     (this.$refs.input as HTMLInputElement).focus();
  //   }
  // }

  // mounted() {
  //   this.$nextTick(this.focusInputElement);
  // }

  // updated() {
  //   this.$nextTick(this.focusInputElement);
  // }
}
</script>

<style lang="scss" scoped>
@import '~assets/sass/forms/candidate/base';

input {
  transition: background-color 3s ease;
}

.saving {
  background-color: rgba(orange, 0.2);
  transition-duration: 0s;
}

.saved {
  background-color: rgba(green, 0.2);
  transition-duration: 0s;
}

.error {
  background-color: rgba(red, 0.2);
}
</style>
