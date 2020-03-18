<template>
  <div>
    <!-- Post information -->
    <h1>
      {{post.title}}
      <span v-html="post.title"></span>
      <small>({{post.url}})</small>
    </h1>
    <h5>{{post.descendants}} points | by {{post.by}} {{post.time | getTimeDiffrence }} ago</h5>

    <!-- Comment section  -->
    <h4 v-if="post.kids">{{post.kids.length}} comments</h4>
    <div v-if="post.kids">
      <Replies v-bind:replyIds="post.kids"/>
    </div>
    <br />
  </div>
</template>

<script>
import Replies from "./Replies";
const itemGetter = require('./../mixins/mixin').itemGetter;

export default {
  name: "Comments",
  components: { Replies },
  mixins: [itemGetter],
  data() {
    return {
      post: {}
    };
  },

  methods: {
    
    /**
     * Params: post id from url
     * Fetch the post info by the id
     */
    getPostInfo(id) {
      this.getItemById(id)
        .then(res => {
          this.post = res;
        })
        .catch(err => {
          console.log(err);
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
