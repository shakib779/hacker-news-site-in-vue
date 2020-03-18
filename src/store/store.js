import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import VueAxios from 'vue-axios'


Vue.use(Vuex);
Vue.use(VueAxios, axios);

const itemGetter = require('./../mixins/mixin').itemGetter;

export const store = new Vuex.Store({
    state: {
        itemIds: []
    },

    getters: {
        itemIds: (state) => {
            return state.itemIds;
        },

        itemIdLength: (state) => {
            return state.itemIds.length;
        }
    },

    mutations: {
        setItemIds: (state, itemIds) => {
            state.itemIds = itemIds;
        }
    },

    actions: {
        /**
         * get post id list
         */
        getPostList: (context, url) => {
            return new Promise((resolve, reject) => {
                Vue.axios.get(url)
                    .then((res) => {
                        context.commit('setItemIds', res.data);
                        resolve(res.data);
                    })
                    .catch(err => {
                        reject(err);
                    });
            });
        },

        /**
         * get post info for a particular range
         */
        getPostListRange: (context, object) => {
            return new Promise((resolve, reject) => {
                const promises = [];
                for (let i = object.startIndex; i < object.lastIndex; i++) {
                    promises.push(itemGetter.methods.getItemById(context.state.itemIds[i].toString()));
                }

                Promise.all(promises)
                    .then((response) => {
                        resolve(response);
                    })
                    .catch(err => {
                        reject(err);
                    })
            });
        }
    }
})