<template>
  <v-container>
    <SubmittedWeekDlg ref="week_overview" />
    <v-tabs centered>
      <v-tab href="#week_overview">Week overzicht</v-tab>
      <v-tab-item value="week_overview">
        <v-row class="mt-3 ml-1">
          <v-col>
            <!-- jaar aanpassen -->
            <v-btn icon @click="substractYear" v-if="previousYearAllowed">
              <v-icon>mdi-chevron-triple-left</v-icon>
            </v-btn>
            <b>{{ computedSelectedYear }}</b>
            <v-btn icon @click="addYear" v-if="nextYearAllowed">
              <v-icon>mdi-chevron-triple-right</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-simple-table dense class="mt-3">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Week</th>
                <th class="text-left">Van/Tot</th>
                <th class="text-left">Uren</th>
                <th v-if="userHasRole(['melker'])" class="text-left">Melkbeurten</th>
                <th class="text-left">Ingediend?</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, i) in week_overview" :key="i" @click="showWeekOverview(item)">
                <td>{{ item.week }}</td>
                <td>
                  {{ formatDateforTemplate(item.week_start) }}/{{
                    formatDateforTemplate(item.week_end)
                  }}
                </td>
                <td>{{ item.sum_hours }}</td>
                <td v-if="userHasRole(['melker'])">{{ item.sum_milkings }}</td>
                <td>
                  <v-icon color="green" v-if="item.submitted">
                    mdi-hand-okay</v-icon>
                  <v-icon color="red" v-else> mdi-close-octagon-outline</v-icon>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-tab-item>
      <v-tab href="#month_overview">Maand overzicht</v-tab>
      <v-tab-item value="month_overview">
        <v-row class="mt-3 ml-1">
          <v-col>
            <!-- jaar aanpassen -->
            <v-btn icon @click="substractYear" v-if="previousYearAllowed">
              <v-icon>mdi-chevron-triple-left</v-icon>
            </v-btn>
            <b>{{ computedSelectedYear }}</b>
            <v-btn icon @click="addYear" v-if="nextYearAllowed">
              <v-icon>mdi-chevron-triple-right</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-simple-table dense class="mt-3">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Maand</th>
                <th class="text-left">Totaal uren</th>
                <th v-if="userHasRole(['melker'])" class="text-left">Totaal melkbeurten</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in month_overview_totals" :key="item.month">
                <td>{{ item.month }}</td>
                <td>{{ item.sum }}</td>
                <td v-if="userHasRole(['melker'])">{{ item.sum_milkings }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <br />
        <v-row>
          <v-col class="justify-left ml-2">Totaal uren: &nbsp {{ yearTotal }}</v-col>
        </v-row>
      </v-tab-item>
    </v-tabs>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import moment from "moment";
export default {
  head() {
    return {
      title: this.title,
    };
  },
  data: () => ({
    title: "Overzicht",
    today: moment().format("YYYY-MM-DD"),
    week_overview: null,
    month_totals: null,
    headers: [
      {
        text: "Datum",
        value: "date",
        sortable: false,
        formatter: (x) =>
          x ? moment(x).locale("nl").format("dddd DD MMMM") : null,
      },
      {
        text: "Uren",
        value: "hours",
        sortable: false,
      },
      {
        text: "Omschrijving",
        value: "description",
        sortable: false,
      },
    ],
  }),
  methods: {
    userHasRole(rolesToCheck) {
      for (let i = 0; i < rolesToCheck.length; i++) {
        if (this.$auth.user.roles.filter((e) => e.name === rolesToCheck[i]).length > 0) {
          return true;
        }
      }
      return false
    },
    async showWeekOverview(item) {
      await this.$refs.week_overview.open(
        item.week,
        item.week_start,
        item.week_end,
        item.working_hours
      );
    },
    formatDateforTemplate(value) {
      return moment(value).locale("nl").format("DD MMM");
    },
    ...mapActions({
      getAllWorkingHoursForUser: "working_hours/getAllWorkingHours",
    }),
    substractYear() {
      this.today = moment(this.today).subtract(1, "years").format("YYYY-MM-DD");
      this.weekOverview();
      this.getMonthTotalsForYear();
    },
    addYear() {
      this.today = moment(this.today).add(1, "years").format("YYYY-MM-DD");
      this.weekOverview();
      this.getMonthTotalsForYear();
    },

    getArraySum(a) {
      var total = 0;
      for (var i in a) {
        total += a[i].hours;
      }
      return total;
    },
    async getMonthTotalsForYear() {
      try {
        let response = await this.$axios.get("/working_hours/month_overview_for_year/", {
          params: {
            year: this.computedSelectedYear,
          },
        });
        this.month_totals = response.data;
      } catch (err) {
        if (err.response) {
          this.$notifier.showMessage({
            content: err.response.data.detail,
            color: "error",
          });
        }
      }
    },
    async weekOverview() {
      // Login API call
      try {
        let response = await this.$axios.get("/working_hours/week_overview/", {
          params: {
            from_date: moment(this.today).startOf("year").format("YYYY-MM-DD"),
            to_date:
              moment(this.today).year() < moment().year()
                ? moment(this.today).endOf("year").format("YYYY-MM-DD")
                : moment(this.today).endOf("isoweek").format("YYYY-MM-DD"),
            user_id: this.$auth.user.id,
          },
        });
        this.week_overview = response.data.week_data.reverse();
      } catch (err) {
        if (err.response) {
          this.$notifier.showMessage({
            content: err.response.data.detail,
            color: "error",
          });
        }
      }
    },
  },
  computed: {
    month_overview_totals() {

      if (this.month_totals != null) {
        let month_sum = [];
        for (const x of Array(13).keys()) {
          if (x == 0) continue;
          let maand_totaal = {}
          if (this.month_totals[0].hasOwnProperty(x)) {
            maand_totaal['month'] = moment(x, 'MM').locale("nl").format('MMMM');
            maand_totaal['sum'] = this.month_totals[0][x]
          }
          else {
            maand_totaal['month'] = moment(x, 'MM').locale("nl").format('MMMM');
            maand_totaal['sum'] = 0
          }

          if (this.month_totals[1].hasOwnProperty(x)) {
            maand_totaal['sum_milkings'] = this.month_totals[1][x]
          }
          else {
            maand_totaal['sum_milkings'] = 0
          }
          month_sum.push(maand_totaal)
        }

        return month_sum;
      }
      else {
        return;
      }
    },
    // Getters from the store
    // mix the getters into computed with object spread operator
    ...mapGetters({
      working_hours: "working_hours/get_all_working_hours",
    }),
    firstOfMonth() {
      return moment(this.today).startOf("month").format("YYYY-MM-DD");
    },
    lastOfMonth() {
      return moment(this.today).endOf("month").format("YYYY-MM-DD");
    },
    computedSelectedYear() {
      return this.today ? moment(this.today).isoWeekYear() : "";
    },
    computedSelectedMonth() {
      return this.today ? moment(this.today).locale("nl").format("MMM") : "";
    },
    daysInSelectedMonth() {
      var count = moment(this.today).month(this.today).daysInMonth();
      var days = [];
      for (var i = 1; i < count + 1; i++) {
        days.push(
          moment(this.today).month(this.today).date(i).format("YYYY-MM-DD")
        );
      }
      return days;
    },
    workingHoursInSelectedMonth() {
      const filteredHours = this.working_hours.filter((item) =>
        this.daysInSelectedMonth.includes(item.date)
      );
      return filteredHours;
    },
    workingHoursPerMonthInSelectedYear() {
      var hourSumsForYear = [];
      for (let i = 0; i < 12; i++) {
        var beginningOfMonth = moment(
          String(this.computedSelectedYear) + "-" + String(i + 1) + "-01"
        ).startOf("month");
        var endOfMonth = moment(
          String(this.computedSelectedYear) + "-" + String(i + 1) + "-01"
        ).endOf("month");
        var hoursMonth = this.working_hours.filter(
          (item) =>
            moment(item.date) >= beginningOfMonth &&
            moment(item.date) <= endOfMonth
        );
        var total = this.getArraySum(hoursMonth);
        hourSumsForYear.push({
          month: moment().month(i).locale("nl").format("MMMM"),
          sum: total,
        });
      }
      return hourSumsForYear;
    },
    nextYearAllowed() {
      if (moment(this.today).year() + 1 < moment().year() + 1) {
        return true;
      } else {
        return false;
      }
    },
    previousYearAllowed() {
      if (
        moment(this.$auth.user.created_at).year() < moment(this.today).year()
      ) {
        return true;
      } else {
        return false;
      }
    },
    yearTotal() {
      if (this.month_totals != null) {
        const values = Object.values(this.month_totals);
        const jaarTotaal = values.reduce((accumulator, value) => {
          return accumulator + value;
        }, 0);
        return jaarTotaal;
      }
      else {
        return 0
      }

    },
  },
  created() {
    this.getAllWorkingHoursForUser(this.$auth.user.id);
    this.getMonthTotalsForYear();
    this.weekOverview();
  },
};
</script>

<style></style>

