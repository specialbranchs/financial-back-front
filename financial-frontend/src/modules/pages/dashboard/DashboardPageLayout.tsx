import { Outlet } from "react-router-dom";
import HomePage from "../home/HomePage";

const DashboardPageLayout = () => {
  // console.log('dashboard page layout')
  return (
    <><Outlet />
    </>
  );
};

export default DashboardPageLayout;