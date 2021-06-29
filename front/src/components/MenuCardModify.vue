<template>
  <v-card class="mx-auto" max-width="250" max-height="300">
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <a :href="redirect">
      <v-img height="150" :src="data.img"></v-img>
    </a>

    <v-card-title>{{ data.menu_name }}</v-card-title>

    <v-card-text>
      <v-row align="center" class="mx-0">
        <div class="grey--text">{{ data.price }} €</div>
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
</style>

<script>
export default {
  name: "MenuCardModify",
  data() {
    return {
      redirect: "modify/" + this.data._id,
    };
  },
  props: {
    data: {
      _id: {
        type: Array,
      },
      menu_name: {
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
};
</script>