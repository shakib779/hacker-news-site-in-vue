<template>
  <div>
    <nav>
      <button v-on:click="fetchTopStories()">Top</button>
      <button v-on:click="fetchNewStories()">New</button>
    </nav>
  </div>
</template>

<script>

const url = require('./../static/url').url;

export default {
  name: "Navbar",

  data() {
    return {};
  },
  
  methods: {
    
    /**
     * Fetch top stroies on 'Top' button click
     */
    fetchTopStories() {
      this.$store.commit("resetStartIndex");
      this.$store.commit("resetCurrentPageForPostList");
      if (this.$router.currentRoute.name !== "Hello") {
        this.$router.push("/");
      }
      this.fetchPostList(
        url.getTopStoryListUrl
      );
    },

    /**
     * Fetch new stroies on 'New' button click
     */
    fetchNewStories() {
      this.$store.commit("resetStartIndex");
      this.$store.commit("resetCurrentPageForPostList");
      if (this.$router.currentRoute.name !== "Hello") {
        this.$router.push("/");
      }
      this.fetchPostList(
        url.getNewStoryListUrl
      );
    },

    /**
     * Fetch the all post ids from API call
     */
    fetchPostList(url) {
      this.$store.dispatch("getPostList", {
        startIndex: this.startIndex,
        url: url
      });
    }
  },

  /**
   * Initial function of the component 
   */
  created() {
    this.fetchTopStories();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
