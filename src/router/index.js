import Vue from 'vue'
import VueRouter from 'vue-router'

import Comments from './../components/Comments'
import NewStories from './../components/NewStories'
import TopStories from './../components/TopStories'

const url = require("./../static/url").url;

Vue.use(VueRouter)

import { store } from '../store/store'

export const router = new VueRouter({

  routes: [
    {
      path: '/',
      redirect: '/top'
    },
    {
      path: '/top',
      name: 'TopStories',
      component: TopStories,
      beforeEnter(to, from, next) {
        store.dispatch("getPostList", url.getTopStoryListUrl)
          .then(() => {
            next();
          })
          .catch(err => {
            console.log(err);
          })
      }
    },
    {
      path: '/new',
      name: 'NewStories',
      component: NewStories,
      beforeEnter(to, from, next) {
        store.dispatch("getPostList", url.getNewStoryListUrl)
          .then(() => {
            next();
          })
          .catch(err => {
            console.log(err);
          })
      }
    },
    {
      path: '/comments/:postId',
      name: 'Comments',
      component: Comments
    }
  ]
});
