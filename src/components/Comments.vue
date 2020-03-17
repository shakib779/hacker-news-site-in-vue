<template>
  <div>
    <!-- Post information -->
    <h1>
      {{post.title}}
      <small>({{post.url}})</small>
    </h1>
    <h6>{{post.descendants}} points | by {{post.by}} {{post.time | getTimeDiffrence }} ago</h6>

    <!-- Comment section  -->
    <h4 v-if="post.kids">{{post.kids.length}} comments</h4>
    <br />
    <div v-for="(item, id) in commentsArray" :key="id">
      <div v-if="!item.deleted">
        <hr v-if="id != 0" style="margin-left: 20px" />
        <!-- Reply section -->
        <Replies v-bind:reply="item" />
      </div>
    </div>
    <br />
  </div>
</template>

<script>
import Replies from "./Replies";
const url = require('./../static/url').url;

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
    
    /**
     * Params: post id from url
     * Fetch the post info by the id
     */
    getPostInfo(id) {
      
      this.$http
        .get(
          url.getItemById +
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
                  url.getItemById +
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

  /**
   * Initial function of the component 
   */
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
