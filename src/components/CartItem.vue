<template>
  <li class="cart__item product">
    <div class="product__pic">
      <img :src="item.product.preview.file.url" width="120" height="120" :alt="item.product.title">
    </div>
    <h3 class="product__title">{{ item.product.title }}</h3>
    <span class="product__code">Артикул: {{ item.productId }}</span>

    <div class="product__counter form__counter">
      <button type="button" aria-label="Убрать один товар" @click.prevent="amount = amount - 1">
        <svg width="10" height="10" fill="currentColor">
          <use xlink:href="#icon-minus"></use>
        </svg>
      </button>

      <label for="counter">
        <input id="counter" type="text" v-model.number="amount" name="count">
      </label>

      <button type="button" aria-label="Добавить один товар" @click.prevent="amount = amount + 1">
        <svg width="10" height="10" fill="currentColor">
          <use xlink:href="#icon-plus"></use>
        </svg>
      </button>
    </div>

    <b class="product__price">{{ $filters.numberFormat(item.product.price * item.amount) }} BYN</b>

    <button class="product__del button-del"
            type="button"
            aria-label="Удалить товар из корзины"
            @click.prevent="deleteProductFromCart({ productId: item.productId })">
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </li>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'CartItem',
  props: ['item'],
  methods: {
    ...mapActions(['deleteProductFromCart']),
  },
  computed: {
    amount: {
      get() {
        return this.item.amount;
      },
      set(value) {
        this.$store.dispatch('updateCartProductAmount', {
          productId: this.item.productId,
          amount: value,
        });
      },
    },
  },
};
</script>

<style scoped>

</style>
