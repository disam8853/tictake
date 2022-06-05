// import * as React from 'react';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
// import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
// import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import  { signUp } from '../axios/index'

// import EventsTable from '../components/EventsTable';
// import type { TableOptions, CellProps } from 'react-table'

// const data = {
//     events: [
//         {'id':'123', 
//         'activityName': 'activityName',
//         'activityInfo':'activityInfo',
//         'activityStartTime': new Date(),
//         'activityEndTime': new Date(),
//         'totalInventory':20,
//     }
//     ]
// }
// export default function MyTickets() {
//     const columns = React.useMemo(
//         () => [
//           {
//             Header: '已購買活動票券',
//             columns: [
//               {
//                 Header: "ID",
//                 accessor: 'id',          
//                 // Cell: ({ cell }:CellProps<Event>) => (
//                 //   <div style={{ textAlign: "center" }}>
//                 //     <a href={`eventStatus/${cell.row.values.id}`} >{cell.row.values.id}</a>
//                 //   </div>
//                 // )
//               },    
//               {
//                 Header: '活動名稱',
//                 accessor: 'activityName',
//                 // Cell: ({ cell }:CellProps<Event>) => (
//                 //   <p>{convertEventStatus(cell.row.values.status)}</p>
//                 // ),
//                 // Filter: SelectColumnFilter
//               },
//               {
//                 Header: '活動資訊',
//                 accessor: 'activityInfo',
//               },
        
              
//             ],
//           },
//         ],
//         []
//       )

//   return (
//     <EventsTable columns={columns} data={ data?.events || []}/>
//   );
// }


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
      "backgroundSize": "cover",
        "backgroundColor": "white"
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
  
      </div>
    </React.Fragment>
  );
}

export default function SearchForActivitiesPage() {
  return <PricingContent 
  
  />;
}