import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "../../components/layout/MainLayout";
import { routes } from "../../routes";
import { useSelector } from "react-redux";
import { RootState } from "../../state/reducer";
import AuthHomeScreen from "../auth/authHome";
import { useEffect } from "react";
import api from "../../api";
import { doOnSubscribe } from "../../utils/rxjs.utils";
import { finalize } from "rxjs/operators";
import { useDispatch } from "react-redux";
import actions from "../../state/actions";
import { User } from "../../../typings/structures";


function NavMainScreen() {
  const dispatch = useDispatch()
  const { user } = useSelector((state: RootState) => state.currentUser)
 console.log('user', user)

  const refreshToken = () => {
    if (!user)
      return
    api.auth
      .TokenRefresh$(user)
      .pipe(
        doOnSubscribe(() => { }),
        finalize(() => { })
      )
      .subscribe({
        next: async (res) => {
           // console.log('token refress', res)
          if (user) {
            const updateUser: User = {
              id: user.id,
              email: user.email,
              refresh: user.refresh,
              access: res.access,
              is_superuser: user.is_superuser,
              is_adminuser: user.is_adminuser,
              is_staff: user.is_staff
            }
            dispatch(actions.user.saveUser(updateUser))
          }

        },
        error: (error: any) => {
          // console.log('error', error)
          dispatch(actions.logOut())
        }
      });

  }
  useEffect(() => {
    refreshToken()
    let interval = setInterval(refreshToken, 240000)
    return () => clearInterval(interval);
  }, [])
  return (
    user ?
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            {routes}
          </Route>
        </Routes>
      </BrowserRouter> :
      <AuthHomeScreen />
  );
}

export default NavMainScreen;
