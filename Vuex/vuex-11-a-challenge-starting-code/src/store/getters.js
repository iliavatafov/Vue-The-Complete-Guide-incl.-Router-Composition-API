export default {
  isLoggedIn(state) {
    return state.isAuth;
  },
  products(state) {
    return state.productsData;
  },
};
