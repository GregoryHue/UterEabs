<template>
  <div>
    <h1>Modify</h1>
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

    <br />
    <div class="info-container">
      <InfoDisplayer :label="String('Id')" :value="smallId" />
      <InfoDisplayer :label="String('Client')" :value="users.client" />
      <InfoDisplayer :label="String('Restaurant')" :value="users.owner" />
      <InfoDisplayer :label="String('Delivery')" :value="users.delivery" />
      <InfoDisplayer
        :label="String('Description')"
        :value="order.description"
      />
      <InfoDisplayer
        :label="String('Creation date')"
        :value="order.created_at"
      />
      <InfoDisplayer
        :label="String('Status')"
        :value="statusConvertToString(order.status)"
      />
    </div>
    <div v-if="order.status == 0">
      <v-btn color="success" class="mr-4" v-on:click="nextStatus(1)">
        Confirm order
      </v-btn>
    </div>
    <div v-if="order.status == 1">
      <v-btn color="success" class="mr-4" v-on:click="nextStatus(2)">
        Order ready to pick up
      </v-btn>
    </div>
    <h1>{{ message }}</h1>
  </div>
</template>

<style>
.info-container {
  margin-left: calc(50% - 150px);
}

.articles-selecter {
  border: 1px solid grey;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 20px;
  padding: 10px;
}
</style>

<script>
import axios from "axios";
import { adr, header } from "../../plugins/connection";
import { statusConvertToString } from "../../plugins/status";
import InfoDisplayer from "../../components/InfoDisplayer.vue";
import MenuCard from "../../components/MenuCard.vue";
import FoodCard from "../../components/FoodCard.vue";

export default {
  components: {
    InfoDisplayer,
    MenuCard,
    FoodCard,
  },
  methods: {
    statusConvertToString,
    nextStatus: function (next_status) {
      axios({
        url: adr + "orders/next/status",
        data: {
          _id: this.$route.params.id,
          status: next_status,
        },
        header: header,
        method: "POST",
      })
        .then((resp) => {
          console.log(resp);
          this.message = resp.data.message;
          setInterval(() => (window.location.href = "/orders/see"), 1000);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    axios({
      url: adr + "orders/get/actors",
      data: {
        _id: this.$route.params.id,
      },
      header: header,
      method: "POST",
    })
      .then((resp) => {
        console.log(resp);
        this.users.client = resp.data.user[0].username;
        this.users.owner = resp.data.user[1].username;
        this.users.delivery = resp.data.user[2].username;
        this.order = resp.data.order;
        axios({
          url: adr + "orders/get/food",
          data: {
            l_article: this.order.l_article,
            l_menu: this.order.l_menu,
          },
          header: header,
          method: "POST",
        })
          .then((resp) => {
            console.log(resp);
            this.article_products = resp.data.articles;
            this.menu_products = resp.data.menus;
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  },
  data() {
    return {
      menu_products: "",
      article_products: "",
      message: "",
      smallId: this.$route.params.id.substr(this.$route.params.id.length - 5),
      users: {
        client: "",
        owner: "",
        delivery: "",
      },
      order: {
        created_at: "",
        description: "",
        l_article: [],
        l_menu: [],
        status: "",
        _id: "",
      },
    };
  },
};
</script>
