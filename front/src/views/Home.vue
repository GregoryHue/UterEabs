<template>
  <div>
    <h1>Home</h1>
    <v-carousel class="resto-carousel">
      <v-carousel-item
        v-for="(item, i) in items"
        :key="i"
        :src="item.src"
        reverse-transition="fade-transition"
        transition="fade-transition"
      ></v-carousel-item>
    </v-carousel>
  </div>
</template>

<style>
.resto-carousel {
  width: 33% !important;
  text-align: center;
  display: block;
  margin-top: 1%;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 0 0 5px 5px grey;
}
</style>

<script>
export default {
  data() {
    return {
      items: [
        {
          src: "https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/40530DEC-4342-4A0B-876E-A0C42AB115B9/Derivates/9F9DD632-76CC-43A6-A523-A68128626EAE.jpg",
        },
        {
          src: "https://valentinascorner.com/wp-content/uploads/2015/05/Simple-Russian-Soup-1.jpg",
        },
        {
          src: "https://www.jessicagavin.com/wp-content/uploads/2017/07/meat-lasagna-1200.jpg",
        },
        {
          src: "https://twisper.com/wp-content/uploads/2020/03/close-up-photo-of-burger-3915906-scaled.jpg",
        },
      ],
    };
  },
};
</script>