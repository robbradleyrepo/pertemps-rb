import Vue from 'vue';
import Cleave from 'cleave.js';
import 'cleave.js/dist/addons/cleave-phone.gb';

interface CleaveElement extends HTMLElement {
  cleave: any;
}

Vue.directive('cleave', {
  inserted: (el, binding) => {
    const cleaveEl = el as CleaveElement;

    cleaveEl.cleave = new Cleave(el, binding.value || {});
  },
  update: (el) => {
    const event = new Event('input', { bubbles: true });
    const inputEl = el as HTMLInputElement;
    const cleaveEl = el as CleaveElement;

    setTimeout(function() {
      inputEl.value = cleaveEl.cleave.properties.result;
      el.dispatchEvent(event);
    }, 100);
  },
  unbind: (el) => {
    const cleaveEl = el as CleaveElement;

    if (cleaveEl.cleave) {
      cleaveEl.cleave.destroy();
    }
  },
});
