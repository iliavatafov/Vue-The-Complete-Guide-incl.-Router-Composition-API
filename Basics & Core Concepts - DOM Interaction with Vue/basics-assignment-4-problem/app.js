const app = Vue.createApp({
  data() {
    return {
      input: "",
      isOutputHidden: false,
      inlineStyle: "",
    };
  },
  methods: {
    showHideOutputToggle() {
      this.isOutputHidden = !this.isOutputHidden;
    },
  },
});

app.mount("#assignment");
