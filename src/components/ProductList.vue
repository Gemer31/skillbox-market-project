<template>
  <section class="catalog">
    <ul class="catalog__list">
      <li class="catalog__item" v-for="(product, index) in products" :key="index">
        <ProductItem :product="product"/>
      </li>
    </ul>

    <!--        <ul class="catalog__pagination pagination">-->
    <!--          <li class="pagination__item">-->
    <!--            <a class="pagination__link pagination__link&#45;&#45;arrow pagination__link&#45;&#45;disabled" aria-label="Предыдущая страница">-->
    <!--              <svg width="8" height="14" fill="currentColor">-->
    <!--                <use xlink:href="#icon-arrow-left"></use>-->
    <!--              </svg>-->
    <!--            </a>-->
    <!--          </li>-->
    <!--          <li class="pagination__item">-->
    <!--            <a class="pagination__link pagination__link&#45;&#45;current">-->
    <!--              1-->
    <!--            </a>-->
    <!--          </li>-->
    <!--          <li class="pagination__item">-->
    <!--            <a class="pagination__link" href="#">-->
    <!--              2-->
    <!--            </a>-->
    <!--          </li>-->
    <!--          <li class="pagination__item">-->
    <!--            <a class="pagination__link" href="#">-->
    <!--              3-->
    <!--            </a>-->
    <!--          </li>-->
    <!--          <li class="pagination__item">-->
    <!--            <a class="pagination__link" href="#">-->
    <!--              4-->
    <!--            </a>-->
    <!--          </li>-->
    <!--          <li class="pagination__item">-->
    <!--            <a class="pagination__link" href="#">-->
    <!--              ...-->
    <!--            </a>-->
    <!--          </li>-->
    <!--          <li class="pagination__item">-->
    <!--            <a class="pagination__link" href="#">-->
    <!--              10-->
    <!--            </a>-->
    <!--          </li>-->
    <!--          <li class="pagination__item">-->
    <!--            <a class="pagination__link pagination__link&#45;&#45;arrow" href="#" aria-label="Следующая страница">-->
    <!--              <svg width="8" height="14" fill="currentColor">-->
    <!--                <use xlink:href="#icon-arrow-right"></use>-->
    <!--              </svg>-->
    <!--            </a>-->
    <!--          </li>-->
    <!--        </ul>-->
  </section>
</template>

<script>
import ProductItem from '@/components/ProductItem.vue';

export default {
  name: 'ProductList',
  components: {
    ProductItem,
  },
  props: [
    'products',
  ],
};
</script>
