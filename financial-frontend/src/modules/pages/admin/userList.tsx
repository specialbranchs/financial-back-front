import { Box, ListItemText, Toolbar, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Button from '@mui/joy/Button';
import api from '../../../api';
import { doOnSubscribe } from '../../../utils/rxjs.utils';
import { finalize } from 'rxjs/operators';
import { ResUserData } from '../../../../typings/formData';
import colorConfigs from '../../../configs/colorConfigs';
type Props={
    userList:Array<ResUserData>
    AllUser:any
}
const UserListScreen = ({userList,AllUser}:Props) => {
 
  const DelCat = (id: number) => {
    api.auth
      .delUser$(id)
      .pipe(
        doOnSubscribe(() => { }),
        finalize(() => { })
      )
      .subscribe({
        next: async (res) => {
          // console.log('res', res)

          if (res.del) {
            AllUser()
          } else {
            alert(res.mess)
          }

        },
        error: () => {
          // console.log(error)


        }
      });
  }

 
  return (
    <>
  
     {
        userList.map(value => (
          <Toolbar
            key={value.email}
            variant='dense'
            sx={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              backgroundColor: '#fafafa',
              borderRadius: 2,
              padding: 1,
              marginY: 1
            }}>
            <Box>
              <ListItemText primary={
                <Typography
                  variant="h5"
                  gutterBottom sx={{
                    color: colorConfigs.sidebar.bg,
                    fontSize: 16,
                    fontFamily: ['Roboto Condensed', 'sans-serif'].join(","),
                    fontWeight: '100'
                  }}
                >
                  {value.name}
                </Typography>
              }
                secondary={<Typography
                  sx={{
                    fontSize: 12,
                    fontFamily: ['Roboto Condensed', 'sans-serif'].join(","),
                    textDecoration: 'underline',
                    color: 'green',
                    fontWeight: '100'
                  }}>
                  {value.is_admin ? "Admin, Staff" : "Staff"}
                </Typography>} />

            </Box>
            <Box>
              <Typography sx={{
                fontSize: 16,
                fontFamily: ['Roboto Condensed', 'sans-serif'].join(","),
                fontWeight: '100'
              }}
              >
                {value?.email}
              </Typography>
            </Box>

            <Box >
              <Button onClick={() => DelCat(value.id)} size='sm' variant="soft" >
                <DeleteOutlineIcon sx={{ color: 'red' }} />
              </Button>


            </Box>
          </Toolbar>
        ))
      }
    </>
  )
}

export default UserListScreen
