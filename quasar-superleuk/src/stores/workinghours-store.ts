import {defineStore} from 'pinia';
import {Notify} from 'quasar';
import {api} from 'src/boot/axios';
import {CallbackNOParam} from 'src/types/typescipt-models';
import {computed, Ref, ref} from 'vue';
import {AxiosResponse} from "axios";

export interface IWorkingHours {
    id?: number,
    date: string,
    hours: number,
    milkings?: number,
    description: string,
    submitted: boolean,
    user_id?: number
    hours_formatted_for_frontend?: string
}

export interface IMonthTotals {
    month: string;
    hours: number;
    milkings: number;
}

export const useWorkingHours = defineStore('workinghours-store', () => {
    const allWorkingHours: Ref<IWorkingHours | undefined> = ref();
    const workingHoursBetweenDates: Ref<IWorkingHours[]> = ref([]);
    const workingHoursInViewSubmittedComputed = computed(() => {
        let totalHours = 0;
        if (workingHoursBetweenDates.value) {
            for (const item of workingHoursBetweenDates.value) {
                if (item.submitted) {
                    totalHours += item.hours;
                }
            }
        }
        return totalHours;
    });
    const workingHoursInViewNotSubmittedComputed = computed(() => {
        let totalHours = 0;
        if (workingHoursBetweenDates.value) {
            for (const item of workingHoursBetweenDates.value) {
                if (!item.submitted) {
                    totalHours += item.hours;
                }
            }
        }
        return totalHours;
    });
    const totalWorkingHoursInViewComputed = computed(() => {
        let totalHours = 0;
        if (workingHoursBetweenDates.value) {
            for (const item of workingHoursBetweenDates.value) {
                totalHours += item.hours;
            }
        }
        return totalHours;
    });
    const totalMilkingsInViewComputed = computed(() => {
        let totalMilkings = 0;
        if (workingHoursBetweenDates.value) {
            for (const item of workingHoursBetweenDates.value) {
                totalMilkings += item.milkings || 0;
            }
        }
        return totalMilkings;
    });

    // api calls
    async function getAllBetweenDates(from: string, to: string) {
        try {
            const response = await api.get('/working_hours/between_dates/', {
                params: {from_date: from, to_date: to},
            });
            workingHoursBetweenDates.value = response.data;
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    async function getAll() {
        api
            .get('/working_hours/all')
            .then((response) => {
                allWorkingHours.value = response.data;
            })
            .catch((error) => {
                console.log(error);
            });
    }

    async function getYearOverview(year: number) {
        try {
            const response = await api.get('/working_hours/year_overview/', {
                    params: {year: year},
                }
            );
            return response.data;
        } catch (error) {
            console.log(error)
        }
    }

    async function addOrUpdate(
        payload: IWorkingHours,
        _callback?: CallbackNOParam
    ) {
        api
            .put(`/working_hours/`, payload)
            .then(() => {
                Notify.create({
                    type: 'positive',
                    message: 'Uren succesvol aangepast',
                    icon: 'done',
                });
                if (_callback) {
                    _callback();
                }
            })
            .catch((error) => {
                if (error.response) {
                    Notify.create({
                        type: 'negative',
                        message: error.response.data.detail,
                        icon: 'error',
                    });
                }
            });
    }

    async function deleteSingle(id: number, _callback: CallbackNOParam) {
        api
            .delete(`/working_hours/${id}`)
            .then(() => {
                Notify.create({
                    type: 'positive',
                    message: 'Uren succesvol verwijderd',
                    icon: 'done',
                });
                _callback();
            })
            .catch((error) => {
                if (error.response) {
                    Notify.create({
                        type: 'negative',
                        message: error.response.data.detail,
                        icon: 'error',
                    });
                }
            });
    }

    return {
        getAllBetweenDates,
        getYearOverview,
        addOrUpdate,
        deleteSingle,
        workingHoursBetweenDates,
        allWorkingHours,
        workingHoursInViewSubmittedComputed,
        workingHoursInViewNotSubmittedComputed,
        totalWorkingHoursInViewComputed,
        totalMilkingsInViewComputed

    };
});
