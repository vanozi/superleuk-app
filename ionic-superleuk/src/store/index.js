import { createStore } from "vuex";
import auth from './modules/auth'
import workingHours from './modules/workingHours'

export default createStore({
  modules: {
    auth, workingHours
  },
})