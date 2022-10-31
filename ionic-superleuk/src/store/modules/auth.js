import api from '../../api'

export default {
    namespaced: true,
    state: {
        user: null,
        accessToken: null,
        deviceId: null,
    },
    getters: {
    },
    actions: {
        // Login
        async performLogin({ commit }, logindata) {
            try {
                const form = new FormData();
                form.append("username", logindata.email);
                form.append("password", logindata.password);
                form.append("device_id", logindata.deviceId)
                let response = await api.post('/ionic/login', form, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                commit("SET_ACCESS_TOKEN", response.data["access_token"])
                commit("SET_LOGGED_IN_DEVICE_ID", logindata.deviceId)
                return response
            } catch (err) {
                return err.response
            }
        },
        // Logout

        // Get user information
        async logOut({ commit, state }, token) {
            try {
                let headers = { Authorization: "Bearer " + token , 'content-type': 'application/json' }
                let response = await api.post('/ionic/logout', { device_id : state.deviceId} , { headers: headers }, )
                commit("DELETE_ACCESS_TOKEN")
                commit("DELETE_LOGGED_IN_USER")
                commit("DELETE_LOGGED_IN_DEVICE_ID")
                return response
            } catch (err) {
                return err.response
            }
        },
        async getUserInfo({ commit }, token) {
            try {
                let headers = { Authorization: "Bearer " + token }
                let response = await api.get('/users/me', { headers: headers })
                commit("SET_LOGGED_IN_USER", response.data)
                return response
            } catch (err) {
                return err.response
            }
        }
    },
    mutations: {
        SET_ACCESS_TOKEN(state, token) {
            state.accessToken = token;
        },
        SET_LOGGED_IN_USER(state, user) {
            state.user = user;
        },
        SET_LOGGED_IN_DEVICE_ID(state, deviceId) {
            state.deviceId = deviceId;
        },
        DELETE_ACCESS_TOKEN(state) {
            state.accessToken = null;
        },
        DELETE_LOGGED_IN_USER(state) {
            state.user = null;
        },
        DELETE_LOGGED_IN_DEVICE_ID(state) {
            state.deviceId = null;
        },
    }
}
