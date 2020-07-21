<template>
  <div>
    <div v-if="!addressFieldsVisible" class="postcode-wrapper">
      <!-- Postcode field -->
      <div class="row">
        <div class="col-9">
          <div class="input-outer">
            <div class="input-inner">
              <input
                :id="`action-${data.id}-postcode`"
                v-model.trim="postcode"
                type="text"
                :name="`action-${data.id}-postcode`"
                :class="{ 'input--not-empty': !!postcode }"
                class="input postcode"
                maxlength="9"
                @focus="onPostcodeFocus"
                @blur="onPostcodeBlur"
              />
              <label :for="`action-${data.id}-postcode`" class="smart-label">
                Type your postcode here
              </label>
              <div v-if="postcode" class="valid-icon">
                <div v-if="postcodeIsValid && selectedAddressOnLines">✔</div>
                <div v-else-if="postcodeIsValid">~</div>
                <div v-else>✘</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Address options from API -->
      <div v-if="addressOptionsVisible" class="address-options">
        <div v-if="locationApiLoading" class="address-options__inner">
          <div class="address-option">
            Loading…
          </div>
        </div>

        <div v-else-if="postcodeIsValid" class="address-options__inner">
          <button
            v-for="(address, index) in addressOptions"
            :key="`address-${index}`"
            v-pure-html="formatAddress(address)"
            class="address-option address-option--button"
            @click="onClickAddress(address)"
          />

          <button
            v-if="wrongAddressesErrorVisible"
            class="address-option address-option--button"
            @click="onClickNoAddress"
          >
            My address isn't shown
          </button>

          <div v-if="noAddressesErrorVisible">
            <div class="address-option">
              No addresses found
            </div>
          </div>
        </div>
      </div>
    </div>

    <div>
      <!-- Help button -->
      <ActionHelp
        v-if="helpButtonVisible"
        text="Not sure of your postcode?"
        @click="onClickHelp"
      />

      <!-- Edit button -->
      <div v-if="editButtonVisible" class="completed-address">
        <div v-pure-html="selectedAddressOnLines" />

        <button
          class="completed-address__button button button--link button--inline"
          @click="onClickEdit"
        >
          Edit if wrong
        </button>
      </div>

      <!-- API error -->
      <!-- <div v-if="error" class="error">{{ errorMessage }}</div> -->

      <!-- Individual fields -->
      <div v-if="addressFieldsVisible" class="address-fields">
        <PInput
          :id="`${data.id}-address1`"
          v-model="addressObj.Address1"
          label="Address 1"
        />

        <PInput
          :id="`${data.id}-address2`"
          v-model="addressObj.Address2"
          label="Address 2"
        />

        <PInput
          :id="`${data.id}-address3`"
          v-model="addressObj.Address3"
          label="Address 3"
        />

        <PInput
          :id="`${data.id}-address4`"
          v-model="addressObj.Address4"
          label="Address 4"
        />

        <PInput
          :id="`${data.id}-postcode`"
          v-model="addressObj.PostCode"
          label="Postcode"
        />

        <PInput
          :id="`${data.id}-city`"
          v-model="addressObj.City"
          label="City"
        />

        <PInput
          :id="`${data.id}-county`"
          v-model="addressObj.County"
          label="County"
        />

        <PInput
          :id="`${data.id}-country`"
          v-model="addressObj.Country"
          label="Country"
        />

        <PInput
          :id="`${data.id}-lat`"
          v-model="addressObj.Lat"
          label="Latitude"
          disabled
        />

        <PInput
          :id="`${data.id}-lon`"
          v-model="addressObj.Lon"
          label="Longitude"
          disabled
        />

        <PInput
          :id="`${data.id}-fullstr`"
          v-model="addressObj.Fullstr"
          label="Full string"
          disabled
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Mixins, Watch } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import { Action, Step } from '~/types';
import ActionBase from '~/components/candidate/action/types/Base';
import ActionHelp from '~/components/candidate/action/Help.vue';
import PInput from '~/components/elements/PInput.vue';

interface LocationApiData {
  latitude: number;
  longitude: number;
  addresses: string[];
}

@Component({
  components: { ActionHelp, PInput },
  computed: {
    ...mapGetters('registration', ['activeStepObject']),
  },
})
export default class LocationAction extends Mixins(ActionBase) {
  @Prop({ required: true, type: Object as () => Action.Location })
  readonly data!: Action.Location;

  value?: Action.InputValue.Location;

  private readonly activeStepObject!: Step.Single | null;
  private readonly useFakeAddressApi: boolean = !!process.env.isDev;
  // private readonly useFakeAddressApi: boolean = true;

