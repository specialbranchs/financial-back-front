export type User = {
  id: number;
  refresh: string;
  access: string;
  email: string;
  name:string;
  is_superuser:boolean;
  is_adminuser:boolean;
  is_staff:boolean;

};

export type Designation = {
  id: number;
  title: string;
}

export type ReportSearch = {
  title: string,
  catagory: string
}