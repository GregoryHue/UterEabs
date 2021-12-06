<template>
  <div>
    <h1>Buy</h1>
    <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1">
          Choose restaurant
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 2" step="2">
          Choose food
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 3" step="3">
          Confirm order
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="4">
          Payment
        </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <v-card class="mb-12" color="grey lighten-1" height="500px"><StepOne @click="e1 = 2" />
          </v-card>

        </v-stepper-content>

        <v-stepper-content step="2">
          <v-card class="mb-12" color="grey lighten-1" height="500px"><StepTwo :id_restaurant=id_restaurant /></v-card>

          <v-btn text @click="e1 = 1; id_restaurant = null">
            Previous
          </v-btn>

          <v-btn color="primary" @click="e1 = 3">
            Continue
          </v-btn>

        </v-stepper-content>

        <v-stepper-content step="3">
          <v-card class="mb-12" color="grey lighten-1" ><StepThree/></v-card>

          <v-btn text @click="e1 = 2; id_articles = null; id_menus = null">
            Previous
          </v-btn>

          <v-btn color="primary" @click="e1 = 4">
            Continue
          </v-btn>

        </v-stepper-content>

        <v-stepper-content step="4">
          <v-card class="mb-12" color="grey lighten-1" ><StepFour/></v-card>

          <v-btn text @click="e1 = 3">
            Previous
          </v-btn>

          <v-btn color="primary" @click="e1 = 1">
            Finish
          </v-btn>
          
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </div>
</template>

<style></style>

<script>

import StepOne from "./Buy/StepOne.vue";
import StepTwo from "./Buy/StepTwo.vue";
import StepThree from "./Buy/StepThree.vue";
import StepFour from "./Buy/StepFour.vue";

  export default {
    methods: {
        setId_Restaurant: function(id) {
        this.id_restaurant = id
        console.log(this.id_restaurant)
      }
    },
  components: {
    StepOne, StepTwo, StepThree, StepFour,
  },
    data () {
      return {
        e1: 1,
        id_restaurant: null,
        id_articles: null,
        id_menus: null,
      }
    },
  }
</script>