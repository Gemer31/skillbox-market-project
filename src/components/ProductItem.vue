<template>
  <router-link class="catalog__pic" :to="{ name: 'product', params: { id: product.id } }">
    <img :src="product.images[0]" alt="Название товара">
  </router-link>

  <h3 class="catalog__title">
    <a href="#">{{ product.name }}</a>
  </h3>

  <span class="catalog__price">{{ $filters.numberFormat(product.price) }} BYN</span>

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
import { getColorValue } from '@/helpers/common';

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
    getColorValue,
  },
  computed: {
  },
};
</script>
