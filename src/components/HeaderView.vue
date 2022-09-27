<template>
  <header class="header">
    <div class="header__wrapper container">
      <router-link class="header__info" :to="{ name: 'main' }">
        Каталог
      </router-link>

      <a class="header__logo" href="#">
        <img src="img/svg/logo-tech.svg" alt="Логотип интернет магазина Технозавррр" width="190" height="33">
      </a>

      <a class="header__tel" href="tel:8 800 600 90 09">8 800 600 90 09</a>

      <DataLoader v-if="cartLoading" :width="30" :height="30"/>
      <DataLoadingError v-else-if="cartLoadingFailed" :svg-height="30" :svg-width="30" :no-message="true" :svg-color="'white'"/>
      <CartIndicator v-else/>
    </div>
  </header>
</template>

<script>
import CartIndicator from '@/components/CartIndicator.vue';
import DataLoader from '@/components/DataLoader.vue';
import DataLoadingError from '@/components/DataLoadingError.vue';

export default {
  name: 'HeaderView',
  props: ['cartLoading', 'cartLoadingFailed'],
  components: {
    CartIndicator,
    DataLoader,
    DataLoadingError,
  },
};
</script>

<style scoped>
.shake {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>
