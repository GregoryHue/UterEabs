<template>
  <div>
    <h1>Choose the restaurant</h1>
    <div class="restaurant-displayer">
      <div v-for="restaurant in restaurant" :key="restaurant.id">
        <a  @click="setId_Restaurant(restaurant.id)"><RestaurantCard v-bind:data="restaurant"/></a>
      </div>
    </div>
  </div>
</template>

<style>
.restaurant-displayer {
  margin: 1% ;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  grid-gap: 50px;
}

</style>

<script>
import axios from "axios";
import { adr, header } from "../../plugins/connection";
import RestaurantCard from "../../components/Card/RestaurantCard.vue";

export default {
  components: {
    RestaurantCard,
  },
  methods: {
        setId_Restaurant: function(id) {
        console.log(id)
        
        this.$emit('click', id);
      }
    },
  mounted() {
    axios({
      url: adr + "buy/restaurant",
      data: {
        owner_id: this.user.id,
      },
      header: header,
      method: "POST",
    })
      .then((resp) => {
        console.log(resp);
        this.restaurant = resp.data.message;
      })
      .catch((err) => {
        console.log(err);
      });
  },

  data() {
    return {
      user: JSON.parse(localStorage.getItem("user")),
      restaurant: "",
    };
  },
};
</script>
