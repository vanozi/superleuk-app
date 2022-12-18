import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { useMachineStore } from "./machine-store";
import moment from "moment";




export const useTankGegevens = defineStore( {
  id: "tankgegevens",
  state: () => ({
    tankGegevens: null,
    loading: false,
    error: null,
    chartData: [],
  }),
  getters: {
    getMachineTankdata: (state) => {
      const machineStore = useMachineStore();
      return (machineStore.machine ? state.tankGegevens.filter((tankbeurt) => tankbeurt.vehicle === machineStore.machine.work_name) : null);
    },
    getLitersTankedLast30Days: (state) => {
      // state.tankGegevens[1].start_date_time
    }
  },

  actions: {
    async fetchTankgegevens() {
      this.loading = true;
      try {
        this.tankGegevens = await api
          .get("/tank_transactions/")
          .then((response) => response.data);
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
    async fetchSummedDataBetweenDates(from_date = moment().subtract(30, 'days').format('YYYY-MM-DD'), to_date=  moment().format('YYYY-MM-DD') ) {
      this.loading = true;
      try {
        this.chartData = await api
          .get("/tank_transactions/summed_quantity/between_dates", { params: { from_date: from_date, to_date:to_date } })
          .then((response) => response.data);
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    }
  },
});

