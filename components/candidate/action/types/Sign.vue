<template>
  <div>
    <div class="row">
      <div class="col-12">
        <button
          class="swipe-button button"
          :class="{ 'button--dark': !hasSwiped }"
          @click="toggleSwipe"
        >
          {{ swipeButtonText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Mixins } from 'vue-property-decorator';
import { Action } from '~/types';
import ActionBase from '~/components/candidate/action/types/Base';

@Component
export default class SignAction extends Mixins(ActionBase) {
  @Prop({ required: true, type: Object as () => Action.Sign })
  readonly data!: Action.Sign;

  value?: Action.InputValue.Sign;

  private hasSwiped: boolean = false;

  private get candidateFullName(): string {
    return this.$store.getters['candidate/fullName'];
  }

  private get swipeButtonText(): string {
    return this.hasSwiped
      ? `Signed by ${this.candidateFullName}`
      : 'Swipe to sign';
  }

  private toggleSwipe() {
    this.hasSwiped = !this.hasSwiped;
    this.value = this.hasSwiped ? 'Signed' : 'Not signed';
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/sass/forms/candidate/base';
.swipe-button {
  width: 100%;
}
</style>
