<template>
  <aside class="filter">
    <h2 class="filter__title">Фильтры</h2>

    <form class="filter__form form" action="#" method="get" @submit.prevent="submit">
            <input type="text" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');"/>

      <fieldset class="form__block">
        <legend class="form__legend">Цена</legend>
        <label for="priceFromId" class="form__label form__label--price">
          <input id="priceFromId" class="form__input" type="text" name="min-price" :oninput="priceInputChanged(this)"
                 v-model="priceFromChanged">
          <span class="form__value">От</span>
        </label>
        <label for="priceToId" class="form__label form__label--price">
          <input id="priceToId" class="form__input" type="text" name="max-price" v-model.number="priceToChanged">
          <span class="form__value">До</span>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Категория</legend>
        <label for="categoriesSelectId" class="form__label form__label--select">
          <select id="categoriesSelectId" class="form__select" type="text" name="category" v-model="categoryIdChanged">
            <option value="all">Все категории</option>
            <option :value="category.id" v-for="category in categories" :key="category.id">{{ category.title }}</option>
          </select>
        </label>
      </fieldset>

      <!--      <fieldset class="form__block">-->
      <!--        <legend class="form__legend">Цвет</legend>-->
      <!--        <ul class="colors">-->
      <!--          <li class="colors__item" v-for="color in colors" :key="color.id">-->
      <!--            <label :for="color.id" class="colors__label">-->
      <!--              <input :id="color.id"-->
      <!--                     class="colors__radio sr-only"-->
      <!--                     type="radio"-->
      <!--                     name="color"-->
      <!--                     :value="color.id"-->
      <!--                     v-model="currentColorId"-->
      <!--              >-->
      <!--              <span class="colors__value" :style="{ 'background-color': color.code }"></span>-->
      <!--            </label>-->
      <!--          </li>-->
      <!--        </ul>-->
      <!--      </fieldset>-->

      <div v-if="categoryPropsLoading" class="props-loader">
        <DataLoader :width="70"/>
      </div>
      <div v-else-if="categoryProps?.length">
        <fieldset class="form__block" v-for="prop in categoryProps" :key="prop.id">
          <legend class="form__legend">{{ prop.title }}</legend>
          <ul class="check-list">
            <li class="check-list__item" v-for="values in prop.availableValues" :key="values.value">
              <label class="check-list__label">
                <input class="check-list__check sr-only"
                       type="checkbox"
                       name="volume"
                       :value="values.value"
                >
                <span class="check-list__desc">{{ values.value }}<span>({{ values.productsCount }})</span></span>
              </label>
            </li>
          </ul>
        </fieldset>
      </div>

      <button class="filter__submit button button--primery" type="submit">
        Применить
      </button>
      <button
        v-if="resetButtonVisible"
        class="filter__reset button button--second"
        type="button"
        @click.prevent="reset"
      >Сбросить
      </button>
    </form>
  </aside>
</template>

<script>
import axios from 'axios';
import API_BASE_URL from '@/config';
import DataLoader from '@/components/DataLoader.vue';

export default {
  name: 'ProductFilter',
  props: ['priceFrom', 'priceTo', 'categoryId', 'colorId', 'currentPage'],
  components: {
    DataLoader,
  },
  data() {
    return {
      currentPriceFrom: 0,
      currentPriceTo: 0,
      currentCategoryId: 'all',
      selectedCategoryProps: null,
      currentColorId: '',

      categoryPropsLoading: false,
      resetButtonVisible: false,

      categoryProps: null,
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
      console.log('category: ', value);
      this.currentCategoryId = value;
    },
    colorId(value) {
      this.currentColorId = value;
    },
  },
  methods: {
    priceInputChanged(input) {
      console.log(input);
      const preparedValue = Number(input.value.replace(/[^\d]/g, ''));
      // eslint-disable-next-line no-param-reassign
      input.value = preparedValue;
    },
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

      this.currentCategoryId = 'all';
      this.currentCategoryProps = null;
      this.resetButtonVisible = false;
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
    priceFromChanged: {
      get() {
        return this.currentPriceFrom;
      },
      set(value) {
        const preparedValue = Number(value.replace(/[^\d]/g, ''));
        this.currentPriceFrom = preparedValue > 0 ? preparedValue : 0;
        if (preparedValue !== 0) {
          this.resetButtonVisible = true;
        }
      },
    },
    priceToChanged: {
      get() {
        return this.currentPriceTo;
      },
      set(value) {
        this.currentPriceTo = value;
        if (value !== 0) {
          this.resetButtonVisible = true;
        }
      },
    },
    categoryIdChanged: {
      get() {
        return this.currentCategoryId;
      },
      set(value) {
        if (value !== this.currentCategoryId) {
          if (value !== 'all') {
            this.categoryPropsLoading = true;

            axios.get(`${API_BASE_URL}/api/productCategories/${value}`)
              .then((response) => {
                this.categoryProps = response.data.productProps;
                this.categoryPropsLoading = false;
              });
          } else {
            this.categoryProps = null;
          }
        }
        this.currentCategoryId = value;
        this.resetButtonVisible = value !== 'all';
      },
    },
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
.props-loader {
  display: flex;
  margin-bottom: 20px;
}
</style>
