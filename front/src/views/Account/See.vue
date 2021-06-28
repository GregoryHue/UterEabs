<template>
  <div>
    <h1>See</h1>
    <div>
      <div class="info-container">
        <InfoDisplayer
          :label="String('Restaurant\'s name')"
          :value="user.username"
        />
        <InfoDisplayer :label="String('Town')" :value="user.town" />
        <InfoDisplayer :label="String('Street')" :value="user.street" />
        <InfoDisplayer :label="String('Zip code')" :value="user.zip_code" />
      </div>
    </div>
  </div>
</template>

<style>
.info-container {
  min-width: 100px;
  max-width: 300px;
}
</style>

<script>
import axios from "axios";
import InfoDisplayer from "../../components/InfoDisplayer.vue";
import { adr, header } from "../../plugins/env";

export default {
  components: {
    InfoDisplayer,
  },
  data() {
    return {
      user: JSON.parse(localStorage.getItem("user")),
      posts: [],
    };
  },
  mounted() {
    console.log("sending request");
    axios({
      url: adr + "account/see",
      data: this.user,
      header: header,
      method: "POST",
    })
      .then((resp) => {
        console.log(resp);
        this.message = resp.data.message;
        setInterval(() => (window.location.href = "/login"), 3000);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>
