<template>
  <a class="catalog__pic" href="#">
    <img :src="product.imageSrc" alt="Название товара">
  </a>

  <h3 class="catalog__title">
    <a href="#">{{ product.name }}</a>
  </h3>

  <span class="catalog__price">{{ product.price }}</span>

  <ul class="colors colors--black">
    <li class="colors__item" v-for="colorId in product.availableColorsIds" :key="product.id + colorId">
      <label :for="product.id + colorId" class="colors__label">
        <input :id="product.id + colorId"
               class="colors__radio sr-only" type="radio"
               :value="colorId"
               v-model="selectedColor"
        >
        <span class="colors__value" :style="{ 'background-color': getColorValue(colorId) }"></span>
      </label>
    </li>
  </ul>
</template>

<script>
import colors from '@/data/colors';

export default {
  name: 'ProductItem',
  props: [
    'product',
  ],
  data() {
    return {
      selectedColor: this.product.availableColorsIds[0],
    };
  },
  methods: {
    getColorValue(colorId) {
      return colors.find((color) => color.id === colorId).value;
    },
  },
  computed: {
  },
};
</script>
