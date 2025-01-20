import { defineStore } from 'pinia'
import type { CallbackNOParam, CallbackOneParam } from '~/types/generic'
import { WorkingHoursService, type WeekTotals, type WorkingHoursRequest, type WorkingHoursResponse, type WorkingHoursWeekOverviewResponse } from '~/utils/client'


export const useWorkingHoursStore = defineStore('working-hours-store', {
  state: () => ({
    allWorkingHoursLoggedInUser : [] as WorkingHoursResponse[],
    workingHoursLoggedInUserBetweenDates : [] as WorkingHoursResponse[],
    weekOverview : [] as WorkingHoursWeekOverviewResponse[],
    monthOverview : [] as WeekTotals[]
  }),
  getters: {
    workingHoursForWeek: (state) => {
      return (weekDates: { value: string[] }) => {
        console.log(state.workingHoursLoggedInUserBetweenDates)
        return weekDates.value.map((date:string) => {
          const existingEntry = state.workingHoursLoggedInUserBetweenDates.find(entry => entry.date === date)
          console.log(existingEntry)
          if (existingEntry) {
            return existingEntry
          } else {
            return {
              date: date,
              hours: 0,
              milkings: 0,
              description: '',
              submitted: state.workingHoursLoggedInUserBetweenDates.length > 0 ? state.workingHoursLoggedInUserBetweenDates.every(entry => entry.submitted): false,
            }
          }
        })
      }
    },
    weekIsSubmitted: (state) => {
      return state.workingHoursLoggedInUserBetweenDates.length > 0 ? state.workingHoursLoggedInUserBetweenDates.every(entry => entry.submitted): false
    }
  },
  actions: {
    async fetchAllWorkingHoursLoggedInUser(_callback?: CallbackNOParam,
      _errorcallback?: CallbackOneParam<string>) {
      await WorkingHoursService.workingHoursGetAll().then((response) => {
        this.allWorkingHoursLoggedInUser = response
        if (_callback) {
          _callback()
        }
      }).catch(error => {
        if (_errorcallback) {
          _errorcallback(error.message)
        }
      })
    },
    async fetchWorkingHoursBetweenDatesLoggedInUser(data : {fromDate:string, toDate:string},_callback?: CallbackNOParam,
      _errorcallback?: CallbackOneParam<string>) {
      await WorkingHoursService.workingHoursGetWorkingHoursBetweenDates(data).then((response) => {
        this.workingHoursLoggedInUserBetweenDates = response
        if (_callback) {
          _callback()
        }
      }).catch(error => {
        if (_errorcallback) {
          _errorcallback(error.message)
        }
      })
    },
    async addOrUpdateWorkingHours(data: {requestBody: WorkingHoursRequest}, _callback?: CallbackNOParam,
      _errorcallback?: CallbackOneParam<string>) {
      await WorkingHoursService.workingHoursUpdateWorkingHoursItem(data).then((response) => {
        const typedResponse = response as WorkingHoursResponse
        const index = this.workingHoursLoggedInUserBetweenDates.findIndex(item => item.date === typedResponse.date)

        if (index !== -1) {
          // Replace the item at the found index
          this.workingHoursLoggedInUserBetweenDates[index] = typedResponse
        } else {
          this.workingHoursLoggedInUserBetweenDates.push(typedResponse)
        }
        if (_callback) {
          _callback()
        }
      }).catch(error => {
        if (_errorcallback) {
          _errorcallback(error.message)
        }
      })
    },
    async submitWeek(data : WorkingHoursRequest[], _callback?: CallbackNOParam, _errorcallback?: CallbackOneParam<string>) {
    for (const item of data) {
      item.submitted = true
      this.addOrUpdateWorkingHours({requestBody: item})
    }
    },
    async getWeekOverview(data: {fromDate:string, toDate:string}, _callback?: CallbackNOParam, _errorcallback?: CallbackOneParam<string>) {
      await WorkingHoursService.workingHoursGetWeekOverview(data).then((response) => {
        this.weekOverview = response
        if (_callback) {
          _callback()
        }
      },
      ).catch(error => {
        if (_errorcallback) {
          _errorcallback(error.message)
        }
      })

  },
  async getMonthOverview(data : {year:number} , _callback?: CallbackNOParam, _errorcallback?: CallbackOneParam<string>) {
    await WorkingHoursService.workingHoursGetYearOverview(data).then((response) => {
      this.monthOverview = response
      if (_callback) {
        _callback()
      }
    },
    ).catch(error => {
      if (_errorcallback) {
        _errorcallback(error.message)
      }
    })

},
  }

})
