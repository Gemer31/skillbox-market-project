<template>
    <ul class="catalog__list">
      <li class="catalog__item" v-for="(product, index) in products" :key="index">
        <ProductItem :product="product"/>
      </li>
    </ul>
</template>

<script>
import ProductItem from '@/components/ProductItem.vue';

export default {
  name: 'ProductList',
  components: {
    ProductItem,
  },
  props: [
    'products',
  ],
};
</script>
