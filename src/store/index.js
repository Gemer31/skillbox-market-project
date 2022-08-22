import { createStore } from 'vuex';
import products from '@/data/products';

export default createStore({
  state() {
    return {
      cartProducts: [
        { productId: 1, amount: 2 },
      ],
    };
  },
  mutations: {
    addProductToCart(state, { productId, amount }) {
      const cartItem = state.cartProducts.find((item) => item.productId === productId);

      if (cartItem) {
        cartItem.amount += amount;
      } else {
        state.cartProducts.push({
          productId,
          amount,
        });
      }
    },
    updateCartProductAmount(state, { productId, amount }) {
      const cartItem = state.cartProducts.find((item) => item.productId === productId);
      if (cartItem) {
        cartItem.amount = amount;
      }
    },
    deleteCartProduct(state, { productId }) {
      state.cartProducts = state.cartProducts.filter((item) => item.productId !== productId);
    },
  },
  getters: {
    cartDetailProducts(state) {
      return state.cartProducts.map((item) => ({
        ...item,
        product: products().find((p) => p.id === item.productId),
      }));
    },
    cartTotalPrice(state, getters) {
      return getters.cartDetailProducts.reduce((result, item) => (item.product.price * item.amount) + result, 0);
    },
  },
});
