<template>
  <div>
    <h1>See</h1>
    <div class="articles-displayer">
    <div v-for="product in products" :key="product.id">
      <FoodCards v-bind:data="product" />
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
    grid-template-columns: repeat( auto-fit, minmax(250px, 1fr) ); ;
    grid-gap: 20px;
}
</style>

<script>
import FoodCards from "../../components/FoodCard.vue";

export default {
  components: {
    FoodCards,
  },

  data() {
    return {
      products: '',
    };
  },
};
</script>
