<template>
  <div>
    <h1>See</h1>

    <v-switch
      v-model="showDeleteButtons"
      label="Show delete buttons"
    ></v-switch>
    <div class="articles-displayer">
      <div v-for="product in products" :key="product.id">
        <FoodCardDelete v-bind:data="product" :isButtonToShow="showDeleteButtons"/>
      </div>
    </div>
  </div>
</template>

<style>
.articles-img {
  width: 100px;
  height: 100px;
  object-fit: cover;
}

.articles-displayer {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 20px;
}
</style>

<script>
import axios from "axios";
import { adr, header } from "../../plugins/connection";
import FoodCardDelete from "../../components/Card/FoodCardDelete.vue";

export default {
  components: {
    FoodCardDelete,
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

  data() {
    return {
      showDeleteButtons: false,
      user: JSON.parse(localStorage.getItem("user")),
      products: "",
    };
  },
};
</script>
