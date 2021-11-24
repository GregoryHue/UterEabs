<template>
  <div>
    <h1>Create</h1>
    <div>
      <h3>Select at least 2 articles to create a menu</h3>
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
    </div>

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
            v-model="item.menu_name"
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
          <v-btn :disabled="!valid || item.l_article.length <= 1" color="success" class="mr-4" type="submit">
            Create
          </v-btn>
    <Alert :message="this.message"/>
        </div>
      </v-form>
    </div>
  </div>
</template>

<style>
.articles-selecter {
  border: 1px solid grey;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 20px;
  padding: 10px;
}

.food-active {
  box-shadow: 0 0 5px 5px grey !important;
}
</style>

<style>
.info-container {
  margin-left: calc(50% - 150px);
}
</style>

<script>
import axios from "axios";
import { adr, header } from "../../plugins/connection";
import FoodCard from "../../components/Card/FoodCard.vue";
import Alert from "../../components/Alert.vue";

export default {
  components: {
    Alert,
    FoodCard,
  },
  mounted() {
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
        url: adr + "menus/create",
        data: this.item,
        header: header,
        method: "POST",
      })
        .then((resp) => {
          console.log(resp);
          this.message = resp.data.message;
          setTimeout(() => (this.$router.replace({ path: '/menus/see'}).catch(err => {console.log(err)})), 3000);
        })
        .catch((err) => {
          console.log(err);
          this.message = err;
        });
    },
    addArticleToList: function (_id) {
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
};
</script>