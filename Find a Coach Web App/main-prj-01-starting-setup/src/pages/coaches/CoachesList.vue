<template>
  <div>
    <base-dialog :show="!!error" title="An error occured!" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <coach-filter></coach-filter>
    </section>
    <section>
      <base-card>
        <div class="controls">
          <base-button mode="outline" @click="loadCoaches(true)"
            >Refresh</base-button
          >
          <base-button link to="/auth?redirect=register" v-if="!isLoggedIn"
            >Login to Register as Coach</base-button
          >
          <base-button
            v-if="isLoggedIn && !isCoach && !isLoading"
            link
            to="/register"
            >Register as Coach</base-button
          >
        </div>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <ul v-else-if="hasCoaches">
          <coach-item
            v-for="coach in filterCoaches"
            :key="coach.id"
            :id="coach.id"
            :first-name="coach.firstName"
            :last-name="coach.lastName"
            :rate="coach.hourlyRate"
            :areas="coach.areas"
          ></coach-item>
        </ul>
        <h3 v-else>No coaches found.</h3>
      </base-card>
    </section>
  </div>
</template>

<script>
import CoachItem from "../../components/coaches/CoachItem.vue";
import BaseCard from "../../components/ui/BaseCard.vue";
import CoachFilter from "../../components/coaches/CoachFilter.vue";

export default {
  components: {
    CoachItem,
    BaseCard,
    CoachFilter,
  },
  data() {
    return {
      isLoading: false,
      error: null,
    };
  },
  computed: {
    isLoggedIn() {
      // Check is user logged in
      return this.$store.getters.isAuthenticated;
    },
    activeFilters() {
      return this.$store.getters["coaches/getFilters"];
    },
    filterCoaches() {
      // Get coaches list from Vuex and save it in variable
      const coaches = this.$store.getters["coaches/coaches"];
      // const activeFilters = this.$store.getters["coaches/getFilters"];

      // Filter coaches depends on checked activeFilters
      return coaches.filter((coach) => {
        if (this.activeFilters.frontend && coach.areas.includes("frontend")) {
          return true;
        } else if (
          this.activeFilters.backend &&
          coach.areas.includes("backend")
        ) {
          return true;
        } else if (
          this.activeFilters.career &&
          coach.areas.includes("career")
        ) {
          return true;
        }
        return false;
      });
    },
    hasCoaches() {
      // Check are any coaches stored in the Vuex store
      return !this.isLoading && this.$store.getters["coaches/hasCoaches"];
    },
    isCoach() {
      // Check is the current user registrated as a coach
      return this.$store.getters["coaches/isCoach"];
    },
  },
  methods: {
    async loadCoaches(refresh = false) {
      this.isLoading = true;
      try {
        // Fetch caoches list from database and save it to Vuex store
        await this.$store.dispatch("coaches/loadCoaches", {
          forceRefresh: refresh,
        });
      } catch (error) {
        this.error = error.message || "Somthing get wrong!";
      }
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
