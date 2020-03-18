<template>
  <div>
    <Pagination v-on:childToParent="onChildClick"/>
    <PostList v-bind:startIndex="startIndex"/>
  </div>
</template>

<script>
import PostList from "./PostList";
import Pagination from "./Pagination";

export default {
  name: "TopStories",

  components: { PostList, Pagination },

  data() {
    return {
      startIndex: 0
    };
  },

  methods: {
    onChildClick (value) {
      this.startIndex = value;
    }
  }

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
