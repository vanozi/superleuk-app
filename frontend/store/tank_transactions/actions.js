export default {
  async getAllTankTransactions({ commit }) {
    try {
      let response = await this.$axios.get("/tank_transactions/");
      commit("GETTANKTRANSACTIONS", response.data)
    } catch (err) {
      if (err.response) {
        this.$notifier.showMessage({
          content: err.response.data,
          color: "error",
        });
      }
    }
  },

}