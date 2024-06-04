import { number } from "yup";

export type SignInData = {
  email: string;
  password: string;
};

export type SignUpData = {
  email: string;
  password: string;
  confirmPassword: string;
};

export type AppState = {
  appState: string;
};

export type SearchDataItem = {
  name: string;
  fatherName: string;
  tinNumber: string;
  nid: string;
  podok: number;
  child: number;
  podokpost: string;
  start: string | null;
  end: string | null;
};

export type GallaryDataItem = {
  id: number;
  event: string;
  picture: File[];
};
export type ReportDataItem = {
  id: number;
  doron: string;
  title: string;
  body: string;
  picture: File[];
};

export type PersonFormData = {
  podok: number;
  child: number;
  podokdate: string;
  name: string;
  fatherName: string;
  motherName: string;
  nid: string;
  tinNumber: string;
  picture: File | null;

  parmentAdd: string;
  presentAdd: string;
  birthPlace: string;
  dateOfBirth: string;
  height: string;
  bodyColor: string;
  clue: string;
  religion: string;
  mobile: string;
  passport: string;
  education: string;
  family: string;
  wealth: string;
  profession: string;
  income: string;
  business: string;
  contribution: string;
  politicalInfo: string;
  electionInfo: string;
  mamlaInfo: string;
  sabotageInfo: string;
  arrestOrder: string;
  arrestInfo: string;
  corruptionInfo: string;
  thanaRecord: string;
  influential: string;
  evaluation: string;
};

export type ShowDataType = {
  title: string;
  display: string;
  id: number;
};

export type UploadUserData = {
  name: string;
  email: string;
  password: string;
  is_admin: boolean;
  is_staff: boolean;
};

export type ResUserData = {
  id: number;
  name: string;
  email: string;
  is_admin: boolean;
  is_staff: boolean;
  is_superuser: boolean;
};
export type ReportType = {
  doron: string;
  title: string;
  body: string;
  id: number;
  picture: Array<any>;
};

export type gallaryUploadData = {
  id: number;
  files: File[];
};
export type gallaryProgressData = {
  id: number;
  progress: number;
};
export type ChangePassword = {
  id: string;
  currentPassword: string;
  newPassword: string;
  confirmnewPassword: string;
};

export type DoronType = {
  id: number;
  title: string;
};

export type CatagoryType = {
  id: number;
  title: string;
};
