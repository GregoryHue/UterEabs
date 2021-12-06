<template>
  <div>
    <h1>Choose the food</h1>
    <h3>Article</h3>
    <div v-if="article_products.length != 0" class="articles-selecter">
      <div
        v-for="article_product in article_products"
        :key="article_product.id"
        :id="article_product._id"
      >
        <FoodCard v-bind:data="article_product" />
      </div>
    </div>
    <div v-else>No articles</div>
    <h3>Menu</h3>
    <div v-if="menu_products.length != 0" class="articles-selecter">
      <div v-for="menu_product in menu_products" :key="menu_product.id">
        <MenuCard v-bind:data="menu_product" />
      </div>
    </div>
    <div v-else>No menus</div>
  </div>
</template>



<script>
import axios from "axios";
import { adr, header } from "../../plugins/connection";
import FoodCard from "../../components/Card/FoodCard.vue";
import MenuCard from "../../components/Card/MenuCard.vue";

export default {
  components: {
    FoodCard,
    MenuCard,
  },
  props: {
    id_restaurant: {
      type: Array,
    },
  },
  mounted() {
    axios({
      url: adr + "buy/food",
      data: {
        owner_id: this.id_restaurant,
      },
      header: header,
      method: "POST",
    })
      .then((resp) => {
        console.log(resp);
        this.article_products = resp.data.article_products;
        this.menu_products = resp.data.menu_products;
      })
      .catch((err) => {
        console.log(err);
      });
  },

  data() {
    return {
      user: JSON.parse(localStorage.getItem("user")),
      restaurant: "",
      article_products: [],
      menu_products: [],
    };
  },
};
</script>
