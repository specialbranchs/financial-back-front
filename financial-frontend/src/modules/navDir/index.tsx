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
import DrawerMainScreen from "../../components/layout/DrawerMainLayout";
import { MilTMin } from "../../utils/config";
import jwtDecode from "jwt-decode";

function NavMainScreen() {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.currentUser);
  //  console.log('user', user)

  const refreshToken = () => {
    if (!user) return;
    const { exp }: any = jwtDecode(user.refresh);
    const expirationTime = exp * 1000;
    if (Date.now() >= expirationTime) {
      dispatch(actions.logOut());
    }

    api.auth
      .TokenRefresh$(user)
      .pipe(
        doOnSubscribe(() => {}),
        finalize(() => {})
      )
      .subscribe({
        next: async (res) => {
          if (user) {
            const updateUser: User = {
              id: user.id,
              name: user.name,
              email: user.email,
              refresh: user.refresh,
              access: res.access,
              is_superuser: user.is_superuser,
              is_adminuser: user.is_adminuser,
              is_staff: user.is_staff,
            };
            dispatch(actions.user.saveUser(updateUser));
          }
        },
        error: (error: any) => {
          // console.log('error', error)
          dispatch(actions.logOut());
        },
      });
  };
  useEffect(() => {
    refreshToken();
    let interval = setInterval(refreshToken, MilTMin * 25);
    return () => clearInterval(interval);
  }, []);
  return user ? <DrawerMainScreen /> : <AuthHomeScreen />;
}

export default NavMainScreen;
