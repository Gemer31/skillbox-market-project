<template>
  <div class="data-loading-error">
    <svg :width="svgWidth" :height="svgHeight" viewBox="0 0 20 20" focusable="false" class="ux-notification__icon ng-star-inserted" aria-hidden="true">
      <path d="M10 1.5C5.30558 1.5 1.5 5.30558 1.5 10C1.5 14.6944 5.30558 18.5 10 18.5C14.6944 18.5 18.5 14.6944 18.5 10C18.5 5.30558 14.6944 1.5 10 1.5ZM9.25 6.25C9.25 5.83579 9.58579 5.5 10 5.5C10.4142 5.5 10.75 5.83579 10.75 6.25V10.75C10.75 11.1642 10.4142 11.5 10 11.5C9.58579 11.5 9.25 11.1642 9.25 10.75V6.25ZM9.09998 13.9C9.09998 13.4029 9.50292 13 9.99998 13C10.497 13 10.9 13.4029 10.9 13.9C10.9 14.3971 10.497 14.8 9.99998 14.8C9.50292 14.8 9.09998 14.3971 9.09998 13.9Z"
            :style="{ 'fill': svgColor || '#ff5260' }"
      ></path>
    </svg>
<!--    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" :width="svgWidth"-->
<!--         :height="svgHeight" viewBox="0 0 256 256" xml:space="preserve">-->
<!--    <defs></defs>-->
<!--      <g-->
<!--        style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;"-->
<!--        transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">-->
<!--      <path d="M 85.429 85.078 H 4.571 c -1.832 0 -3.471 -0.947 -4.387 -2.533 c -0.916 -1.586 -0.916 -3.479 0 -5.065 L 40.613 7.455 C 41.529 5.869 43.169 4.922 45 4.922 c 0 0 0 0 0 0 c 1.832 0 3.471 0.947 4.386 2.533 l 40.429 70.025 c 0.916 1.586 0.916 3.479 0.001 5.065 C 88.901 84.131 87.261 85.078 85.429 85.078 z M 45 7.922 c -0.747 0 -1.416 0.386 -1.79 1.033 L 2.782 78.979 c -0.373 0.646 -0.373 1.419 0 2.065 c 0.374 0.647 1.042 1.033 1.789 1.033 h 80.858 c 0.747 0 1.416 -0.387 1.789 -1.033 s 0.373 -1.419 0 -2.065 L 46.789 8.955 C 46.416 8.308 45.747 7.922 45 7.922 L 45 7.922 z M 45 75.325 c -4.105 0 -7.446 -3.34 -7.446 -7.445 s 3.34 -7.445 7.446 -7.445 s 7.445 3.34 7.445 7.445 S 49.106 75.325 45 75.325 z M 45 63.435 c -2.451 0 -4.446 1.994 -4.446 4.445 s 1.995 4.445 4.446 4.445 s 4.445 -1.994 4.445 -4.445 S 47.451 63.435 45 63.435 z M 45 57.146 c -3.794 0 -6.882 -3.087 -6.882 -6.882 V 34.121 c 0 -3.794 3.087 -6.882 6.882 -6.882 c 3.794 0 6.881 3.087 6.881 6.882 v 16.144 C 51.881 54.06 48.794 57.146 45 57.146 z M 45 30.239 c -2.141 0 -3.882 1.741 -3.882 3.882 v 16.144 c 0 2.141 1.741 3.882 3.882 3.882 c 2.14 0 3.881 -1.741 3.881 -3.882 V 34.121 C 48.881 31.98 47.14 30.239 45 30.239 z"-->
<!--            style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill-rule: nonzero; opacity: 1;"-->
<!--            :style="{ 'fill': svgColor || 'black' }"-->
<!--            transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>-->
<!--      </g>-->
<!--    </svg>-->
    <span v-if="!noMessage">Ooooops! Something went wrong...</span>
  </div>

</template>

<script>
export default {
  name: 'DataLoadingError',
  props: ['svgWidth', 'svgHeight', 'svgColor', 'noMessage'],
};
</script>

<style scoped>
.data-loading-error {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
}
</style>
