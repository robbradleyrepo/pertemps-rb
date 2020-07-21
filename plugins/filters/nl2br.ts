import Vue from 'vue';

Vue.filter('nl2br', (value: string) => {
  return value.replace(/(\n)+/g, '<br />');
});
