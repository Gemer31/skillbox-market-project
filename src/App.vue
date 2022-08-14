<template>
  <section class="catalog">
    <ProductList :products="products"/>

    <PaginationBar
      v-model:current-page="currentPage"
      :items-count="countProducts"
      :items-per-page="productsPerPage"
    />
  </section>
</template>

<script>
import products from '@/data/products';
import ProductList from '@/components/ProductList.vue';
import PaginationBar from '@/components/PaginationBar.vue';

export default {
  name: 'App',
  components: {
    ProductList, PaginationBar,
  },
  data() {
    return {
      currentPage: 1,
      productsPerPage: 3,
    };
  },
  computed: {
    products() {
      const offset = (this.currentPage - 1) * this.productsPerPage;
      return products().slice(offset, offset + this.productsPerPage);
    },
    countProducts() {
      return products().length;
    },
  },
};
</script>
