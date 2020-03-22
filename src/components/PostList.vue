<template>
  <div>
    <div v-for="(item, idx) in posts" :key="idx">
      <hr />
      <h5>
        <span style="color: #FF0000">{{item.descendants}}</span>
        {{item.title}}
        <small>({{item.url}})</small>
      </h5>
      <h5>
        by {{item.by}} {{item.time | getTimeDiffrence }} ago |
        <a
          href="#"
          @click.prevent="gotoComments(item.id)"
        >{{item.kids? item.kids.length : 0}} comments</a>
      </h5>
    </div>
    <div style="text-align: center">{{currentPage}}/{{itemIdLength}}</div>
    <div v-if="startIndex !== 0" style="text-align: center">
      <a href="#" v-on:click="gotoPreviousPage(); $event.preventDefault();">Previous</a>
    </div>
    <div style="text-align: center">
      <a href="#" v-on:click="gotoNextPage(); $event.preventDefault();">Next</a>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "PostList",

  data() {
    return {};
  },
  
  methods: {
   
    fetchPostListFromNextPage() {
      this.$store.commit("setPostListEmpty");
      this.$store.dispatch("getPostListRange", {
        startIndex: this.startIndex,
        lastIndex: this.startIndex + 5
      });
    },

    fetchPostListFromPreviousPage() {
      this.$store.commit("setPostListEmpty");
      this.$store.dispatch("getPostListRange", {
        startIndex: this.startIndex,
        lastIndex: this.startIndex + 5
      });
    },

    gotoComments(id) {
      this.$router.push("comments/" + id.toString());
    },

    gotoPreviousPage() {
      this.$store.commit("updateCurrentPage", -1);
      this.$store.commit("updateStartIndex", -5);
      this.fetchPostListFromPreviousPage();
    },

    gotoNextPage() {
      this.$store.commit("updateStartIndex", 5);
      this.$store.commit("updateCurrentPage", 1);
      this.fetchPostListFromNextPage();
    }
  },

  computed: {
    ...mapGetters([
      "posts",
      "itemIds",
      "itemIdLength",
      "startIndex",
      "currentPage"
    ])
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
