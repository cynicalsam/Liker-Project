import Vuex from 'vuex'
import axios from 'axios'

import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        posts: []
    },

    getters: {
        posts (state) {
            return state.posts
        }
    },

    mutations: {
        SET_POSTS (state, posts) {
            state.posts = posts
        },

        UPDATE_POSTS (state, post) {
            state.posts = state.posts.map((p) => {
                if (p.id === post.id) {
                    return post
                }

                return p
            })
        },

        PREPEND_POST(state, post) {
            let posts = state.posts.slice()
            posts.unshift(post)

            state.posts = posts
        },
    },

    actions: {
        async getPosts ({ commit }) {
            let posts = await axios.get('api/posts')

            commit('SET_POSTS', posts.data.data)
        },

        async getPost ({ commit }, id) {
            let post = await axios.get(`api/posts/${id}`)

            commit('PREPEND_POST', post.data.data)
        },

        async refreshPost ({ commit }, id) {
            let post = await axios.get(`api/posts/${id}`)

            commit('UPDATE_POSTS', post.data.data)
        },

        async createPost ({ commit }, data) {
            let post = await axios.post('api/posts', data)

            commit('PREPEND_POST', post.data.data)
        },

        async likePost ({ commit }, id) {
            let post = await axios.post(`api/posts/${id}/likes`)

            commit('UPDATE_POSTS', post.data.data)
        }
    }


})
