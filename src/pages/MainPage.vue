<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">
        Каталог
      </h1>
      <span class="content__info">
        Найдено товаров: {{ countProducts }}
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

        <DataLoader v-if="productsLoading" :width="200" :height="200" />
        <DataLoadingError v-if="productsLoadingFailed" :svg-height="100" :svg-width="100"/>
        <ProductList :products="products"/>

        <PaginationBar
          v-if="products.length"
          v-model:current-page="currentPage"
          :items-count="countProducts"
          :items-per-page="productsPerPage"
        />
      </section>
    </div>
  </main>
</template>

<script>
import ProductList from '@/components/ProductList.vue';
import PaginationBar from '@/components/PaginationBar.vue';
import ProductFilter from '@/components/ProductFilter.vue';
import DataLoader from '@/components/DataLoader.vue';
import DataLoadingError from '@/components/DataLoadingError.vue';
import axios from 'axios';
import API_BASE_URL from '@/config';

export default {
  name: 'MainPage',
  components: {
    ProductList,
    PaginationBar,
    ProductFilter,
    DataLoader,
    DataLoadingError,
  },
  data() {
    return {
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 'all',
      filterColorId: '',
      currentPage: 1,
      productsPerPage: 3,

      productsData: null,
      productsLoading: false,
      productsLoadingFailed: false,
    };
  },
  computed: {
    products() {
      return this.productsData
        ? this.productsData.items.map((product) => (
          {
            ...product,
            image: product.image.file.url,
          }
        ))
        : [];
    },
    countProducts() {
      return this.productsData ? this.productsData.pagination.total : 0;
    },
  },
  methods: {
    loadProduts() {
      this.productsLoading = true;
      clearTimeout(this.loadProductsTimer);
      this.loadProductsTimer = setTimeout(() => {
        axios.get(`${API_BASE_URL}/api/products`, {
          params: {
            page: this.currentPage,
            limit: this.productsPerPage,
            categoryId: this.filterCategoryId,
            colorId: this.filterColorId,
            minPrice: this.filterPriceFrom,
            maxPrice: this.filterPriceTo,
          },
        })
          .then((response) => {
            this.productsData = response.data;
          })
          .catch(() => {
            this.productsLoadingFailed = true;
          })
          .then(() => {
            this.productsLoading = false;
          });
      }, 0);
    },
  },
  watch: {
    currentPage() {
      this.loadProduts();
    },
    filterPriceFrom() {
      this.loadProduts();
    },
    filterPriceTo() {
      this.loadProduts();
    },
    filterCategoryId() {
      this.loadProduts();
    },
    filterColorId() {
      this.loadProduts();
    },
  },
  created() {
    this.loadProduts();
  },
};
</script>

<style scoped>

</style>
