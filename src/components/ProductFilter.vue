<template>
  <aside class="filter">
    <h2 class="filter__title">Фильтры</h2>

    <form class="filter__form form" action="#" method="get" @submit.prevent="submit">
      <fieldset class="form__block">
        <legend class="form__legend">Цена</legend>
        <label for="priceFromId" class="form__label form__label--price">
          <input id="priceFromId" class="form__input" type="text" name="min-price" v-model.number="currentPriceFrom">
          <span class="form__value">От</span>
        </label>
        <label for="priceToId" class="form__label form__label--price">
          <input id="priceToId" class="form__input" type="text" name="max-price" v-model.number="currentPriceTo">
          <span class="form__value">До</span>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Категория</legend>
        <label for="categoriesSelectId" class="form__label form__label--select">
          <select id="categoriesSelectId" class="form__select" type="text" name="category" v-model="currentCategoryId">
            <option value="all">Все категории</option>
            <option :value="category.id" v-for="category in categories" :key="category.id">{{ category.title }}</option>
          </select>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Цвет</legend>
        <ul class="colors">
          <li class="colors__item" v-for="color in colors" :key="color.id">
            <label :for="color.id" class="colors__label">
              <input :id="color.id"
                     class="colors__radio sr-only"
                     type="radio"
                     name="color"
                     :value="color.id"
                     v-model="currentColorId"
              >
              <span class="colors__value" :style="{ 'background-color': color.code }"></span>
            </label>
          </li>
        </ul>
      </fieldset>

      <button class="filter__submit button button--primery" type="submit">
        Применить
      </button>
      <button class="filter__reset button button--second" type="button" @click.prevent="reset">
        Сбросить
      </button>
    </form>
  </aside>
</template>

<script>
import axios from 'axios';
import API_BASE_URL from '@/config';

export default {
  name: 'ProductFilter',
  props: ['priceFrom', 'priceTo', 'categoryId', 'colorId', 'currentPage'],
  data() {
    return {
      currentPriceFrom: 0,
      currentPriceTo: 0,
      currentCategoryId: 'all',
      currentColorId: '',

      categoriesData: null,
      colorsData: null,
    };
  },
  watch: {
    priceFrom(value) {
      this.currentPriceFrom = value;
    },
    priceTo(value) {
      this.currentPriceTo = value;
    },
    categoryId(value) {
      this.currentCategoryId = value;
    },
    colorId(value) {
      this.currentColorId = value;
    },
  },
  methods: {
    submit() {
      this.$emit('update:priceFrom', this.currentPriceFrom);
      this.$emit('update:priceTo', this.currentPriceTo);
      this.$emit('update:categoryId', this.currentCategoryId);
      this.$emit('update:colorId', this.currentColorId);
      this.$emit('update:currentPage', 1);
    },
    reset() {
      this.$emit('update:priceFrom', 0);
      this.$emit('update:priceTo', 0);
      this.$emit('update:categoryId', 'all');
      this.$emit('update:colorId', '');
      this.$emit('update:currentPage', 1);
    },
    loadCategories() {
      axios.get(`${API_BASE_URL}/api/productCategories`)
        .then((response) => {
          this.categoriesData = response.data;
        });
    },
    loadColors() {
      axios.get(`${API_BASE_URL}/api/colors`)
        .then((response) => {
          this.colorsData = response.data;
        });
    },
  },
  created() {
    this.loadCategories();
    this.loadColors();
  },
  computed: {
    colors() {
      return this.colorsData ? this.colorsData.items : [];
    },
    categories() {
      return this.categoriesData ? this.categoriesData.items : [];
    },
  },
};
</script>

<style scoped>

</style>
