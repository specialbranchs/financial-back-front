import { Grid, LinearProgress, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import api from '../../../api';

import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import { doOnSubscribe } from '../../../utils/rxjs.utils';
import { finalize } from 'rxjs/operators';
import colorConfigs from '../../../configs/colorConfigs';
import { ChartJs } from './chart/chart';
import { sxStyle } from '../search/editsearch/PersonDetails';
type Props = {};

const DashboardIndex = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const [report, setreport] = useState([])
  const [count, setcount] = useState(0)
  const [reportData, setReportData] = useState([])
  
  const GetReport = () => {
    api.report
      .genReport$()
      .pipe(
        doOnSubscribe(() => setLoading(true)),
        finalize(() => setLoading(false))
      )
      .subscribe({
        next: async (res) => {
          // console.log('user', res)
          setcount(res.totalpodok)
          setreport(res.data)
          setReportData(res.reportData)
          setLoading(false)
        },
        error: (error: any) => {
          // console.log(error)
          setLoading(false)
        }
      });
  }
  useEffect(() => {
    GetReport()
  }, [])
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sx={{
        flexDirection: 'row',
        display:'flex',
        alignItems:'center'
      }}>

        <Typography variant="h6" gutterBottom sx={{
          color: colorConfigs.sidebar.bg,
          fontSize:18,
          fontWeight:'500',
          fontFamily: sxStyle.fontFamily
        }}>সর্বমোট ভেরিফাইড পার্সন - </Typography>
        <Typography variant="h6" gutterBottom sx={{
          color: colorConfigs.sidebar.bg,
          fontSize:16,
          fontWeight:'500',
         
          fontFamily:sxStyle.fontFamily
        }}>{count} জন</Typography>
      </Grid>
      <Grid item xs={6}>
        {
          report.slice(0, 5).map((val: any) => (
            <List key={val?.id} sx={{ borderBottom: 1, borderColor: 'whitesmoke' }}>
              <ListItem >
                <ListItemAvatar >
                  <Avatar>
                    <FormatColorFillIcon sx={{ color: colorConfigs.sidebar.bg }} />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText 
                  primary={<Typography variant="h6" gutterBottom sx={{
                    color: colorConfigs.sidebar.bg,
                    fontSize: 16,
                    fontFamily:sxStyle.fontFamily
                  }}>{val?.title}</Typography>} 
                  secondary={
                    <Typography variant="h5" gutterBottom sx={{
                      color: colorConfigs.sidebar.bg,
                      fontSize: 12,
                      fontFamily:sxStyle.fontFamily
                    }}>{val?.total_count} জন
                     <LinearProgress variant="determinate" value={70} sx={{mt:2}} />
                    </Typography>
                  }/>
              </ListItem>

            </List>
          ))
        }


      </Grid>

      <Grid xs={6} sx={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
        <ChartJs
          data={Array.from(report, (val: any) => val?.total_count)}
          labels={Array.from(report, (val: any) => val?.title)}
          dataset='পার্সন '
          
        />
      </Grid>

      <Grid item xs={12}  sx={{
        flexDirection: 'row',
        display:'flex',
        alignItems:'center',
        borderTop:1,
        borderTopColor:'whitesmoke'
      }}>
        {/* <Typography variant="h6" gutterBottom sx={{
          color: colorConfigs.sidebar.bg,
          fontFamily: ['Roboto Condensed', 'sans-serif'].join(",")
        }}>{count}</Typography> */}
        <Typography variant="h6" gutterBottom sx={{
          color: colorConfigs.sidebar.bg,
          fontSize:18,
          fontWeight:'500',
          fontFamily:sxStyle.fontFamily
        }}>সর্বমোট রিপোর্ট</Typography>
      </Grid>
      <Grid item xs={6} >
        {
          reportData.map((val: any) => (
            <List key={val?.id} sx={{ borderBottom: 1, borderColor: 'whitesmoke' }}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <FormatColorFillIcon sx={{ color: colorConfigs.sidebar.bg }} />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText secondary={
                  <Typography variant="h5" gutterBottom sx={{
                    color: colorConfigs.sidebar.bg,
                    fontSize: 12,
                    fontFamily: sxStyle.fontFamily
                  }}>{val?.doron__count} টি
                   <LinearProgress variant="determinate" value={70} sx={{mt:2}} />
                  </Typography>
                } primary={<Typography variant="h6" gutterBottom sx={{
                  color: colorConfigs.sidebar.bg,
                  fontSize: 16,
                  fontFamily: sxStyle.fontFamily
                }}>{val?.doron}
                
                </Typography>} />
              </ListItem>

            </List>
          ))
        }


      </Grid>
      <Grid xs={6} sx={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
        <ChartJs
          data={Array.from(reportData, (val: any) => val?.doron__count)}
          labels={Array.from(reportData, (val: any) => val?.doron)}
          dataset='রিপোর্ট'
        />
      </Grid>
    </Grid>

  );
};

export default DashboardIndex;