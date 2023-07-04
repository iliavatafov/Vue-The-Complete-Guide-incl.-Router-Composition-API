const app = Vue.createApp({
  data() {
    return {
      counter: 0,
      name: "",
      lastName: "",
      // fullName: "",
    };
  },
  watch: {
    counter(value) {
      const that = this;
      if (value > 50) {
        setTimeout(function () {
          that.counter = 0;
        }, 2000);
      }
    },
  },
  computed: {
    fullName() {
      if (!this.name || !this.lastName) {
        return "";
      } else {
        return this.name + " " + this.lastName;
      }
    },
  },
  methods: {
    outputFullName() {
      if (!this.name) {
        return "";
      } else {
        return this.name + " " + "Vatafov";
      }
    },
    add(num) {
      this.counter = this.counter + num;
    },
    reduce(num) {
      this.counter = this.counter - num;
      // this.counter--;
    },
    resetInput() {
      this.name = "";
      this.lastName = "";
    },
  },
});

app.mount("#events");
