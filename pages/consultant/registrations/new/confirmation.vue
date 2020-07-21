<template>
    <div class="modal-container modal-confirmation">
        <a href="#" class="modal-close"><font-awesome-icon :icon="['fa', 'times']" /></a>
        <h1>FirstName's Registration Confirmation</h1>
        <div class="confirmation-content">
            <div v-show="toggle" class="sms">
                <p>Welcome John, you have now started your registration with Pertemps.</p>
                <p>You can speed up the process by clicking this link: <a href="https://pertem.ps/f5gR46T">https://pertem.ps/f5gR46T</a></p>
                <p>We have also emailed you a link, in case you would prefer to use a larger screen.</p>
                <p>Please contact us if you have any questions.</p>
            </div>
            <div v-show="!toggle" class="email">
                <div class="email-top">
                    <div class="email-label">
                        <span class="email-label__from">Pertemps Recruitment</span>
                        <span class="email-label__to">FirstName SecondName</span>
                    </div>
                    <div class="email-subject">
                        <Logo />
                        <span class="email-subject__actual">Complete your registration with pertemps</span>
                    </div>

                </div>    
                <div class="email-bottom">
                    <p>Dear |CandidateFirstName|,</p>
                    <p>Your |BrandName| registration form is now ready for you to complete.</p>
                    <a href="#" class="button">Complete registration now</a>
                </div>
            </div>
        </div>
        <div class="confirmation-controls">
            <a href="#" v-on:click="toggle = !toggle">SMS</a>
            <a href="#" v-on:click="toggle = !toggle">Email</a>
        </div>
        <div class="confirmation-qr">
            <div class="qr-temp" />
            <p>Scan this code <span>(inbranch registration)</span></p>
        </div>
        <div class="modal-content__narrow">
            <a href="#" class="button button-primary">
                Close this view
            </a>
            <a href="#" class="button button-secondary">
                Open FirstName's profile
            </a>
        </div> 
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Logo from '~/components/global/Logo.vue';

@Component({
  components: { Logo },
})

export default class ConsultantRegistrationConfirmation extends Vue {
    
    private data() {
        return {
            toggle: true
        }
    }
}
</script>

<style lang="scss">
@import '~assets/sass/forms/consultant/base';

.modal-confirmation {
    background: $p-aqua;
    text-align: center;

    h1, a, p {
        color: $p-white;
    }
   
    .confirmation-content {
        background-image: url('~static/iphone@2x.png');
        background-size: 100%;
        background-repeat: no-repeat;
        background-position: 50% 0;
        width: 309px;
        height: 426px;
        margin: 20px auto;

        p {
            color: black;
        }

        a {
            color: $p-aqua;
            text-decoration: none;
        }
        
        .sms {
            background-image: url('~static/message-shape@2x.png');
            background-size: 100%;
            background-repeat: no-repeat;
            top: 75px;
            position: relative;
            width: 254px;
            height: 324px;
            margin: auto;
            padding: 10px;

            p {
                font-size: 17px;
                line-height: 1.3;
            }
            
        }

        .email {
            display: flex;
            flex-flow: column;
            
            &-top { 
                background: transparent;
                width: 273px;
                height: 187px;
                margin: 70px auto 0;
                padding: 15px;

                span {
                    text-align: left;
                    display: block;
                    color: white;
                }

                .email-label {

                    border-top: solid 0.6px $p-offwhite;
                    border-bottom: solid 0.6px $p-offwhite;
                    padding: 10px;
                    
                    &__from {
                        color: black;
                        font-size: 10.2px;
                        font-weight: bold;
                        letter-spacing: -0.25px;
                    }

                    &__to {
                        font-size: 9px;
                        font-weight: 500;
                        letter-spacing: -0.22px;
                    }
                }

                .email-subject {
                    padding: 10px;
                    text-align: left;
                    a {
                        cursor: not-allowed;
                        pointer-events: none;
                        padding: 0;
                    }
                    svg {
                        color: $p-dark-blue;
                        width: 77px;
                    }

                    &__actual {
                        font-family: 'sofia-pro-soft';
                        font-size: 21.6px;
                        font-weight: bold;
                        line-height: 1.11;
                        letter-spacing: normal;
                        color: #ffffff;
                    }
                }

            }

            &-bottom {
                background: white;
                width: 273px;
                height: 168px;
                margin: auto;
                padding: 0 25px;
                text-align: left;

                p {
                    opacity: 0.73;
                    font-family: Arial, Helvetica, sans-serif;
                    font-size: 9.6px;
                    font-weight: 500;
                    &:first-child {
                        font-size: 14.4px;
                    }
                }

                .button {
                    display: block;
                    width: 100%;
                    background: $p-aqua;
                    color: white;
                    font-family: 'sofia-pro-soft';
                    font-size: 10.8px;
                    font-weight: bold;

                }
            }
        }
    }

    .confirmation-controls {
        display: flex;
        flex-flow: row;
        align-items: center;
        justify-content: center;

        a {
            font-family: 'sofia-pro';
            text-decoration: none;
            font-size: 20px;
            font-weight: 400;
            padding: 5px 30px;

            &:active, &:focus {
                color: black;
            }
        }
    }

    .confirmation-qr {
        margin-top: 20px;
        display: flex;
        flex-flow: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        
        .qr-temp {
            border: 1px solid white;
            background: black;
            opacity: 0.4;
            width: 75px;
            height: 75px;
            display: block;
        }

        p {
            font-family: 'sofia-pro';
            text-decoration: none;
            font-size: 20px;
            font-weight: 500;
            span {
                display: block;
                font-weight: 300;
            }
        }


    }

    .button {
        width: 100%;
        display: block;
        text-align: center;
        padding: 15px;
        text-decoration: none;
        font-family: 'sofia-pro';
        text-decoration: none;
        font-size: 18px;
        margin: 10px auto;
        
        &.button-primary {    
            box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.12);
            background: white;
            border-radius: 4px;
            color: $p-mineshaft;
            font-weight: 600;
        }

        &.button-secondary {    
            background: transparent;
            color: white;
        }
    }
}

.modal-content__narrow {
    width: 380px;
    margin: 10px auto;
    overflow: auto;
}
</style>
