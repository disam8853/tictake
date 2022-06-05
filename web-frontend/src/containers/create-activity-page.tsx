import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { history } from '../index'
import CreateActivityModal from '../components/create-activity-modal';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '} {'tictake@'}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


function PricingContent() {
  return (
    <React.Fragment>
    <div style={{
      // "backgroundImage": "url('view-1.png')",
      "backgroundSize": "cover"
    // "backgroundColor": "rgba(0, 0, 0, .6)"
    }}>
       
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
      <AppBar
        position="static"
        color="inherit"
        elevation={0}
        style={{"backgroundColor": "black" ,"color": "white"}}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
        
      >
        <Toolbar sx={{ flexWrap: 'wrap' }}>
           <SmartToyIcon fontSize='large' style={{'marginRight': '10px'}} />
        
          <Typography variant="h5" color="inherit" noWrap sx={{ flexGrow: 1 }}>
          Tictake
          </Typography>
          <nav>
           
            <Link
              variant="button"
              color="text.primary"
              href="/search-for-activities"
              sx={{ my: 1, mx: 1.5 }}
              style={{"backgroundColor": "black" ,"color": "white"}}
            >
              search for activities
            </Link>

            <Link
              variant="button"
              color="text.primary"
              href="/create-activity"
              sx={{ my: 1, mx: 1.5 }}
              style={{"backgroundColor": "black" ,"color": "white"}}
            //   onClick={()=> { history.push('./create-activity')}}
            >
              Create Activity
            </Link>
            <Link
              variant="button"
              color="text.primary"
              href="/my-tickets"
              sx={{ my: 1, mx: 1.5 }}
              style={{"backgroundColor": "black" ,"color": "white"}}
            >
              My Tickets
            </Link>
          </nav>
          <Button href="#" variant="contained" sx={{ my: 1, mx: 1.5 }}
             style={{"backgroundColor": "white" ,"color": "black"}}
          >
            Log Out
          </Button>
        </Toolbar>
      </AppBar>
      <CreateActivityModal/>
      <Container maxWidth="md" component="main">
      </Container>
      {/* Footer */}
      <Container
        // style={{"marginTop": "130px"}}
        maxWidth="md"
        component="footer"
        sx={{
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          mt: 8,
          py: [3, 6],
        }}
      >
        <Grid 
        //  style={{"marginTop": "100px"}}
        container spacing={4} justifyContent="space-evenly">
        </Grid>
        <Copyright 
    
        sx={{ mt: 5 }} />
      </Container>
      {/* End footer */}
      </div>

    </React.Fragment>
  );
}

export default function SearchForActivitiesPage() {
  return <PricingContent 
  
  />;
}