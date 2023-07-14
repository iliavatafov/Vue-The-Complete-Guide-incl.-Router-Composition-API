<template>
  <table>
    <thead>
      <tr>
        <th v-for="title in titles" :key="title">{{ title }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(coach, index) in newCoaches" :key="index">
        <td v-for="(value, index) in coachesValue(coach)" :key="index">
          {{ convertArrayTostring(value) }}
        </td>
      </tr>
    </tbody>
  </table>
  <div class="actions">
    <base-button mode="green" @click="confirmImport">Confirm</base-button>
    <base-button mode="red" @click="cancelImport">Cancel</base-button>
  </div>
</template>

<script>
export default {
  props: ["newCoaches", "cancelImport", "confirmImport"],
  data() {
    return {
      titles: null,
    };
  },
  methods: {
    coachesValue(coach) {
      return Object.values(coach);
    },
    convertArrayTostring(value) {
      if (Array.isArray(value)) {
        return value.join(", ");
      }

      if (typeof value === "number") {
        return value.toLocaleString("en-US");
      }

      return value;
    },
  },
  created() {
    this.titles = Object.keys(this.newCoaches[0]);
  },
};
</script>

<style scoped>
table {
  width: 80%;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 0;
  margin: 0;
  background-color: white;
}

tr {
  color: black;
  width: 100%;
  padding: 1rem;
  height: 3rem;
}

tr th {
  background-color: #3a0061;
  color: white;
}

.actions {
  display: flex;
  gap: 2rem;
  margin-top: 2rem;
}
</style>
