<script>


import {mapActions, mapGetters} from "vuex";

export default ({
  name: "vakanties",
  data: () => ({
    dialog: false,
    menu2: false,
    dates: [],
    headers: [
      {
        text: 'start datum',
        value: 'start_date',
      },
      {text: 'eind datum', value: 'end_date'},
      {text: 'Acties', value: 'actions', sortable: false},
    ],
    vakanties: [],
  }),
  computed: {
    ...mapGetters({
      allVakanties: "vakanties/get_vakanties_all_users",
      // allVakantiesBetweenTwoDates: "vakanties/get_vakanties_all_users_between_two_dates"
    }),
    computedDateFormatted() {
      return this.formatDate(this.dates)
    },
  },
  methods: {
    ...mapActions({
      getVakanties: "vakanties/getVakantiesSingeUser",
      addVakantie: "vakanties/addVakantie",
      deleteVakantie: "vakanties/deleteVakantie",
    }),
    async toevoegenVakantie() {

      await this.addVakantie({
        start_date: this.dates[0],
        end_date: this.dates[this.dates.length - 1],
      });
      this.dialog = false;
      this.menu2 = false;
      this.dates = [];
      this.vakanties = await this.getVakanties();
    },
    async deleteItem(item) {
      await this.deleteVakantie(item.id);
      this.vakanties = await this.getVakanties();
    },
    formatDate(dates) {
      if (!dates.length > 0) return ''

      return `${dates[0]} - ${dates[dates.length - 1]}`
    },
  },
  async created() {
    this.vakanties = await this.getVakanties();
    console.log(this.vakanties)
  },
})
</script>

<template>
  <v-container>
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          outlined
          v-bind="attrs"
          v-on="on"
          class="ma-2"
        >
          Vakantie Toevoegen
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="grey lighten-2">
          Vakantie toevoegen
        </v-card-title>

        <v-card-text>
          <v-menu
            v-model="menu2"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="computedDateFormatted"
                label="Datums"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="dates"
              no-title
              range
            >
              <v-spacer></v-spacer>
              <v-btn
                text
                color="error"
                @click="menu2 = false"
              >
                Annuleren
              </v-btn>
              <v-btn
                text
                color="primary"
                @click="toevoegenVakantie"
              >
                OK
              </v-btn>
            </v-date-picker>
          </v-menu>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="error"
            text
            @click="dialog = false"
          >
            Annuleren
          </v-btn>
          <v-btn
            color="primary"
            text
            @click="dialog = false"
          >
            Toevoegen
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-data-table
      :headers="this.headers"
      :items="this.vakanties"
      :items-per-page="5"
      class="elevation-1">
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="deleteItem(item)">mdi-delete</v-icon>
      </template>
    </v-data-table>
  </v-container>
</template>

<style scoped>

</style>
