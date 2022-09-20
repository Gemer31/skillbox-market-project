import { createStore } from 'vuex';
import axios from 'axios';
import API_BASE_URL from '@/config';

export default createStore({
  state() {
    return {
      cartProducts: [],
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
      state.cartProducts = [];
      state.cartProductsData = [];
    },
    updateCartProductAmount(state, {
      productId,
      amount,
    }) {
      const cartItem = state.cartProducts.find((item) => item.productId === productId);
      if (cartItem) {
        cartItem.amount = amount;
      }
    },
    deleteCartProduct(state, { productId }) {
      state.cartProducts = state.cartProducts.filter((item) => item.productId !== productId);
    },
    updateUserAccessKey(state, accessKey) {
      this.state.userAccessKey = accessKey;
    },
    updateCartProductsData(state, items) {
      state.cartProductsData = items;
    },
    syncCartProducts(state) {
      state.cartProducts = state.cartProductsData.map((item) => ({
        productId: item.product.id,
        amount: item.quantity,
      }));
    },
  },
  getters: {
    cartDetailProducts(state) {
      return state.cartProducts.map((item) => {
        const { product } = state.cartProductsData.find((p) => p.product.id === item.productId);
        return {
          ...item,
          product,
        };
      });
    },
    cartTotalPrice(state, getters) {
      return getters.cartDetailProducts.reduce((result, item) => (item.product.price * item.amount) + result, 0);
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
          context.commit('updateCartProductsData', response.data.items);
          context.commit('syncCartProducts');
        });
    },
    addProductToCart(context, { productOfferId, colorId, amount }) {
      return axios.post(
        `${API_BASE_URL}/api/baskets/products`,
        { productOfferId, colorId, quantity: amount },
        { params: { userAccessKey: context.state.userAccessKey } },
      )
        .then((response) => {
          context.commit('updateCartProductsData', response.data.items);
          context.commit('syncCartProducts');
        });
    },
    updateCartProductAmount(context, { productId, amount }) {
      context.commit('updateCartProductAmount', { productId, amount });

      if (amount < 1) {
        return;
      }

      // eslint-disable-next-line consistent-return
      return axios.put(
        `${API_BASE_URL}/api/baskets/products`,
        { productId, quantity: amount },
        { params: { userAccessKey: context.state.userAccessKey } },
      )
        .then((response) => {
          context.commit('updateCartProductsData', response.data.items);
        })
        .catch(() => {
          context.commit('syncCartProducts');
        });
    },
    deleteProductFromCart(context, { productId }) {
      context.commit('deleteCartProduct', { productId });

      return axios.delete(
        `${API_BASE_URL}/api/baskets/products`,
        { data: { productId }, params: { userAccessKey: context.state.userAccessKey } },
      )
        .then((response) => {
          context.commit('updateCartProductsData', response.data.items);
        })
        .catch(() => {
          context.commit('syncCartProducts');
        });
    },
  },
});
