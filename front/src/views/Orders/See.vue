<template>
  <div>
    <h1>Orders</h1>
    
      <div v-for="product in products" :key="product.id" class="order-selecter">
        <OrderCard v-bind:data="product" />
    </div>
  </div>
</template>

<style>
.order-selecter {
  margin-top: 5px;
}
</style>

<script>
import axios from "axios";
import { adr, header } from "../../plugins/env";
import OrderCard from "../../components/OrderCard.vue";

export default {
  components: {
    OrderCard,
  },
  mounted() {
    axios({
      url: adr + "orders/get/current",
      data: {
        owner_id: this.user.id,
        status: 9,
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
      user: JSON.parse(localStorage.getItem("user")),
      products: "",
    };
  },
};
</script>