<template>
  <v-card class="mx-auto" max-width="250" max-height="300">
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>
    
    <v-card-title>{{ data.username }}</v-card-title>

    <v-card-text>
      <v-row align="center" class="mx-0">
        <div class="grey--text"> <p class="restaurant-info">{{ data.town }}<br>{{ data.street}}<br>{{ data.zip_code }}</p></div>
      </v-row>

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

.restaurant-info {
    text-align:left;
}
</style>

<script>
export default {
  name: "RestaurantCard",
  props: {
    data: {
      _id: {
        type: Array,
      },
      username: {
        type: Array,
      },
      town: {
        type: Array,
      },
      street: {
        type: Array,
      },
      zip_code: {
        type: Array,
      },
    },
  },
};
</script>