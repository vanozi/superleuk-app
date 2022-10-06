import api from '../../api'

export default {
    namespaced: true,
    state: {
        accessToken: null,
        loggedInUser: null,
        deviceId:null
    },
    getters: {
        accessToken: state => state.accessToken,
        loggedInUser: state => state.loggedInUser,
        loggedIndeviceId: state => state.deviceId
    },
    actions: {
        // Login
        async performLogin({ commit }, logindata) {
            try {
                const form = new FormData();
                form.append("username", logindata.email);
                form.append("password", logindata.password);
                form.append("device_id", logindata.deviceId)
                let response = await api.post('/ionic/login', form)
                commit("SET_ACCESS_TOKEN", response.data["access_token"])
                return response
            } catch (err) {
                return err.response
            }
        },
        // Logout
        // Get user information
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
            state.loggedInUser = user;
        },
        SET_LOGGED_IN_DEVICE_ID(state, deviceId) {
            state.deviceId = deviceId;
        },
        DELETE_ACCESS_TOKEN(state) {
            state.accessToken = null;
        },
        DELETE_LOGGED_IN_USER(state) {
            state.loggedInUser = null;
        },
        DELETE_LOGGED_IN_DEVICE_ID(state) {
            state.loggedIndeviceId = null;
        },
    }
}
