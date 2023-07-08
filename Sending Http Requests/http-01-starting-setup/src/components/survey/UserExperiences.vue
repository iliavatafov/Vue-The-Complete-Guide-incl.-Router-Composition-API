<template>
  <section>
    <base-card>
      <h2>Submitted Experiences</h2>
      <div>
        <base-button @click="loadExperiences"
          >Load Submitted Experiences</base-button
        >
      </div>
      <p v-if="isLoading && results && results.length > 0">Loading...</p>
      <p v-else-if="!isLoading && errorMsg">{{ errorMsg }}</p>
      <p v-else-if="!isLoading && results && results.length === 0">
        Not stored experiences found
      </p>
      <ul v-else>
        <survey-result
          v-for="result in results"
          :key="result.id"
          :name="result.name"
          :rating="result.rating"
        ></survey-result>
      </ul>
    </base-card>
  </section>
</template>

<script>
import SurveyResult from "./SurveyResult.vue";

export default {
  components: {
    SurveyResult,
  },
  data() {
    return {
      results: [],
      isLoading: false,
      errorMsg: null,
    };
  },
  methods: {
    loadExperiences() {
      this.isLoading = true;
      this.errorMsg = null;
      fetch(
        "https://vue-http-demo-6f676-default-rtdb.europe-west1.firebasedatabase.app/surveys.json"
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((data) => {
          if (data) {
            this.isLoading = false;
            const formatedData = [];

            Object.keys(data).forEach((id) => {
              formatedData.push({
                id,
                ...data[id],
              });
            });

            this.results = formatedData;
          }
        })
        .catch(() => {
          this.isLoading = false;
          this.errorMsg = "Fail to fetch data - please try again later";
        });
    },
  },
  mounted() {
    this.loadExperiences();
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
