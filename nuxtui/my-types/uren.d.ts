export interface UrenVoorDag {
  id?: number;
  date: string;
  hours: number;
  milkings: number;
  description: string;
  submitted: boolean;
}


export interface DagInvoerFormState {
  id: number | null;
  date: string;  // Assuming date is stored as a string
  hours: number;  // Original hours as a floating point number
  wholeHours: number;  // Computed whole hours
  minutes: number;  // Computed minutes
  milkings: number;
  description: string;
  submitted: boolean;
}

export interface MaandTotalen {
  month: string,
  hours: number,
  milkings: number
}

type WorkingHoursResponseWithOptionalId = {
  id?: number; // Optional property
  date: string;
  hours: number;
  milkings: number;
  description: string;
  submitted: boolean;
}
