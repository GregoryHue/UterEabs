<template>
  <v-snackbar v-model="show" timeout="2000">
    {{ message }}
  </v-snackbar>
</template>

<style>
.footer-alert-popup {
  text-align: center;
  position: fixed;
  bottom: 20px;
  left: 20px;
  min-width: 200px;
  z-index: 98;
}
</style>

<script>
export default {
  name: "Alert",
  props: {
    message: { Type: String },
  },
  watch: {
    message: function() {
        this.show = true;
    },
  },
  data() {
    return {
      show: false,
    };
  },
};
</script>
