<template>
  <div>
    <h1>Modify</h1>
    <v-form v-model="valid" @submit.prevent="modify">
      <div class="info-container">
        <v-text-field
          v-model="item.img"
          type="text"
          label="Image url"
        ></v-text-field>
        <v-text-field
          v-model="item.menu_name"
          type="text"
          label="Food name"
        ></v-text-field>
        <v-text-field
          v-model="item.price"
          type="text"
          label="Price"
          :rules="priceRules"
        ></v-text-field>
        <v-text-field
          v-model="item.description"
          type="text"
          label="Description"
        ></v-text-field>
        <v-btn :disabled="!valid" color="success" class="mr-4" type="submit">
          Modify
        </v-btn>
        <h1>{{ message }}</h1>
      </div>
    </v-form>
  </div>
</template>

<style>
.info-container{
  margin-left: calc(50% - 150px);
}
</style>

<script>
import axios from "axios";
import { adr, header } from "../../plugins/env";

export default {
  mounted() {
    axios({
      url: adr + "menus/see",
      data: {
        _id: this.$route.params.id,
      },
      header: header,
      method: "POST",
    })
      .then((resp) => {
        console.log(resp);
        this.item = resp.data[0];
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    modify: function () {
      console.log("sending request");
      axios({
        url: adr + "menus/modify",
        data: this.item,
        header: header,
        method: "POST",
      })
        .then((resp) => {
          console.log(resp);
          this.message = resp.data.message;
          setInterval(() => (window.location.href = "/menus/see"), 2000);
        })
        .catch((err) => {
          console.log(err);
          this.message = err;
        });
    },
  },

  data() {
    return {
      message: "",
      item: {
        img: "",
        menu_name: "",
        price: "",
        description: "",
        owner_id: "",
      },
      valid: false,
      priceRules: [
        (v) =>
          (!isNaN(parseFloat(v)) && v >= 0 && v <= 99999) ||
          "Zip code must be a number between 0 and 99999",
      ],
    };
  },
};
</script>
