<template>
  <div>
    <h1>Delete</h1>
    <p>Are you sure you want to delete your account ?</p>
    <v-container>
      <v-btn color="error" class="mr-4" @click="deleting"> Delete </v-btn>
    </v-container>
    <h1>{{ message }}</h1>
  </div>
</template>

<script>
import axios from "axios";
import { adr, header } from "../../plugins/connection";

export default {
  data() {
    return {
      message:'',
      user: JSON.parse(localStorage.getItem("user")),
    };
  },
  methods: {
    deleting: function () {
      console.log("sending request");
      axios({
        url: adr + "account/delete",
        data: this.user,
        header: header,
        method: "POST",
      })
        .then((resp) => {
          console.log(resp);
          this.message = resp.data.message;
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setInterval(() => (window.location.href = "/login"), 3000);
        })
        .catch((err) => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          console.log(err);
          this.message = err.message;
        });
    },
  },
};
</script>