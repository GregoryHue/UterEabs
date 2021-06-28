<template>
  <div>
    <h1>See</h1>
    <div>
      <div class="info-container">
        <InfoDisplayer
          :label="String('Username')"
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
import InfoDisplayer from "../../components/InfoDisplayer.vue";

export default {
  components: {
    InfoDisplayer,
  },
  data() {
    return {
      user: JSON.parse(localStorage.getItem("user")),
    };
  },
};
</script>
