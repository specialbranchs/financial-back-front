import { AppBar, Box, Link, ListItemButton, ListItemText, Toolbar, Typography } from "@mui/material";
import colorConfigs from "../../configs/colorConfigs";
import sizeConfigs from "../../configs/sizeConfigs";
import { NavLink } from "react-router-dom";
import actions from "../../state/actions";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { RootState } from "../../state/reducer";

const Topbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.currentUser)
  return (
  
        <Toolbar
          sx={{
            mr: 15,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <Box>
            <Typography sx={{
              fontFamily: ['Raleway', 'sans-serif'].join(","),
            }}>
              {user?.email}
            </Typography>
          </Box>
          <Box ml={2}>
            <ListItemButton
              sx={{
                borderRadius: 10,
                fontFamily: ['Raleway', 'sans-serif'].join(","),
                fontSize: 14,
                backgroundColor: '#aa94d6',
                color: 'white',
                fontWeight: '100'
              }}
              onClick={() => {
                navigate('/');
                dispatch(actions.user.removeUser())

              }}>
              LOGOUT
            </ListItemButton>
          </Box>
        </Toolbar>
  );
};

export default Topbar;