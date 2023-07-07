export default {
  login(context) {
    context.commit("setLoggedIn", { value: true });
  },
  logout(context) {
    context.commit("setLoggedIn", { value: false });
  },
};
