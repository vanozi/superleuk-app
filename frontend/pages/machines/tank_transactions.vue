<template>
    <v-container>
        <v-data-table :search="search" :headers="headers" :items="all_tank_transactions">
            <!-- Toolbar met titel en knop om een nieuw onderhouds item toe te voegen -->
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title>Tank transacties</v-toolbar-title>
                </v-toolbar>
                <!-- Toolbar voor snel zoeken -->
                <v-toolbar flat>
                    <v-text-field v-model="search" append-icon="mdi-magnify" label="Zoeken" single-line hide-details>
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
    </v-container>
</template>

<script>
import { mapGetters, mapActions, store } from "vuex";
import moment from "moment";
export default {
    data: () => ({
        search: "",
        title : "Tank transacties",
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
        formatDateTimeforTemplate(value) {
            return moment(value).utcOffset(-120).locale("nl").format("DD/MM/YYYY HH:mm:ss");
        },
        ...mapActions({
            getAllTankTransactions: "tank_transactions/getAllTankTransactions"
        }),
    },
    computed: {
        ...mapGetters({
            all_tank_transactions: "tank_transactions/get_all_tank_transactions",
            get_transaction_by_id: "tank_transactions/get_transaction_by_id",
            get_transactions_by_vehicle: "tank_transactions/get_transactions_by_vehicle"
        }),
    },
    head() {
        return {
            title: this.title,
        };
    },
    mounted() {
        console.log('Hoi')
        this.getAllTankTransactions();
    }
}
</script>

<style>
</style>