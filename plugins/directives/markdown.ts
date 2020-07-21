import Vue from 'vue';
import marked from 'marked';
import { sanitize } from 'dompurify';
import { DirectiveBinding } from 'vue/types/options';

Vue.directive('markdown', {
  inserted: setInnerHtmlMarkdown,
  update: setInnerHtmlMarkdown,
});

function setInnerHtmlMarkdown(el: HTMLElement, binding: DirectiveBinding) {
  if (binding.value && binding.value !== binding.oldValue) {
    el.innerHTML = sanitize(marked(binding.value, { breaks: true }));
  }
}
