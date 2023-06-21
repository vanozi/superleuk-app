<script>
import {mapActions} from "vuex";

export default {
  data: () => ({
    // dialog voor het toevoegen van een vakantie
    dialog: false,
    menu2: false,
    dates: [],
    users: [],
    selectedUser: null,
  }),
  components: {
    VakantiesOverzicht: () => import("~/components/VakantiesOverzicht.vue")
  },
  methods: {
    ...mapActions({
      getVakanties: "vakanties/getVakantiesSingeUser",
      addVakantie: "vakanties/addVakantieForUser",
      deleteVakantie: "vakanties/deleteVakantie",
      getUsers: "users/getUsers",
    }),
    async toevoegenVakantie() {
      await this.addVakantie({
        user_id: this.selectedUser.id,
        start_date: this.dates[0],
        end_date: this.dates[this.dates.length - 1],
      });
      this.dates = [];
      this.selectedUser = null;
      this.dialog = false;
      this.menu2 = false;

    },
    formatDate(dates) {
      if (!dates.length > 0) return ''

      return `${dates[0]} - ${dates[dates.length - 1]}`
    },
    formattedName(user) {
      return `${user.first_name} ${user.last_name}`
    },
  },
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.dates)
    },
  },
  async created() {
    this.users = await this.getUsers();
    console.log(this.users)
  }
}
</script>

<template>
  <div>
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
          <v-select
            :items="users"
            v-model="selectedUser"
            label="Selecteer een gebruiker"
            item-value="id"
            return-object
          >
            <template v-slot:selection="{ item, index }">
              {{ formattedName(item) }}
            </template>
            <template v-slot:item="{ item, index }">
              {{ formattedName(item) }}
            </template>
          </v-select>
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
                @click="menu2=false"
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
            @click="dialog = false; toevoegenVakantie()"
          >
            Toevoegen
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <VakantiesOverzicht/>
  </div>
</template>
<style scoped>

</style>
