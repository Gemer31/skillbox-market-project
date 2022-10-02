import { createStore } from 'vuex';
import axios from 'axios';
import API_BASE_URL from '@/config';

export default createStore({
  state() {
    return {
      userAccessKey: null,
      cartProductsData: [],
      orderInfo: null,
    };
  },
  mutations: {
    updateOrderInfo(state, orderInfo) {
      state.orderInfo = orderInfo;
    },
    resetCart(state) {
      state.cartProductsData = [];
    },
    updateCartProductAmount(state, { basketItemId, quantity }) {
      const cartItem = state.cartProductsData.items?.find((item) => item.id === basketItemId);
      if (cartItem) {
        cartItem.quantity = quantity;
      }
    },
    deleteCartProduct(state, { basketItemId }) {
      state.cartProductsData.items = state.cartProductsData.items?.filter((item) => item.id !== basketItemId);
    },
    updateUserAccessKey(state, accessKey) {
      this.state.userAccessKey = accessKey;
    },
    updateCartProductsData(state, cartProductsData) {
      state.cartProductsData = cartProductsData;
    },
  },
  getters: {
    cartDetailProducts(state) {
      return state.cartProductsData.items;
    },
    cartTotalPrice(state, getters) {
      return getters.cartDetailProducts?.reduce((result, item) => (item.price * item.quantity) + result, 0);
    },
  },
  actions: {
    loadOrderInfo(context, orderId) {
      return axios.get(`${API_BASE_URL}/api/orders/${orderId}`, { params: { userAccessKey: context.state.userAccessKey } })
        .then((response) => {
          context.commit('updateOrderInfo', response.data);
        });
    },
    loadCart(context) {
      return axios.get(`${API_BASE_URL}/api/baskets`, { params: { userAccessKey: context.state.userAccessKey } })
        .then((response) => {
          if (!context.state.userAccessKey) {
            localStorage.setItem('userAccessKey', response.data.user.accessKey);
            context.commit('updateUserAccessKey', response.data.user.accessKey);
          }
          context.commit('updateCartProductsData', response.data);
        });
    },
    addProductToCart(context, payload) {
      return axios.post(
        `${API_BASE_URL}/api/baskets/products`,
        payload,
        { params: { userAccessKey: context.state.userAccessKey } },
      )
        .then((response) => {
          context.commit('updateCartProductsData', response.data);
        });
    },
    updateCartProductAmount(context, { basketItemId, quantity }) {
      context.commit('updateCartProductAmount', { basketItemId, quantity });

      if (quantity < 1) {
        return;
      }

      // eslint-disable-next-line consistent-return
      return axios.put(
        `${API_BASE_URL}/api/baskets/products`,
        { basketItemId, quantity },
        { params: { userAccessKey: context.state.userAccessKey } },
      )
        .then((response) => {
          context.commit('updateCartProductsData', response.data);
        })
        .catch(() => {
          // context.commit('syncCartProducts');
        });
    },
    deleteProductFromCart(context, payload) {
      context.commit('deleteCartProduct', payload);

      return axios.delete(
        `${API_BASE_URL}/api/baskets/produаcts`,
        { data: payload, params: { userAccessKey: context.state.userAccessKey } },
      )
        .then((response) => {
          context.commit('updateCartProductsData', response.data);
        });
    },
  },
});
