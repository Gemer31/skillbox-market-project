<template>
  <Transition name="fade" mode="out-in">
    <main v-if="fetchStatus.isLoading" class="content container product-data-loader">
      <DataLoader :width="200" :height="200"/>
    </main>
    <main v-else-if="fetchStatus.isFailed" class="content container product-data-loader">
      <DataLoadingError :svg-height="100" :svg-width="100"/>
    </main>
    <main class="content container" v-else>
      <div class="content__top">
        <ul class="breadcrumbs">
          <li class="breadcrumbs__item">
            <router-link class="breadcrumbs__link" :to="{ name: 'main' }">
              Каталог
            </router-link>
          </li>
          <li class="breadcrumbs__item">
            <router-link class="breadcrumbs__link" :to="{ name: 'main' }">
              {{ category.title }}
            </router-link>
          </li>
          <li class="breadcrumbs__item">
            <a class="breadcrumbs__link">
              {{ product.title }}
            </a>
          </li>
        </ul>
      </div>

      <section class="item">
        <div class="item__pics pics">
          <div class="pics__wrapper">
            <img width="570" height="570" :src="product.preview.file.url" :alt="product.name">
          </div>
        </div>

        <div class="item__info">
          <span class="item__code">Артикул: {{ product.id }}</span>
          <h2 class="item__title">{{ productOffer.title || product.name }}</h2>
          <div class="item__form">
            <form class="form" action="#" method="POST" @submit.prevent="doAddToCart">
              <b class="item__price">{{ $filters.numberFormat(productOffer.price || product.price) }} ₽</b>

              <fieldset class="form__block">
                <legend class="form__legend">Цвет:</legend>
                <ul class="colors">
                  <li class="colors__item"
                      v-for="color in product.colors"
                      :key="color.id"
                  >
                    <label class="colors__label">
                      <input class="colors__radio sr-only"
                             type="radio"
                             :value="color.id"
                             v-model="selectedColorId"
                      >
                      <span class="colors__value" :style="{ 'background-color': color.color.code }"></span>
                    </label>
                  </li>
                </ul>
              </fieldset>

              <fieldset v-if="product.mainProp" class="form__block">
                <legend class="form__legend">{{ product.mainProp.title }}:</legend>
                <ul class="sizes sizes--primery">
                  <li class="sizes__item"
                      v-for="offer in product.offers"
                      :key="offer.id"
                  >
                    <label class="sizes__label">
                      <input class="sizes__radio sr-only"
                             type="radio"
                             name="sizes-item"
                             :value="offer.id"
                             v-model="selectedOfferId"
                      ><span class="sizes__value" :class="{ 'sizes__value-selected': selectedOfferId === offer.id }">{{
                        offer.propValues[0].value
                      }}</span>
                    </label>
                  </li>
                </ul>
              </fieldset>

              <div class="item__row">
                <div class="form__counter">
                  <button type="button" aria-label="Убрать один товар" @click.prevent="quantity = quantity - 1">
                    <svg width="12" height="12" fill="currentColor">
                      <use xlink:href="#icon-minus"></use>
                    </svg>
                  </button>

                  <label>
                    <input type="text" name="count" v-model.number="quantity">
                  </label>

                  <button type="button" aria-label="Добавить один товар" @click.prevent="quantity = quantity + 1">
                    <svg width="12" height="12" fill="currentColor">
                      <use xlink:href="#icon-plus"></use>
                    </svg>
                  </button>
                </div>

                <button class="button button--primery" type="submit" :disabled="productAddSending">
                  В корзину
                </button>

                <Transition name="fade" mode="out-in">
                  <DataLoader v-if="productAddSending" :width="50" :height="50"/>
                  <DataLoadingError v-else-if="productAddError" :svg-color="'red'" :no-message="true" :svg-height="50" :svg-width="50"/>
                  <DataProcessedSuccessfullyItem v-else-if="productAdded" :width="50" :height="50"/>
                </Transition>
              </div>
            </form>
          </div>
        </div>

        <div class="item__desc">
          <ul class="tabs">
            <li class="tabs__item" v-for="tab in productTabs" :key="tab.id">
              <a href="#" class="tabs__link"
                 :class="{ 'tabs__link--current': tab.id === selectedTabId }"
                 @click.prevent="selectedTabId = tab.id"
              >{{ tab.title }}</a>
            </li>
          </ul>

          <div class="item__content">
            <p v-if="selectedTabId === 1">
              <span v-if="product.content?.length">{{ product.content }}</span>
              <span v-else>К сожалению, описания к данному товару нет</span>
            </p>

            <div v-if="selectedTabId === 2">
              <div v-if="product.specifications?.length">
                <p v-for="specification in product.specifications" :key="specification.id">
                  <span style="font-weight: 600;">{{ specification.title }}</span>: {{ specification.value }}
                </p>
              </div>
              <span v-else>К сожалению, характеристик к данному товару нет</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  </Transition>

</template>

<script>
import { useStore } from 'vuex';
import DataLoadingError from '@/components/DataLoadingError.vue';
import DataLoader from '@/components/DataLoader.vue';
import DataProcessedSuccessfullyItem from '@/components/DataProcessedSuccessfullyItem.vue';
import {
  ref, computed, defineComponent, watch,
} from 'vue';
import { useRoute } from 'vue-router';
import useProduct from '@/hooks/useProduct';
import productTabs from '@/data/productPageTabs';

export default defineComponent({
  components: {
    DataLoadingError,
    DataLoader,
    DataProcessedSuccessfullyItem,
  },
  setup() {
    const $route = useRoute();
    const $store = useStore();
    const {
      product,
      category,
      fetchProduct,
      fetchStatus,
    } = useProduct();

    const selectedColorId = ref();
    const selectedOfferId = ref();
    const quantity = ref(1);
    const selectedTabId = ref(1);
    const productAdded = ref(false);
    const productAddSending = ref(false);
    const productAddError = ref(false);

    const productOffer = computed({
      get() {
        return product.value.offers?.find((offer) => offer.id === selectedOfferId.value);
      },
      set(value) {
        selectedOfferId.value = value;
      },
    });

    const doAddToCart = () => {
      productAdded.value = false;
      productAddSending.value = true;
      productAddError.value = false;

      $store.dispatch('addProductToCart', {
        productOfferId: selectedOfferId.value,
        colorId: selectedColorId.value,
        quantity: quantity.value,
      })
        .catch(() => {
          productAddError.value = true;
        })
        .then(() => {
          productAdded.value = true;
          productAddSending.value = false;
          setTimeout(() => {
            productAdded.value = false;
          }, 2000);
        });
    };

    watch(() => $route.params.id, (value) => {
      if (value) {
        fetchProduct(value);
      }
    }, { immediate: true });
    watch(() => product.value, (productValue) => {
      if (productValue) {
        selectedOfferId.value = productValue.offers?.[0]?.id;
        selectedColorId.value = productValue.colors?.[0]?.id;
      }
    }, { immediate: true });

    return {
      selectedColorId,
      selectedTabId,
      quantity,
      productData: product,
      fetchStatus,

      productAdded,
      productAddSending,
      productAddError,

      product,
      selectedOfferId,
      productOffer,
      category,
      productTabs,

      doAddToCart,
    };
  },
});
</script>

<style scoped>
.sizes__value-selected {
  font-weight: 500;
  color: #8BE000;
}

.product-data-loader {
  display: flex;
}

.item__row {
  grid-template-columns:150px 224px 50px;
}
</style>
