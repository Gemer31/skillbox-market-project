<template>
  <div>
    <a class="catalog__pic" href="#" @click.prevent="isQuickViewOpen = true">
      <img :src="product.image" alt="Название товара">
    </a>

    <h3 class="catalog__title"><a href="#">{{ selectedProductOffer.title }}</a></h3>

    <span class="catalog__price">{{ $filters.numberFormat(selectedProductOffer.price) }} ₽</span>

    <ul v-if="product.colors?.length" class="colors colors--black">
      <li class="colors__item" v-for="color in product.colors" :key="product.title + '1' + color.id">
        <input class="colors__radio sr-only"
               type="radio"
               :value="color.id"
               v-model="selectedColorId"
               :checked="selectedColorId === color.id"
        ><span class="colors__value" :style="{ 'background-color': color.color.code }"></span>
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

    <div class="product-item__buttons">
      <router-link class="catalog__pic" v-slot="{ navigate }" :to="{ name: 'product', params: { id: product.id } }"
                   custom>
        <button class="product-item__button _details button--primery" type="button" @click="navigate">
          <span>Подробнее</span>
        </button>
      </router-link>
      <button class="product-item__button _cart button--primery" type="button" @click.prevent="doAddToCart()">
        <Transition name="fade" mode="out-in">
          <DataLoader v-if="offerSending" width="30" height="21" color="black"/>
          <svg v-else width="30" height="21" fill="black"><use xlink:href="#icon-cart"></use></svg>
        </Transition>
      </button>
    </div>

    <BaseModal v-model:open="isQuickViewOpen">
      <ProductQuickView :productId="product.id"/>
    </BaseModal>
  </div>
</template>

<script>
import BaseModal from '@/pages/BaseModal.vue';
import ProductQuickView from '@/components/ProductQuickView.vue';
import DataLoader from '@/components/DataLoader.vue';
import eventBus from '@/eventBus';

export default {
  name: 'ProductItem',
  props: [
    'product',
  ],
  components: {
    BaseModal,
    ProductQuickView,
    DataLoader,
  },
  data() {
    return {
      isQuickViewOpen: false,
      selectedProductOffer: null,
      selectedColorId: null,
      offerSending: false,
      offerSendingError: true,
    };
  },
  created() {
    this.changeOffer();
    this.selectedColorId = this.product.colors?.[0]?.id;
  },
  methods: {
    colorChanged(value) {
      console.log(value);
      this.selectedColorId = value;
    },
    doAddToCart() {
      this.offerSending = true;
      this.offerSendingError = false;

      this.$store.dispatch('addProductToCart', {
        productOfferId: this.selectedProductOffer.id,
        colorId: this.selectedColorId,
        quantity: 1,
      })
        .catch((error) => {
          this.offerSendingError = true;
          this.showSnack('error', Object.values(error.response?.data?.error?.request)?.[0] || 'Что-то пошло не так =(');
        })
        .then(() => {
          if (!this.offerSendingError) {
            this.showSnack('success', 'Товар добавлен в корзину');
          }
          this.offerSending = false;
        });
    },
    showSnack(type, message) {
      eventBus.$emit('showSnack', { type, message });
    },
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

.product-item__buttons {
  display: flex;
}

.product-item__button {
  padding: 5px;
  margin: 10px 1px 0 1px;
  border-radius: 5px;
  font-size: inherit;
  font-weight: 600;
  cursor: pointer;
}

._details {
  flex-grow: 2;
}

._cart {
  flex-grow: 1;
}

.button--primery:not(:disabled):hover {
  background-color: #9EFF70;
  color: black;
}

.button--primery:not(:disabled):focus {
  background-color: #9eff00;
}
</style>
