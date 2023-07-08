import { createRouter, createWebHistory } from "vue-router";

import store from "./store/index.js";

import CoachDetail from "./pages/coaches/CoachDetail.vue";
import CoachesList from "./pages/coaches/CoachesList.vue";
import CoachRegistration from "./pages/coaches/CoachRegistration.vue";
import ContactCoach from "./pages/requests/ContactCoach.vue";
import RequestReceived from "./pages/requests/RequestReceived.vue";
import NotFound from "./pages/NotFound.vue";
import UserAuth from "./pages/auth/UserAuth.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/coaches" },
    { path: "/coaches", component: CoachesList },
    {
      path: "/coaches/:id",
      component: CoachDetail,
      props: true,
      children: [
        {
          path: "contact",
          component: ContactCoach,
        },
      ],
    },
    {
      path: "/register",
      component: CoachRegistration,
      meta: { requeresAuth: true },
    },
    {
      path: "/requests",
      component: RequestReceived,
      meta: { requeresAuth: true },
    },
    { path: "/auth", component: UserAuth },
    {
      path: "/:notFound(.*)",
      component: NotFound,
      meta: { requeresUnauth: true },
    },
  ],
});

router.beforeEach((to, _, next) => {
  if (to.meta.requeresAuth && !store.getters.isAuthenticated) {
    next("/auth");
  } else if (to.meta.requeresUnauth && store.getters.isAuthenticated) {
    next("/coaches");
  } else {
    next();
  }
});

export default router;
