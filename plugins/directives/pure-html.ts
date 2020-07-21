import Vue from 'vue';
import { sanitize } from 'dompurify';
import { DirectiveBinding } from 'vue/types/options';

Vue.directive('pure-html', {
  inserted: setInnerHtmlSantised,
  update: setInnerHtmlSantised,
});

function setInnerHtmlSantised(el: HTMLElement, binding: DirectiveBinding) {
  if (binding.value && binding.value !== binding.oldValue) {
    let bindingValue = binding.value;

    if (typeof binding.value === 'object') {
      bindingValue = JSON.stringify(bindingValue);
    }

    if (binding.arg === 'nl2br') {
      bindingValue = bindingValue.toString().replace(/(\n)/g, '<br />');
    }

    el.innerHTML = sanitize(bindingValue);
  }
}
