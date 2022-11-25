<template>
  <div>

    <v-container v-if="machineData">

      <!-- Machine maintenance issue dialog -->
      <EditMachineMaintenanceIssueDlg ref="editMachineMaintenanceIssue" @save="save($event)"
        @saveEdit="saveEdit($event)" />
      <ConfirmDlg ref="confirm" />
      <v-row>
        <v-col class="d-flex justify-center align-center">
          <h2>{{ machineData.info.work_number }} - {{ machineData.info.work_name }}</h2>
        </v-col>
      </v-row>
      <v-row>
        <v-col :class="{ 'justify-center': $vuetify.breakpoint.mdAndUp, 'justify-left': $vuetify.breakpoint.smAndDown }"
          class="d-flex  align-left">
          <v-list>
            <v-list-item>
              <span class="font-weight-bold">Groep: </span>&nbsp; {{ machineData.info.group }}
            </v-list-item>
            <v-list-item>
              <span class="font-weight-bold">Category: </span>&nbsp; {{ machineData.info.category }}
            </v-list-item>
            <v-list-item>
              <span class="font-weight-bold">Merk: </span>&nbsp; {{ machineData.info.brand_name }}
            </v-list-item>
            <v-list-item>
              <span class="font-weight-bold">Type: </span>&nbsp; {{ machineData.info.type_name }}
            </v-list-item>
          </v-list>

        </v-col>
        <v-col :class="{ 'justify-center': $vuetify.breakpoint.mdAndUp, 'justify-left': $vuetify.breakpoint.smAndDown }"
          class="d-flex  align-center">
          <v-list>
            <v-list-item>
              <span class="font-weight-bold">Kenteken: </span>&nbsp; {{ machineData.info.licence_number }}
            </v-list-item>
            <v-list-item>
              <span class="font-weight-bold">Chassis nummer: </span>&nbsp; {{ machineData.info.chassis_number }}
            </v-list-item>
            <v-list-item>
              <span class="font-weight-bold">Tenaamstellingscode: </span>&nbsp; {{ machineData.info.ascription_code }}
            </v-list-item>
            <v-list-item>
              <span class="font-weight-bold">Bouwjaar: </span>&nbsp; {{ machineData.info.construction_year }}
            </v-list-item>

          </v-list>

        </v-col>

      </v-row>

      <v-tabs fixed-tabs v-model="tab">
        <v-tab :key="onderhoud">Onderhoud</v-tab>
        <v-tab :key="tankbeurten">Tankbeurten</v-tab>

      </v-tabs>
      <v-tabs-items v-model="tab">
        <!-- Onderhoud -->
        <v-tab-item :key="onderhoud">
          <v-data-table :search="searchOnderhoud" :headers="userHasRole(['admin','monteur']) ? headersOnderhoudAdmin : headersOnderhoud"
            :sort-by="['created_at']" show-expand :sort-desc="[true]" :items="filteredMaintenanceIssues"
            class="elevation-1">
            <!-- Toolbar met titel en knop om een nieuw onderhouds item toe te voegen -->
            <template v-slot:top>
              <!-- Toevoegen en wijzigen dialoog: Only if user is admin -->
              <!-- <v-toolbar flat>

              <v-btn color="primary" dark class="mb-2 hidden-xs-only" @click="newMaintenanceIssue">Storing /
                Onderhoud melden
              </v-btn>
              <v-btn @click="newMaintenanceIssue" color="primary" outlined class="mb-2 hidden-sm-and-up" v-bind="attrs"
                v-on="on">
                <v-icon class="mr-2">mdi-plus-circle-outline</v-icon>
                <v-icon>mdi-wrench-outline</v-icon>
              </v-btn>
            </v-toolbar> -->
              <!-- Toolbar voor snel zoeken -->
              <v-toolbar flat>
                <v-text-field v-model="searchOnderhoud" append-icon="mdi-magnify" label="Zoeken" single-line
                  hide-details>
                </v-text-field>
              </v-toolbar>
            </template>
            <!-- Header templates voor het toevoegen van zoek filters per kolom -->

            <template v-slot:header.status="{ header }">
              {{ header.text }}
              <v-menu offset-y :close-on-content-click="false">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon v-bind="attrs" v-on="on">
                    <v-icon small>
                      mdi-filter
                    </v-icon>
                  </v-btn>
                </template>
                <div style="background-color: white; width: 280px">
                  <v-text-field v-model="statusFilterWaarde" class="pa-4" label="Zoekterm...">
                  </v-text-field>
                  <div class="d-flex justify-end">
                    <v-btn class="mr-3 mb-3" icon color="error" @click="statusFilterWaarde = ''">
                      <v-icon>mdi-trash-can-outline</v-icon>
                    </v-btn>
                  </div>
                </div>
              </v-menu>
            </template>
            <template v-slot:header.priority="{ header }">
              {{ header.text }}
              <v-menu offset-y :close-on-content-click="false">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon v-bind="attrs" v-on="on">
                    <v-icon small>
                      mdi-filter
                    </v-icon>
                  </v-btn>
                </template>
                <div style="background-color: white; width: 280px">
                  <v-text-field v-model="priorityFilter" class="px-4 " label="Zoekterm...">
                  </v-text-field>
                  <div class="d-flex justify-end">
                    <v-btn class="mr-3 mb-3" icon color="error" @click="priorityFilter = ''">
                      <v-icon>mdi-trash-can-outline</v-icon>
                    </v-btn>
                  </div>

                </div>
              </v-menu>
            </template>

            <!-- Item template om de created_at datum te formatteren -->
            <template v-slot:item.created_at="{ item }">
              <span>{{ new Date(item.created_at).toLocaleDateString() }}</span>
            </template>

            <!-- Expansion panel voor de omschrijving van het issue -->
            <template v-slot:expanded-item="{ headers, item }">
              <td :colspan="headers.length">
                {{ item.issue_description }}
              </td>
            </template>
            <!-- Actions column only if user is admin -->
            <template v-if="userHasRole(['admin', 'monteur'])" v-slot:[`item.actions`]="{ item }">
              <v-icon small class="mr-2" @click="editMaintenanceIssue(item)">
                mdi-pencil
              </v-icon>
              <v-icon small @click="deleteItem(item)">
                mdi-delete
              </v-icon>
            </template>
          </v-data-table>
        </v-tab-item>
        <!-- Tankbeurten -->
        <v-tab-item :key="tankbeurten">
          <v-data-table :search="searchTankBeurten" :headers="headersTankBeurten"
            :items="machineData.tank_transactions">
            <!-- Toolbar met titel en knop om een nieuw onderhouds item toe te voegen -->
            <template v-slot:top>

              <!-- Toolbar voor snel zoeken -->
              <v-toolbar flat>
                <v-text-field v-model="searchTankBeurten" append-icon="mdi-magnify" label="Zoeken" single-line
                  hide-details>
                </v-text-field>
              </v-toolbar>
            </template>
            <!-- Item template om de created_at datum te formatteren -->
            <template v-slot:item.start_date_time="{ item }">
              <span>{{ formatDateTimeforTemplate(item.start_date_time) }}</span>
            </template>
            <template v-slot:item.meter="{ item }">
              <span v-if="item.meter == null">n.v.t.</span>
              <span v-else>{{ item.meter + ' ' + item.meter_type }}</span>
            </template>
          </v-data-table>

        </v-tab-item>
      </v-tabs-items>



    </v-container>
  </div>

