<template>
  <div id="app">
    <Navbar style="text-align: center"/>
    <router-view class="post-list"/>
  </div>
</template>

<script>

import Navbar from "./components/Navbar";

export default {
  name: 'App',

  components: {Navbar},

  data() {
    return {
    }
  }
}
</script>

<style>

.center-aligned {
  text-align: center
}

.post-list {
  width: 60%;
  margin: auto;
}

</style>
