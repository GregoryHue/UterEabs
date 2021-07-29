<template>
  <v-app>
    <NavBar />

    <v-main>
      <div class="main-window">
        <router-view />
        <h1>{{ message }}</h1>
      </div>

      <div class="footer-uber-eats">
        <h1 class="uber-eats">Uber Eats</h1>
      </div>
    </v-main>
  </v-app>
</template>

<style>
.body {
  background-color: red;
}

.footer-alert-popup {
  text-align: center;
  position: fixed;
  bottom: 20px;
  left: 20px;
  min-width: 200px;
  z-index: 98;
}

.footer-uber-eats {
  text-align: center;
  position: fixed;
  bottom: 20px;
  right: 0px;
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
import NavBar from "./views/NavBar.vue";

export default {
  components: {
    NavBar,
  },
  name: "App",
  data: () => ({
    message: "",
  }),
};
</script>
