<template>
  <HeaderView/>
  <router-view/>
  <FooterView/>
</template>

<script>
import HeaderView from '@/components/HeaderView.vue';
import FooterView from '@/components/FooterView.vue';
import { mapActions, mapMutations } from 'vuex';

export default {
  name: 'App',
  components: { HeaderView, FooterView },
  data() {
    return {
      currentPage: 'main',
      currentPageParams: {},
    };
  },
  created() {
    const userAccessKey = localStorage.getItem('userAccessKey');
    if (userAccessKey) {
      this.updateUserAccessKey(userAccessKey);
    }
    this.loadCart();
  },
  methods: {
    ...mapActions(['loadCart']),
    ...mapMutations(['updateUserAccessKey']),
  },
};
</script>
