import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/StarBorder';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { history } from '../index'
import BuyTicketModal from '../components/buy-ticket-modal';
import Modal from '@mui/material/Modal';
import  { getAllActivities } from '../axios/index'
import { ActivityType } from '../Types/ticket';
import LoadingSpin from "react-loading-spin";

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '} {'tictake@'}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function SearchForActivitiesContent() {
  const [activities, setActivities] = React.useState<ActivityType[]>([]);
  React.useEffect( () => {
    getAllActivities(setActivities)
  }, []);

  React.useEffect( ()=>{
  }, [activities])

  return (
    <React.Fragment>
       
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
      {/* Hero unit */}
      <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 0, pb: 6 }}>
        <Typography
          component="h2"
          variant="h3"
          align="center"
          color="text.primary"
          gutterBottom
          style={{ "marginTop": "50px" }}
        >
          Tonight,
        </Typography>
        <Typography
          component="h3"
          variant="h3"
          align="center"
          color="text.primary"
          gutterBottom
        >
          I want something special
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" component="p">
           Do you feel bored with life?
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" component="p">
           Quickly buy activity tickets and have fun maybe!
        </Typography>
      </Container>

       

     
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end"
            // style={{"marginTop": "30px"}}
          >
          {activities.map((activitiy, idx) => 
            
            // Enterprise card is full width at sm breakpoint
            (<Grid
            style={{"height": "400px"}}
              item
              key={idx}
              xs={12}
              sm={activitiy.activity_name === 'Enterprise' ? 12 : 6}
              md={4}
            >
              <Card>
                <CardHeader
                  style={{"backgroundColor": "white", "color": "black"}}
                  title={activitiy.activity_name}
                //   subheader={tier.subheader}
                  titleTypographyProps={{ align: 'center' }}
                //   action={tier.title === 'Pro' ? <StarIcon /> : null}
                  subheaderTypographyProps={{
                    align: 'center',
                  }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'light'
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'baseline',
                      mb: 2,
                    }}
                  >
                    <Typography component="h2" variant="h3" color="text.primary">
                      ${activitiy.price}
                    </Typography>
                    <Typography variant="h6" color="text.secondary"
                     style={{"marginLeft": "10px"}}
                    >
                       NTD
                    </Typography>
                  </Box>
                  <ul style={{"textAlign": "center"}}>
                    <li>活動資訊：{activitiy.activity_info}</li>
                    <li>剩餘名額：{`${activitiy.remaining_inventory} / ${activitiy.total_inventory}`}</li>

                    {/* <li>創立時間：{activitiy.created_time.toString}</li> */}
                  </ul>

                  

                   
                </CardContent>
                <CardActions>
                  <BuyTicketModal 
                    activity_id={activitiy.activity_id} 
                    activity_name={activitiy.activity_name}
                    activity_remaining_inventory={activitiy.remaining_inventory}></BuyTicketModal>                  
                </CardActions>
              </Card>
            </Grid>)
          )}
        </Grid>
      </Container>

      {/* Footer */}
      <Container
        style={{"marginTop": "130px"}}
        maxWidth="md"
        component="footer"
        sx={{
          borderTop: (theme) => `3px solid ${theme.palette.divider}`,
          mt: 8,
          py: [3, 6],
        }}
      >
        <Grid container spacing={4} justifyContent="space-evenly"></Grid>
        <Copyright sx={{ mt: 5 }} />
      </Container>
      {/* End footer */}
    </React.Fragment>
  );
}

export default function SearchForActivitiesPage() {
  return <SearchForActivitiesContent />;
}