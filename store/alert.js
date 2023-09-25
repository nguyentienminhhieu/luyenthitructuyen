export const SUCCESS = "success";
export const ERROR = "error";
export const CLEAR = "clear";

const state = ()=> ({
    type: null,
    message: null
});

const getters = {
    type(state) {
      return state.type;
    },
    message(state) {
      return state.message;
    }
}

const actions = {
    async [SUCCESS]({ commit }, payload) {
        commit('clear');
        commit('success', payload);
        // setTimeout(() => {
        //     commit('success', "");;
        // }, 3000);
    },
    async [ERROR]({ commit }, message) {
        commit('clear');
        commit('error', message);
        // setTimeout(() => {
        //     commit('error', "");;
        // }, 3000);
    },
    async [CLEAR]({ commit }) {
        commit('clear');
    }
};

const mutations = {
    success(state, payload) {
        state.type = payload.type;
        state.message = payload.message;
        // setTimeout((state) => {
        //     state.message = "";
        // }, 3000);
    },
    error(state, message) {
        state.type = 'error';
        state.message = message;
    },
    clear(state) {
        state.type = null;
        state.message = null;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
