<template> 
    <div class="modal-control" @click="emitEvent">
        <ModalControlSvg />
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'; 
import ModalControlSvg from '~/assets/svg/modal-control.svg';

@Component({
  components: { ModalControlSvg },
})
export default class ModalControl extends Vue {
    private emitEvent() {
        this.$emit('openModal');
    }
}
</script>

<style lang="scss" scoped>

.modal-control {
    position: fixed;
    top: 168px;
    right: 6vw;
    z-index: 10; 
    cursor: pointer;
} 

</style>
