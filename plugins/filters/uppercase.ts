import Vue from 'vue';

Vue.filter('uppercase', (value: string) => {
  return value.toUpperCase();
});