  /**
   * Postcode regex pattern taken from gov.uk
   * with the addition of an optional space (`\s?`), rather than required space
   *
   * https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/488478/Bulk_Data_Transfer_-_additional_validation_valid_from_12_November_2015.pdf
   * (section 3)
   *
   * https://stackoverflow.com/questions/164979/regex-for-matching-uk-postcodes
   */
  private readonly postcodeRegex = new RegExp(
    /^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z]))))\s?[0-9][A-Za-z]{2})$/
  );

  private addressObj: Action.LocationInputValueObject = {
    Lat: '',
    Lon: '',
    Fullstr: '',
    Address1: '',
    Address2: '',
    Address3: '',
    Address4: '',
    PostCode: '',
    City: '',
    County: '',
    Country: '',
  };

  private locationApiLoading: boolean = false;
  private postcodeFieldFocussed: boolean = false;
  private addressFieldsVisible: boolean = false;

  private locationApiData: LocationApiData | null = null;

  private selectedAddress: string = '';
  private lastMatchedPostcode: string | null = null;

  private get postcode(): string {
    return this.addressObj.PostCode
      ? this.formatPostcode(this.addressObj.PostCode, true)
      : '';
  }

  private set postcode(value: string) {
    this.errorMessage = '';
    this.selectedAddress = '';
    this.resetAddressObj();

    const formattedValue = this.formatPostcode(value, true);

    this.addressObj.PostCode = formattedValue;

    // Don't fire off another request if the previous API result matches the current postcode
    if (formattedValue === this.lastMatchedPostcode) return;

    // Get location data only if the postcode matches the valid regex
    if (this.postcodeIsValid) {
      this.locationApiData = null;
      this.getAddresses();
    }
  }

  private get postcodeTrimmed(): string {
    return this.formatPostcode(this.postcode, true);
  }

  private get addressOptionsVisible(): boolean {
    if (this.postcodeIsValid && this.postcodeFieldFocussed) {
      return true;
    } else {
      return false;
    }
  }

  private get noAddressesErrorVisible(): boolean {
    return (
      !this.locationApiLoading &&
      (!this.addressOptions || this.addressOptions.length < 1)
    );
  }

  private get helpButtonVisible(): boolean {
    return !this.selectedAddressOnLines && !this.addressFieldsVisible;
  }

  private get editButtonVisible(): boolean {
    return !!this.selectedAddressOnLines && !this.addressFieldsVisible;
  }

  private get wrongAddressesErrorVisible(): boolean {
    return !this.noAddressesErrorVisible && !this.locationApiLoading;
  }

  private get addressOptions(): string[] {
    if (!this.locationApiData) return [];

    return this.locationApiData.addresses;
  }

  get valueIsEmpty(): boolean {
    if (!this.value) return true;

    return Object.values(this.value).every((val) => val === null);
  }

  private get highlightColour(): string {
    if (this.activeStepObject && this.activeStepObject.highlightColour) {
      return this.activeStepObject.highlightColour;
    } else {
      return '';
    }
  }

  private get selectedAddressOnLines(): string {
    const addressObjToShow = Object.assign({}, this.addressObj);

    delete addressObjToShow.Fullstr;
    delete addressObjToShow.Lat;
    delete addressObjToShow.Lon;
    delete addressObjToShow.PostCode;

    return Object.values(addressObjToShow)
      .filter((line) => {
        if (!line) return false;
        const trimmedLine = line.trim();
        if (!trimmedLine) return false;
        return true;
      })
      .join(',<br />');
  }

  private get postcodeIsValid(): boolean {
    return this.postcodeRegex.test(this.postcodeTrimmed);
  }

  @Watch('selectedAddress')
  onSelectedAddressChanged(newVal: string, oldVal: string) {
    if (newVal === oldVal) return;

    if (this.locationApiData) {
      this.addressObj.Lat = this.locationApiData.latitude.toString();
      this.addressObj.Lon = this.locationApiData.longitude.toString();
    }

    this.addressObj.Fullstr = newVal;

    this.setAddressObjFromString(newVal);
  }

  @Watch('addressObj', { deep: true })
  onAddressObjChanged(newVal: Action.LocationInputValueObject) {
    this.value = newVal;
  }

  private setAddressObjFromString(address: string) {
    if (!address) return;

    const addressSplit = address.split(',');

    this.addressObj.Address1 = addressSplit[0].trim();
    this.addressObj.Address2 = addressSplit[1].trim();
    this.addressObj.Address3 = addressSplit[2].trim();
    this.addressObj.Address4 = addressSplit[3].trim();
    this.addressObj.City = addressSplit[5].trim();
    this.addressObj.County = addressSplit[6].trim();
  }

  private resetAddressObj() {
    this.addressObj.Lat = '';
    this.addressObj.Lon = '';
    this.addressObj.Fullstr = '';
    this.addressObj.Address1 = '';
    this.addressObj.Address2 = '';
    this.addressObj.Address3 = '';
    this.addressObj.Address4 = '';
    this.addressObj.PostCode = '';
    this.addressObj.City = '';
    this.addressObj.County = '';
    this.addressObj.Country = '';
  }

  private async getAddresses() {
    this.errorMessage = '';
    this.lastMatchedPostcode = '';
    this.locationApiLoading = true;

    try {
      let response;

      if (this.useFakeAddressApi || this.postcode === 'W1W8BU') {
        response = await this.getFakeAddresses(this.postcode);
      } else {
        response = await this.$axios.$get(
          `${process.env.apiUrl}API/v1/GetAddress/${this.postcode}`
          //, { progress: false }
          // Axios options not currently working as of nuxt v2.9.1 / axios v5.6.0
          // https://github.com/nuxt-community/axios-module/issues/258
          // https://github.com/axios/axios/pull/2207
        );
      }

      this.locationApiLoading = false;
      this.lastMatchedPostcode = this.postcodeTrimmed;

      if (!response) {
        this.errorMessage = 'No response';
      }

      if (response.Message) {
        this.errorMessage = response.Message;
      } else {
        this.locationApiData = response;
      }
    } catch (error) {
      this.locationApiLoading = false;
      this.errorMessage = error;
    }
  }

  private getFakeAddresses(postcode: string) {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (this.formatPostcode(postcode, true) === 'W1W8BU') {
          resolve({
            latitude: 51.517108917236328,
            longitude: -0.14069975912570953,
            addresses: [
              '360 Degrees Communications Ltd, 22-23 Little Portland Street, , , , London, ',
              'Be Seen Ltd, 22-23 Little Portland Street, , , , London, ',
              'Beauty Seen Ltd, 22-23 Little Portland Street, , , , London, ',
              'Brand Network (UK) Ltd, 22-23 Little Portland Street, , , , London, ',
              'Exposure Digital Ltd, 22-23 Little Portland Street, , , , London, ',
              'Exposure Edit Ltd, 22-23 Little Portland Street, , , , London, ',
              'Exposure Promotions Ltd, 22-23 Little Portland Street, , , , London, ',
              'Nexgen Healthcare Communications Ltd, 22-23 Little Portland Street, , , , London, ',
              'Optimise Pharma Ltd, 22-23 Little Portland Street, , , , London, ',
              'Superbrands (UK) Ltd, 22-23 Little Portland Street, , , , London, ',
            ],
          });
        } else {
          resolve({
            Message: 'Postcode not found',
          });
        }
      }, Math.random() * 1000 + 500);
    });
  }

  private formatAddress(address: string): string | null {
    if (!address) return null;

    return address
      .trim()
      .replace(/ ,|(,$)|(, $)/g, '')
      .replace(/, /g, ',<br />')
      .replace(/(\n)+/g, '<br />');
  }

  private formatPostcode(postcode: string, removeSpaces?: boolean): string {
    if (!postcode) return '';

    let formattedPostcode = postcode.toUpperCase();

    if (removeSpaces && removeSpaces === true) {
      formattedPostcode = formattedPostcode.replace(/\s+/g, '');
    }

    return formattedPostcode;
  }

  private onClickHelp() {
    this.addressFieldsVisible = true;
  }

  private onClickNoAddress() {
    this.addressFieldsVisible = true;
    // window.scrollTo(0, 0);
  }

  private onClickEdit() {
    this.addressFieldsVisible = true;
  }

  private onClickAddress(address: any) {
    this.selectedAddress = address;

    this.$nextTick(() => {
      this.postcodeFieldFocussed = false;
    });
  }

  private onPostcodeFocus() {
    this.postcodeFieldFocussed = true;

    if (!this.locationApiData) {
      this.getAddresses();
    }
  }

  private onPostcodeBlur() {
    if (this.noAddressesErrorVisible) {
      this.postcodeFieldFocussed = false;
    }
  }

  created() {
    if (this.value) {
      this.addressObj = Object.assign({}, this.value);
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/sass/forms/candidate/base';

hr {
  margin-top: 2rem;
  margin-bottom: 2rem;
}

.postcode-wrapper {
  margin-top: 2rem;
}

.input-inner {
  position: relative;
}

.smart-label {
  color: $p-grey-lolly;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  white-space: nowrap;
  z-index: 0;
  transition: all 0.2s ease;
  overflow: hidden;
  text-overflow: ellipsis;
}

.input {
  z-index: 1;
  position: relative;

  &:focus,
  &--not-empty {
    + .smart-label {
      font-size: 0.8em;
      left: 0;
      top: 0;
      transform: translateY(-75%);
    }
  }
}

.valid-icon {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

.postcode {
  font-weight: $font-weight-bold;
}

.address-options {
  position: absolute;
  left: 0;
  right: 0;
  margin-top: 3px;
  padding-bottom: 3rem;

  &__inner {
    border-bottom: 1px solid $p-grey-alto;
  }
}

.address-option {
  border-top: 1px solid $p-grey-alto;
  display: block;
  width: 100%;
  text-align: left;
  padding: 0.75rem 1rem 0.75rem 2rem;
  background-color: #fff;

  &--button {
    @extend %input-reset;
    cursor: pointer;

    &:hover,
    &:focus,
    &:active {
      background-color: $p-offwhite;
    }
  }
}

.completed-address {
  background-color: rgba($p-light-blue, 0.1);
  padding: 1rem;
  margin-top: 3px;
  font-size: 1.25rem;
  line-height: 1.2;

  &__button {
    color: $p-light-blue;
    margin-top: 2rem;
    font-size: 1rem;
  }
}

.error {
  background-color: rgba(red, 0.2);
  padding: 1rem;
  margin-top: 2rem;
}
</style>
