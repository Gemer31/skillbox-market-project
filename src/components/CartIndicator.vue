<template>
  <router-link v-if="cartVisible"
               class="header__cart"
               :class="{ 'cart-animation': !firstLoading }"
               aria-label="Корзина с товарами" :to="{ name: 'cart' }">
    <svg width="30" height="21" fill="currentColor">
      <use xlink:href="#icon-cart"></use>
    </svg>
    <span class="header__count" aria-label="Количество товаров">{{ cartDetailProducts?.length }}</span>
  </router-link>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'CartIndicator',
  data() {
    return {
      firstLoading: true,
      cartVisible: true,
      timer: null,
    };
  },
  computed: {
    ...mapGetters(['cartDetailProducts']),
  },
  watch: {
    cartDetailProducts(oldValue, newValue) {
      if (oldValue?.length !== newValue?.length) {
        this.firstLoading = false;
        this.cartVisible = false;
        this.timer = setTimeout(() => {
          this.cartVisible = true;
        });
      }
    },
  },
};
</script>

<style scoped>
.cart-animation {
  animation: shake 0.8s cubic-bezier(.36, .07, .19, .97);
  transform: translate3d(0, 0, 0);
}

@keyframes shake {
  10%, 90% {
    transform: translate3d(-1px, 0, 0);
  }
  20%, 80% {
    transform: translate3d(2px, 0, 0);
  }
  30%, 50%, 70% {
    transform: translate3d(-4px, 0, 0);
  }
  40%, 60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>
