<script>

import {mapActions, mapGetters} from "vuex";

export default {
  name: "vakanties",
  data: () => ({

    type: 'month',
    mode: 'stack',
    modes: ['stack', 'column'],
    types: ['month', 'week', 'day'],
    weekday: [0, 1, 2, 3, 4, 5, 6],
    weekdays: [
      {text: 'Sun - Sat', value: [0, 1, 2, 3, 4, 5, 6]},
      {text: 'Mon - Sun', value: [1, 2, 3, 4, 5, 6, 0]},
      {text: 'Mon - Fri', value: [1, 2, 3, 4, 5]},
      {text: 'Mon, Wed, Fri', value: [1, 3, 5]},
    ],
    value: '',
    events: [],
    colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
    names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
    nameColorMap : {},
    colorIndex : 0
  }),
  methods: {
    ...mapActions({
      getAllVakanties: "vakanties/getVakantiesAllUsers",
      getAllVakantiesBetweenDates: "vakanties/getVakantiesAllUserBetweenDates"
    }),
    async fetchVakanties(start_date, end_date) {
      return await this.getAllVakantiesBetweenDates({start_date, end_date});
    },
    async getEvents({start, end}) {
      const events = []

      const vakanties = await this.fetchVakanties(start.date, end.date)
      for (const element of vakanties) {
        const name = element.user.first_name + ' ' + element.user.last_name
        console.log(name)
        // If this name isn't in the nameColorMap, add it with a new color
        if (!this.nameColorMap.hasOwnProperty(name)) {
          this.nameColorMap[name] = this.colors[this.colorIndex]

          // Update the colorIndex, and loop back to 0 if it exceeds the length of colors array
          this.colorIndex = (this.colorIndex + 1) % this.colors.length
        }
        events.push({
          name: name,
          start: element.start_date,
          end: element.end_date,
          color: this.nameColorMap[name],
        })
      }
      this.events = events
    },
    getEventColor(event) {
      // TODO - event color op basis van lengte van vakantie
      return event.color
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a
    },
  },
  computed: {
    ...mapGetters({
      allVakanties: "vakanties/get_vakanties_all_users",
      // allVakantiesBetweenTwoDates: "vakanties/get_vakanties_all_users_between_two_dates"
    }),



  },
  async created() {
    // await this.fetchVakanties('2023-01-01', '2023-12-31')
  }
}
</script>

<template>
  <div>
    <v-toolbar v-if="$refs.calendar">
      <v-toolbar-title>
        <v-btn
          icon
          class="ma-2"
          @click="$refs.calendar.prev()"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        {{ $refs.calendar.title }}
        <v-btn
          icon
          class="ma-2"
          @click="$refs.calendar.next()"
        >
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-toolbar-title>
      <v-toolbar-items>
        <v-select
          v-model="type"
          :items="types"
          dense
          outlined
          hide-details
          class="ma-2"
          label="type"
        ></v-select>
        <v-spacer></v-spacer>

      </v-toolbar-items>
    </v-toolbar>
    <v-sheet height="600">
      <v-calendar
        ref="calendar"
        v-model="value"
        :weekdays="weekday"
        :type="type"
        :events="events"
        :event-overlap-mode="mode"
        :event-overlap-threshold="30"
        :event-color="getEventColor"
        @change="getEvents"
      ></v-calendar>
    </v-sheet>

  </div>
</template>
<style scoped>

</style>
