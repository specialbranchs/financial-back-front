import { Avatar, Drawer, List, Stack, Toolbar } from "@mui/material";
import assets from "../../assets";
import colorConfigs from "../../configs/colorConfigs";
import sizeConfigs from "../../configs/sizeConfigs";

import SidebarItem from "./SidebarItem";
import SidebarItemCollapse from "./SidebarItemCollapse";
import appRoutes from "../../routes/appRoutes";
import { AccessUser } from "../../utils/directUser";
import AppRoutesData from "../../routes/appRoutes";

const Sidebar = () => {
  const user = AccessUser();
  const {appRoutes} =AppRoutesData()
  return (
    <List disablePadding>
      {appRoutes.map((route, index) =>
        route.sidebarProps ? (
          route.child ? (
            <SidebarItemCollapse item={route} key={index} />
          ) : route.state == "admin" && user.is_superuser ? (
            <SidebarItem item={route} key={index} />
          ) : route.state !== "admin" ? (
            <SidebarItem item={route} key={index} />
          ) : null
        ) : null
      )}
    </List>
  );
};

export default Sidebar;
