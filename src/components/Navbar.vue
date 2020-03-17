<template>
  <div>
    <nav>
      <button v-on:click="fetchTopStories()">Top</button>
      <button v-on:click="fetchNewStories()">New</button>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Navbar",

  data() {
    return {};
  },
  
  methods: {
    
    fetchTopStories() {
      this.$store.commit("resetStartIndex");
      this.$store.commit("resetCurrentPageForPostList");
      if (this.$router.currentRoute.name !== "Hello") {
        this.$router.push("/");
      }
      this.fetchPostList(
        "https://hacker-news.firebaseio.com/v0/topstories.json"
      );
    },

    fetchNewStories() {
      this.$store.commit("resetStartIndex");
      this.$store.commit("resetCurrentPageForPostList");
      if (this.$router.currentRoute.name !== "Hello") {
        this.$router.push("/");
      }
      this.fetchPostList(
        "https://hacker-news.firebaseio.com/v0/newstories.json"
      );
    },

    fetchPostList(url) {
      this.$store.dispatch("getPostList", {
        startIndex: this.startIndex,
        url: url
      });
    }
  },

  created() {
    this.fetchTopStories();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
