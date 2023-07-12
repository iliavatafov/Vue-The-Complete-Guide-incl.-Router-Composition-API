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
          <base-button link @click="tt">Contact</base-button>
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
import ContactCoach from "../requests/ContactCoach.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    ContactCoach,
  },
  props: ["id"],
  computed: {
    ...mapGetters("coaches", ["coaches"]),
    fullName() {
      return this.selectedCoach.firstName + " " + this.selectedCoach.lastName;
    },
    // contactLink() {
    //   console.log(this.$router);
    //   return this.$router. "/contact";
    // },
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
      // eslint-disable-next-line no-debugger
      // debugger;
      // if (!this.coaches) return {}
      // Select coach from coaches using id from query params
      return this.coaches?.find((coach) => coach.id === this.id);
    },
  },
  methods: {
    tt() {
      this.$router.push(`/coaches/${this.id}/contact`);
    },
  },
};
</script>
