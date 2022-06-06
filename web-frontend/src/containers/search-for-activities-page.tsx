import * as React from 'react';
import AppBar from '@mui/material/AppBar';
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

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '} {'tictake@'}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const tiers = [
  {
    title: 'title1',
    price: '100',
    description: [
      'description1',
      'description1',
      'description1',
      'description1',
    ],
    buttonText: 'BUY IT NOW',
    buttonVariant: 'outlined',
  },
  {
    title: 'title2',
    // subheader: 'Most popular',
    price: '200',
    description: [
        'Like the sun that hangs above the sky I wanna see us hang, just you and I Like the ocean gives away the breeze I wanna ride your wave and be your tide'
    ],
    buttonText: 'BUY IT NOW',
    buttonVariant: 'outlined',
  },
  {
    title: 'Enterprise',
    price: '30',
    description: [
        'description1description1description1description1description1description1description1 ',
        'description1',
        // 'description1',
        // 'description1',
    ],
    buttonText:'BUY IT NOW',
    buttonVariant: 'outlined',
  },
  {
    title: 'Enterprise',
    price: '30',
    description: [
        'description1description1description1description1description1description1description1 ',
        'description1',
        // 'description1',
        // 'description1',
    ],
    buttonText:'BUY IT NOW',
    buttonVariant: 'outlined',
  },
  {
    title: 'Enterprise',
    price: '30',
    description: [
        'description1description1description1description1description1description1description1 ',
        'description1',
        // 'description1',
        // 'description1',
    ],
    buttonText:'BUY IT NOW',
    buttonVariant: 'outlined',
  },
  {
    title: 'Enterprise',
    price: '30',
    description: [
        'description1description1description1description1description1description1description1 ',
        'description1',
        // 'description1',
        // 'description1',
    ],
    buttonText:'BUY IT NOW',
    buttonVariant: 'outlined',
  },
  {
    title: 'Enterprise',
    price: '30',
    description: [
        'description1description1description1description1description1description1description1 ',
        'description1',
        // 'description1',
        // 'description1',
    ],
    buttonText:'BUY IT NOW',
    buttonVariant: 'outlined',
  },
];


function PricingContent() {
  React.useEffect( () => {
    console.log('useEffect')
    const data = getAllActivities();

  }, []);


  return (
    <React.Fragment>
       
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
      <AppBar
        position="static"
        color="inherit"
        elevation={0}
        // style={{"backgroundColor": "rgb(0,85,150)"}}
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
            >
              search for activities
            </Link>

            <Link
              variant="button"
              color="text.primary"
              href="/create-activity"
              sx={{ my: 1, mx: 1.5 }}
            //   onClick={()=> { history.push('./create-activity')}}
            >
              Create Activity
            </Link>
            <Link
              variant="button"
              color="text.primary"
              href="/my-tickets"
              sx={{ my: 1, mx: 1.5 }}
            >
              My Tickets
            </Link>
          </nav>
          <Button href="#" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
            Log Out
          </Button>
        </Toolbar>
      </AppBar>
      {/* Hero unit */}
      <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
        <Typography
          component="h2"
          variant="h3"
          align="center"
          color="text.primary"
          gutterBottom
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
      {/* End hero unit */}
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end"
            style={{"marginTop": "40px"}}>
          {tiers.map((tier, idx) => (
            // Enterprise card is full width at sm breakpoint
            <Grid
            style={{"height": "400px"}}
             
              item
              key={idx}
              xs={12}
              sm={tier.title === 'Enterprise' ? 12 : 6}
              md={4}
            >
              <Card>
                <CardHeader
                //   style={{"backgroundColor": "rgb(62, 80, 120)"}}
                  style={{"backgroundColor": "white", "color": "black"}}
                  
                  title={tier.title}
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
                <CardContent
                    // style={{"backgroundColor": "rgb(0, 0, 0)"}}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'baseline',
                      mb: 2,
                    }}
                  >
                    <Typography component="h2" variant="h3" color="text.primary">
                      ${tier.price}
                    </Typography>
                    <Typography variant="h6" color="text.secondary"
                     style={{"marginLeft": "10px"}}
                    >
                       NTD
                    </Typography>
                  </Box>
                  <ul>
                    {tier.description.map((line, idx) => (
                        <div
                        key={idx}
                        style={{"whiteSpace": "normal",
                        "wordBreak": "break-all",
                        "wordWrap": "break-word"
                        }}>
                            <p>{line}</p>
                        </div>
                    //   <Typography
                    //     component="li"
                    //     variant="subtitle1"
                    //     align="center"
                    //     key={line}
                    //   >
                    //     {line}
                    //   </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions 
                >
                  <BuyTicketModal id={tier.title}></BuyTicketModal>
                  {/* <Button
                    fullWidth
                    variant={tier.buttonVariant as 'outlined' | 'contained'}
                  >
                    {tier.buttonText}
                  </Button> */}
                  
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      {/* Footer */}
      <Container
        style={{"marginTop": "130px"}}
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

    </React.Fragment>
  );
}

export default function SearchForActivitiesPage() {
  return <PricingContent />;
}