import * as React from 'react';
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
    <div style={{ "paddingTop": "100px"}}>
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
  return <PricingContent/>;
}