<template>
  <main v-if="orderLoading" class="content container product-data-loader">
    <DataLoader :width="200" :height="200"/>
  </main>
  <main v-else-if="orderLoadingFailed" class="content container product-data-loader">
    <DataLoadingError :svg-height="100" :svg-width="100"/>
  </main>
  <main class="content container" v-else>
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="index.html">
            Каталог
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="cart.html">
            Корзина
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Оформление заказа
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Заказ оформлен <span>{{ orderInfo.basket.id }}</span>
      </h1>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <p class="cart__message">
            Благодарим за&nbsp;выбор нашего магазина. На&nbsp;Вашу почту придет письмо с&nbsp;деталями заказа.
            Наши менеджеры свяжутся с&nbsp;Вами в&nbsp;течение часа для уточнения деталей доставки.
          </p>

          <ul class="dictionary">
            <li class="dictionary__item">
              <span class="dictionary__key">Получатель</span>
              <span class="dictionary__value">{{ orderInfo.name }}</span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">Адрес доставки</span>
              <span class="dictionary__value">{{ orderInfo.address }}</span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">Телефон</span>
              <span class="dictionary__value">{{ orderInfo.phone }}</span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">Email</span>
              <span class="dictionary__value">{{ orderInfo.email }}</span>
            </li>
          </ul>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">
            <li v-for="item in orderInfo.basket.items" class="cart__order" :key="item.id">
              <h3>{{ item.product.title }} ({{ item.quantity }} шт.)</h3>
              <b>{{ $filters.numberFormat(item.product.price) }} ₽</b>
              <span>Артикул: {{ item.id }}</span>
            </li>
          </ul>

          <div class="cart__total">
            <p>Итого: <b>{{ orderInfo.basket.items.length }}</b> товара на сумму <b>{{orderInfo.totalPrice }} ₽</b></p>
          </div>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import DataLoadingError from '@/components/DataLoadingError.vue';
import DataLoader from '@/components/DataLoader.vue';
import { mapActions } from 'vuex';

export default {
  name: 'OrderInfoPage',
  components: {
    DataLoadingError,
    DataLoader,
  },
  data() {
    return {
      orderLoading: true,
      orderLoadingFailed: false,
    };
  },
  methods: {
    ...mapActions(['loadOrderInfo']),
  },
  computed: {
    orderInfo() {
      return this.$store.state.orderInfo;
    },
  },
  created() {
    if (this.$store.state.orderInfo?.id === this.$route.params.id) {
      return;
    }
    this.loadOrderInfo(this.$route.params.id)
      .catch(() => {
        this.orderLoadingFailed = true;
      })
      .then(() => {
        this.orderLoading = false;
      });
  },
};
</script>

<style scoped>

</style>
