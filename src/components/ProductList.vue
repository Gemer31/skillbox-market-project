<template>
    <ul class="catalog__list">
      <li class="catalog__item" v-for="product in products" :key="product.id">
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
