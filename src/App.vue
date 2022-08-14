<template>
  <section class="catalog">
    <ul class="catalog__list">
      <li class="catalog__item" v-for="(product, index) in products" :key="index">
        <a class="catalog__pic" href="#">
          <img :src="product.imageSrc" alt="Название товара">
        </a>

        <h3 class="catalog__title">
          <a href="#">
            {{product.name}}
          </a>
        </h3>

        <span class="catalog__price">
              {{product.price}}
            </span>

<!--        <ul class="colors colors&#45;&#45;black">-->
<!--          <li class="colors__item">-->
<!--            <label class="colors__label">-->
<!--              <input class="colors__radio sr-only" type="radio" name="color-1" value="#73B6EA" checked="">-->
<!--              <span class="colors__value" style="background-color: #73B6EA;">-->
<!--                  </span>-->
<!--            </label>-->
<!--          </li>-->
<!--          <li class="colors__item">-->
<!--            <label class="colors__label">-->
<!--              <input class="colors__radio sr-only" type="radio" name="color-1" value="#8BE000">-->
<!--              <span class="colors__value" style="background-color: #8BE000;">-->
<!--                  </span>-->
<!--            </label>-->
<!--          </li>-->
<!--          <li class="colors__item">-->
<!--            <label class="colors__label">-->
<!--              <input class="colors__radio sr-only" type="radio" name="color-1" value="#222">-->
<!--              <span class="colors__value" style="background-color: #222;">-->
<!--                  </span>-->
<!--            </label>-->
<!--          </li>-->
<!--        </ul>-->
      </li>
    </ul>
  </section>
</template>

<script>
import products from '@/data/products';

export default {
  name: 'App',
  data() {
    return {
      products,
    };
  },
};
</script>
