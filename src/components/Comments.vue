<template>
  <div>
    <h1>
      {{post.title}}
      <small>({{post.url}})</small>
    </h1>
    <h6>{{post.descendants}} points | by {{post.by}} {{post.time | getTimeDiffrence }} ago</h6>

    <h4 v-if="post.kids">{{post.kids.length}} comments</h4>
    <br />
    <div v-for="(item, id) in commentsArray" :key="id">
      <div v-if="!item.deleted">
        <hr v-if="id != 0" style="margin-left: 20px" />
        <Replies v-bind:reply="item" />
      </div>
    </div>
    <br />
  </div>
</template>

<script>
import Replies from "./Replies";

export default {
  name: "Comments",
  components: { Replies },

  data() {
    return {
      post: {},
      commentsArray: []
    };
  },

  methods: {
    
    getPostInfo(id) {
      
      this.$http
        .get(
          "https://hacker-news.firebaseio.com/v0/item/" +
            id.toString() +
            ".json"
        )
        .then(res => {
          const promises = [];
          this.post = res.data;
          if (this.post.kids) {
            for (const itemId of this.post.kids) {
              promises.push(
                this.$http.get(
                  "https://hacker-news.firebaseio.com/v0/item/" +
                    itemId.toString() +
                    ".json"
                )
              );
            }
          }

          Promise.all(promises)
            .then(res => {
              res.forEach(item => {
                this.commentsArray.push(item.data);
              });
            })
            .catch(err => {
              console.log(err);
            });
        });
    }
  },

  created() {
    if (this.$route.params.postId) {
      this.getPostInfo(this.$route.params.postId);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
