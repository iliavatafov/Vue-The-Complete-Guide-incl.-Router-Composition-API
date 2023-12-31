import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";

import TeamsList from "./components/teams/TeamsList.vue";
import TeamMembers from "./components/teams/TeamMembers.vue";
import UsersList from "./components/users/UsersList.vue";
import NotFound from "./components/nav/NotFound.vue";
import TeamsFooter from "./components/teams/TeamsFooter.vue";
import UsersFooter from "./components/users/UsersFooter.vue";

import App from "./App.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/teams",
    },
    {
      name: "teams",
      path: "/teams",
      components: {
        default: TeamsList,
        footer: TeamsFooter,
      },
      children: [
        {
          name: "team-members",
          path: ":teamId",
          component: TeamMembers,
          props: true,
        },
      ],
      // alias: "/",
    },
    {
      path: "/users",
      components: {
        default: UsersList,
        footer: UsersFooter,
      },
      beforeEnter(to, from, next) {
        console.log("user forEach");
        next();
      },
    },

    {
      path: "/:notFound(.*)",
      component: NotFound,
    },
  ],
  linkActiveClass: "active",
  scrollBehavior(to, from, savedPosition) {
    console.log(to, from, savedPosition);
    if (savedPosition) {
      return savedPosition;
    } else {
      return {
        left: 0,
        top: 0,
      };
    }
  },
});

// Navigation gouard
router.beforeEach((to, from, next) => {
  console.log("Global before each");
  // if (to.name === "team-members") {
  //   next();
  // } else {
  //   next({
  //     name: "team-members",
  //     params: {
  //       teamID: "t2",
  //     },
  //   });
  // }
  next();
});

const app = createApp(App);

app.use(router);

app.mount("#app");
