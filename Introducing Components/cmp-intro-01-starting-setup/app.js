const app = Vue.createApp({
  data() {
    return {
      friends: [
        {
          id: "ilia",
          name: "Ilia Vatafov",
          phone: "0359 882 037 375",
          email: "iliyavatafov@gmail.com",
        },
        {
          id: "mirela",
          name: "Mirela Vatafova",
          phone: "0359 882 037 375",
          email: "mirela.ts.ilieva@gmail.com",
        },
      ],
    };
  },
});

app.component("friend-contact", {
  template: `
<li>
  <h2>{{ friend.name }}</h2>
  <button @click="toggleDetails">Show Details</button>
  <ul v-if="detailsAreVisible">
    <li><strong>Phone:</strong> {{ friend.phone }}</li>
    <li><strong>Email:</strong> {{ friend.email }}</li>
  </ul>
</li>
  `,
  data() {
    return {
      detailsAreVisible: false,
      friend: {
        id: "ilia",
        name: "Ilia Vatafov",
        phone: "0359 882 037 375",
        email: "iliyavatafov@gmail.com",
      },
    };
  },
  methods: {
    toggleDetails() {
      this.detailsAreVisible = !this.detailsAreVisible;
    },
  },
});

app.mount("#app");
