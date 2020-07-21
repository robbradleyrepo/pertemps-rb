import { Vue, Component, Watch } from 'vue-property-decorator';
import { mapState } from 'vuex';
import debounce from 'lodash/debounce';
import Get from 'lodash/get';
import { Action, Step, Registration } from '~/types';

@Component({
  computed: {
    ...mapState('registration', [
      'apiStatus',
      'activeActionSetLoop',
      'actionValues',
    ]),
  },
})
export default class ActionBase extends Vue {
  readonly data!: Action.Any;

  protected value?: Action.InputValue.Any | Action.ActionSetValue[] | null = '';

  private isSaving: boolean = false;
  private successMessage: string | null = null;
  public errorMessage: string | null = null;

  readonly apiStatus!: Registration.ApiData;
  readonly activeActionSetLoop!: number | null;
  readonly actionValues!: Action.SubmitValue.Any | null;

  public get actionType(): string {
    return this.data.type.toLowerCase();
  }

  protected get valueIsEmpty(): boolean {
    if (this.actionType === 'date') return false;
    if (typeof this.value === 'number') return false;
    if (typeof this.value === 'boolean') return false;
    if (typeof this.value === 'string' && this.value.length > 0) return false;
    if (typeof this.value === 'undefined' || this.value === null) return true;

    return true;
  }

  public get actionStateValue(): Action.InputValue.Any {
    if (
      this.actionValues &&
      this.data.parentActionSetId &&
      typeof this.activeActionSetLoop === 'number'
    ) {
      // Actionset action
      return Get(
        this.actionValues,
        `[${this.data.parentActionSetId}][${this.activeActionSetLoop}][${this.data.id}]`
      );
    } else {
      // 'Regular' action
      return this.$store.getters['registration/actionValue'](this.data.id);
    }
  }

  public set actionStateValue(value: Action.InputValue.Any) {
    if (
      this.data.parentActionSetId &&
      typeof this.activeActionSetLoop === 'number'
    ) {
      // Actionset action
      this.$store.commit('registration/setActionValue', {
        [this.data.parentActionSetId]: {
          [this.activeActionSetLoop]: {
            [this.data.id]: value,
          },
        },
      });
    } else {
      // 'Regular' action
      this.$store.commit('registration/setActionValue', {
        [this.data.id]: value,
      });
    }
  }

  @Watch('value', { deep: true })
  onValueChanged(newVal: Action.InputValue.Any) {
    this.actionStateValue = newVal;
    this.$store.commit('registration/setActiveActionValue', newVal);
  }

  private valueSavedSuccessfully() {
    this.successMessage = 'Success!';
    this.hideSuccessMessage();
  }

  private hideSuccessMessage = debounce(function(this: ActionBase) {
    this.successMessage = null;
  }, 1000);

  private async saveValue() {
    this.errorMessage = null;
    this.isSaving = true;

    try {
      const response = await this.$axios({
        method: 'post',
        url: `${process.env.apiUrl}API/v1/RegistrationAutoSave/${this.apiStatus.id}`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: this.actionStateValue,
      });

      this.isSaving = false;

      if (response.data.error) {
        this.errorMessage = response.data.error;
        throw new Error(response.data.error);
      } else {
        this.valueSavedSuccessfully();
      }
    } catch (error) {
      this.isSaving = false;
      this.errorMessage = error;
      throw new Error(error);
    }
  }

  created() {
    if (!this.value) {
      if (this.actionStateValue) {
        this.value = this.actionStateValue;
      } else if (this.data.value) {
        this.value = this.data.value;
      }
    }

    if (this.data.value && !this.actionStateValue) {
      this.value = this.data.value;
    }
  }
}
