<template>
   <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <slot />
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Modal extends Vue {}
</script>

<style lang="scss">
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .64);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  position: relative;
  width: 75%;
  max-width: 1152px;
  margin: 0px auto;
  padding: 40px 30px 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 10px 10px 0 rgba(0, 0, 0, 0.07);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
  
  .modal-close {
    position: absolute;
    right: 36px;
    top: 34px;
    svg {
      font-size: 50px;
      color: #979797;
    }
  }

  &.modal-confirmation {
    .modal-close svg {
      color: white;
    }
  }

}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
