import Vue from 'vue';
const url = require('./../static/url').url;

export const itemGetter = {
    methods: {
        /**
         * get any item (post, comment or reply) by id
         */
        getItemById: (id) => {
            return new Promise((resolve, reject) => {
                Vue.axios.get(url.getItemById + id + ".json")
                    .then((response) => {
                        resolve(response.data);
                    })
                    .catch((err) => {
                        reject(err);
                    })
            });
        },
    }
};