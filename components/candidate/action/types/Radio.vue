<template>
  <div>
    <fieldset>
      <legend class="visually-hidden">{{ data.title }}</legend>
      <div
        v-for="(choice, index) in choicesWithKeys"
        :key="`option-${index}`"
        class="choice-wrapper"
      >
        <input
          :id="`action-${data.id}-choice-${index}`"
          v-model="value"
          type="radio"
          :name="data.id"
          :value="choice.value"
          :required="data.required"
          class="visually-hidden choice-input"
          :class="{ 'choice-input--active': value === choice.value }"
        />
        <label :for="`action-${data.id}-choice-${index}`" class="choice-label">
          <span class="choice-key">
            {{ choice.key | uppercase }}
          </span>
          {{ choice.text }}
        </label>
      </div>
    </fieldset>

    <!-- <span :id="`action-hint-${data.id}`">{{ data.label }}</span> -->
  </div>
</template>

<script lang="ts">
import { Component, Prop, Mixins, Watch } from 'vue-property-decorator';
import { Action } from '~/types';
import ActionBase from '~/components/candidate/action/types/Base';

@Component
export default class RadioAction extends Mixins(ActionBase) {
  @Prop({ required: true, type: Object as () => Action.Radio })
  readonly data!: Action.Radio;

  value?: Action.InputValue.Radio;

  private keysInUse: string[] = [];

  private get choicesWithKeys(): Action.ChoiceSingle[] {
    if (
      !this.data.choices ||
      !this.data.choices.choicesList ||
      this.data.choices.choicesList.length < 1
    ) {
      return [];
    }

    return this.data.choices.choicesList.map((choice, index) => {
      // Exclude non-alphanumeric characters from text string
      const choiceText = choice.text.toLowerCase().replace(/[^0-9a-z]/gi, '');

      for (const char of choiceText) {
        const keyIndex = (index + 1).toString();
        choice.keyIndex = keyIndex;

        if (!this.keysInUse.includes(char)) {
          choice.key = char;

          this.keysInUse.push(char, keyIndex);

          break;
        }
      }

      if (!choice.key) {
        choice.key = choice.keyIndex;
      }

      return choice;
    });
  }

  @Watch('value')
  onRadioValueChanged(
    newVal: Action.InputValue.Radio,
    oldVal: Action.InputValue.Radio
  ) {
    if (!oldVal || newVal === oldVal) return;

    // When the selected value changes, clear the stored values of all other dependency questions
    this.resetDependencyActionValues(oldVal);
  }

  private resetDependencyActionValues(oldVal: Action.InputValue.Radio) {
    const reset = (actionId: string, val?: Action.InputValue.Radio) => {
      const dependencyQuestions: Action.Any[] | null = this.$store.getters[
        'registration/allChildActionsOfAction'
      ]({
        actionId,
        value: val || null,
      });

      if (!dependencyQuestions || dependencyQuestions.length <= 0) return;

      for (const question of dependencyQuestions) {
        if (!question.id) return;

        this.$store.commit('registration/setActionValue', {
          [question.id]: null,
        });

        reset(question.id);
      }
    };

    reset(this.data.id, oldVal);
  }

  private onKeyDown(event: KeyboardEvent) {
    if (!this.choicesWithKeys || event.ctrlKey || event.metaKey) return false;

    const pressedKey = event.key.toLowerCase();

    for (const choice of this.choicesWithKeys) {
      if (pressedKey === choice.key || pressedKey === choice.keyIndex) {
        this.value = choice.value;
      }
    }
  }

  private addEventListeners() {
    window.addEventListener('keydown', this.onKeyDown);
  }

  private removeEventListeners() {
    window.removeEventListener('keydown', this.onKeyDown);
  }

  mounted() {
    this.addEventListeners();
  }

  beforeDestroy() {
    this.removeEventListeners();
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/sass/forms/candidate/base';
</style>
