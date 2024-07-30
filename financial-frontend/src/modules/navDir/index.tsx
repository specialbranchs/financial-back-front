import { useSelector } from "react-redux";
import { RootState } from "../../state/reducer";
import AuthHomeScreen from "../auth/authHome";
import DrawerMainScreen from "../../components/layout/DrawerMainLayout";


function NavMainScreen() {
  const { user } = useSelector((state: RootState) => state.currentUser);
  return user ? <DrawerMainScreen /> : <AuthHomeScreen />;
}

export default NavMainScreen;
