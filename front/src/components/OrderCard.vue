<template>
  <v-card
    elevation="3"
    height="75"
    width="50%"
    :to="'modify/' + data._id"
    :color="statusConvertToColor(data.status)"
  >
    <v-card-title>ID : {{ smallId }}</v-card-title>
    <v-card-subtitle class="v-card-subtitle"
      > <b>Client</b> : {{ users.client }} | <b>Delivery</b> : {{ users.delivery }} | <b>Status</b> :
      {{ statusConvertToString(data.status) }} | <b>Creation date</b> : {{ data.created_at }}
    </v-card-subtitle>
  </v-card>
</template>

<style>
.v-card-subtitle {
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>

<script>
import axios from "axios";
import { statusConvertToString, statusConvertToColor } from "../plugins/status";
import { adr, header } from "../plugins/env";

export default {
  methods: {
      statusConvertToString,
      statusConvertToColor,
  },
  name: "FoodCardModify",

  mounted() {
    axios({
      url: adr + "orders/get/users",
      data: {
        client_id: this.data.client_id,
        owner_id: this.data.owner_id,
        delivery_id: this.data.delivery_id,
      },
      header: header,
      method: "POST",
    })
      .then((resp) => {
        console.log(resp);
        this.users.client = resp.data.user[0].username;
        this.users.owner = resp.data.user[1].username;
        this.users.delivery = resp.data.user[2].username;
      })
      .catch((err) => {
        console.log(err);
      });

  },

  data() {
    return {
      isActive: false,
      smallId: this.data._id.substr(this.data._id.length - 5),
      redirect: "modify/" + this.data._id,
      users: {
        client: "",
        owner: "",
        delivery: "",
      },
    };
  },

  props: {
    data: {
      _id: {
        type: Array,
      },
      client_id: {
        type: Array,
      },
      delivery_id: {
        type: Array,
      },
      status: {
        type: Array,
      },
      created_at: {
        type: Array,
      },
    },
  },
};
</script>