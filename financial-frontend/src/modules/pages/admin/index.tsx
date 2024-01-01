import { LoadingButton } from '@mui/lab'
import { Box, FormControl, FormControlLabel, FormGroup, ListItemText, Switch, TextField, Toolbar, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import useDesignation from '../../../hooks/useCatagoris';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Button from '@mui/joy/Button';
import api from '../../../api';
import { doOnSubscribe } from '../../../utils/rxjs.utils';
import { finalize } from 'rxjs/operators';
import { ResUserData, UploadUserData } from '../../../../typings/formData';
import * as Yup from "yup";
import { PASSWORD_MIN_LENGTH } from '../../../utils/config';
import { useFormik } from 'formik';
import colorConfigs from '../../../configs/colorConfigs';

import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import React from 'react';
import AddUserScreen from './add';
import UserListScreen from './userList';
const AdminScreen = () => {
  const [loading, setLoading] = useState(false);
  const [error, seterror] = useState('')
  const [userList, setUserList] = useState<Array<ResUserData>>([])



  useEffect(() => {
    AllUser()
  }, [])
  const AllUser = () => {
    api.auth
      .userList$()
      .pipe(
        doOnSubscribe(() => { }),
        finalize(() => { })
      )
      .subscribe({
        next: async (res) => {
          //  console.log('res', res)
          setUserList(res)
        },
        error: (error: any) => {
        }
      });
  }
 

  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <>
    <Box  sx={{justifyContent:'center',alignItems:'center'}}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Add User" value="1" />
            <Tab label="User List" value="2" />
           
          </TabList>
        </Box>
        <TabPanel value="1">
          <AddUserScreen AllUser={AllUser}/>
        </TabPanel>
        <TabPanel value="2">
          <UserListScreen userList={userList} AllUser={AllUser}/>
        </TabPanel>
       
      </TabContext>
    </Box>
    </>
  )
}

export default AdminScreen
