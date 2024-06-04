import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { User } from "../../../typings/structures";
import {
  ChangePassword,
  SignInData,
  SignUpData,
  UploadUserData,
} from "../../../typings/formData";
import client from "../../api/client";
import jwtDecode from "jwt-decode";

type SignInResponseData = {
  status: number;
  statusText: string;
  access: string;
  refresh: string;
};

const signInRequest$ = (data: SignInData): Observable<User> =>
  client
    .post<SignInResponseData>("token/", {
      email: data.email,
      password: data.password,
    })
    .pipe(
      map((response) => {
        const detail: any = jwtDecode(response.data.access);
        // console.log('any',detail)
        const user: User = {
          id: detail.user_id,
          refresh: response.data.refresh,
          access: response.data.access,
          email: detail.email,
          name:detail.name,
          is_superuser: detail.is_superuser,
          is_adminuser: detail.is_adminuser,
          is_staff: detail.is_staff,
        };

        return user;
      })
    );

const signUpRequest$ = (data: UploadUserData): Observable<any> =>
  client
    .post<any>("register", {
      email: data.email,
      password: data.password,
      name: data.name,
      is_admin: data.is_admin,
      is_staff: data.is_staff,
    })
    .pipe(
      map((response) => {
        const data = response.data;
        return data;
      })
    );

const TokenRefresh$ = (data: User | null): Observable<any> =>
  client
    .post<any>("token/refresh/", {
      refresh: data?.refresh,
    })
    .pipe(
      map((response) => {
        const data = response.data;
        // console.log('refresh',data)
        return data;
      })
    );
const userList$ = (): Observable<any> =>
  client.get<any>("user").pipe(
    map((response) => {
      const data = response.data;
      return data;
    })
  );

const delUser$ = (id: number): Observable<any> =>
  client
    .put<any>("user", {
      id: id,
    })
    .pipe(
      map((response) => {
        // console.log('res', response.data)
        const responseData = response.data;

        return responseData;
      })
    );

    const ResetPassword = (data: ChangePassword): Observable<any> =>
      client.post<any>('change-password', data).pipe(
        map(response => {
          // console.log('res', response.data)
          const responseData = response.data;
    
          return responseData;
        }),
      );
      
export default {
  signInRequest$,
  signUpRequest$,
  TokenRefresh$,
  userList$,
  delUser$,
  ResetPassword
};
