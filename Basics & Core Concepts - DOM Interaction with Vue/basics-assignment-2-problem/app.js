const app = Vue.createApp({
  data() {
    return {
      firstInput: "",
      secondInput: "",
      enteredInput: "",
    };
  },
  methods: {
    showAleart() {
      alert("Some text");
    },
    setFirstInput(event) {
      this.firstInput = event.target.value;
    },
    setSecondInput(event) {
      this.secondInput = event.target.value;
    },
    setEnteredInput() {
      this.enteredInput = this.secondInput;
    },
  },
});

app.mount("#assignment");
