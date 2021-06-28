<template>
  <v-carousel class="resto-carousel">
  <h1>Home</h1>
    <v-carousel-item
      v-for="(item,i) in items"
      :key="i"
      :src="item.src"
      reverse-transition="fade-transition"
      transition="fade-transition"
    ></v-carousel-item>
  </v-carousel>
</template>

<style>

.resto-carousel {
  width: 50%;
  text-align: center;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

</style>

<script>
  export default {
    data () {
      return {
        items: [
          {
            src: 'https://assets.afcdn.com/recipe/20160401/38946_w350h250c1cx2690cy1793.webp',
          },
          {
            src: 'https://assets.afcdn.com/recipe/20190529/93189_w350h250c1cx2886cy4330.webp',
          },
          {
            src: 'https://assets.afcdn.com/recipe/20200408/109520_w350h250c1cx1866cy2800.webp',
          },
          {
            src: 'https://assets.afcdn.com/recipe/20201017/114829_w350h250c1cx1512cy2016.webp',
          },
        ],
      }
    },
  }
</script>