import router from "@/router"
import Auth from "@/apis/auth"
const users = {
    state: {
        user: null
    },
    getters: {
        username: state => state.user === null ? "未登录" : state.user.username,
        slug: state => state.user === null ? "未" : state.user.username[0]
    },
    mutations: {
        setUser (state, payload) {
            state.user = payload.user
        }
    },
    actions: {
        login ({ commit }, { username, password }) {
            return Auth.login({ username, password }).then(res => {
                commit("setUser", { user: res.data })
            })
        },
        register ({ commit }, { username, password }) {
            return Auth.register({ username, password }).then(res => {
                commit("setUser", { user: res.data })
            })
        },
        logout ({ commit }) {
            return Auth.logout().then(res => {
                commit("setUser", { user: null })
                router.push({ path: "/login" })
            })
        },
        checkLogin ({ commit, state }, payload) {
            if (state.user !== null) return Promise.resolve()
            return Auth.getInfo().then(res => {
                if (!res.isLogin) {
                    router.push(payload)
                }
                else {
                    commit("setUser", { user: res.data })
                }
            })
        }
    }
}

export default users