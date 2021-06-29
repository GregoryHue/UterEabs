<template>
  <div>
    <h1>Create</h1>
    <div>
      <v-form v-model="valid" @submit.prevent="create">
        <div class="info-container">
          <v-text-field
            v-model="item.img"
            type="text"
            label="Image url"
            required
          ></v-text-field>
          <v-text-field
            v-model="item.food_name"
            type="text"
            label="Food name"
            required
          ></v-text-field>
          <v-text-field
            v-model="item.price"
            type="text"
            label="Price"
            :rules="priceRules"
            required
          ></v-text-field>
          <v-text-field
            v-model="item.description"
            type="text"
            label="Description"
          ></v-text-field>
          <v-btn :disabled="!valid" color="success" class="mr-4" type="submit">
            Create
          </v-btn>
          <h1>{{ message }}</h1>
        </div>
      </v-form>
    </div>
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
  data() {
    return {
      message: "",
      item: {
        img:'',
        food_name: '',
        price: '',
        description: '',
        owner_id: JSON.parse(localStorage.getItem("user")).id,
      },
      valid: false,
      priceRules: [
        (v) =>
          (!isNaN(parseFloat(v)) && v >= 0 && v <= 99999) ||
          "Zip code must be a number between 0 and 99999",
      ],
    };
  },
  methods: {
    create: function () {
      console.log("sending request");
      axios({
        url: adr + "articles/create",
        data: this.item,
        header: header,
        method: "POST",
      })
        .then((resp) => {
          console.log(resp);
          this.message = resp.data.message;
          window.location.href = "/articles/see"
        })
        .catch((err) => {
          console.log(err);
          this.message = err;
        });
    },
  },
};
</script>