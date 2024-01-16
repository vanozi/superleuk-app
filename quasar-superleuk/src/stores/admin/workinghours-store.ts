import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import { ref } from 'vue';
import { IWeekData } from "components/models";
import { Notify } from 'quasar';

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

export const useAdminWorkingHours = defineStore('admin-workinghours-store', () => {
  const weekOverview = ref<IWeekData[]>([]);
  const yearOverview = ref<IMonthTotals[]>([]);

  async function getYearOverview(year: number, user_id: int) {
    try {
      const response = await api.get('/admin/working_hours/year_overview/', {
        params: { year: year, user_id: user_id },
      }
      );
      yearOverview.value = response.data;
    } catch (error) {
      console.log(error)
    }
  }

  async function getWeekOverview(from_date: string, to_date: string, user_id: int) {
    try {
      const response = await api.get('/admin/working_hours/week_overview/', {
        params: { from_date: from_date, to_date: to_date, user_id: user_id },
      }
      );
      weekOverview.value = response.data;
    } catch (error) {
      console.log(error)
    }
  }

  async function releaseWorkingHours(from_date: string, to_date: string, user_id: int) {
    console.log(from_date, to_date, user_id)
    try {
      const response = await api.put('/admin/working_hours/release/', {
        from_date: from_date, to_date: to_date, user_id: user_id
      },
      );
      // find the week in the weekOverview and set submitted to false also set all submitted in workinghours to false
      const week = weekOverview.value.find((week) => week.week_start === from_date)
      if (week) {
        week.submitted = false
        week.working_hours.forEach((workingHour) => {
          workingHour.submitted = false
        })
      }
      Notify.create({
        type: 'positive',
        message: response.data.detail,
        icon: 'done',
      });
    } catch (error: any) {
      if (error.response) {
        Notify.create({
          type: 'negative',
          message: error.response.data.detail,
          icon: 'error',
        });
      }
    }
  }



  return {
    getWeekOverview,
    getYearOverview,
    weekOverview,
    yearOverview,
    releaseWorkingHours

  };
});
