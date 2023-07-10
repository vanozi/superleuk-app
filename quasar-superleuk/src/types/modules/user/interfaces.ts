

export interface IUser {
  id: number;
  created_at: string;
  last_modified_at: string;
  first_name: string;
  last_name: string;
  email: string;
  is_active: boolean;
  roles : IRole[];
}

export interface IRole {
  id: number;
  name: string;
  description: string;
}
