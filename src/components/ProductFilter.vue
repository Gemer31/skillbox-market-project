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
          <li class="colors__item">
            <label for="blue" class="colors__label">
              <input id="blue" class="colors__radio sr-only" type="radio" name="color" value="#73B6EA" checked="">
              <span class="colors__value" style="background-color: #73B6EA;"></span>
            </label>
          </li>
          <li class="colors__item">
            <label for="yellow" class="colors__label">
              <input id="yellow" class="colors__radio sr-only" type="radio" name="color" value="#FFBE15">
              <span class="colors__value" style="background-color: #FFBE15;">
                        </span>
            </label>
          </li>
          <li class="colors__item">
            <label for="gray" class="colors__label">
              <input id="gray" class="colors__radio sr-only" type="radio" name="color" value="#939393">
              <span class="colors__value" style="background-color: #939393;">
                      </span></label>
          </li>
          <li class="colors__item">
            <label for="green" class="colors__label">
              <input id="green" class="colors__radio sr-only" type="radio" name="color" value="#8BE000">
              <span class="colors__value" style="background-color: #8BE000;">
                      </span></label>
          </li>
          <li class="colors__item">
            <label for="red" class="colors__label">
              <input id="red" class="colors__radio sr-only" type="radio" name="color" value="#FF6B00">
              <span class="colors__value" style="background-color: #FF6B00;">
                      </span></label>
          </li>
          <li class="colors__item">
            <label for="white" class="colors__label">
              <input id="white" class="colors__radio sr-only" type="radio" name="color" value="#FFF">
              <span class="colors__value" style="background-color: #FFF;">
                      </span></label>
          </li>
          <li class="colors__item">
            <label for="black" class="colors__label">
              <input id="black" class="colors__radio sr-only" type="radio" name="color" value="#000">
              <span class="colors__value" style="background-color: #000;">
                      </span></label>
          </li>
        </ul>
      </fieldset>

<!--      <fieldset class="form__block">-->
<!--        <legend class="form__legend">Объемб в ГБ</legend>-->
<!--        <ul class="check-list">-->
<!--          <li class="check-list__item">-->
<!--            <label class="check-list__label">-->
<!--              <input class="check-list__check sr-only" type="checkbox" name="volume" value="8" checked="">-->
<!--              <span class="check-list__desc">-->
<!--                          8-->
<!--                          <span>(313)</span>-->
<!--                        </span>-->
<!--            </label>-->
<!--          </li>-->
<!--          <li class="check-list__item">-->
<!--            <label class="check-list__label">-->
<!--              <input class="check-list__check sr-only" type="checkbox" name="volume" value="16">-->
<!--              <span class="check-list__desc">-->
<!--                          16-->
<!--                          <span>(461)</span>-->
<!--                        </span>-->
<!--            </label>-->
<!--          </li>-->
<!--          <li class="check-list__item">-->
<!--            <label class="check-list__label">-->
<!--              <input class="check-list__check sr-only" type="checkbox" name="volume" value="32">-->
<!--              <span class="check-list__desc">-->
<!--                          32-->
<!--                          <span>(313)</span>-->
<!--                        </span>-->
<!--            </label>-->
<!--          </li>-->
<!--          <li class="check-list__item">-->
<!--            <label class="check-list__label">-->
<!--              <input class="check-list__check sr-only" type="checkbox" name="volume" value="64">-->
<!--              <span class="check-list__desc">-->
<!--                          64-->
<!--                          <span>(313)</span>-->
<!--                        </span>-->
<!--            </label>-->
<!--          </li>-->
<!--          <li class="check-list__item">-->
<!--            <label class="check-list__label">-->
<!--              <input class="check-list__check sr-only" type="checkbox" name="volume" value="128">-->
<!--              <span class="check-list__desc">-->
<!--                          128-->
<!--                          <span>(313)</span>-->
<!--                        </span>-->
<!--            </label>-->
<!--          </li>-->
<!--          <li class="check-list__item">-->
<!--            <label class="check-list__label">-->
<!--              <input class="check-list__check sr-only" type="checkbox" name="volume" value="264">-->
<!--              <span class="check-list__desc">-->
<!--                          264-->
<!--                          <span>(313)</span>-->
<!--                        </span>-->
<!--            </label>-->
<!--          </li>-->
<!--        </ul>-->
<!--      </fieldset>-->

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
import categories from '@/data/categories';

export default {
  name: 'ProductFilter',
  props: ['priceFrom', 'priceTo', 'categoryId'],
  data() {
    return {
      currentPriceFrom: 0,
      currentPriceTo: 0,
      currentCategoryId: 'all',
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
  },
  methods: {
    submit() {
      this.$emit('update:priceFrom', this.currentPriceFrom);
      this.$emit('update:priceTo', this.currentPriceTo);
      this.$emit('update:categoryId', this.currentCategoryId);
    },
    reset() {
      this.$emit('update:priceFrom', 0);
      this.$emit('update:priceTo', 0);
      this.$emit('update:categoryId', 'all');
    },
  },
  computed: {
    categories() {
      return categories;
    },
  },
};
</script>

<style scoped>

</style>
