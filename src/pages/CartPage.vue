<template>
  <main v-if="cartLoading" class="content container cart-data-loader">
    <DataLoader :width="200" :height="200"/>
  </main>
  <main v-else-if="cartLoadingFailed" class="content container cart-data-loader">
    <DataLoadingError :svg-height="100" :svg-width="100"/>
  </main>
  <main class="content container" v-else>
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{ name: 'main' }">Каталог</router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">Корзина</a>
        </li>
      </ul>

      <h1 class="content__title">Корзина</h1>
      <span class="content__info">Количество товаров: {{ cartItems.length }}</span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <ul class="cart__list">
            <CartItem v-for="item in cartItems" :key="item.id" :item="item"/>
          </ul>
        </div>

        <div class="cart__block">
          <p class="cart__desc">
            Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
          </p>
          <p class="cart__price">
            Итого: <span>{{ $filters.numberFormat(totalPrice) }} BYN</span>
          </p>

          <router-link v-slot="{ navigate }" :to="{ name: 'order' }" custom>
            <button class="cart__button button button--primery" type="submit" :disabled="!cartItems.length" @click="navigate" >Оформить заказ</button>
          </router-link>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import { mapGetters } from 'vuex';
import CartItem from '@/components/CartItem.vue';
import DataLoader from '@/components/DataLoader.vue';
import DataLoadingError from '@/components/DataLoadingError.vue';

export default {
  name: 'CartPage',
  props: ['cartLoading', 'cartLoadingFailed'],
  components: {
    CartItem, DataLoader, DataLoadingError,
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters({
      cartItems: 'cartDetailProducts',
      totalPrice: 'cartTotalPrice',
    }),
  },
};
</script>

<style scoped>
.cart-data-loader {
  display: flex;
}
</style>
