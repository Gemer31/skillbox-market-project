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

        <DataLoader v-if="productsLoading" :width="200" :height="200"/>
        <DataLoadingError v-if="productsLoadingFailed" :svg-height="100" :svg-width="100"/>

        <ProductsEmptyList v-if="! productsLoading && !productsLoadingFailed && products?.length === 0"/>
        <ProductList v-if="!productsLoading && !productsLoadingFailed" :products="products"/>

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
import ProductsEmptyList from '@/components/ProductsEmptyList.vue';
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
    ProductsEmptyList,
  },
  data() {
    return {
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: null,
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
            image: product.preview.file.url,
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

      const params = {
        page: this.currentPage,
        limit: this.productsPerPage,
      };

      if (this.filterPriceFrom && this.filterPriceFrom !== 0) {
        params.minPrice = this.filterPriceFrom;
      }

      if (this.filterPriceTo && this.filterPriceTo !== 0) {
        params.maxPrice = this.filterPriceTo;
      }

      if (this.filterCategoryId !== 'all') {
        params.categoryId = this.filterCategoryId;
      }
      // if (this.filterColorId) {
      //   params.colorId = this.filterColorId;
      // }

      this.loadProductsTimer = setTimeout(() => {
        axios.get(`${API_BASE_URL}/api/products`, { params })
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
