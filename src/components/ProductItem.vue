<template>
  <router-link class="catalog__pic" :to="{ name: 'product', params: { id: product.id } }">
    <img :src="product.image" alt="Название товара">
  </router-link>

  <h3 class="catalog__title">
    <a href="#">{{ product.name }}</a>
  </h3>

  <span class="catalog__price">{{ $filters.numberFormat(product.price) }} BYN</span>

  <ul class="colors colors--black">
    <li class="colors__item" v-for="color in product.colors" :key="color.id">
      <span class="colors__value" :style="{ 'background-color': color.code }"></span>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'ProductItem',
  props: [
    'product',
  ],
  data() {
    return {
      selectedColorId: this.product.colors[0].id,
    };
  },
};
</script>
