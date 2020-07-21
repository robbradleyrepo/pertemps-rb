<template>
    <div>
        <div class="progress-label">Work Experience
            <span>{{width}}%</span>
        </div>
        <div class="progress-meter">
            <div class="progress" :style="{ width: width + '%'}" />
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'; 

@Component
export default class ProgressMeter extends Vue {
    @Prop({ required: true, type: String })
    readonly width!: string;
}

</script>

<style lang="scss" scoped>
.progress-label {
    span {
        float: right;
    }
}
.progress-meter {
    width: 100%;
    background: $p-grey-boulder;
    height: 7px;
    display: inline-block;

    .progress {
        background: $p-red;
        height: 7px;
        border-radius: 3px;  
    }
}

</style>
