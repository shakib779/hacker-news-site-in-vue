import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import VueAxios from 'vue-axios'


Vue.use(Vuex);
Vue.use(VueAxios, axios);

export const store = new Vuex.Store({
    state: {
        startIndex: 0,
        currentPage: 1,
        posts: [],
        itemIds: [],
        postById: {},
    },

    getters: {
        startIndex: (state) => {
            return state.startIndex;
        },

        currentPage: (state) => {
            return state.currentPage;
        },

        posts: (state) => {
            return state.posts;
        },
        itemIds: (state) => {
            return state.itemIds;
        },
        itemIdLength: (state) => {
            return Math.ceil(state.itemIds.length / 5.0);
        }
    },

    mutations: {
        updateStartIndex: (state, increment) => {
            state.startIndex += increment;
            if (state.startIndex < 0)
                state.startIndex = 0;
            else if (state.startIndex + 5 > state.itemIdLength)
                state.startIndex = state.itemIdLength - 5;
        },

        updateCurrentPage: (state, increment) => {
            state.currentPage += increment;
            if (state.currentPage < 1)
                state.currentPage = 1;
            else if (state.currentPage > Math.ceil(state.itemIdLength / 5))
                state.currentPage = Math.ceil(state.itemIdLength / 5);
        },

        resetStartIndex: (state) => {
            state.startIndex = 0;
        },

        resetCurrentPageForPostList: (state) => {
            state.currentPage = 1;
        },

        getPostList: (state, post) => {
            state.posts.push(post);
        },

        setPostListEmpty: (state) => {
            state.posts = [];
        },

        setItemIds: (state, itemIds) => {
            state.itemIds = itemIds;
        }
    },

    actions: {
        getPostList: (context, object) => {
            Vue.axios.get(object.url)
                .then((res) => {
                    context.commit('setItemIds', res.data)
                    context.commit('setPostListEmpty')
                    context.dispatch('getPostListRange');
                })
                .catch(err => {
                    console.log(err);
                });
        },

        getPostListRange: (context) => {
            for (let i = context.state.startIndex; i < context.state.startIndex + 5; i++) {
                Vue.axios
                    .get("https://hacker-news.firebaseio.com/v0/item/" + context.state.itemIds[i].toString() + ".json")
                    .then(response => {
                        context.commit('getPostList', response.data);
                    });
            }
        }
    }
})