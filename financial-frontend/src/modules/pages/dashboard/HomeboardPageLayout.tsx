import { Outlet } from "react-router-dom";
import HomePage from "../home/HomePage";

const HomeboardPageLayout = () => {
  // console.log('dashboard page layout')
  return (
    <><Outlet />
     <HomePage/>
    </>
  );
};

export default HomeboardPageLayout;