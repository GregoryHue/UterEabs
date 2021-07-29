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
          v-model="item.food_name"
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

        <v-dialog width="500">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="error" class="mr-4" v-bind="attrs" v-on="on">
              Delete
            </v-btn>
          </template>

          <v-card>
            <v-card-title class="text-h5 grey lighten-2">
              Article deletion confirmation
            </v-card-title>

            <v-card-text>
              Are you sure you want to delete this article ?
              <br />
              This action is irreversible.
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="error"
                class="mr-4"
                @click="deleting($route.params.id)"
              >
                Confirm deletion
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-btn :disabled="!valid" color="success" class="mr-4" type="submit">
          Modify
        </v-btn>

        <h1>{{ message }}</h1>
      </div>
    </v-form>
  </div>
</template>

<style>
.info-container {
  margin-left: calc(50% - 150px);
}
</style>

<script>
import axios from "axios";
import { adr, header } from "../../plugins/connection";

export default {
  beforeMount() {
    axios({
      url: adr + "articles/see",
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
    modify: function() {
      console.log("sending request");
      axios({
        url: adr + "articles/modify",
        data: this.item,
        header: header,
        method: "POST",
      })
        .then((resp) => {
          console.log(resp);
          this.message = resp.data.message;
          setInterval(() => (window.location.href = "/articles/see"), 2000);
        })
        .catch((err) => {
          console.log(err);
          this.message = err;
        });
    },
    deleting: function(id) {
      axios({
        url: adr + "articles/delete",
        data: {
          _id: id,
        },
        header: header,
        method: "POST",
      })
        .then((resp) => {
          console.log(resp);
          setInterval(() => (window.location.href = "/articles/see"), 2000);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },

  data() {
    return {
      message: "",
      item: {
        img: "",
        food_name: "",
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
