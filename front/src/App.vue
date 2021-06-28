<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div v-if="token_is_valid" class="resto-nav-bar">
        <router-link to="/account">
          <v-icon>{{ svgPath }}</v-icon></router-link
        >
        <router-link to="/home">Home</router-link>
        <router-link to="/articles">Articles</router-link>
        <router-link to="/menus">Menus</router-link>
        <router-link to="/orders">Orders</router-link>
        <router-link to="/deliveries">Deliveries</router-link>
        <router-link to="/stats">Stats</router-link>
        <router-link to="/share">Share</router-link>

        <v-btn class="logout-button" color="error" v-on:click="logout"
          >Log out</v-btn
        >
      </div>
      <div v-else class="resto-nav-bar">
        <router-link to="/login">Log in</router-link>
        <router-link to="/signup">Sign up</router-link>
      </div>
    </v-app-bar>

    <v-main>
      <div class="main-window">
        <router-view  />
        <h1>{{ message }}</h1>
        <h5>token : {{ token }}</h5>
        <h5>token_is_valid : {{ token_is_valid }}</h5>
      </div>
    </v-main>
  </v-app>
</template>

<style>
.resto-nav-bar {
  margin-left: 2%;
  width: 100%;
}

.logout-button {
  float: right;
  margin-right: 2%;
}

.resto-nav-bar a {
  font-weight: bold;
  color: white !important;
  margin: 0 5px 0 5px;
}

.main-window {
  margin-top: 2%;
  width: 95%;
  min-height: 800px;
  /*background:rgb(25, 118, 210);*/
  text-align: center;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>

<script>
import jwt from "jsonwebtoken";
import { mdiAccount } from "@mdi/js";
import { jwt_key } from './plugins/env'

export default {
  name: "App",
  beforeMount() {
    this.token_is_valid = false;
    const token = localStorage.getItem("token");
    console.log(token);
    if (token != null) {
      try {
        var decoded = jwt.verify(token, jwt_key);
        this.token_is_valid = true;
      } catch (err) {
        console.log(err)
        console.log(decoded)
        this.token_is_valid = false;
        //problem : reload non-stop
        //window.location.href = "/login"
      }
    }
  },
  methods: {
    logout: function () {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      this.token_is_valid = false;
      setInterval(() => (window.location.href = "/login"), 3000);
      this.message = "Loging out . . .";
    },
  },
  data: () => ({
    token_is_valid: false,
    message: "",
    svgPath: mdiAccount,
    token: localStorage.getItem("token"),
  }),
};
</script>
