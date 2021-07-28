<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div v-if="token_is_valid" class="resto-nav-bar">
        <!--Final user-->
        <span v-if="user.role == 1">
          <router-link to="/account">
            <v-icon>{{ svgPath }}</v-icon></router-link
          >
          <router-link to="/home">Home</router-link>
        </span>

        <!--Restaurateur user-->
        <span v-if="user.role == 2">
          <router-link to="/account/see">
            <v-icon>{{ svgPath }}</v-icon></router-link
          >
          <router-link to="/home">Home</router-link>
          <router-link to="/articles/see">Articles</router-link>
          <router-link to="/menus/see">Menus</router-link>
          <router-link to="/orders/see">Orders</router-link>
        </span>

        <!--Delivery user-->
        <span v-if="user.role == 3">
          <router-link to="/account">
            <v-icon>{{ svgPath }}</v-icon></router-link
          >
          <router-link to="/home">Home</router-link>
        </span>

        <!--Dev user-->
        <span v-if="user.role == 4">
          <router-link to="/account">
            <v-icon>{{ svgPath }}</v-icon></router-link
          >
          <router-link to="/home">Home</router-link>
        </span>

        <!--Admin user-->
        <span v-if="user.role == 5">
          <router-link to="/account">
            <v-icon>{{ svgPath }}</v-icon></router-link
          >
          <router-link to="/home">Home</router-link>
        </span>

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
        <router-view />
        <h1>{{ message }}</h1>
        <h5 class="bullshit-info">
          token : {{ token }} <br />
          token_is_valid : {{ token_is_valid }}
        </h5>
      </div>

      <div class="footer-uber-eats">
        <h1 class="uber-eats">Uber Eats</h1>
      </div>
    </v-main>
  </v-app>
</template>

<style>
.footer-uber-eats {
  text-align: center;
  position: fixed;
  bottom: 50px;
  margin-left:40%;
  width: 20%;
  z-index: 99;
}

.uber-eats {
  text-shadow: 2px 2px rgb(55, 148, 240);
  color: rgb(20, 20, 20);
  font-size: 40px;
}

.bullshit-info {
  margin-top: 5%;
}

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
  text-align: center;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>

<script>
import jwt from "jsonwebtoken";
import { mdiAccount } from "@mdi/js";

export default {
  name: "App",
  beforeMount() {
    const secret_key = '09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611'; 

    this.token_is_valid = false;
    const token = localStorage.getItem("token");
    console.log(token);
    if (token != null) {
      try {
        var decoded = jwt.verify(token, secret_key);
        this.token_is_valid = true;
      } catch (err) {
        console.log(err);
        console.log(decoded);
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
      setInterval(() => (window.location.href = "/login"), 1000);
      this.message = "Loging out . . .";
    },
  },
  data: () => ({
    user: JSON.parse(localStorage.getItem("user")),
    token_is_valid: false,
    message: "",
    svgPath: mdiAccount,
    token: localStorage.getItem("token"),
  }),
};
</script>
