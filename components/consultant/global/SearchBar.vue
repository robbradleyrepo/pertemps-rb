<template>
    <section class="search-bar" :class="{visible : visible}">
        <div class="container">
            <div class="row">
                <div class="col s12">
                    <div class="search-bar__content">
                        <form>
                            <a @click="toggle">
                                <font-awesome-icon :icon="['fas', 'search']" /> 
                            </a>
                            <input type="text" ref="search" placeholder="Search" />
                        </form>
                    </div>
                </div>
            </div> 
        </div>
    </section>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'; 
@Component
export default class SearchBar extends Vue {
    
    visible: boolean = false;
    
    private toggle(): void {
        this.visible = !this.visible;
    }
}
 
</script>

<style lang="scss" scoped>
.search-bar { 
    background: white;
    overflow: hidden;
    
    &__content {
        display: flex;
        align-items: center; 

        svg {
            font-size: 2.3em;
            cursor: pointer;
            color: $p-offblack
        }
    }
    
    form {
        width: 100%;
        position: relative;
        margin-top: 0em;
        margin-bottom: 0em;

        a {
            position: absolute;
            top: 25px;
            z-index: 100;
        }
    }

    input {
        border: 0;
        outline: 0;
        width: 100%;
        border-bottom: solid 3px #28404e;
        font-size: 48px;
        font-weight: bold;
        color: $p-offblack;
        font-family: 'sofia-pro-soft';
        font-weight: 300;
        padding-left: 60px;
        opacity: 0; 
        margin-top: 0em;
        margin-bottom: 0em;
        cursor: default;

        @include placeholder {
            color: $p-offblack; 
            opacity: 1;
        }
    }

    &.visible {
        form {
            margin-top: 8em;
            margin-bottom: 3em;
        }
        input {
            opacity: 1; 
            cursor: inherit ;
        }
    }

}
</style>
