import { Vue, Component } from 'vue-property-decorator';

@Component
export default class RandomTime extends Vue {
  public get randomTime() {
    return Math.round(Math.random() * (3 - 15) + 15);
  }
}
