export interface LoginFormInterface {
  email: string;
  password: string;
}

export interface CallbackOneParam<T1, T2 = void> {
  (param1: T1): T2;
}

export interface CallbackNOParam<T2 = void> {
  (): T2;
}


export interface IMachine {
  id: number;
  work_number: string;
  work_name: string;
  category: string;
  group: string;
  brand_name: string;
  type_name: string;
  licence_number: string;
  chassis_number: string;
  construction_year: number;
  ascription_code: string;
}

export interface IFilterMachine {
  brands: string[];
  categories: string[];
  groups: string[];
  models: string[];
}

export interface IMachineState {
  machines: IMachine[];
  filteredMachines: IMachine[];
  machineFilters: IFilterMachine;
  machine: IMachine;
  loading: boolean;
}

// Working hours
export interface IWorkingHours {
  id? : number,
  date: string,
  hours : number,
  milkings ? : number,
  description : string,
  submitted : boolean,
  user_id ? : number
  hours_formatted_for_frontend ? :string
}
