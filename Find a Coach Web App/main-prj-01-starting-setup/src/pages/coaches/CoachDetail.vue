<template>
  <base-spinner v-if="!selectedCoach"></base-spinner>
  <div v-else>
    <section>
      <base-card>
        <h2>{{ fullName }}</h2>
        <h3>${{ rate }}/hour</h3>
      </base-card>
    </section>
    <!-- Internal route -->
    <!-- <router-view></router-view> -->
    <section>
      <contact-coach v-if="$route.params.action === 'contact'" />
      <base-card v-else>
        <header>
          <h2>Interested? Reach out now!</h2>
          <base-button link :to="linkToContacts">Contact</base-button>
        </header>
      </base-card>
    </section>
    <section>
      <base-card>
        <base-badge
          v-for="area of areas"
          :key="area"
          :type="area"
          :title="area"
        ></base-badge>
        <p>{{ description }}</p>
      </base-card>
    </section>
  </div>
</template>

<script scoped>
import { mapActions, mapGetters } from "vuex";

import ContactCoach from "../requests/ContactCoach.vue";

export default {
  components: {
    ContactCoach,
  },
  props: ["id"],
  computed: {
    ...mapGetters("breadcrumbs", ["getBreadcrumbs"]),
    ...mapGetters("coaches", ["coaches"]),
    fullName() {
      return this.selectedCoach.firstName + " " + this.selectedCoach.lastName;
    },
    areas() {
      return this.selectedCoach.areas;
    },
    rate() {
      return this.selectedCoach.hourlyRate;
    },
    description() {
      return this.selectedCoach.description;
    },
    selectedCoach() {
      return this.coaches.find((coach) => coach.id === this.id);
    },
    linkToContacts() {
      return "/coaches/" + this.id + "/contact";
    },
  },
  methods: {
    ...mapActions("breadcrumbs", ["setBreadcrumbs", "replaceBreadcrumb"]),
  },
  created() {
    const coach = this.coaches.find((coach) => coach.id === this.id);
    const coachFullName = coach.firstName + " " + coach.lastName;

    this.setBreadcrumbs([
      { text: "All Coaches", to: { path: "/coaches" } },
      {
        text: coachFullName,
        to: { path: `/coaches/${this.id}` },
      },
    ]);
  },
};
</script>
