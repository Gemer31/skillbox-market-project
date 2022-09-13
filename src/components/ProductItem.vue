<template>
  <div>
    <a class="catalog__pic" href="#" @click.prevent="isQuickViewOpen = true"><img :src="product.image" alt="Название товара"></a>

    <h3 class="catalog__title"><a href="#">{{ product.name }}</a></h3>

    <span class="catalog__price">{{ $filters.numberFormat(product.price) }} BYN</span>

    <ul class="colors colors--black">
      <li class="colors__item" v-for="color in product.colors" :key="color.id">
        <span class="colors__value" :style="{ 'background-color': color.code }"></span>
      </li>
    </ul>

    <router-link class="catalog__pic" v-slot="{ navigate }" :to="{ name: 'product', params: { id: product.id } }" custom>
      <button class="product-item__details-button button--primery" type="button" @click="navigate">Подробнее</button>
    </router-link>

    <BaseModal v-model:open="isQuickViewOpen" >
      <ProductQuickView :productId="product.id" />
    </BaseModal>
  </div>
</template>

<script>
import BaseModal from '@/pages/BaseModal.vue';
import ProductQuickView from '@/components/ProductQuickView.vue';

export default {
  name: 'ProductItem',
  props: [
    'product',
  ],
  components: {
    BaseModal,
    ProductQuickView,
  },
  data() {
    return {
      isQuickViewOpen: false,
    };
  },
};
</script>

<style>
.product-item__details-button {
  width: 100%;
  padding: 5px;
  margin-top: 10px;
}

.button--primery:not(:disabled):hover {
  background-color: #9EFF70;
  color: black;
}
</style>
