<template>
    <base-view>
        <template #default-view-title>Uren - invoer</template>
        <template #default-view-body>
                    <WeekOverzichtWeekPicker/>
                    <WeekOverzicht title="hoi" :weekData="weekData" />
                    <AddHours/>

        </template>
    </base-view>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import WeekOverzicht from '../../components/uren/WeekOverzicht.vue'
import WeekOverzichtWeekPicker from '../../components/uren/WeekOverzichtWeekPicker.vue'
import AddHours from '../../components/uren/AddHours.vue'

export default {
    components: { WeekOverzicht, WeekOverzichtWeekPicker, AddHours },
    data() {
        return {
            
        }
    },
    methods: {

        ...mapActions({
            getWorkingHoursBetweenDates: 'workingHours/getWorkingHoursBetweenDates'
        }),

    },
    computed: {
        // mix the getters into computed with object spread operator
        ...mapGetters({
            weekData: 'workingHours/workingHoursCurrentWeek'
        }),
    },
    watch: {
        $route(to, from) {
            console.log(to.fullPath, from.fullPath)
            if (to.fullPath == '/uren/invoeren') {
                console.log("de staat resetten")
            }
        },
    },
    created() {
        this.getWorkingHoursBetweenDates({ weekStart: '2022-10-01', weekEnd: '2022-10-30' })
    }
}
</script>

<style>

</style>