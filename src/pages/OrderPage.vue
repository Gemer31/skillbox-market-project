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
          <router-link class="breadcrumbs__link" :to="{ name: 'cart' }">
            Корзина
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">Оформление заказа</a>
        </li>
      </ul>
      <h1 class="content__title">Оформление заказа</h1>
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

          <div class="cart__options">
            <OrderOptionsBlock title="Доставка"
                               :items="deliveryItems"
                               :modelValue="formData.deliveryTypeId"
                               @update:model-value="deliveryChanged($event)"
            />
            <OrderOptionsBlock title="Оплата"
                               :items="payItems"
                               v-model.number="formData.paymentTypeId"
            />
          </div>
        </div>

        <div class="cart__block">
          <Transition name="fade" mode="out-in">
            <ul v-if="cartItems" class="cart__orders">
              <li v-for="item in cartItems" class="cart__order" :key="item.id">
                <h3>{{ item.productOffer.title }} ({{ item.quantity }} шт.)</h3>
                <b>{{ item.price }} ₽</b>
                <span>Артикул: {{ item.id }}</span>
              </li>
            </ul>
            <DataLoader v-else width="50" height="50"/>
          </Transition>

          <Transition name="fade" mode="out-in" :duration="{ delay: 500 }">
            <div v-if="totalOffersQuantity" class="cart__total">
              <p>Количество товаров: <b>{{ totalOffersQuantity }}</b> шт.</p>
              <p>Сумма: <b>{{ $filters.numberFormat(totalPrice) }} ₽</b></p>
            </div>
          </Transition>

          <Transition name="fade" mode="out-in">
            <div v-if="formSending" class="order-sending">
              <DataLoader width="68" height="68"/>
            </div>
            <button v-else class="cart__button button button--primery" type="submit" :disabled="!cartItems?.length">
              Оформить заказ
            </button>
          </Transition>
        </div>
        <Transition name="fade" mode="out-in">
          <div v-if="formErrorMessage" class="cart__error form__error-block">
            <h4>Заявка не отправлена!</h4>
            <p>{{ formErrorMessage }}</p>
          </div>
        </Transition>
      </form>
    </section>
  </main>
</template>

<script>
import BaseFormText from '@/components/BaseFormText.vue';
import BaseFormTextarea from '@/components/BaseFormTextarea.vue';
import OrderOptionsBlock from '@/components/OrderOptionsBlock.vue';
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
    OrderOptionsBlock,
  },
  data() {
    return {
      deliveryItems: null,
      payItems: null,

      formData: {},
      formError: {},
      formErrorMessage: null,
      formSending: false,
    };
  },
  created() {
    axios.get(`${API_BASE_URL}/api/deliveries`)
      .then((response) => {
        this.deliveryItems = response.data.map((item) => (
          {
            ...item,
            highlightedValue: item.price === '0' ? 'бесплатно' : `${item.price} ₽`,
          }
        ));
        this.deliveryChanged(this.deliveryItems[0].id);
      });
  },
  methods: {
    order() {
      this.formSending = true;
      this.formError = {};
      this.formErrorMessage = null;

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
    deliveryChanged(value) {
      this.payItems = null;
      this.formData.deliveryTypeId = value;

      axios.get(`${API_BASE_URL}/api/payments`, { params: { deliveryTypeId: value } })
        .then((response) => {
          this.payItems = response.data;
          this.formData.paymentTypeId = this.payItems[0].id;
        });
    },
  },
  computed: {
    ...mapGetters({
      cartItems: 'cartDetailProducts',
      totalPrice: 'cartTotalPrice',
    }),
    totalOffersQuantity() {
      return this.cartItems?.reduce((result, item) => item.quantity + result, 0);
    },
  },
};
</script>

<style scoped>
.order-sending {
  width: 100%;
  display: flex;
  margin-top: 20px;
}

.cart__block {
  display: flex;
  flex-direction: column;
}

.cart__options {
  display: flex;
  flex-direction: column;
}
</style>
