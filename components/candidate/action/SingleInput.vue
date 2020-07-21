<template>
  <div>
    <!-- Text action -->
    <TextAction
      v-if="
        actionType === 'text' &&
          action.placeholder !== 'Swipe to sign' &&
          action.name !== 'Salary' &&
          action.name !== 'Landline'
      "
      :key="action.id"
      :data="action"
    />

    <!-- TextareaAction action -->
    <TextareaAction
      v-if="actionType === 'textarea'"
      :key="action.id"
      :data="action"
    />

    <!-- Number action -->
    <NumberAction
      v-if="actionType === 'number'"
      :key="action.id"
      :data="action"
    />

    <!-- Email action -->
    <EmailAction
      v-if="actionType === 'email'"
      :key="action.id"
      :data="action"
    />

    <!-- Date action -->
    <DateAction v-if="actionType === 'date'" :key="action.id" :data="action" />

    <!-- StartEndDate action -->
    <StartEndDateAction
      v-if="actionType === 'startenddate'"
      :key="action.id"
      :data="action"
    />

    <!-- Checkbox action -->
    <CheckboxAction
      v-if="actionType === 'checkbox'"
      :key="action.id"
      :data="action"
    />

    <!-- Radio action -->
    <RadioAction v-if="isRadioAction" :key="action.id" :data="action" />

    <!-- Select action -->
    <SelectAction v-if="isSingleSelectAction" :key="action.id" :data="action" />

    <!-- Location action -->
    <LocationAction
      v-if="actionType === 'location'"
      :key="action.id"
      :data="action"
    />

    <!-- LocationDistance action -->
    <LocationDistanceAction
      v-if="actionType === 'locationdistance'"
      :key="action.id"
      :data="action"
    />

    <!-- File action -->
    <FileAction v-if="actionType === 'file'" :key="action.id" :data="action" />

    <!-- Swipe to sign action -->
    <SignAction
      v-if="action.placeholder === 'Swipe to sign'"
      :key="action.id"
      :data="action"
    />

    <!-- Salary action -->
    <SalaryAction
      v-if="action.name === 'Salary'"
      :key="action.id"
      :data="action"
    />

    <!-- Phone number action -->
    <PhoneAction
      v-if="actionType === 'text' && action.name === 'Landline'"
      :key="action.id"
      :data="action"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Action } from '~/types';
import TextAction from '~/components/candidate/action/types/Text.vue';
import TextareaAction from '~/components/candidate/action/types/Textarea.vue';
import NumberAction from '~/components/candidate/action/types/Number.vue';
import EmailAction from '~/components/candidate/action/types/Email.vue';
import DateAction from '~/components/candidate/action/types/Date.vue';
import StartEndDateAction from '~/components/candidate/action/types/StartEndDate.vue';
import CheckboxAction from '~/components/candidate/action/types/Checkbox.vue';
import RadioAction from '~/components/candidate/action/types/Radio.vue';
import SelectAction from '~/components/candidate/action/types/Select.vue';
import LocationAction from '~/components/candidate/action/types/Location.vue';
import LocationDistanceAction from '~/components/candidate/action/types/LocationDistance.vue';
import FileAction from '~/components/candidate/action/types/File.vue';
import SignAction from '~/components/candidate/action/types/Sign.vue';
import SalaryAction from '~/components/candidate/action/types/Salary.vue';
import PhoneAction from '~/components/candidate/action/types/Phone.vue';

@Component({
  components: {
    TextAction,
    TextareaAction,
    NumberAction,
    EmailAction,
    DateAction,
    StartEndDateAction,
    CheckboxAction,
    RadioAction,
    SelectAction,
    LocationAction,
    LocationDistanceAction,
    FileAction,
    SignAction,
    SalaryAction,
    PhoneAction,
  },
})
export default class ActionSingleInput extends Vue {
  @Prop({ required: true, type: Object as () => Action.Any })
  readonly action!: Action.Any;

  private get actionType(): string {
    return this.action.type.toLowerCase();
  }

  private get isRadioAction(): boolean {
    if (
      this.actionType === 'radio' ||
      (this.actionType === 'single_select' &&
        this.action.choices &&
        this.action.choices.isDropdownDisplayOrNot !== true)
    ) {
      return true;
    }

    return false;
  }

  private get isSingleSelectAction(): boolean {
    if (
      this.actionType === 'single_select' &&
      this.action.choices &&
      this.action.choices.isDropdownDisplayOrNot === true
    ) {
      return true;
    }

    return false;
  }

  private created() {
    this.clearActiveValue();
  }

  private beforeUpdate() {
    this.clearActiveValue();
  }

  private destroyed() {
    this.clearActiveValue();
  }

  clearActiveValue() {
    this.$store.commit('registration/setActiveActionValue', null);
  }
}
</script>
