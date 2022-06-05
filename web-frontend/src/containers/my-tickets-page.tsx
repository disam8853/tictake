/* eslint-disable @typescript-eslint/no-unused-expressions */

import TicketsTable from '../components/TicketsTable';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { getAllTicketsByUser } from '../axios';
import { getAllActivities } from '../axios';
import { TicketType } from '../Types/ticket';
import { ActivityType } from '../Types/ticket';

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
  const [tickets, setTickets] = React.useState<TicketType[]>([]);
  const [activities, setActivities] = React.useState<ActivityType[]>([]);
  const [showTickets, setShowTickets] = React.useState<TicketType[]>([]);


  
  React.useEffect( ()=>{
    getAllTicketsByUser(setTickets)
    getAllActivities(setActivities)
  }, [])

  React.useEffect( ()=>{
    let actuall_tickets_map = new Map();
    let actuall_tickets = []; 
    tickets.forEach((ticket)=>{
      var found = activities.filter(function(item) { return item.activity_id == ticket.activity_id; });
      if(found.length != 0){
        var actuall_ticket = ticket

        actuall_ticket['activity_info'] = found[0]['activity_info']
        actuall_ticket['activity_name'] = found[0]['activity_name']
        actuall_ticket['price'] = found[0]['price']
        if(typeof actuall_tickets_map.get(ticket.activity_id) !== 'undefined'){
          actuall_ticket['cnt'] = actuall_tickets_map.get(ticket.activity_id)['cnt'] += 1
        } else {
          actuall_ticket['cnt'] = 1
        }
        actuall_tickets_map.set(ticket.activity_id, actuall_ticket)
      } 
    })
    for (const [key, value] of actuall_tickets_map.entries()) {
       actuall_tickets.push(value);
    }
    // actuall_tickets.sort()
    setShowTickets(actuall_tickets)
  }, [activities])
   
      const columns = React.useMemo(
        () => [
          {
            Header: '已購買活動票券',
            columns: [
              {
                Header: "活動 ID",
                accessor: 'activity_id',          
              },    
              {
                Header: '活動名稱',
                accessor: 'activity_name',
              },
              {
                Header: '活動資訊',
                accessor: 'activity_info',
              },
              {
                Header: '活動票價',
                accessor: 'price',
              },
              {
                Header: '票券張數',
                accessor: 'cnt',
              },
        
              
            ],
          },
        ],
        []
      )
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
        style={{"backgroundColor": "black" ,"color": "white",
      
        "marginBottom": "100px",
 
      }}
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
      <Container 
      style={{ "backgroundColor": "white",
      "padding": "100px",
     }}>
      <TicketsTable 
       style={{ "padding": "100px"}}
      columns={columns} data={ showTickets || []}/>
      </Container>
      </div>
    </React.Fragment>
  );
}

export default function SearchForActivitiesPage() {
  return <PricingContent 
  
  />;
}