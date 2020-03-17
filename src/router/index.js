import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from './../components/PostList'
import Comments from './../components/Comments'

Vue.use(VueRouter)

export const router = new VueRouter({
    routes: [
        {
            path: '/',
            name: 'Hello',
            component: Home
        },
        {
            path: '/comments/:postId',
            name: 'Comments',
            component: Comments
        }
    ]
});
