
import { defineStore } from 'pinia'
import type { CallbackNOParam, CallbackOneParam } from '~/types/generic'
import { AdminKlauwscoreService } from '~/utils/client/services.gen'
import type { KlauwScoreBase } from '~/utils/client/types.gen'



export const useAdminKlauwscoreStore = defineStore('admin-klauwscore-store', {
  state: () => ({
    data: [] as KlauwScoreBase[],
    loadArr: [] as Array<string>,
  }),
  getters: {
    loading: (state) => state.loadArr.length > 0,
    distinctNotaties: (state) => (startDate : Date, endDate: Date) => {
      const notatiesMap = new Map<string, number>()

      // Convert start and end date strings to Date objects for comparison

      state.data.forEach((klauwScore) => {
        const notatie = klauwScore.notatie
        const behandeldatum = new Date(klauwScore.behandeldatum) // Convert behandel date to Date object

        // Check if the behandeldatum falls within the date range
        if (behandeldatum >= startDate && behandeldatum <= endDate) {
          // Skip the notatie if it's "Vierkant"
          if (notatie === 'Vierkant') return

          if (notatiesMap.has(notatie)) {
            notatiesMap.set(notatie, notatiesMap.get(notatie)! + 1)
          } else {
            notatiesMap.set(notatie, 1)
          }
        }
      })

      // Sort the notatiesMap based on counts in descending order
      const sortedNotatiesMap = new Map([...notatiesMap.entries()].sort((a, b) => b[1] - a[1]))
      const labels = Array.from(sortedNotatiesMap.keys())
      const data = Array.from(sortedNotatiesMap.values())
      const backgroundColors = labels.map(() => getRandomColor())

      return {
        labels,
        datasets: [
          {
            data,
            backgroundColor: backgroundColors,
          },
        ],
      }
    },
  },
  actions: {
    async getKlauwscoreData(
      koenummer?: string,
      behandeldatum_start?: string,
      behandeldatum_eind?: string,
      _callback?: CallbackNOParam,
      _errorcallback?: CallbackOneParam<string>
    ) {
      const queryParams = {
        koenummer,
        behandeldatum_start,
        behandeldatum_eind
      }

      try {
        this.loadArr.push('geKlauwScoreData')
        const response = await AdminKlauwscoreService.adminKlauwscoreGetKlauwscores(queryParams)
        this.data = response

        if (_callback) {
          _callback()
        }
      } catch (error:any) {
        if (_errorcallback) {
          _errorcallback(error.message)
        }
      }
      finally {
        this.loadArr.splice(
          this.loadArr.indexOf('geKlauwScoreData'),
          1
        )
      }
    },
    async downloadKlauwScore(
      _callback?: CallbackNOParam,
      _errorcallback?: CallbackOneParam<string>
    ) {
      try {
        this.loadArr.push('downloadKlauwScore')
        const response = await AdminKlauwscoreService.adminKlauwscoreDownloadKlauwscores()

        if (_callback) {
          _callback()
        }
        return response
      } catch (error:any) {
        if (_errorcallback) {
          _errorcallback(error.message)
        }
      }
      finally {
        this.loadArr.splice(
          this.loadArr.indexOf('downloadKlauwScore'),
          1
        )
      }
    }
  }
})



function getRandomColor() {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}
