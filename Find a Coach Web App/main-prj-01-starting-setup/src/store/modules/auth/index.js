import mutations from "./mutatuins.js";
import actions from "./actions.js";
import getters from "./getters.js";

export default {
  state() {
    return {
      userId: null,
      token: null,
      didAutoLogout: false,
      email: "",
    };
  },
  mutations,
  actions,
  getters,
};
