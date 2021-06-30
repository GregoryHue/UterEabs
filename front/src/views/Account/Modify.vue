<template>
  <div>
    <h1>Modify</h1>
    <div>
      <v-form v-model="valid" @submit.prevent="modify">
        <div class="info-container">
          <v-text-field
            v-model="u_current.username"
            type="text"
            label="Username"
            required
          ></v-text-field>
          <v-text-field
            v-model="u_current.town"
            type="text"
            label="Town"
            required
          ></v-text-field>
          <v-text-field
            v-model="u_current.street"
            type="text"
            label="Street"
            required
          ></v-text-field>
          <v-text-field
            v-model="u_current.zip_code"
            type="text"
            label="Zip code"
            :rules="zipRules"
            required
          ></v-text-field>
          <v-text-field
            v-model="u_current.password"
            type="password"
            label="Password"
            required
          ></v-text-field>
          <v-btn :disabled="!valid" color="success" class="mr-4" type="submit">
            Validate
          </v-btn>
          <h1>{{ message }}</h1>
        </div>
      </v-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { adr, header } from "../../plugins/env";

export default {
  mounted(){
    this.u_current.password = "";
  },
  data() {
    return {
      message: "",
      u_current: JSON.parse(localStorage.getItem("user")),
      valid: false,
      zipRules: [
        (v) =>
          (!isNaN(parseFloat(v)) && v >= 10000 && v <= 99999) ||
          "Zip code must be a number between 10000 and 99999",
      ],
    };
  },
  methods: {
    modify: function () {
      var u_new = {
        id: this.u_current.id,
        username: this.u_current.username,
        password: this.u_current.password,
        town: this.u_current.town,
        street: this.u_current.street,
        zip_code: this.u_current.zip_code,
      };

      console.log("sending request");
      axios({
        url: adr + "account/modify",
        data: u_new,
        header: header,
        method: "POST",
      })
        .then((resp) => {
          console.log(resp);
          this.message = resp.data.message;
          localStorage.setItem("user", JSON.stringify(resp.data.user));
          setInterval(() => (window.location.href = "/account/see"), 3000);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>