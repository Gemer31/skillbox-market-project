<template>
  <main class="content container">
    <div class="content__top">

      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{ name: 'main' }">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{ name: 'main' }">
            {{ category.title }}
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            {{ product.name }}
          </a>
        </li>
      </ul>
    </div>

    <section class="item">
      <div class="item__pics pics">
        <div class="pics__wrapper">
          <img width="570" height="570" :src="selectedImageSrc" :alt="product.name">
        </div>
        <ul class="pics__list">
          <li class="pics__item" v-for="image in product.images" :key="image">
            <a href="#" class="pics__link pics__link--current" @click.prevent="selectedImageSrc = image">
              <img width="98" height="98" :src="image" :alt="product.name">
            </a>
          </li>
        </ul>
      </div>

      <div class="item__info">
        <span class="item__code">Артикул: {{ product.id }}</span>
        <h2 class="item__title">{{ product.name }}</h2>
        <div class="item__form">
          <form class="form" action="#" method="POST" @submit.prevent="addToCart">
            <b class="item__price">{{ $filters.numberFormat(product.price) }} BYN</b>

            <fieldset class="form__block">
              <legend class="form__legend">Цвет:</legend>
              <ul class="colors">
                <li class="colors__item" v-for="colorId in product.availableColorsIds" :key="product.id + colorId">
                  <label :for="product.id + colorId" class="colors__label">
                    <input class="colors__radio sr-only"
                           type="radio"
                           :id="product.id + colorId"
                           :value="colorId"
                           v-model="currentColor"
                    >
                    <span class="colors__value" :style="{ 'background-color': getColorValue(colorId) }">
                    </span>
                  </label>
                </li>
              </ul>
            </fieldset>

            <div class="item__row">
              <div class="form__counter">
                <button type="button" aria-label="Убрать один товар" @click.prevent="amount = amount - 1">
                  <svg width="12" height="12" fill="currentColor">
                    <use xlink:href="#icon-minus"></use>
                  </svg>
                </button>

                <label :for="counter">
                  <input id="counter" type="text" name="count" v-model.number="amount">
                </label>

                <button type="button" aria-label="Добавить один товар" @click.prevent="amount = amount + 1">
                  <svg width="12" height="12" fill="currentColor">
                    <use xlink:href="#icon-plus"></use>
                  </svg>
                </button>
              </div>

              <button class="button button--primery" type="submit">
                В корзину
              </button>
            </div>
          </form>
        </div>
      </div>

<!--      <div class="item__desc">-->
<!--        <ul class="tabs">-->
<!--          <li class="tabs__item">-->
<!--            <a class="tabs__link tabs__link&#45;&#45;current">-->
<!--              Описание-->
<!--            </a>-->
<!--          </li>-->
<!--          <li class="tabs__item">-->
<!--            <a class="tabs__link" href="#">-->
<!--              Характеристики-->
<!--            </a>-->
<!--          </li>-->
<!--          <li class="tabs__item">-->
<!--            <a class="tabs__link" href="#">-->
<!--              Гарантия-->
<!--            </a>-->
<!--          </li>-->
<!--          <li class="tabs__item">-->
<!--            <a class="tabs__link" href="#">-->
<!--              Оплата и доставка-->
<!--            </a>-->
<!--          </li>-->
<!--        </ul>-->

<!--        <div class="item__content">-->
<!--          <p>-->
<!--            Навигация GPS, ГЛОНАСС, BEIDOU Galileo и QZSS<br>-->
<!--            Синхронизация со смартфоном<br>-->
<!--            Связь по Bluetooth Smart, ANT+ и Wi-Fi<br>-->
<!--            Поддержка сторонних приложений<br>-->
<!--          </p>-->

<!--          <a href="#">-->
<!--            Все характеристики-->
<!--          </a>-->

<!--          <h3>Что это?</h3>-->

<!--          <p>-->
<!--            Wahoo ELEMNT BOLT GPS – это велокомпьютер, который позволяет оптимизировать свои велотренировки, сделав их-->
<!--            максимально эффективными.-->
<!--            Wahoo ELEMNT BOLT GPS синхронизируется с датчиками по ANT+, объединяя полученную с них информацию.-->
<!--            Данные отображаются на дисплее, а также сохраняются на смартфоне.-->
<!--            При этом на мобильное устройство можно установить как фирменное приложение, так и различные приложения-->
<!--            сторонних разработчиков.-->
<!--            Велокомпьютер точно отслеживает местоположение, принимая сигнал с целого комплекса спутников. Эта информация-->
<!--            позволяет смотреть уже преодоленные маршруты и планировать новые велопрогулки.-->
<!--          </p>-->

<!--          <h3>Дизайн</h3>-->

<!--          <p>-->
<!--            Велокомпьютер Wahoo ELEMNT BOLT очень компактный. Размеры устройства составляют всего 74,6 x 47,3 x 22,1 мм.-->
<!--            что не превышает габариты смартфона. Корпус гаджета выполнен из черного пластика.-->
<!--            На обращенной к пользователю стороне расположен дисплей диагональю 56 мм.-->
<!--            На дисплей выводятся координаты и скорость, а также полученная со смартфона и синхронизированных датчиков-->
<!--            информация: интенсивность, скорость вращения педалей, пульс и т.д.-->
<!--            (датчики не входят в комплект поставки).-->
<!--            Корпус велокомпьютера имеет степень защиты от влаги IPX7.-->
<!--            Это означает, что устройство не боится пыли, а также выдерживает кратковременное (до 30 минут) погружение в-->
<!--            воду на глубину не более 1 метра.-->
<!--          </p>-->
<!--        </div>-->
<!--      </div>-->
    </section>
  </main>
</template>

<script>
import categories from '@/data/categories';
import products from '@/data/products';
import { getColorValue } from '@/helpers/common';

export default {
  name: 'ProductPage',
  data() {
    return {
      selectedColor: '',
      selectedImageSrc: '',
      amount: 1,
    };
  },
  computed: {
    product() {
      return products().find((product) => product.id === +this.$route.params.id);
    },
    category() {
      return categories.find((category) => this.product.categoryId === category.id);
    },
    currentColor: {
      get() {
        return this.selectedColor;
      },
      set(value) {
        this.selectedColor = value;
      },
    },
  },
  mounted() {
    this.selectedImageSrc = this.product.images?.[0];
  },
  methods: {
    getColorValue,
    addToCart() {
      this.$store.commit('addProductToCart', { productId: this.product.id, amount: this.amount });
    },
  },
};
</script>

<style scoped>

</style>
