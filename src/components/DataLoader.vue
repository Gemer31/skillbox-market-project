<template>
  <svg class="data-loader" xmlns="http://www.w3.org/2000/svg" :width="width" :height="height" viewBox="0 0 100 100" overflow="visible"
       :style="{ 'fill': color || '#9eff00' }"
  >
    <defs>
      <rect id="spinner" x="46.5" y="40" width="7" height="20" rx="2" ry="2" transform="translate(0 -30)"></rect>
    </defs>
    <use xlink:href="#spinner" transform="rotate(0 50 50)">
      <animate attributeName="opacity" values="0;1;0" dur="1s" begin="0s" repeatCount="indefinite"></animate>
      <animateTransform attributeName="transform" type="translate" additive="sum" dur="1s" begin="0s" repeatCount="indefinite" from="0 0" to="10"></animateTransform>
      <animateTransform attributeName="transform" type="skewX" additive="sum" dur="1s" begin="0s" repeatCount="indefinite" from="0" to="20"></animateTransform>
    </use>
    <use xlink:href="#spinner" transform="rotate(30 50 50)">
      <animate attributeName="opacity" values="0;1;0" dur="1s" begin="0.08s" repeatCount="indefinite"></animate>
      <animateTransform attributeName="transform" type="translate" additive="sum" dur="1s" begin="0.08s" repeatCount="indefinite" from="0 0" to="10"></animateTransform>
      <animateTransform attributeName="transform" type="skewX" additive="sum" dur="1s" begin="0.08s" repeatCount="indefinite" from="0" to="20"></animateTransform>
    </use>
    <use xlink:href="#spinner" transform="rotate(60 50 50)">
      <animate attributeName="opacity" values="0;1;0" dur="1s" begin="0.16s" repeatCount="indefinite"></animate>
      <animateTransform attributeName="transform" type="translate" additive="sum" dur="1s" begin="0.16s" repeatCount="indefinite" from="0 0" to="10"></animateTransform>
      <animateTransform attributeName="transform" type="skewX" additive="sum" dur="1s" begin="0.16s" repeatCount="indefinite" from="0" to="20"></animateTransform>
    </use>
    <use xlink:href="#spinner" transform="rotate(90 50 50)">
      <animate attributeName="opacity" values="0;1;0" dur="1s" begin="0.24s" repeatCount="indefinite"></animate>
      <animateTransform attributeName="transform" type="translate" additive="sum" dur="1s" begin="0.24s" repeatCount="indefinite" from="0 0" to="10"></animateTransform>
      <animateTransform attributeName="transform" type="skewX" additive="sum" dur="1s" begin="0.24s" repeatCount="indefinite" from="0" to="20"></animateTransform>
    </use>
    <use xlink:href="#spinner" transform="rotate(120 50 50)">
      <animate attributeName="opacity" values="0;1;0" dur="1s" begin="0.32s" repeatCount="indefinite"></animate>
      <animateTransform attributeName="transform" type="translate" additive="sum" dur="1s" begin="0.32s" repeatCount="indefinite" from="0 0" to="10"></animateTransform>
      <animateTransform attributeName="transform" type="skewX" additive="sum" dur="1s" begin="0.32s" repeatCount="indefinite" from="0" to="20"></animateTransform>
    </use>
    <use xlink:href="#spinner" transform="rotate(150 50 50)">
      <animate attributeName="opacity" values="0;1;0" dur="1s" begin="0.4s" repeatCount="indefinite"></animate>
      <animateTransform attributeName="transform" type="translate" additive="sum" dur="1s" begin="0.4s" repeatCount="indefinite" from="0 0" to="10"></animateTransform>
      <animateTransform attributeName="transform" type="skewX" additive="sum" dur="1s" begin="0.4s" repeatCount="indefinite" from="0" to="20"></animateTransform>
    </use>
    <use xlink:href="#spinner" transform="rotate(180 50 50)">
      <animate attributeName="opacity" values="0;1;0" dur="1s" begin="0.48s" repeatCount="indefinite"></animate>
      <animateTransform attributeName="transform" type="translate" additive="sum" dur="1s" begin="0.48s" repeatCount="indefinite" from="0 0" to="10"></animateTransform>
      <animateTransform attributeName="transform" type="skewX" additive="sum" dur="1s" begin="0.48s" repeatCount="indefinite" from="0" to="20"></animateTransform>
    </use>
    <use xlink:href="#spinner" transform="rotate(210 50 50)">
      <animate attributeName="opacity" values="0;1;0" dur="1s" begin="0.56s" repeatCount="indefinite"></animate>
      <animateTransform attributeName="transform" type="translate" additive="sum" dur="1s" begin="0.56s" repeatCount="indefinite" from="0 0" to="10"></animateTransform>
      <animateTransform attributeName="transform" type="skewX" additive="sum" dur="1s" begin="0.56s" repeatCount="indefinite" from="0" to="20"></animateTransform>
    </use>
    <use xlink:href="#spinner" transform="rotate(240 50 50)">
      <animate attributeName="opacity" values="0;1;0" dur="1s" begin="0.64s" repeatCount="indefinite"></animate>
      <animateTransform attributeName="transform" type="translate" additive="sum" dur="1s" begin="0.64s" repeatCount="indefinite" from="0 0" to="10"></animateTransform>
      <animateTransform attributeName="transform" type="skewX" additive="sum" dur="1s" begin="0.64s" repeatCount="indefinite" from="0" to="20"></animateTransform>
    </use>
    <use xlink:href="#spinner" transform="rotate(270 50 50)">
      <animate attributeName="opacity" values="0;1;0" dur="1s" begin="0.72s" repeatCount="indefinite"></animate>
      <animateTransform attributeName="transform" type="translate" additive="sum" dur="1s" begin="0.72s" repeatCount="indefinite" from="0 0" to="10"></animateTransform>
      <animateTransform attributeName="transform" type="skewX" additive="sum" dur="1s" begin="0.72s" repeatCount="indefinite" from="0" to="20"></animateTransform>
    </use>
    <use xlink:href="#spinner" transform="rotate(300 50 50)">
      <animate attributeName="opacity" values="0;1;0" dur="1s" begin="0.8s" repeatCount="indefinite"></animate>
      <animateTransform attributeName="transform" type="translate" additive="sum" dur="1s" begin="0.8s" repeatCount="indefinite" from="0 0" to="10"></animateTransform>
      <animateTransform attributeName="transform" type="skewX" additive="sum" dur="1s" begin="0.8s" repeatCount="indefinite" from="0" to="20"></animateTransform>
    </use>
    <use xlink:href="#spinner" transform="rotate(330 50 50)">
      <animate attributeName="opacity" values="0;1;0" dur="1s" begin="0.88s" repeatCount="indefinite"></animate>
      <animateTransform attributeName="transform" type="translate" additive="sum" dur="1s" begin="0.88s" repeatCount="indefinite" from="0 0" to="10"></animateTransform>
      <animateTransform attributeName="transform" type="skewX" additive="sum" dur="1s" begin="0.88s" repeatCount="indefinite" from="0" to="20"></animateTransform>
    </use>
  </svg>
</template>

<script>
export default {
  name: 'DataLoader',
  props: ['width', 'height', 'color'],
};
</script>

<style scoped>
.data-loader {
  margin: auto;
}
</style>
