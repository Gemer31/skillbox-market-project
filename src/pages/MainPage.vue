<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">
        Каталог
      </h1>
      <span class="content__info">
        {{products.length}} товара
      </span>
    </div>

    <div class="content__catalog">
      <ProductFilter
        v-model:price-from="filterPriceFrom"
        v-model:price-to="filterPriceTo"
        v-model:category-id="filterCategoryId"
        v-model:color-id="filterColorId"
        v-model:current-page="currentPage"
      />
      <section class="catalog">
        <ProductList :products="products"/>

        <PaginationBar
          v-model:current-page="currentPage"
          :items-count="countProducts"
          :items-per-page="productsPerPage"
        />
      </section>
    </div>
  </main>
</template>

<script>
import products from '@/data/products';
import ProductList from '@/components/ProductList.vue';
import PaginationBar from '@/components/PaginationBar.vue';
import ProductFilter from '@/components/ProductFilter.vue';

export default {
  name: 'MainPage',
  components: {
    ProductList,
    PaginationBar,
    ProductFilter,
  },
  data() {
    return {
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 'all',
      filterColorId: '',
      currentPage: 1,
      productsPerPage: 3,
    };
  },
  computed: {
    filteredProducts() {
      let filteredProducts = products();
      if (this.filterPriceFrom > 0) {
        filteredProducts = filteredProducts.filter((product) => product.price > this.filterPriceFrom);
      }
      if (this.filterPriceTo > 0) {
        filteredProducts = filteredProducts.filter((product) => product.price < this.filterPriceTo);
      }
      if (this.filterCategoryId !== 'all') {
        filteredProducts = filteredProducts.filter((product) => product.categoryId === this.filterCategoryId);
      }
      if (this.filterColorId.length) {
        filteredProducts = filteredProducts.filter((product) => product.availableColorsIds.includes(this.filterColorId));
      }
      return filteredProducts;
    },
    products() {
      const offset = (this.currentPage - 1) * this.productsPerPage;
      return this.filteredProducts.slice(offset, offset + this.productsPerPage);
    },
    countProducts() {
      return this.filteredProducts.length;
    },
  },
};
</script>

<style scoped>

</style>