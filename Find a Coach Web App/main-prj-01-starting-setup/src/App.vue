<template>
  <div class="spinner-container" v-if="isLoading">
    <base-spinner></base-spinner>
  </div>
  <div v-else>
    <the-header></the-header>
    <router-view> </router-view>
  </div>
</template>

<script>
import TheHeader from "./components/layout/TheHeader.vue";

export default {
  data() {
    return {
      isLoading: false,
    };
  },
  components: {
    TheHeader,
  },
  computed: {
    didAutoLogout() {
      // Listen didAutoLogout changes
      return this.$store.getters.didAutoLogout;
    },
  },
  created() {
    this.loadCoaches();
    // Check localStorage for user data and if data set the user in Vuex
    this.$store.dispatch("tryLogin");
  },
  methods: {
    async loadCoaches(refresh = false) {
      this.isLoading = true;
      try {
        // Fetch caoches list from database
        await this.$store.dispatch("coaches/loadCoaches", {
          forceRefresh: refresh,
        });
      } catch (error) {
        this.error = error.message || "Somthing get wrong!";
      }
      this.isLoading = false;
    },
  },
  watch: {
    didAutoLogout(curValue, oldValue) {
      // If didAutoLogout Vuex state changes navigate user to the CoachesList
      if (curValue && curValue !== oldValue) {
        this.$router.replace("/coaches");
      }
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");

* {
  box-sizing: border-box;
}

html {
  font-family: "Roboto", sans-serif;
}

body {
  margin: 0;
}

.route-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.route-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.spinner-container {
  display: flex;
  align-items: center;
  justify-content: center;
  widows: 100vw;
  height: 100vh;
}

.route-enter-active {
  transition: all 0.3 ease-out;
}

.route-leave-active {
  transition: all 0.3 ease-in;
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
