<template>
    <header> 
        <div class="container-wide">
            <div class="row">
                <div class="col s12 align-right">
                    <UserNav />
                </div>
            </div>
            <div class="row main-nav">
                <div class="col s3 align-left border">
                    <h1>
                        <Logo />
                        <span>Consultant Registration<br />Portal</span>
                    </h1>
                </div>
                <div class="col s8 offset-s1 align-left">
                    <h2>Login</h2>
                </div>
            </div>
        </div>
    </header>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'; 
import Logo from '~/components/global/Logo.vue';

@Component({
  components: { Logo }
})
export default class HeaderBasic extends Vue{}
</script>

<style lang="scss" scoped>

header {
    background-color: white;
    border-bottom: 1px solid $p-grey-concrete;
    overflow: hidden;
    height: 204px;

    .row {
        margin-top: 0;
        margin-bottom: 0;
    }

    .main-nav {
        margin-top: 30px;
    }

    h1 {
        padding-bottom: 80px;
        span {
            display: block;
            @include font-size(14px);
            font-weight: 300;
            font-stretch: normal;
            font-style: normal;
            line-height: 0.86;
            letter-spacing: -0.25px;
            color:$p-grey-thunder;
        }
    }

    .logo {
        padding: 0;
        margin-top: -15px;
    }

    h2 {
        font-family: 'sofia-pro-soft';
        font-weight: 300;
        font-size: 36px;
        a {
            cursor: pointer;
        }
        svg {
            color: $p-aqua;
            cursor: pointer;
        }
    }

    .border {
        border-right: 1px solid $p-grey-concrete;
    }
} 
</style>