<template>
  <div>
    <div class="row">
      <div class="col-9">
        <div class="input-wrapper input-wrapper--landline">
          <input
            :id="`action-${data.id}`"
            ref="input"
            v-model.trim="value"
            v-cleave="{ phone: true, phoneRegionCode: 'gb' }"
            type="tel"
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

    <ActionHelp text="I do not have a landline phone number" />
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
export default class PhoneAction extends Mixins(ActionBase) {
  @Prop({ required: true, type: Object as () => Action.Phone })
  readonly data!: Action.Phone;

  value?: Action.InputValue.Phone;
}
</script>

<style lang="scss" scoped>
@import '~assets/sass/forms/candidate/base';

.input-wrapper {
  &--landline {
    .input {
      width: 100%;
      letter-spacing: 0.2em;
    }
  }
}
</style>
