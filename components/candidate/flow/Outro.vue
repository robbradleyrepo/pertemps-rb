<template>
  <div class="flow-complete">
    <h1>Success!</h1>

    <!-- eslint-disable-next-line vue/no-parsing-error -->
    <!-- <div>&#1F64C;</div> -->
    <div class="emoji">🙌</div>

    <p class="text">
      Your registration is now complete and has been submitted to your Pertemps
      consultant.
    </p>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class FlowOutro extends Vue {}
</script>

<style lang="scss" scoped>
.flow-complete {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100%;
}

.emoji {
  font-size: 10rem;
}

.text {
  padding-left: 2rem;
  padding-right: 2rem;
}
</style>
