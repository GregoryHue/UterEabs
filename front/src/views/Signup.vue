<template>
  <div>
    <h1>Sign up with a new account</h1>
    <v-form v-model="valid" @submit.prevent="signup">
      <v-container>
        <v-text-field
          v-model="user.email"
          :rules="emailRules"
          label="E-mail"
          required
        ></v-text-field>
        <v-text-field
          v-model="user.username"
          :rules="usernameRules"
          type="text"
          label="Username"
          required
        ></v-text-field>
        <v-select
          v-model="user.role"
          :items="roles"
          :rules="roleRules"
          label="Role"
          dense
        ></v-select>
        <v-text-field
          v-model="user.town"
          :rules="townRules"
          type="text"
          label="Town"
          required
        ></v-text-field>
        <v-text-field
          v-model="user.street"
          :rules="streetRules"
          type="text"
          label="Street"
          required
        ></v-text-field>
        <v-text-field
          v-model="user.zip_code"
          :rules="zipRules"
          type="text"
          label="Zip code"
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
    roles: ['Client', 'Restaurant', 'Dev', 'Delivery man'],
    valid: false,
    roleRules: [(v) => !!v || "A role is required"],
    passwordRules: [(v) => !!v || "Password is required"],
    usernameRules: [(v) => !!v || "Username is required"],
    townRules: [(v) => !!v || "Town is required"],
    streetRules: [(v) => !!v || "Street is required"],
    zipRules: [
      (v) => !!v || "Zip code is required",
      (v) =>
        (!isNaN(parseFloat(v)) && v >= 1 && v <= 99999) ||
        "Zip code must be a number between 00001 and 99999",
    ],
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+/.test(v) || "E-mail must be valid",
    ],

    user: {
      email: "",
      username: "",
      password: "",
      role: "",
      town:"",
      street:"",
      zip_code:""
    },
    message:""
  }),

  methods: {
    signup: function () {
      console.log("sending request");
      axios({
        url: adr + "users/signup/",
        data: this.user,
        header: header,
        method: "POST",
      })
        .then((resp) => {
          console.log(resp);
          this.message = resp.data.message;
          setInterval(() => window.location.href = "/login", 3000)
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>