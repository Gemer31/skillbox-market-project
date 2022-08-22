<template>
  <HeaderView/>
  <router-view/>
  <FooterView/>
</template>

<script>
import HeaderView from '@/components/HeaderView.vue';
import FooterView from '@/components/FooterView.vue';

export default {
  name: 'App',
  components: { HeaderView, FooterView },
  data() {
    return {
      currentPage: 'main',
      currentPageParams: {},
    };
  },
};
</script>
