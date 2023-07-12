<template>
  <base-card>
    <base-dialog :show="!!error" title="An error occured!" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <form @submit.prevent="submitForm">
      <div class="form-control">
        <label for="email">Your E-Mail</label>
        <input
          type="text"
          id="email"
          :disabled="isAuthenticated"
          v-model.trim="email"
        />
      </div>
      <div class="form-control">
        <label for="message">Message</label>
        <textarea id="message" rows="5" v-model.trim="message"></textarea>
      </div>
      <p class="errors" v-if="!formIsValid">
        Please enter a valid input and non-empty message
      </p>
      <div class="actions">
        <base-button>Send Message</base-button>
      </div>
    </form>
  </base-card>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      email: "",
      message: "",
      formIsValid: true,
      isLoading: false,
      error: null,
      hasLoggedInUser: false,
    };
  },
  computed: {
    ...mapGetters(["isAuthenticated", "getUserEmail"]),
  },
  methods: {
    async submitForm() {
      this.formIsValid = true;
      if (
        this.email === "" ||
        !this.email.includes("@") ||
        this.message === ""
      ) {
        this.formIsValid = false;
        return;
      }

      this.isLoading = true;

      try {
        // Perform POST request and save the message and email of the sender to the database and in Vuex store
        await this.$store.dispatch("requests/contactCoach", {
          email: this.email,
          message: this.message,
          coachId: this.$route.params.id,
        });
        this.isLoading = false;
      } catch (error) {
        this.error = error.message || "Save data is faild";
        this.isLoading = false;
        return;
      }

      this.$router.replace("/coaches");
    },
    handleError() {
      this.error = null;
    },
  },
  created() {
    // Check is user is authenticated and if it is set the email input with auth user email
    if (this.isAuthenticated) {
      this.email = this.getUserEmail;
    }
  },
};
</script>

<style scoped>
form {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  max-width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.errors {
  font-weight: bold;
  color: red;
}

.actions {
  text-align: center;
}
</style>
