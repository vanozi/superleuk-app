import { IWorkingHours } from "stores/workinghours-store";

export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

export interface IWeekData {
  year: number;
  week: number;
  week_start: string;
  week_end: string;
  working_hours: IWorkingHours[];
  sum_hours: number;
  sum_milkings: number;
  submitted: boolean;
}

export interface IResource {
  id: number;
  title: string;
}

export interface IVakantie {
  id: number;
  start_date: string;
  end_date: string;
  resourceId: number;
}
