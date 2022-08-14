<template>
  <a v-if="showWithPageNumber"
     class="pagination__link"
     :class="{'pagination__link--current': pageNumber === currentPage}"
     href="#"
     @click.prevent="$emit('changePageClick')">
    {{ pageNumber }}
  </a>
  <a v-else-if="showWithThreeDots" class="pagination__link" href="#">...</a>
</template>

<script>
export default {
  name: 'PaginationBarLink',
  props: [
    'pageNumber', 'currentPage', 'pages',
  ],
  data() {
    return {
      pagesAmountBetweenDots: 3,
    };
  },
  emits: [
    'changePageClick',
  ],
  computed: {
    showWithPageNumber() {
      return this.pageNumber === 1
        || this.pageNumber === this.pages
        || (this.currentPage === 1 && this.pageNumber === 3)
        || (this.currentPage === this.pages && this.pageNumber === this.pages - 2)
        || (Math.abs(this.currentPage - this.pageNumber) <= 1);
    },
    showWithThreeDots() {
      console.log('currentPage: ', this.currentPage, ', pageNumber: ', this.pageNumber, '; result: ', Math.abs(this.currentPage - this.pageNumber) === 2);
      return (this.currentPage === 1 && this.pageNumber === 4)
        || (this.currentPage === this.pages && this.pageNumber === this.pages - 3)
        || Math.abs(this.currentPage - this.pageNumber) === 2;
    },
  },
};
</script>
