/* eslint-disable react-hooks/rules-of-hooks */
import  { createActivity } from '../axios/index'
// import { history } from '../index'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
// import DateTimePicker from '@mui/lab/DateTimePicker';



const theme = createTheme();
export default function createActivityModal(


): JSX.Element {
    const [activityStartTime, setActivityStartTime] = React.useState(new Date());
    const [activityEndTime, setActivityEndTime] = React.useState(new Date());

    const handleChangeActivityStartTime = (newValue: any) => {
        setActivityStartTime(newValue);
    };
    const handleChangeActivityEndTime = (newValue: any) => {
        setActivityEndTime(newValue);
    };
    const transferTime = (time: string) =>{
      // "2030-11-11 11:11:11"
      var result =  time.substring(6,10) + '-' + time.substring(0,2) + '-' + time.substring(3,5) + ' ' + time.substring(11,13) + ':' + time.substring(14,16) + ':00'
  
      return result
      // return(new Date(result))
    }
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const activity = {
          // "06/06/2022 03:09"
            activity_name: data.get('activity_name'),
            activity_info: data.get('activity_info'),
            start_date: transferTime(data.get('start_date')?.toString() || ''),
            end_date: transferTime(data.get('end_date')?.toString() || ''),
            total_inventory: data.get('total_inventory'),
            price:  data.get('price'),
            user_id: 4
        }
        console.log(activity)
        await createActivity(activity)
      };
     

    return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs"
       style={{"backgroundColor": "white",
       }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 20,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' ,marginTop: 5, marginBottom: 1}}>
            <EmojiPeopleIcon 
             />
          </Avatar>
          <Typography component="h1" variant="h5">
          Create A New Activity
          </Typography>
        
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Grid container spacing={2}>
              {/* <Grid item xs={12} sm={6}>
              </Grid>
              <Grid item xs={12} sm={6}>
              </Grid> */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="activity_name"
                  label="活動名稱"
                  name="activity_name"
                />
              </Grid>
              <Grid item xs={24}>
                <TextField
                  required
                  fullWidth
                  name="activity_info"
                  label="活動資訊"
                  id="activity_info"
                  multiline
                  rows={4}
                />
        
              </Grid>
              <Grid item xs={12}>
                  <DateTimePicker
                    label="購票開始時間"
                    value={activityStartTime}
                    onChange={handleChangeActivityStartTime}
                    renderInput={(params) => <TextField {...params} fullWidth required id="start_date" name="start_date"/>}
                    // style={{"color": "white"}}
                    disablePast
                    ampm={false}
                    toolbarFormat="YYYY-MM-DD HH:mm:ss"
                
                    />
              </Grid>
              <Grid item xs={12}>
                  <DateTimePicker
                    label="購票結束時間"
                    value={activityEndTime}
                    onChange={handleChangeActivityEndTime}
                    renderInput={(params) => <TextField {...params} fullWidth required id="end_date" name="end_date"/>}
                    // style={{"color": "white"}}
                    disablePast
                    ampm={false}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="price"
                  label="價格"
                  name="price"
                  type="number"
                />
              </Grid>
             
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="total_inventory"
                  label="活動人數"
                  name="total_inventory"
                  type="number"
                />
              </Grid>
             
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 5, mb: 5}}

    
            >
              Create
            </Button>
            </LocalizationProvider>
          </Box>
        
        </Box>

      </Container>

    </ThemeProvider>
    )
}
    