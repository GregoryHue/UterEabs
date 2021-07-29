<template>
  <div>
    <h1>Account</h1>
    <div class="account-nav-bar">
      <router-link to="/account/see">See</router-link>
      <router-link to="/account/modify">Modify</router-link>
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