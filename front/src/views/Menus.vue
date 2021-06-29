<template>
  <div>
    <h1>Menus</h1>
    <div class="account-nav-bar">
      <router-link to="/menus/create">Create</router-link>
      <router-link to="/menus/see">See</router-link>
      <router-link to="/menus/delete">Delete</router-link>
    </div>
    <router-view />
  </div>
</template>

<style>

.account-nav-bar a{
  font-weight: bold;
  color: black !important;
  margin: 0 5px 0 5px;
}

</style>