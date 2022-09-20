<template>
  <div v-if="fetchStatus.isLoading" class=" product-data-loader">
    <DataLoader :width="200" :height="200"/>
  </div>
  <div v-else-if="fetchStatus.isFailed" class=" product-data-loader">
    <DataLoadingError :svg-height="100" :svg-width="100"/>
  </div>
  <div v-else>
    <section class="item">
      <div class="item__pics pics">
        <div class="pics__wrapper">
          <img width="570" height="570" :src="product.preview.file.url" :alt="product.name">
        </div>
      </div>

      <div class="item__info">
        <span class="item__code">Артикул: {{ product.id }}</span>
        <h2 class="item__title">{{ product.name }}</h2>
        <div class="item__form">
          <form class="form" action="#" method="POST" @submit.prevent="doAddToCart">
            <b class="item__price">{{ $filters.numberFormat(product.price) }} BYN</b>

            <fieldset class="form__block">
              <legend class="form__legend">Цвет:</legend>
              <ul class="colors">
                <li class="colors__item" v-for="color in product.colors" :key="product.id + '-' + color.id">
                  <label :for="product.id + '-' + color.id" class="colors__label">
                    <input class="colors__radio sr-only"
                           type="radio"
                           :id="product.id + '-' + colorId"
                           :value="color.id"
                           v-model="currentColor"
                    >
                    <span class="colors__value" :style="{ 'background-color': color.code }">
                    </span>
                  </label>
                </li>
              </ul>
            </fieldset>

            <div class="item__row">
              <div class="form__counter">
                <button type="button" aria-label="Убрать один товар" @click.prevent="amount = amount - 1">
                  <svg width="12" height="12" fill="currentColor">
                    <use xlink:href="#icon-minus"></use>
                  </svg>
                </button>

                <label :for="counter">
                  <input id="counter" type="text" name="count" v-model.number="amount">
                </label>

                <button type="button" aria-label="Добавить один товар" @click.prevent="amount = amount + 1">
                  <svg width="12" height="12" fill="currentColor">
                    <use xlink:href="#icon-plus"></use>
                  </svg>
                </button>
              </div>

              <button class="button button--primery" type="submit" :disabled="productAddSending">
                В корзину
              </button>

              <DataLoader v-if="productAddSending" :width="50" :height="50"/>
              <DataProcessedSuccessfullyItem v-if="productAdded" :width="50" :height="50"/>
            </div>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import DataLoadingError from '@/components/DataLoadingError.vue';
import DataLoader from '@/components/DataLoader.vue';
import DataProcessedSuccessfullyItem from '@/components/DataProcessedSuccessfullyItem.vue';
import {
  ref, computed, defineComponent, watch,
} from 'vue';
import useProduct from '@/hooks/useProduct';

export default defineComponent({
  props: {
    productId: {
      type: [Number, String],
      required: true,
    },
  },
  components: {
    DataLoadingError,
    DataLoader,
    DataProcessedSuccessfullyItem,
  },
  setup(props) {
    const $store = useStore();
    const {
      product,
      category,
      fetchProduct,
      fetchStatus,
    } = useProduct();

    const selectedColor = ref('');
    const amount = ref(1);
    const productAdded = ref(false);
    const productAddSending = ref(false);

    const currentColor = computed({
      get() {
        return selectedColor.value;
      },
      set(value) {
        selectedColor.value = value;
      },
    });

    const doAddToCart = () => {
      productAdded.value = false;
      productAddSending.value = true;

      $store.dispatch('addProductToCart', {
        productId: product.value.id,
        amount,
      })
        .then(() => {
          productAdded.value = true;
          productAddSending.value = false;
          setTimeout(() => {
            productAdded.value = false;
          }, 2000);
        });
    };

    watch(() => props.productId, (value) => {
      if (value) {
        fetchProduct(value);
      }
    }, { immediate: true });

    return {
      selectedColor,
      amount,
      productData: product,
      fetchStatus,
      productAdded,
      productAddSending,

      product,
      category,
      currentColor,

      doAddToCart,
    };
  },
});
</script>

<style scoped>
.item {
  grid-template-columns: 1fr;
}
</style>
