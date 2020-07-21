<template>
  <div class="page-wrap">
    <HeaderConsultant />
    <ModalControl @openModal="modal = true" />
    <SearchBar />
    <main>
      <div class="container pad-100">
        <div class="row">
          <div class="col s12 align-left">
            <h2>
              <a>
                Default: Recent Candidate Activity
                <font-awesome-icon :icon="['fas', 'chevron-down']" />
              </a>
            </h2>
          </div>
        </div>
        <div class="row">
          <div class="col s12 align-left">
            <ul v-if="responseReceived" class="dashboard-table" >
              <li>
                <div class="row row-header">
                  <div>Candidate</div>
                  <div>Form Type</div>
                  <div>Initiated</div>
                  <div>Progress</div> 
                </div>
              </li>
              <li v-for="reg in apiData.registrations" :key="reg.id">
                <a href="#">
                  <div class="row">
                    <div class="cell-candidate">{{ reg.candidate.firstName }} {{ reg.candidate.lastName }}
                      <span>{{ reg.candidate.email }}</span>
                    </div>
                    <div class="cell-type">{{ reg.flow.title }}</div>
                    <div class="cell-init">{{$store.getters["consultant/fullName"]}}<span>25/03/2001</span></div>
                    <div class="cell-meter"><ProgressMeter width="20" /></div> 
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
    <Modal v-if="modal">
      <ConsultantRegistrationNew  v-if="!status" @formSuccess="status = true" />
      <Confirmation v-if="status" />
    </Modal>
    <div class="container">
      <HeaderNav />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Registration, Candidate } from '~/types';
import HeaderConsultant from '~/components/consultant/global/HeaderConsultant.vue';
import ModalControl from '~/components/consultant/global/ModalControl.vue';
import SearchBar from '~/components/consultant/global/SearchBar.vue';
import ProgressMeter from '~/components/consultant/global/ProgressMeter.vue';
import Modal from '~/components/consultant/global/Modal.vue';
import ConsultantRegistrationNew from '~/pages/consultant/registrations/new/index.vue';
import Confirmation from '~/pages/consultant/registrations/new/confirmation.vue';
import HeaderNav from '~/components/nav/HeaderNav.vue';

@Component({
  middleware: 'consultant/authenticated',
  components: { HeaderNav, ModalControl, SearchBar, HeaderConsultant, ProgressMeter, Modal, ConsultantRegistrationNew, Confirmation },
  async asyncData({ $axios, store }) {
    try {
      const response = await $axios.get(
        `${process.env.apiUrl}API/v1/ConsultantDashboard/${store.state.consultant.auth.id}`
      );
      return { apiData: response.data, responseReceived: true };
    } catch (error) {
      throw new Error(error);
    }
  },
})
export default class ConsultantRegistrations extends Vue {
  apiData?: Registration.ApiData;
  responseReceived: boolean = false;
  modal: boolean = false;
  status: boolean = false;

  private fullName(candidate: Candidate.User): string {
    return `${candidate.firstName} ${candidate.lastName}`;
  }
  
  private formSuccess() {

  }
}
</script>

<style lang="scss" scoped>

main {
  background-color: $p-grey-concrete;
}

.row-data {
  background: $p-white;
  padding: 30px 0 20px;
}

.pad-100 {
  padding-top: 100px;
}

h2 {
  svg {
    color: $p-aqua;
    font-size: 32px;
  }
}

.dashboard-table {
  list-style: none;
  padding: 0;
  margin: 0;

  a {
    text-decoration: none;
  }

  .row {

    display: table;
    width: 100%;
    background: white;
    padding: 30px 50px 20px;
    margin: 1em 0;
    
    &.row-header {
      background: transparent;
      padding: 15px 50px;
      & > div {
        color: $p-light-blue;
        text-transform: uppercase;
        font-size: 14px;
        font-weight: bold;
      }
    }

    & > div {
      width: 22%;
      padding: 0 1%;
      display: table-cell;
      text-decoration: none;
      font-size: 16px;
      line-height: 1;
      color: $p-offblack;
      font-weight: 500;

      &:last-child {
        width: 31%;
      }
    }

    .cell-candidate {
      color: $p-offblack;
      font-weight: bold;
      font-size: 18px;
      
      span {
        font-weight: 400;
        color: $p-light-blue;
        font-size: 14px;
      }
    }

    .cell-init {
      span {
        display: block;
        font-weight: 400;
        color: $p-light-blue;
        font-size: 14px;
      }
    }

    .cell-type {
      color: $p-offblack;
    }
  }
}
 
</style>
