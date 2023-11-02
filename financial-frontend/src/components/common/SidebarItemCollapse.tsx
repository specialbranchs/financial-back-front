import { Collapse, List, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import colorConfigs from "../../configs/colorConfigs";
import { RouteType } from "../../routes/config";
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import SidebarItem from "./SidebarItem";
import { useSelector } from "react-redux";
import { RootState } from "../../state/reducer";
import { AccessUser } from "../../utils/directUser";
// import { RootState } from "../../redux/store";

type Props = {
  item: RouteType;
};

const SidebarItemCollapse = ({ item }: Props) => {
  const [open, setOpen] = useState(false);

  const { appState } = useSelector((state: RootState) => state.currentappState)
  const user = AccessUser()
 
  useEffect(() => {
    if (appState?.appState) {
      if (appState?.appState.includes(item.state)) {
        setOpen(true)
      }
    }
  }, [appState, item])
  return (
    item.sidebarProps ? (
      <>
        <ListItemButton
          onClick={() => setOpen(!open)}
          sx={{
            "&: hover": {
              backgroundColor: colorConfigs.sidebar.hoverBg
            },
            paddingY: "12px",
            paddingX: "24px",
            fontFamily: ['Roboto Condensed', 'sans-serif'].join(","),
            //  fontWeight:'700'
          }}
        >
          <ListItemIcon sx={{
            color: colorConfigs.sidebar.color
          }}>
            {item.sidebarProps.icon && item.sidebarProps.icon}
          </ListItemIcon>
          <ListItemText
            disableTypography
            primary={
              <Typography>
                {item.sidebarProps.displayText}
              </Typography>
            }
          />
          {open ? <ExpandLessOutlinedIcon /> : <ExpandMoreOutlinedIcon />}
        </ListItemButton>
        <Collapse in={open} timeout="auto">
          <List>
            {item.child?.map((route, index) => (
              route.sidebarProps ? (
                route.child ? (
                  <SidebarItemCollapse item={route} key={index} />
                ) : (
                  route.state == 'search.specialreport' && (user.is_adminuser || user.is_superuser) ?
                    <SidebarItem item={route} key={index} />
                    : route.state !== 'search.specialreport' ?
                      <SidebarItem item={route} key={index} /> :
                      null
                )
              ) : null
            ))}
          </List>
        </Collapse>
      </>
    ) : null
  );
};

export default SidebarItemCollapse;