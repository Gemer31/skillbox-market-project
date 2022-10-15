<template>
  <aside class="filter">
    <h2 class="filter__title">Фильтры</h2>

    <form class="filter__form form" action="#" method="get" @submit.prevent="submit">
      <fieldset class="form__block">
        <legend class="form__legend">Цена</legend>
        <label class="form__label form__label--price">
          <input class="form__input"
                 ref="priceFrom"
                 type="text"
                 name="min-price"
                 placeholder="Введите число"
                 v-model.number="priceFromChanged"
          ><span class="form__value">От</span>
        </label>
        <label class="form__label form__label--price">
          <input class="form__input"
                 ref="priceTo"
                 type="text"
                 name="max-price"
                 placeholder="Введите число"
                 v-model.number="priceToChanged"
          ><span class="form__value">До</span>
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

      <Transition name="fade" mode="out-in">
        <div v-if="categoryPropsLoading" class="props-loader">
          <DataLoader :width="70"/>
        </div>
        <div v-else-if="categoryPropsData?.length">
          <fieldset class="form__block" v-for="prop in categoryPropsData" :key="prop.id">
            <legend class="form__legend">{{ prop.title }}</legend>
            <ul class="check-list">
              <li class="check-list__item" v-for="values in prop.availableValues" :key="values.value">
                <label class="check-list__label">
                  <input class="check-list__check sr-only"
                         type="checkbox"
                         name="volume"
                         :value="values.value"
                         @input="addCategoryPropOption(prop.code, $event.target.value)"
                         :checked="currentCategoryProps?.get(prop.code)?.includes(values.value)"
                  >
                  <span class="check-list__desc">{{ values.value }}<span>({{ values.productsCount }})</span></span>
                </label>
              </li>
            </ul>
          </fieldset>
        </div>
      </Transition>

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
import cloneDeep from 'lodash.clonedeep';

export default {
  name: 'ProductFilter',
  props: ['priceFrom', 'priceTo', 'categoryId', 'colorId', 'categoryProps', 'currentPage'],
  components: {
    DataLoader,
  },
  data() {
    return {
      currentPriceFrom: '',
      currentPriceTo: '',
      currentCategoryId: 'all',
      currentCategoryProps: null,

      categoryPropsLoading: false,
      resetButtonVisible: false,

      categoryPropsData: null,
      categoriesData: null,
      colorsData: null,
    };
  },
  watch: {
    priceFrom(value) {
      this.priceFromChanged = value;
    },
    priceTo(value) {
      this.priceToChanged = value;
    },
    categoryId(value) {
      this.currentCategoryId = value;
    },
    categoryProps(value) {
      this.currentCategoryProps = value;
    },
  },
  methods: {
    addCategoryPropOption(propName, newValue) {
      if (!this.currentCategoryProps) {
        this.currentCategoryProps = new Map();
      }

      if (this.currentCategoryProps.has(propName)) {
        let values = this.currentCategoryProps.get(propName);
        values = values.includes(newValue)
          ? values.filter((item) => item !== newValue)
          : [...values, newValue];

        if (values.length) {
          this.currentCategoryProps.set(propName, values);
        } else {
          this.currentCategoryProps.delete(propName);
        }
      } else {
        this.currentCategoryProps.set(propName, [newValue]);
      }
      this.currentCategoryProps = cloneDeep(this.currentCategoryProps);
      console.log(this.currentCategoryProps);
    },
    submit() {
      this.$emit('update:priceFrom', this.currentPriceFrom);
      this.$emit('update:priceTo', this.currentPriceTo);
      this.$emit('update:categoryId', this.currentCategoryId);
      this.$emit('update:categoryProps', this.currentCategoryProps);
      this.$emit('update:currentPage', 1);
    },
    reset() {
      this.$emit('update:priceFrom', '');
      this.$emit('update:priceTo', '');
      this.$emit('update:categoryId', 'all');
      this.$emit('update:categoryProps', null);
      this.$emit('update:currentPage', 1);

      this.currentPriceFrom = '';
      this.currentPriceTo = '';
      this.$refs.priceFrom.value = '';
      this.$refs.priceTo.value = '';
      this.currentCategoryId = 'all';
      this.currentCategoryProps = null;
      this.categoryPropsData = null;
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
    convertToNumbersOnly(value) {
      return value.replace(/[^0-9.]/g, '')
        .replace(/(\..*?)\..*/g, '$1');
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
      set() {
        this.$refs.priceFrom.value = this.convertToNumbersOnly(this.$refs.priceFrom.value);
        this.currentPriceFrom = this.$refs.priceFrom.value;
        this.resetButtonVisible = +this.currentPriceFrom !== 0;
      },
    },
    priceToChanged: {
      get() {
        return this.currentPriceTo;
      },
      set() {
        this.$refs.priceTo.value = this.convertToNumbersOnly(this.$refs.priceTo.value);
        this.currentPriceTo = this.$refs.priceTo.value;
        this.resetButtonVisible = +this.currentPriceTo !== 0;
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
                this.categoryPropsData = response.data.productProps;
                this.categoryPropsLoading = false;
              });
          } else {
            this.categoryPropsData = null;
          }
          this.currentCategoryProps = null;
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
