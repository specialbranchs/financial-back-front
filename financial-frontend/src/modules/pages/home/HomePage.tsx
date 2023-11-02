import { Button, Stack, Typography } from '@mui/material';
import { Avatar, Box, Grid, Toolbar } from '@mui/material';
import React from 'react';
import assets from '../../../assets';
import colorConfigs from '../../../configs/colorConfigs';
import { useNavigate } from 'react-router-dom';

type Props = {};

const HomePage = (props: Props) => {
  const navigate=useNavigate()
  return (

    <Grid container>
      <Grid xs={4} sx={{

        height: '90vh',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex'
      }}>
        <Box>
          <Avatar src={assets.images.logo} sx={{ height: 200, width: 200 }} />
        </Box>
      </Grid>
      <Grid xs={8}
        sx={{

          height: '90vh',

          alignItems: 'center',
          display: 'flex'
        }}
      >
        <Stack spacing={2} direction="column">
          <Typography variant="h4" gutterBottom sx={{
            color: colorConfigs.sidebar.bg,
            letterSpacing: 5,
            fontFamily: ['Raleway', 'sans-serif'].join(",")
          }}>
            FINANCIAL - INTELLIGENCE
          </Typography>
          <Typography sx={{
            color: colorConfigs.sidebar.bg,
            fontFamily: ['Raleway', 'sans-serif'].join(",")
          }}>
            Financial intelligence focuses on gathering, analyzing, and disseminating
            financial information to support various objectives, such as national security, regulatory compliance.
          </Typography>
          <Box>
            <Button onClick={()=>navigate('/search/person')} variant="outlined" sx={{  fontFamily: ['Raleway', 'sans-serif'].join(","), color: colorConfigs.sidebar.bg,}}>GET STARTED</Button>
          </Box>
        </Stack>
      </Grid>
    </Grid>

  );
};

export default HomePage;