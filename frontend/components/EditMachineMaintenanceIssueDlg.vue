// https://techformist.com/reusable-confirmation-dialog-vuetify/

<template>
    <v-dialog v-model="dialog" :max-width="options.width" :style="{ zIndex: options.zIndex }" @keydown.esc="cancel">
        <v-card>
            <v-toolbar dark :color="options.color" dense flat>
                <v-toolbar-title class="text-body-2 font-weight-bold grey--text">
                    {{ title }}
                </v-toolbar-title>
            </v-toolbar>
            <v-card-text class="pa-4 black--text">
                <v-form ref="issue" v-model="valid">
                    <v-select v-if="!this.edit" v-model="selectedGroup" :items="groups" label="Groep"></v-select>
                    <v-select v-if="!this.edit" v-model="selectedCategory" v-bind:items="getCategories(selectedGroup)"
                        label="Soort">
                    </v-select>
                    <!-- Select machine if you create a new maintenance issue -->
                    <v-select v-if="!this.edit" v-bind:items="filteredMachines(selectedCategory)"
                        v-model="maintenance_issue.machine_id" label="Machine" item-value="id">
                        <template slot="selection" slot-scope="data">
                            <!-- HTML that describe how select should render selected items -->
                            {{ data.item.work_number }} - {{ data.item.work_name }}
                        </template>
                        <template slot="item" slot-scope="data">
                            <!-- HTML that describe how select should render items when the select is open -->
                            {{ data.item.work_number }} - {{ data.item.work_name }}
                        </template>
                    </v-select>
                    <!-- Show the machine if you edit a maintenance issue -->
                    <v-text-field readonly label="Machine"
                        :value="`${maintenance_issue.machine.work_number} - ${maintenance_issue.machine.work_name}`"
                        v-else></v-text-field>
                    <!-- Maintenance issue description , can be edited all the time -->
                    <v-textarea v-model="maintenance_issue.issue_description" label="Omschrijving"></v-textarea>
                    <!-- Change status option if you want to edit a maintenance issue -->
                    <v-select v-if="this.edit" :items="status_items" label="Status" v-model="maintenance_issue.status"></v-select>
                    <!-- Change priority option if you want to edit a maintenance issue -->
                    <v-select v-if="this.edit" :items="priority_items" label="Prioriteit" v-model="maintenance_issue.priority"></v-select>
                    
                </v-form>
            </v-card-text>
            <v-card-actions class="pt-3">
                <v-spacer></v-spacer>
                <v-btn color="error" outlined @click.native="cancel">Annuleer</v-btn>
                <v-btn v-if="!this.edit" color="primary" outlined @click.native="agree">
                    OPSLAAN</v-btn>
                <v-btn v-if="this.edit" color="primary" outlined @click.native="agreeEdit">OPSLAAN</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
    name: "EditMachineMaintenanceIssueDlg",
    data() {
        return {
            valid: false,
            dialog: false,
            edit: false,
            maintenance_issue: {},
            select: {},
            title: "",
            options: {
                color: "grey lighten-3",
                width: 800,
                zIndex: 200,
            },
            status_items: ['Nieuw',
                'In Behandeling',
                'Gesloten'
            ],
                        priority_items: ['Hoog',
                'Laag',
            ],
            selectedGroup: '',
            selectedCategory: '',
            groups: ["Gemotoriseerd", "Getrokken machine", "Overig"],
            categories_motorised: ["Hakselaar", "Auto", "Graafmachine", "Trekker", "Vrachtwagen", "Overig"],
            categories_pulled_machines: ["Container", "Dieplader", "Dumper", "Hark", "Kilverbak", "Kipper", "Meststrooier", "Mesttank", "Pers", "Silagekar", "Veewagen", "Veldspuit", "Voerkar", "Overig"],
        };
    },
    methods: {
        getCategories(group) {
            if (group == 'Gemotoriseerd') {
                return this.categories_motorised
            }
            else if (group == 'Getrokken machine') {
                return this.categories_pulled_machines
            }
        },
        filteredMachines(category) {
            return this.machines.filter((machine) => {
                console.log(machine.category);
                return machine.category === category
            })
        },
        open(title, maintenance_issue, options) {
            this.title = title;
            this.options = Object.assign(this.options, options);
            this.maintenance_issue = Object.assign(this.maintenance_issue, maintenance_issue)
            this.maintenance_issue.status = "Nieuw"
            this.dialog = true;
        },
        openEdit(title, maintenance_issue, options) {

            this.title = title;
            this.options = Object.assign(this.options, options);
            this.maintenance_issue = Object.assign(this.maintenance_issue, maintenance_issue)
            console.log(maintenance_issue)
            this.edit = true;
            this.dialog = true;
        },
        agree() {
            this.$emit("save", this.maintenance_issue);
            this.dialog = false;
            this.maintenance_issue = {};
            this.selectedGroup = '',
                this.selectedCategory = '',
                this.$nuxt.$options.router.push('/machines/onderhoud/');
        },
        agreeEdit() {
            this.maintenance_issue.machine_id = this.maintenance_issue.machine.id
            this.$emit("saveEdit", this.maintenance_issue);
            this.edit = !this.edit
            this.dialog = false;
            this.maintenance_issue = {};
            this.selectedGroup = '',
                this.selectedCategory = ''
        },
        cancel() {
            this.maintenance_issue = {};
            if (this.edit) {
                this.edit = false
            }
            this.dialog = false;
            this.selectedGroup = '',
                this.selectedCategory = ''
        },
        validate() {
            this.$refs.issue.validate();
        },
        reset() {
            this.$refs.issue.reset();
        },
        resetValidation() {
            this.$refs.issue.resetValidation();
        },
        ...mapActions({
            getAllMachines: "machines/getAllMachines",
        }),
    },
    computed: {
        ...mapGetters({
            machines: "machines/get_all_machines",
        }),

    },
    mounted() {
        this.getAllMachines();
    }

};
</script>