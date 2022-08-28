<template>
  <main class="content container">
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
        Корзина
      </h1>
      <span class="content__info">
        3 товара
      </span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST" @submit.prevent="order">
        <div class="cart__field">
          <div class="cart__data">
            <BaseFormText title="ФИО" placeholder="Введите ваше полное имя" v-model="formData.name"
                          :error="formError.name"/>
            <BaseFormText title="Адрес доставки" placeholder="Введите ваш адрес" v-model="formData.address"
                          :error="formError.address"/>
            <BaseFormText title="Телефон" placeholder="Введите ваш телефон" v-model="formData.phone"
                          :error="formError.phone"/>
            <BaseFormText title="Email" placeholder="Введи ваш Email" v-model="formData.email"
                          :error="formError.email"/>
            <BaseFormTextarea title="Комментарий к заказу" placeholder="Ваши пожелания" v-model="formData.comment"
                              :error="formError.comment"/>
          </div>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">
            <li v-for="item in products" class="cart__order" :key="item.productId">
              <h3>{{ item.product.title }} ({{ item.amount }}шт.)</h3>
              <b>{{ item.product.price }} ₽</b>
              <span>Артикул: {{ item.productId }}</span>
            </li>
          </ul>

          <div class="cart__total">
            <p>Итого: <b>{{ products.length }}</b> товара на сумму <b>{{ totalPrice }} ₽</b></p>
          </div>

          <div v-if="formSending" class="order-sending"><DataLoader width="50" height="50"/></div>
          <button v-else class="cart__button button button--primery" type="submit">Оформить заказ</button>

        </div>
        <div v-if="formErrorMessage" class="cart__error form__error-block">
          <h4>Заявка не отправлена!</h4>
          <p>{{ formErrorMessage }}</p>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import BaseFormText from '@/components/BaseFormText.vue';
import BaseFormTextarea from '@/components/BaseFormTextarea.vue';
import DataLoader from '@/components/DataLoader.vue';
import axios from 'axios';
import API_BASE_URL from '@/config';
import { mapGetters } from 'vuex';

export default {
  name: 'OrderPage',
  components: {
    BaseFormText,
    BaseFormTextarea,
    DataLoader,
  },
  data() {
    return {
      formData: {},
      formError: {},
      formErrorMessage: '',
      formSending: false,
    };
  },
  methods: {
    order() {
      this.formSending = true;
      this.formError = {};
      axios.post(
        `${API_BASE_URL}/api/orders`,
        { ...this.formData },
        { params: { userAccessKey: this.$store.state.userAccessKey } },
      )
        .then((response) => {
          this.$store.commit('resetCart');
          this.$store.commit('updateOrderInfo', response.data);
          this.$router.push({
            name: 'orderInfo',
            params: { id: response.data.id },
          });
        })
        .catch((error) => {
          this.formError = error.response.data.error.request || {};
          this.formErrorMessage = error.response.data.error.message;
        })
        .finally(() => {
          this.formSending = false;
        });
    },
  },
  computed: {
    ...mapGetters({
      products: 'cartDetailProducts',
      totalPrice: 'cartTotalPrice',
    }),
  },
};
</script>

<style scoped>
.order-sending {
  width: 100%;
  display: flex;
  margin-top: 20px;
}
</style>
