<template>
  <div :style="indent">
    {{reply.by}} {{reply.time | getTimeDiffrence }} ago
    <br />
    {{reply.text}}
    <div v-if="reply.kids && reply.kids.length> 0" style="overflow:hidden; white-space:nowrap">
      [-]
      <hr style="display:inline-block; width:100%; vertical-align: middle" />
    </div>
    <!-- <div v-if="!reply.kids"><hr style='display:inline-block; width:100%; vertical-align: middle' /></div> -->
    <div v-for="(item, id) in replies" :key="id">
      <div v-if="!item.deleted">
        <hr v-if="id != 0" style="margin-left: 20px" />
        <Replies v-bind:reply="item" />
      </div>
    </div>
  </div>
</template>

<script>
const url = require('./../static/url').url;

export default {
  name: "Replies",

  props: {
    reply: Object
  },

  data() {
    return {
      replies: []
    };
  },

  computed: {
    indent() {
      return { transform: `translate(${20}px)` };
    }
  },

  methods: {
    getReplies() {
      const promises = [];
      if (this.reply.kids) {
        for (const itemId of this.reply.kids) {
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
            this.replies.push(item.data);
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  },

  created() {
    this.getReplies();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>