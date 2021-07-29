<template>
  <div>
    <h1>Modify</h1>
    <div>
      <v-form v-model="valid" @submit.prevent="modify">
        <div class="info-container">
          <v-text-field
            v-model="u_current.username"
            type="text"
            label="Username"
            required
          ></v-text-field>
          <v-text-field
            v-model="u_current.town"
            type="text"
            label="Town"
            required
          ></v-text-field>
          <v-text-field
            v-model="u_current.street"
            type="text"
            label="Street"
            required
          ></v-text-field>
          <v-text-field
            v-model="u_current.zip_code"
            type="text"
            label="Zip code"
            :rules="zipRules"
            required
          ></v-text-field>
          <v-text-field
            v-model="u_current.password"
            type="password"
            label="Password"
            required
          ></v-text-field>

          <v-dialog width="500">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="error" class="mr-4" v-bind="attrs" v-on="on">
                Delete 
              </v-btn>
            </template>

            <v-card>
              <v-card-title class="text-h5 grey lighten-2">
                Account deletion confirmation
              </v-card-title>

              <v-card-text>
                Are you sure you want to delete your account ?
                <br>
                This action is irreversible.
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="error" class="mr-4" @click="deleting"> Confirm deletion </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          
          <v-btn :disabled="!valid" color="success" class="mr-4" type="submit">
            Validate
          </v-btn>
        </div>
      </v-form>
    </div>
    <Alert :message="this.message"/>
  </div>
</template>

<script>
import axios from "axios";
import { adr, header } from "../../plugins/connection";
import Alert from "../../components/Alert.vue";

export default {
  components:{
    Alert,
  },
  mounted() {
    this.u_current.password = "";
  },
  data() {
    return {
      message: "",
      u_current: JSON.parse(localStorage.getItem("user")),
      valid: false,
      zipRules: [
        (v) =>
          (!isNaN(parseFloat(v)) && v >= 10000 && v <= 99999) ||
          "Zip code must be a number between 10000 and 99999",
      ],
    };
  },
  methods: {
    modify: function() {
      var u_new = {
        id: this.u_current.id,
        username: this.u_current.username,
        password: this.u_current.password,
        town: this.u_current.town,
        street: this.u_current.street,
        zip_code: this.u_current.zip_code,
      };

      console.log("sending request");
      axios({
        url: adr + "account/modify",
        data: u_new,
        header: header,
        method: "POST",
      })
        .then((resp) => {
          console.log(resp);
          localStorage.setItem("user", JSON.stringify(resp.data.user));
          this.message = resp.data.message;
          setTimeout(() => (this.$router.replace({ path: '/account/see'}).catch(err => {console.log(err)})), 3000);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    
    deleting: function () {
      console.log("sending request");
      axios({
        url: adr + "account/delete",
        data: this.user,
        header: header,
        method: "POST",
      })
        .then((resp) => {
          console.log(resp);
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          this.message = resp.data.message;
          setTimeout(() => (this.$router.replace({ path: '/login'}).catch(err => {console.log(err)})), 3000);
        })
        .catch((err) => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          console.log(err);
          this.message = err.message;
        });
    },
  },
};
</script>
