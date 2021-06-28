<template>
  <div>
    <h1>Log in with your account</h1>
    
    <v-form v-model="valid" @submit.prevent="login">
      <v-container>
        <v-text-field
          v-model="user.email"
          :rules="emailRules"
          label="E-mail"
          required
        ></v-text-field>
        <v-text-field
          v-model="user.password"
          :rules="passwordRules"
          type="password"
          label="Password"
          required
        ></v-text-field>
        <v-btn :disabled="!valid" color="success" class="mr-4" type="submit">
          Validate
        </v-btn>
      </v-container>
    </v-form>
    <h1>{{ message }}</h1>
  </div>
</template>

<script>
import axios from "axios";
import { adr, header } from "../plugins/env";

export default {
  data: () => ({
    valid: false,
    passwordRules: [(v) => !!v || "Password is required"],
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+/.test(v) || "E-mail must be valid",
    ],

    user: {
      email: "",
      password: "",
      token: localStorage.getItem("token")
    },
    message:""
  }),

  methods: {
    login: function () {
      console.log("sending request");
      axios({
        url: adr + "users/login/",
        data: this.user,
        header: header,
        method: "POST",
      })
        .then((resp) => {
          console.log(resp);
          this.message = resp.data.message;
          localStorage.setItem("token", resp.data.token);
          localStorage.setItem("user", JSON.stringify(resp.data.user));
          setInterval(() => window.location.href = "/home", 3000)
        })
        .catch((err) => {
          localStorage.removeItem("token"); // if the request fails, remove any possible user token if possible
          console.log(err);
        });
    },
  },
};
</script>