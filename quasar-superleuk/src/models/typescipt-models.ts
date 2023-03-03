export interface LoginFormInterface {
  email: string;
  password: string;
}
export const AppFacingValidations = {
  incorrectEmail: 'Email adres incorrect',
  required: 'Dit veld is verplicht',
};

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
