<template>
  <div>
    <h2 class="title">
      {{ renderedTitle }}
      <span
        v-if="actionIsRequired"
        class="required"
        title="This answer is required"
      >
        *
      </span>
    </h2>

    <button
      v-if="action"
      class="answer button button--link button--inline"
      :class="{ 'answer--required-empty': actionIsRequiredAndEmpty }"
      @click="goToAction"
    >
      <span v-if="actionValue" v-pure-html:nl2br="actionValue" />
      <span v-else>{{ emptyAnswerValue }}</span>
    </button>

    <div v-if="value">{{ value }}</div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Action } from '~/types';

@Component
export default class OutroSingleAction extends Vue {
  @Prop({ required: false, type: Object as () => Action.Any })
  readonly action?: Action.Any;

  @Prop({ required: false, type: String })
  readonly title?: string;

  @Prop({ required: false, type: String })
  readonly value?: string;

  private emptyAnswerValue = '__________';

  private get actionType(): string {
    return this.action ? this.action.type.toLowerCase() : '';
  }

  private get renderedTitle(): string {
    if (this.title) {
      return this.title;
    } else if (this.action) {
      return this.action.name;
    } else {
      return '';
    }
  }

  private get actionIsRequired(): boolean {
    if (this.action && this.action.required === true) {
      return true;
    } else {
      return false;
    }
  }

  private get actionIsRequiredAndEmpty(): boolean {
    return this.actionIsRequired && !this.actionValue;
  }

  private get actionValue(): Action.InputValue.Any | null {
    if (!this.action) return null;

    const actionValue = this.$store.getters['registration/actionValue'](
      this.action.id
    );

    if (!actionValue) return null;

    // Format location value
    if (this.actionType === 'location') {
      const allNull: boolean = Object.values(actionValue).every(
        (val) => val === null
      );

      if (allNull) return null;

      const actionValueToShow = Object.assign({}, actionValue);

      delete actionValueToShow.Fullstr;
      delete actionValueToShow.Lat;
      delete actionValueToShow.Lon;

      return Object.values(actionValueToShow)
        .filter((line) => {
          if (!line) return false;
          const trimmedLine = (line as string).trim();
          if (!trimmedLine) return false;
          return true;
        })
        .join(',<br />');
    }

    // Format radio/select value
    if (
      (this.actionType === 'radio' || this.actionType === 'single_select') &&
      this.action.choices &&
      this.action.choices.choicesList
    ) {
      const valueChoice = this.action.choices.choicesList.find(
        (choice) => choice.value === actionValue
      );

      if (valueChoice) return valueChoice.text;
    }

    // Format checkbox value
    if (this.actionType === 'checkbox' && Array.isArray(actionValue)) {
      const valueLabels = actionValue.map((value) => {
        if (
          this.action &&
          this.action.choices &&
          this.action.choices.choicesList
        ) {
          const choice = this.action.choices.choicesList.find(
            (choice) => choice.value === value
          );

          if (choice) return choice.text;
        }
      });

      if (valueLabels) return valueLabels.join('\n');
    }

    return actionValue;
  }

  private goToAction() {
    if (!this.action) return false;

    this.$store.dispatch('registration/activateAction', {
      actionId: this.action.id,
    });
  }
}
</script>

<style lang="scss" scoped>
.title {
  margin: 0;
  font-size: 1em;
}

.required {
  color: $p-pink;
  font-weight: $font-weight-normal;
}

.answer {
  color: $p-light-blue;
  text-align: left;

  &--required-empty {
    color: $p-pink;
  }
}
</style>
