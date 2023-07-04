const app = Vue.createApp({
  data() {
    return {
      name: "Ilia",
      age: 33,
      imageUrl:
        "https://media.licdn.com/dms/image/D4D03AQHqYaBPpGNnDw/profile-displayphoto-shrink_800_800/0/1683015128106?e=2147483647&v=beta&t=VxAMhKBCr6LLkhAQWI-nGmP6_rTNGjG1ZR0LgNkX45U",
    };
  },
  methods: {
    calcFavoritNum() {
      const num = Math.random();

      if (num <= 0.5) {
        return `Favorit number ${num.toFixed(2)} is lower or equal to 0.5`;
      } else {
        return `Favorit number ${num.toFixed(2)}  is higher then 0.5`;
      }
    },
    calcAge() {
      return this.age + 5;
    },
  },
});

app.mount("#assignment");
