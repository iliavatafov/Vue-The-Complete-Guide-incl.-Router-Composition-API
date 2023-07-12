import { createStore } from "vuex";

import coachesModule from "./modules/coaches/index.js";
import requestsModule from "./modules/requests/index.js";
import authModule from "./modules/auth/index.js";
import breadcrubmsModule from "./modules/breadcrumbs/index.js";

const store = createStore({
  modules: {
    coaches: coachesModule,
    requests: requestsModule,
    auth: authModule,
    breadcrumbs: breadcrubmsModule,
  },
});

export default store;
