const app = Vue.createApp({
  data() {
    return {
      counter: 0,
      name: "",
      confirmedName: "",
    };
  },
  methods: {
    increment(n) {
      this.counter += n;
    },
    decrement(n) {
      if (this.counter >= n) {
        this.counter -= n;
      }
    },
    setName(event, familyName) {
      this.name = event.target.value + " " + familyName;
    },
    submitForm() {
      alert("Submitted!");
    },
    confirmInput() {
      this.confirmedName = this.name;
    },
  },
});

app.mount("#events");
