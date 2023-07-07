import counterMutations from "./mutations.js";
import actionMutations from "./actions.js";
import gettersMutations from "./getters.js";

const counterModule = {
  state() {
    return {
      counter: 0,
    };
  },
  mutations: counterMutations,
  actions: actionMutations,
  getters: gettersMutations,
};

export default counterModule;
