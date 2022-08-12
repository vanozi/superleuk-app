<template>
    <v-container>
        <!-- {{maintenance_issues}} -->
        <!-- Machine maintenance issue dialog -->
        <EditMachineMaintenanceIssueDlg ref="editMachineMaintenanceIssue" @save="save($event)"
            @saveEdit="saveEdit($event)" />
        <ConfirmDlg ref="confirm" />
        <!-- Tabel met de machines en opties om er 1 toe te voegen -->
        <section>
            <v-data-table :search="search" :headers="userIsAdmin ? headersAdmin : headers" :sort-by="['created_at']"
                show-expand :sort-desc="[true]" :items="filteredMaintenanceIssues" class="elevation-1">
                <!-- Toolbar met titel en knop om een nieuw onderhouds item toe te voegen -->
                <template v-slot:top>
                    <v-toolbar flat>
                        <v-toolbar-title>Storingen / onderhoud</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <!-- Toevoegen en wijzigen dialoog: Only if user is admin -->
                        <v-btn color="primary" dark class="mb-2 hidden-xs-only" @click="newMaintenanceIssue">Storing /
                            Onderhoud melden
                        </v-btn>
                        <v-btn @click="newMaintenanceIssue" color="primary" outlined class="mb-2 hidden-sm-and-up"
                            v-bind="attrs" v-on="on">
                            <v-icon class="mr-2">mdi-plus-circle-outline</v-icon>
                            <v-icon>mdi-wrench-outline</v-icon>
                        </v-btn>
                    </v-toolbar>
                    <!-- Toolbar voor snel zoeken -->
                    <v-toolbar flat>
                        <v-text-field v-model="search" append-icon="mdi-magnify" label="Zoeken" single-line
                            hide-details>
                        </v-text-field>
                    </v-toolbar>
                </template>
                <!-- Header templates voor het toevoegen van zoek filters per kolom -->
                <template v-slot:header.machine.work_name="{ header }">
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
                            <v-text-field v-model="werkNaamMachine" class="px-4 " label="Zoekterm...">
                            </v-text-field>
                            <div class="d-flex justify-end">
                                <v-btn class="mr-3 mb-3" icon color="error" @click="werkNaamMachine = ''">
                                    <v-icon>mdi-trash-can-outline</v-icon>
                                </v-btn>
                            </div>

                        </div>
                    </v-menu>
                </template>
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
                <!-- Item template om de naam van de machine weer te geven met werknummer en werknaam -->
                <template v-slot:item.machine.work_name="{ item }">
                    <span>{{ item.machine.work_number }} - {{ item.machine.work_name }}</span>
                </template>
                <!-- Expansion panel voor de omschrijving van het issue -->
                <template v-slot:expanded-item="{ headers, item }">
                    <td :colspan="headers.length">
                        {{ item.issue_description }}
                    </td>
                </template>
                <!-- Actions column only if user is admin -->
                <template v-if="userIsAdmin" v-slot:[`item.actions`]="{ item }">
                    <v-icon small class="mr-2" @click="editMaintenanceIssue(item)">
                        mdi-pencil
                    </v-icon>
                    <v-icon small @click="deleteItem(item)">
                        mdi-delete
                    </v-icon>
                </template>
            </v-data-table>
        </section>
    </v-container>
</template>

<script>
import { mapGetters, mapActions, store } from "vuex";
export default {
    data: () => ({
        // Filterdata
        werkNaamMachine: '',
        statusFilterWaarde: '',
        descriptionFilter: '',
        priorityFilter: '',
        dialog: false,
        dialogDelete: false,
        machine_edited: false,
        machine: {},
        search: "",
        headersAdmin: [
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
                text: "Machine",
                value: "machine.work_name",
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
        headers: [
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
                text: "Werknaam",
                value: "machine.work_name",
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
    }),
    methods: {
        // Filter methodes
        filterWerkNaamMachine(item) {
            if (
                item.machine.work_name !== null) {
                return item.machine.work_name.toLowerCase().includes(this.werkNaamMachine.toLowerCase())
            };
        },
        // Filter methodes
        filterStatus(item) {
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
        ...mapActions({
            getAllMachineMaintenanceIssues: "machine_maintenance/getAllMachineMaintenanceIssues",
            addMachineMaintenanceIssue: "machine_maintenance/addMachineMainetenanceIssue",
            updateMachineMaintenanceIssue: "machine_maintenance/updateMachineMainetenanceIssue",
            deleteMachineMaintenanceIssue: "machine_maintenance/deleteMachineMaintenanceIssue"
        }),
        async newMaintenanceIssue() {
            if (await this.$refs.editMachineMaintenanceIssue.open("Storing / Onderhoud melden", {})) {
            }
        },
        save(maintenance_issue) {
            this.addMachineMaintenanceIssue(maintenance_issue)
        },
        saveEdit(maintenance_issue) {
            this.updateMachineMaintenanceIssue(maintenance_issue)
        },
        // Machine maintenace dialog
        async editMaintenanceIssue(issue) {
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
                return this.maintenance_issues.filter((maintenance_issue) => {
                    return this.conditions.every((condition) => {
                        return condition(maintenance_issue);
                    })
                })
            }
            return this.maintenance_issues
        },
        // Getters from the store
        // mix the getters into computed with object spread operator
        ...mapGetters({
            maintenance_issues: "machine_maintenance/get_all_machine_maintenance_issues",
        }),
        userIsAdmin() {
            if (this.$auth.user.roles.filter((e) => e.name === "admin").length > 0) {
                return true;
            } else {
                return false;
            }
        },
    },

    mounted() {
        this.getAllMachineMaintenanceIssues();
    }
};
</script>

<style>
</style>