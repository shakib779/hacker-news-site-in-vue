<template>
  <div>
    <nav>
      <router-link style="margin-left: 10px" to="/top">Top</router-link>
      <router-link style="margin-left: 10px" to="/new">New</router-link>
    </nav>
  </div>
</template>

<script>

export default {
  name: "Navbar",

  data() {
    return {
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
nav {
  background: #fd6601;
  padding: 20px 30px;
  margin-bottom: 20px;
  font-size: 18px;
}

</style>
