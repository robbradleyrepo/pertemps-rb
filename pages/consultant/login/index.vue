<template> 
  <div class="page-wrap">
    <HeaderBasic/>
    <ModalControl @openModal="modal = true" />
    <SearchBar />
    <main>
      <div class="container pad-100 f-forms">        
        <div class="row">
          <div class="col s12 m5 offset-m3">
            <!-- FORM -->
            <form action="#" method="post" @submit.prevent="login">
              <fieldset>
                <legend>Enter your email</legend> 
                  <div class="f-forms__element">
                    <input
                      id="email"
                      v-model="email"
                      name="email"
                      type="email"
                      required
                      placeholder="Email"
                    />
                    <label for="email">Email:</label>
                  </div>
                  <div class="f-forms__element">
                    <input
                      id="password"
                      v-model="password" 
                      type="password"
                      required
                      placeholder="password"
                    />
                    <label for="password">Password:</label>
                  </div> 

                  <a href="#" class="pw-link">Forgot your password?</a>

                  <input
                    type="submit"
                    :value="loginButtonText"
                    class="button"
                    :disabled="loading"
                  /> 


              </fieldset>
            </form>
            <div v-if="error" class="error">{{ error }}</div>
            <div v-if="error">
              <br />
              <button class="button" @click="fakeLogin">
                {{ fakeLoginButtonText }}
              </button>
            </div>
          </div>
        </div>
      </div>
  </main>
  <div class="container">
    <HeaderNav />
  </div>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import ConsultantLoginHelper from '~/mixins/ConsultantLoginHelper';
import HeaderNav from '~/components/nav/HeaderNav.vue';
import HeaderBasic from '~/components/consultant/global/HeaderBasic.vue';

@Component({
  middleware: 'consultant/notAuthenticated',
  components: { HeaderNav, HeaderBasic },
})
export default class ConsultantLogin extends Mixins(ConsultantLoginHelper) {}
</script>

<style lang="scss" scoped>
@import '~assets/sass/forms/candidate/base';
.f-forms {

  .f-forms__element {
    margin: 20px 0;
  }

  legend {
    font-family: 'sofia-pro';
    font-size: 48px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: -0.86px;
    color: $p-offblack;
    padding-top: 50px;
    padding-bottom: 30px;
    display: block;
  }

  .pw-link {
    display: block;
    text-align: right;
    color: $p-offblack;
    font-size: 18px;
    margin: 20px 0;
  }

  [type=submit] {
    width: 100%;
  }
}
.error {
  background-color: rgba(red, 0.2);
  padding: 1rem;
  margin-top: 2rem;
}
</style>
