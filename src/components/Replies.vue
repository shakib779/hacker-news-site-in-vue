<template>
  <div>
    <div v-for="(item, id) in replies" :key="id">
      <div v-if="!item.deleted">
        <br />
        <div style="overflow:hidden; white-space:nowrap">
          [-]
          <hr style="display:inline-block; width:100%; vertical-align: middle" />
        </div>
        <div class="margin-for-reply">
          {{item.by}} {{item.time | getTimeDiffrence }} ago
          <br />
          <span v-html="item.text"></span>
          <Replies v-bind:replyIds="item.kids" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

const itemGetter = require('./../mixins/mixin').itemGetter;

export default {
  name: "Replies",
  mixins: [itemGetter],

  props: {
    replyIds: Array
  },

  data() {
    return {
      replies: []
    };
  },
  
  methods: {
    getReplies() {
      const promises = [];
      if (this.replyIds) {
        for (const itemId of this.replyIds) {
          promises.push(this.getItemById(itemId));
        }
      }

      Promise.all(promises)
        .then(res => {
          res.forEach(item => {
            this.replies.push(item);
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

.margin-for-reply {
  margin-left: 20px;
}

</style>