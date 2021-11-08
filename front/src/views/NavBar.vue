<template>
  <v-app-bar app color="primary">
    <div v-if="token" class="resto-nav-bar">
      <!--Final user-->
      <span v-if="user.role == 1">
        <router-link to="/account/see">
          <v-icon>{{ svgPath }}</v-icon></router-link
        >
        <router-link to="/home">Home</router-link>
        <router-link to="/buy">Buy</router-link>
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

      <v-btn class="logout-button" color="error" v-on:click="logout"
        >Log out</v-btn
      >
    </div>
    <div v-else class="resto-nav-bar">
      <router-link to="/login">Log in</router-link>
      <router-link to="/signup">Sign up</router-link>
    </div>
    <Alert :message="this.message" />
  </v-app-bar>
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
</style>

<script>
import { mdiAccount } from "@mdi/js";
import Alert from "../components/Alert.vue";

export default {
  components: {
    Alert,
  },
  methods: {
    logout: function() {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      this.message = "Logging out . . .";
          setTimeout(() =>(window.location.href = "/login"),3000);
    },
  },
  data: () => ({
    user: JSON.parse(localStorage.getItem("user")),
    token: localStorage.getItem("token"),
    message: "",
    svgPath: mdiAccount,
  }),
};
</script>
