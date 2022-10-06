import { createStore } from "vuex";
import memories from './modules/memories'
import auth from './modules/auth'

export default createStore({
  modules: {
    memories,
    auth
  },
})