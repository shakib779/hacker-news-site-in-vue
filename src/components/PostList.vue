<template>
  <div>
    <div v-for="(item, idx) in posts" :key="idx">
      <hr />
      <h5>
        <span style="color: #FF0000">{{item.descendants}} </span>
        <span v-html="item.title"></span>
        <small>({{item.url}})</small>
      </h5>
      <h5>
        by {{item.by}} {{item.time | getTimeDiffrence }} ago |
        <a
          href="#"
          v-on:click="gotoComments(item.id); $event.preventDefault();"
        >{{item.kids? item.kids.length : 0}} comments</a>
      </h5>
    </div>
  </div>
</template>

<script>

export default {
  name: "PostList",
  props: {
    startIndex: Number  
  },

  data() {
    return {
      posts: []
    };
  },

  watch: {
    startIndex: function () {
      this.fetchPostList();
    }
  },
  
  methods: {
    gotoComments(id) {
      this.$router.push("comments/" + id.toString());
    },

    fetchPostList() {
      this.$store
        .dispatch("getPostListRange", {
          startIndex: this.startIndex,
          lastIndex: this.startIndex + 5
        })
        .then(res => {
          this.posts = res;
        })
        .catch(err => {
          console.log(err);
        });
    },
  },

  created() {
    this.fetchPostList();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
