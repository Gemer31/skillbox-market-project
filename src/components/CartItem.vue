<template>
  <li class="cart__item product">
    <div class="product__pic">
      <img :src="item.productOffer.product.preview.file.url" width="120" height="120" :alt="item.productOffer.title">
    </div>
    <h3 class="product__title">{{ item.productOffer.title }}</h3>
    <div class="product__info">
      <p v-if="item.color" class="product__info--color">Цвет:
        <span><i :style="{ 'background-color': item.color.color.code }"></i>{{ item.color.color.title }}</span>
      </p>
      <p v-if="item.productOffer.propValues?.length && item.productOffer.product.mainProp.code !== 'color'">
        {{ item.productOffer.product.mainProp.title }}: <span>{{ item.productOffer.propValues?.[0]?.value }}</span>
      </p>
    </div>

    <span class="product__code">Артикул: {{ item.id }}</span>

    <div class="product__counter form__counter">
      <button type="button" aria-label="Убрать один товар" @click.prevent="quantity = quantity - 1">
        <svg width="10" height="10" fill="currentColor">
          <use xlink:href="#icon-minus"></use>
        </svg>
      </button>

      <label for="counter">
        <input id="counter" type="text" v-model.number="quantity" name="count">
      </label>

      <button type="button" aria-label="Добавить один товар" @click.prevent="quantity = quantity + 1">
        <svg width="10" height="10" fill="currentColor">
          <use xlink:href="#icon-plus"></use>
        </svg>
      </button>
    </div>

    <b class="product__price">{{ $filters.numberFormat(item.price * item.quantity) }} ₽</b>

    <button class="button product__del button-del"
            type="button"
            aria-label="Удалить товар из корзины"
            @click.prevent="deleteProductFromCart({ basketItemId: item.id })">
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
    quantity: {
      get() {
        return this.item.quantity;
      },
      set(value) {
        this.$store.dispatch('updateCartProductAmount', {
          basketItemId: this.item.id,
          quantity: value,
        });
      },
    },
  },
};
</script>

<style scoped>
.product__info p {
  margin: 0;
}

.product__info p:not(:last-child) {
  margin-bottom: 10px;
}
</style>
