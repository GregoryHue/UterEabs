<template>
  <v-text-field  :value="value" :label="label"></v-text-field>
</template>

<style>


</style>


<script>
export default {
  name: "FoodCard",
  props: {
    value: {
      type: String,
    },
    label: {
      type: String,
    },
  },
};
</script>