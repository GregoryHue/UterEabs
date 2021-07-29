<template>
  <div>
    <h1 id="title-page">Articles</h1>
    <div class="account-nav-bar">
      <router-link to="/articles/create">Create</router-link>
      <router-link to="/articles/see">See</router-link>
    </div>
    <router-view />
  </div>
</template>

<style>


div.account-nav-bar a{
  font-weight: bold;
  color: white !important;
  margin: 0 5px 0 5px;
}

div.account-nav-bar {
  margin-left: calc(50% - 150px);
  width: 300px;
  background:rgb(25, 118, 210);
  padding: 5px 0 5px 0;
  box-shadow: 0 0 5px 1px grey;
}

</style>