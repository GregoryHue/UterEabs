<template>
  <v-card class="mx-auto" max-width="250" max-height="300" :id="data._id">
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <a :href="redirect">
      <v-img height="150" :src="data.img">
        <template v-slot:placeholder>
          <v-sheet
            class="pa-3"
          >
            <v-skeleton-loader
              class="mx-auto"
              max-width="300"
              type="card"
            ></v-skeleton-loader>
          </v-sheet> </template
      ></v-img>
    </a>
    

    <v-card-title>{{ data.menu_name }}</v-card-title>

    <v-card-text>
      <v-row align="center" class="mx-0">
        <div class="grey--text">{{ data.price }} €</div>
      </v-row>
      <div v-if="isButtonToShow">
        <v-dialog v-model="openedDialog" width="500">
          <template v-slot:activator="{ on, attrs }">
            <v-icon color="red" class="delete-icon" v-bind="attrs" v-on="on">
              {{ svgPath }}
            </v-icon>
          </template>

          <v-card>
            <v-card-title class="text-h5 grey lighten-2">
              Menu deletion confirmation
            </v-card-title>

            <v-card-text>
              Are you sure you want to delete this menu ?
              <br />
              This action is irreversible.
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="error" class="mr-4" @click="deleteItem(data._id)">
                Confirm deletion
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>

      <br />
      <div class="card-description">
        {{ data.description }}
      </div>
    </v-card-text>
  </v-card>
</template>

<style>
.card-description {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>

<script>
import axios from "axios";
import { adr, header } from "../plugins/connection";
import { mdiDeleteForever } from "@mdi/js";

export default {
  name: "MenuCardDelete",
  data() {
    return {
      openedDialog: false,
      svgPath: mdiDeleteForever,
      redirect: "modify/" + this.data._id,
    };
  },
  props: {
    isButtonToShow: { type: Boolean },
    data: {
      _id: {
        type: Array,
      },
      menu_name: {
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
  methods: {
    deleteItem: function(id) {
      axios({
        url: adr + "menus/delete",
        data: {
          _id: id,
        },
        header: header,
        method: "POST",
      })
        .then((resp) => {
          console.log(resp);
          document.getElementById(id).parentNode.remove();
          this.openedDialog = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
