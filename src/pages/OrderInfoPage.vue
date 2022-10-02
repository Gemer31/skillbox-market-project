<template>
  <Transition name="fade" mode="out-in">
    <main v-if="orderLoading" class="content container order-info-loader">
      <DataLoader :width="200" :height="200"/>
    </main>
    <main v-else-if="orderLoadingFailed" class="content container order-info-loader">
      <DataLoadingError :svg-height="100" :svg-width="100"/>
    </main>
    <main class="content container" v-else>
      <div class="content__top">
        <ul class="breadcrumbs">
          <li class="breadcrumbs__item">
            <router-link class="breadcrumbs__link" :to="{ name: 'main' }">
              Каталог
            </router-link>
          </li>
          <li class="breadcrumbs__item">
            <router-link class="breadcrumbs__link" :to="{ name: 'cart' }">
              Корзина
            </router-link>
          </li>
          <li class="breadcrumbs__item">
            <a class="breadcrumbs__link">
              Оформление заказа
            </a>
          </li>
        </ul>

        <h1 class="content__title">
          Заказ оформлен <span>№ {{ orderInfo.id }}</span>
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
              <li v-for="field in formFields" class="dictionary__item" :key="field.name">
                <span class="dictionary__key">{{ field.title }}</span>
                <span class="dictionary__value">{{ orderInfo[field.name] }}</span>
              </li>
            </ul>
          </div>

          <div class="cart__block">
            <ul class="cart__orders">
              <li v-for="item in orderInfo.basket.items" class="cart__order" :key="item.id">
                <h3>{{ item.productOffer.title }} ({{ item.quantity }} шт.)</h3>
                <b>{{ $filters.numberFormat(item.price) }} ₽</b>
                <span>Артикул: {{ item.id }}</span>
              </li>
            </ul>

            <div class="cart__total">
              <p v-if="orderInfo.deliveryType.price === '0'">{{ orderInfo.deliveryType.title }}</p>
              <p v-else>Доставка: <b>{{ $filters.numberFormat(orderInfo.deliveryType.price) }} ₽</b></p>
              <p>Количество товаров: <b>{{ totalOffersQuantity }}</b> шт.</p>
              <p>Сумма: <b>{{ $filters.numberFormat(orderInfo.totalPrice) }} ₽</b></p>
            </div>
          </div>
        </form>
      </section>
    </main>
  </Transition>
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

      formFields: [
        {
          title: 'Получатель',
          name: 'name',
        },
        {
          title: 'Адрес доставки',
          name: 'address',
        },
        {
          title: 'Телефон',
          name: 'phone',
        },
        {
          title: 'Email',
          name: 'email',
        },
        {
          title: 'Способ оплаты',
          name: 'paymentType',
        },
      ],
    };
  },
  methods: {
    ...mapActions(['loadOrderInfo']),
  },
  computed: {
    orderInfo() {
      return this.$store.state.orderInfo;
    },
    totalOffersQuantity() {
      return this.orderInfo.basket.items?.reduce((result, item) => item.quantity + result, 0);
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
.order-info-loader {
  display: flex;
}
</style>
