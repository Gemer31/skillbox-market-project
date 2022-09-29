<template>
  <SnackBar/>
  <HeaderView :cart-loading="cartLoading" :cart-loading-failed="cartLoadingFailed"/>
  <router-view :cart-loading="cartLoading" :cart-loading-failed="cartLoadingFailed" />
  <FooterView/>

  <div id="teleport-target"></div>
</template>

<script>
import HeaderView from '@/components/HeaderView.vue';
import FooterView from '@/components/FooterView.vue';
import SnackBar from '@/components/SnackBar.vue';
import { mapActions, mapMutations } from 'vuex';

export default {
  name: 'App',
  components: {
    HeaderView,
    FooterView,
    SnackBar,
  },
  data() {
    return {
      currentPage: 'main',
      currentPageParams: {},

      cartLoading: true,
      cartLoadingFailed: false,
    };
  },
  created() {
    const userAccessKey = localStorage.getItem('userAccessKey');
    if (userAccessKey) {
      this.updateUserAccessKey(userAccessKey);
    }
    this.loadCart()
      .catch((error) => {
        console.log(error);
        this.cartLoadingFailed = true;
      })
      .then(() => {
        this.cartLoading = false;
      });
  },
  methods: {
    ...mapActions(['loadCart']),
    ...mapMutations(['updateUserAccessKey']),
  },
};
</script>