</template>

<script>
import moment from "moment";
import { mapGetters, mapActions, store } from "vuex";
export default {
  async asyncData({ params }) {
    const slug = params.slug // When calling /abc the slug will be "abc"
    return { slug }
  },
  data: () => ({
    werkNaamMachine: '',
    statusFilterWaarde: '',
    descriptionFilter: '',
    priorityFilter: '',
    dialog: false,
    dialogDelete: false,
    machine_edited: false,
    machine: {},
    tab: null,
    searchTankBeurten: "",
    searchOnderhoud: "",
    headersOnderhoudAdmin: [
      //   text: string,
      //   value: string,
      //   align?: 'start' | 'center' | 'end',
      //   sortable?: boolean,
      //   filterable?: boolean,
      //   groupable?: boolean,
      //   divider?: boolean,
      //   class?: string | string[],
      //   cellClass?: string | string[],
      //   width?: string | number,
      //   filter?: (value: any, search: string, item: any) => boolean,
      //   sort?: (a: any, b: any) => number
      {
        text: "Aangemaakt op",
        value: "created_at",
        sortable: true
      },
      {
        text: "Aangemaakt door",
        value: "created_by",
        sortable: true
      },

      // {
      //     text: "Omschrijving",
      //     value: "issue_description",
      //     sortable: true,
      // },
      {
        text: "Status",
        value: "status",
        sortable: true,
      },
      {
        text: "Prioriteit",
        value: "priority",
        sortable: true,
      },
      { text: 'Acties', value: 'actions', sortable: false },
    ],
    headersOnderhoud: [
      //   text: string,
      //   value: string,
      //   align?: 'start' | 'center' | 'end',
      //   sortable?: boolean,
      //   filterable?: boolean,
      //   groupable?: boolean,
      //   divider?: boolean,
      //   class?: string | string[],
      //   cellClass?: string | string[],
      //   width?: string | number,
      //   filter?: (value: any, search: string, item: any) => boolean,
      //   sort?: (a: any, b: any) => number
      {
        text: "Aangemaakt op",
        value: "created_at",
        sortable: true
      },
      {
        text: "Aangemaakt door",
        value: "created_by",
        sortable: true
      },

      {
        text: "Omschrijving",
        value: "issue_description",
        sortable: true,
      },
      {
        text: "Status",
        value: "status",
        sortable: true,
      },
    ],
    headersTankBeurten: [
      //   text: string,
      //   value: string,
      //   align?: 'start' | 'center' | 'end',
      //   sortable?: boolean,
      //   filterable?: boolean,
      //   groupable?: boolean,
      //   divider?: boolean,
      //   class?: string | string[],
      //   cellClass?: string | string[],
      //   width?: string | number,
      //   filter?: (value: any, search: string, item: any) => boolean,
      //   sort?: (a: any, b: any) => number
      {
        text: "Getankt op",
        value: "start_date_time",
        sortable: true
      },
      {
        text: "Machine",
        value: "vehicle",
        sortable: true
      },
      {
        text: "Bestuurder",
        value: "driver",
        sortable: true
      },
      {
        text: "Aantal liters",
        value: "quantity",
        sortable: true
      },
      {
        text: "Uren/km stand",
        value: "meter",
        sortable: true,
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

    formatDateTimeforTemplate(value) {
      return moment(value).utcOffset(0).locale("nl").format("DD/MM/YYYY HH:mm:ss");
    },
    ...mapActions({
      getMachineById: "machines/getMachineById",
      getAllMachineMaintenanceIssues: "machine_maintenance/getAllMachineMaintenanceIssues",
      addMachineMaintenanceIssue: "machine_maintenance/addMachineMainetenanceIssue",
      updateMachineMaintenanceIssue: "machine_maintenance/updateMachineMainetenanceIssue",
      deleteMachineMaintenanceIssue: "machine_maintenance/deleteMachineMaintenanceIssue"
    }),
    // Filter methodes

    // Filter methodes
    filterStatus(item) {
      console.log(item)
      if (
        item.status !== null) {
        return item.status.toLowerCase().includes(this.statusFilterWaarde.toLowerCase())
      };
    },
    filterPriority(item) {
      if (
        item.priority !== null) {
        return item.priority.toLowerCase().includes(this.priorityFilter.toLowerCase())
      };
    },
    filterDescription(item) {
      {
        return item.priority.toLowerCase().includes(this.descriptionFilter.toLowerCase());
      }

    },

    async newMaintenanceIssue() {
      if (await this.$refs.editMachineMaintenanceIssue.open("Storing / Onderhoud melden", {})) {
      }
    },
    save(maintenance_issue) {
      this.addMachineMaintenanceIssue(maintenance_issue)
    },
    async saveEdit(maintenance_issue) {
      await this.updateMachineMaintenanceIssue(maintenance_issue)
      await this.getMachineById(this.slug)
    },
    // Machine maintenace dialog
    async editMaintenanceIssue(issue) {
      issue = Object.assign(issue, { "machine": { "work_number": this.machineData.info.work_number, "work_name": this.machineData.info.work_name, "id": this.slug } })
      if (await this.$refs.editMachineMaintenanceIssue.openEdit("Storing / Onderhoud aanpassen", issue)) {
      }
    },
    async deleteItem(item) {
      if (
        await this.$refs.confirm.open(
          "Bevestig",
          "Weet je zeker dat je dit item wilt verwijderen?"
        )
      ) {
        await this.deleteMachineMaintenanceIssue(item.id)
      }
    }
  },
  computed: {
        userIsAdmin() {
      if (this.$auth.user.roles.filter((e) => e.name === "admin").length > 0) {
        return true;
      } else {
        return false;
      }
    },
            // Filter de maintenance issues op basis van de filters in de columns
        filteredMaintenanceIssues() {
            this.conditions = [];
            if (this.werkNaamMachine) {
                this.conditions.push(this.filterWerkNaamMachine);
            }
            if (this.statusFilterWaarde) {
                this.conditions.push(this.filterStatus);
            }
            if (this.descriptionFilter) {
                this.conditions.push(this.filterDescription);
            }
            if (this.priorityFilter) {
                this.conditions.push(this.filterPriority);
            }

            if (this.conditions.length > 0) {
              console.log(this.machineData.maintenance_issues)
                return this.machineData.maintenance_issues.filter((maintenance_issue) => {
                    return this.conditions.every((condition) => {
                        return condition(maintenance_issue);
                    })
                })
            }
            return this.machineData.maintenance_issues
        },
    ...mapGetters({
      machineData: "machines/getCurrentMachine",
    }),
  },
  created() {
    this.getMachineById(this.slug)
  },

}
</script>

<style>
</style>
