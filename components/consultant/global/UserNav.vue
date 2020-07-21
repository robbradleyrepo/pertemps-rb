<template>
    <div class="user-nav">
        <a href="">
            {{$store.state.consultant.auth.firstName}}
            <font-awesome-icon :icon="['fas', 'chevron-down']" />
        </a>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'; 
@Component
export default class UserNav extends Vue {}
</script>

<style lang="scss" scoped>
.user-nav {
    display: flex;
    flex-flow: row;
    align-items: center;
    justify-content: flex-end;
    padding-top: 25px;

    a {
        color: $p-grey-thunder;
        font-size: 16px;
        font-weight: 500;
        text-decoration: none;
    }
    
    svg {
        color: $p-aqua;
        margin-left: 10px;
    }
}
</style>
