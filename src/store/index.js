import Vue from 'vue';
import Vuex from 'vuex';
import {
    getToken,
    setToken,
    removeToken
} from '../utils/auth';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        token: getToken()
    },
    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token;
        }
    }
})

export default store