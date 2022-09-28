<template>
  <div>
    <a class="catalog__pic" href="#" @click.prevent="isQuickViewOpen = true"><img :src="product.image" alt="Название товара"></a>

    <h3 class="catalog__title"><a href="#">{{ selectedProductOffer.title }}</a></h3>

    <span class="catalog__price">{{ $filters.numberFormat(selectedProductOffer.price) }} ₽</span>

    <ul v-if="product.colors?.length" class="colors colors--black">
      <li class="colors__item" v-for="color in product.colors" :key="color.id">
        <span class="colors__value" :style="{ 'background-color': color.color.code }"></span>
      </li>
    </ul>

    <ul v-if="product.mainProp" class="sizes">
      <li class="sizes__item" v-for="offer in product.offers" :key="offer.id">
        <label class="sizes__label">
          <input class="sizes__radio sr-only"
                 type="radio"
                 :value="offer.id"
                 @input="changeOffer(+$event.target.value)"
                 :checked="selectedProductOffer.id === offer.id"
          ><span class="sizes__value">{{ offer.propValues?.[0]?.value }}</span>
        </label>
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
      selectedProductOffer: null,
    };
  },
  created() {
    this.changeOffer();
  },
  methods: {
    changeOffer(offerId) {
      this.selectedProductOffer = offerId
        ? this.product.offers?.find((offer) => offer.id === offerId)
        : this.product.offers?.[0];
    },
  },
};
</script>

<style>
.colors {
  margin-bottom: 10px;
}

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
