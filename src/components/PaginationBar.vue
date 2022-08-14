<template>
  <ul class="catalog__pagination pagination">
    <li class="pagination__item">
      <a class="pagination__link pagination__link--arrow pagination__link--disabled" aria-label="Предыдущая страница">
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-left"></use>
        </svg>
      </a>
    </li>
    <li class="pagination__item" v-for="pageNumber in pages" :key="pageNumber">
      <a href="#" class="pagination__link" :class="{'pagination__link--current': pageNumber === currentPage}" @click.prevent="paginate(pageNumber)">
        {{ pageNumber }}
      </a>
    </li>

    <!--    <li class="pagination__item">-->
    <!--      <a class="pagination__link" href="#">-->
    <!--        ...-->
    <!--      </a>-->
    <!--    </li>-->
    <!--    <li class="pagination__item">-->
    <!--      <a class="pagination__link" href="#">-->
    <!--        10-->
    <!--      </a>-->
    <!--    </li>-->
    <li class="pagination__item">
      <a class="pagination__link pagination__link--arrow" href="#" aria-label="Следующая страница">
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-right"></use>
        </svg>
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'PaginationBar',
  model: {
    prop: 'currentPage',
    event: 'paginate',
  },
  props: [
    'currentPage', 'itemsCount', 'itemsPerPage',
  ],
  methods: {
    paginate(pageNumber) {
      this.$emit('paginate', pageNumber);
    },
  },
  computed: {
    pages() {
      return Math.ceil(this.itemsCount / this.itemsPerPage);
    },
  },
};
</script>
