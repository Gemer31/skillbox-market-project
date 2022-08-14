<template>
  <ul class="catalog__pagination pagination">
    <li class="pagination__item">
      <a class="pagination__link pagination__link--arrow"
         :class="{'pagination__link--disabled': currentPage === 1}"
         href="#"
         aria-label="Предыдущая страница"
         @click.prevent="paginate(currentPage - 1)"
      >
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-left"></use>
        </svg>
      </a>
    </li>
    <li class="pagination__item" v-for="pageNumber in pages" :key="pageNumber">
      <PaginationBarLink
        :current-page="currentPage"
        :page-number="pageNumber"
        :pages="pages"
        @change-page-click="paginate(pageNumber)"
      />
    </li>
    <li class="pagination__item">
      <a class="pagination__link pagination__link--arrow"
         :class="{'pagination__link--disabled': currentPage === pages}"
         href="#"
         aria-label="Следующая страница"
         @click.prevent="paginate(currentPage + 1)"
      >
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-right"></use>
        </svg>
      </a>
    </li>
  </ul>
</template>

<script>
import PaginationBarLink from '@/components/PaginationBarLink.vue';

export default {
  name: 'PaginationBar',
  components: {
    PaginationBarLink,
  },
  props: [
    'currentPage', 'itemsCount', 'itemsPerPage',
  ],
  emits: ['update:currentPage'],
  methods: {
    paginate(pageNumber) {
      if (pageNumber > 0 && pageNumber <= this.pages) {
        this.$emit('update:currentPage', pageNumber);
      }
    },
  },
  computed: {
    pages() {
      return Math.ceil(this.itemsCount / this.itemsPerPage);
    },
  },
};
</script>
