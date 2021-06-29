<template>
  <v-card class="mx-auto" max-width="250" max-height="350">
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img height="150" :src="data.img"></v-img>

    <v-card-title>{{ data.food_name }}</v-card-title>

    <v-card-text>
      <v-row align="center" class="mx-0">
        <div class="grey--text">{{ data.price }} €</div>
      </v-row>
    <v-icon color="red" class="delete-icon" @click="deleteItem(data._id)"> {{ svgPath }} </v-icon>

      <br />
      <div class="card-description">
        {{ data.description }}
      </div>
    </v-card-text>
    
  </v-card>
</template>

<style>
.delete-icon {
  float: right;
}

.card-description {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>

<script>
import axios from "axios";
import { adr, header } from "../plugins/env";
import { mdiDeleteForever } from "@mdi/js";

export default {
  methods: {
    deleteItem: function (id) {
      if (confirm("Do you really want to delete?")) {
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
            window.location.href = "/articles/see";
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },

  data: () => ({
    svgPath: mdiDeleteForever,
  }),
  name: "FoodCardDelete",
  props: {
    data: {
      _id: {
        type: Array,
      },
      food_name: {
        type: Array,
      },
      price: {
        type: Array,
      },
      img: {
        type: Array,
      },
      description: {
        type: Array,
      },
    },
  },
};
</script>