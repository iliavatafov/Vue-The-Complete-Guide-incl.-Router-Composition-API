import { createRouter, createWebHistory } from "vue-router";

import store from "./store/index.js";

import CoachDetail from "./pages/coaches/CoachDetail.vue";
import CoachesList from "./pages/coaches/CoachesList.vue";
import CoachRegistration from "./pages/coaches/CoachRegistration.vue";
// import ContactCoach from "./pages/requests/ContactCoach.vue";
import RequestReceived from "./pages/requests/RequestReceived.vue";
import NotFound from "./pages/NotFound.vue";
import UserAuth from "./pages/auth/UserAuth.vue";

const router = createRouter({
  history: createWebHistory(),
  mode: "hash",
  routes: [
    { path: "/", redirect: "/coaches" },
    { path: "/coaches", component: CoachesList },
    {
      path: "/coaches/:id",
      component: CoachDetail,
      props: true,
      meta: (route) => ({ title: route.params.username }),
      // children: [
      //   {
      //     path: "contact",
      //     component: ContactCoach,
      //   },
      // ],
    },
    {
      path: "/coaches/:id/:action",
      component: CoachDetail,
      // props: (route) => console.log(route.params),
      props: true,
      meta: { collection: "coaches" },
    },
    {
      path: "/register",
      component: CoachRegistration,
      meta: { requeresAuth: true },
    },
    {
      path: "/requests",
      component: RequestReceived,
      meta: { requiresAuth: true },
    },
    { path: "/auth", component: UserAuth },
    {
      path: "/:notFound(.*)",
      component: NotFound,
      meta: { requeresUnauth: true },
    },
  ],
});

// Protected routes checker
router.beforeEach((to, _, next) => {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next("/auth");
  } else if (to.meta.requeresUnauth && store.getters.isAuthenticated) {
    next("/coaches");
  } else {
    next();
  }
});

export default router;
