<template>
  <v-text-field  :value="value" :label="label" outlined readonly></v-text-field>
</template>

<style>


</style>


<script>
export default {
  name: "FoodCard",
  props: {
    value: {
      type: [String, Number]
    },
    label: {
      type: String,
    },
  },
};
</script>