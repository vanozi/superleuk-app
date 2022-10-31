<template>
    <div>
        <ion-grid >
            <ion-row class="ion-justify-content-center ion-align-content-center ion-padding">
                <n-button-group>
                    <n-button ghost round @click="transformDate('subtract', 7)">
                        <n-icon>
                            <back-icon />
                        </n-icon>
                    </n-button>
                    <n-button ghost disabled>
                        {{weekNumber}}
                    </n-button>
                    <n-button ghost round @click="transformDate('add', 7)">
                        <n-icon>
                            <forward-icon />
                        </n-icon>
                    </n-button>

                </n-button-group>

            </ion-row>
            <ion-row class="ion-justify-content-center ion-align-content-center">
                {{formatDate(firstDayOfWeek)}} / {{formatDate(lastDayOfWeek)}}
            </ion-row>
        </ion-grid>
    </div>
</template>

<script>
import moment from 'moment'
import { ChevronBack as BackIcon } from "@vicons/ionicons5";
import { ChevronForward as ForwardIcon } from "@vicons/ionicons5";
import { IonGrid, IonRow } from '@ionic/vue'
export default {
    components: { BackIcon, ForwardIcon, IonGrid, IonRow },
    data() {
        return {
            currentDateTime: moment()
        }
    },
    methods: {
        formatDate(dateToTransform) {
            return moment(dateToTransform, "YYYY-MM-DD").format("ddd DD MMM YYYY");
        },
        transformDate(direction, numberOfDays) {
            if (direction == "subtract") {
                this.currentDateTime = moment(this.currentDateTime.subtract(numberOfDays, "days"))
                console.log(this.currentDateTime)

            } else if (direction == "add") {
                this.currentDateTime = moment(this.currentDateTime.add(numberOfDays, "days"))
            }
        }
    },
    computed: {
        firstDayOfWeek() { return this.currentDateTime.startOf('isoWeek').format("YYYY-MM-DD") },
        lastDayOfWeek() { return this.currentDateTime.endOf('isoWeek').format("YYYY-MM-DD") },
        weekNumber() { return this.currentDateTime.isoWeek() },
        nextWeekAllowed() { return (this.weekNumber >= moment().isoWeek()) ? false : true; },
    },
    watch: {
        currentDateTime() {
            // emit update week data
            console.log(this.firstDayOfWeek, this.lastDayOfWeek)
        }
    },

    created() {

    },

}
</script>

<style>

</style>