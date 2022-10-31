import api from '../../api'

export default {
    namespaced: true,
    state: {
        workingHoursCurrentWeek : null
    },
    getters: {
        workingHoursCurrentWeek (state) {
            return state.workingHoursCurrentWeek
          }
    },
    actions: {
        // working hours between dates
        async getWorkingHoursBetweenDates( {commit}, weekData ) {
            console.log(weekData)
            let response = await api.get('/working_hours/between_dates/', { params: { from_date: weekData.weekStart, to_date: weekData.weekEnd } })
            commit("SET_WORKING_HOURS_CURRENT_WEEK", response.data)
        }
    },
    mutations: {
        SET_WORKING_HOURS_CURRENT_WEEK(state, payload) {
            state.workingHoursCurrentWeek = payload;
        },
    }
}
