<template>
  <span class="pretty-size">{{ prettySize }}</span>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import prettysize from 'prettysize';

@Component
export default class PrettySize extends Vue {
  @Prop({ required: true, type: Number })
  size?: number;
  private get prettySize(): any {
    const pretty: any = prettysize;
    return pretty(this.size);
  }
}
</script>
