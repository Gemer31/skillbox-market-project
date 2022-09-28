<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">
        Каталог
      </h1>

      <div class="main-page__catalog-header">
        <span class="content__info">Найдено товаров: {{ countProducts }}</span>
          <ul class="colors">
            <li class="colors__item pagination__link--arrow main-page__products-per-page-value"
                :class="{ 'main-page__products-per-page-value__selected': value === productsPerPageChanged}"
                v-for="(value) in productsPerPageValues"
                :key="'products-per-page-' + value">
              <label class="colors__label">
                <input class="colors__radio sr-only"
                       type="radio"
                       :value="value"
                       v-model="productsPerPageChanged"
                >{{ value }}
              </label>
            </li>
          </ul>
      </div>
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

        <Transition name="fade" mode="out-in">
          <DataLoader v-if="productsLoading" :width="200" :height="200"/>
          <DataLoadingError v-else-if="productsLoadingFailed" :svg-height="100" :svg-width="100"/>
          <ProductsEmptyList v-else-if="!productsLoading && !productsLoadingFailed && products?.length === 0">
            Продукты для выбранного фильтра отсутствуют
          </ProductsEmptyList>
          <ProductList v-else-if="!productsLoading && !productsLoadingFailed" :products="products"/>
        </Transition>

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
      filterPriceFrom: null,
      filterPriceTo: null,
      filterCategoryId: null,
      filterColorId: '',
      currentPage: 1,

      productsPerPage: 3,
      productsPerPageValues: [3, 5, 7],

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
    productsPerPageChanged: {
      set(value) {
        this.productsPerPage = value;
      },
      get() {
        this.loadProduts();
        return this.productsPerPage;
      },
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
.main-page__catalog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.main-page__products-per-page-value {
  padding: 0 5px;
}

.main-page__products-per-page-value__selected {
  background-color: #9eff00;
  font-weight: 600;
}
</style>
