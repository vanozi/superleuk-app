export default {
  async getVakantiesAllUsers({commit}) {
    try {
      let response = await this.$axios.get("/vakanties/all");
      commit("GETVAKANTIESALLUSERS", response.data)
    } catch (err) {
      if (err.response) {
        this.$notifier.showMessage({
          content: err.response.data,
          color: "error",
        });
      }
    }
  },
  async getVakantiesAllUserBetweenDates({commit}, {start_date, end_date}) {
    try {
      const params = {
        start_date: start_date,
        end_date: end_date,
      };
      let response = await this.$axios.get("/vakanties/all_between_dates" , {params});
      return response.data
    } catch (err) {
      if (err.response) {
        this.$notifier.showMessage({
          content: err.response.data,
          color: "error",
        });
      }
    }
  },
  async getVakantiesSingeUser({commit}, user_id) {
    try {
      let response = await this.$axios.get("/vakanties/");
      commit("GETVAKANTIESSINGLEUSER", response.data)
      return response.data
    } catch (err) {
      if (err.response) {
        this.$notifier.showMessage({
          content: err.response.data.detail,
          color: "error",
        });
      }
    }
  },
  async addVakantie({commit}, vakantie) {
    try {
      let response = await this.$axios.post("/vakanties/", vakantie);
      commit("ADDVAKANTIE", response.data)
    } catch (err) {
      if (err.response) {
        this.$notifier.showMessage({
          content: err.response.data.detail,
          color: "error",
        });
      }
    }
  },

  async deleteVakantie({commit}, id) {
    try {
      let response = await this.$axios.delete("/vakanties/" + id);
      commit("DELETEVAKANTIE", response.data)
    } catch (err) {
      if (err.response) {
        this.$notifier.showMessage({
          content: err.response.data,
          color: "error",
        });
      }
    }
  }
}
