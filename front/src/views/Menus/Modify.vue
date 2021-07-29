<template>
  <div>
    <h1>Modify</h1>
    <div>
      <h3>Select at least 2 articles to modify a menu</h3>
      <div class="articles-selecter">
        <div
          v-for="product in products"
          :key="product.id"
          :id="product._id"
          v-on:click="addArticleToList(product._id)"
        >
          <FoodCard v-bind:data="product" />
        </div>
      </div>

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

          <v-dialog width="500">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="error" class="mr-4" v-bind="attrs" v-on="on">
                Delete
              </v-btn>
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
import FoodCard from "../../components/FoodCard.vue";

export default {
  components: {
    FoodCard,
  },
  beforeMount() {
    axios({
      url: adr + "articles/see",
      data: {
        owner_id: this.user.id,
      },
      header: header,
      method: "POST",
    })
      .then((resp) => {
        console.log(resp);
        this.products = resp.data;
      })
      .catch((err) => {
        console.log(err);
      });

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

        this.item.l_article.forEach((_id) => {
          document.getElementById(_id).firstChild.classList.add("food-active");
          console.log("added " + _id);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    modify: function() {
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

    deleting: function(id) {
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
          setInterval(() => (window.location.href = "/menus/see"), 2000);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    addArticleToList: function(_id) {
      if (this.item.l_article.includes(_id)) {
        var i = 0;
        while (i < this.item.l_article.length) {
          if (this.item.l_article[i] === _id) {
            this.item.l_article.splice(i, 1);
            document
              .getElementById(_id)
              .firstChild.classList.remove("food-active");
          } else {
            ++i;
          }
        }
      } else {
        this.item.l_article.push(_id);
        document.getElementById(_id).firstChild.classList.add("food-active");
      }
      console.log(this.item.l_article);
    },
  },

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
  data() {
    return {
      user: JSON.parse(localStorage.getItem("user")),
      products: "",
      message: "",
      item: {
        img: "",
        menu_name: "",
        l_article: [],
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
