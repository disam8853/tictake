/* eslint-disable @typescript-eslint/no-unused-expressions */

import TicketsTable from '../components/TicketsTable';
import * as React from 'react';
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
import type { CellProps } from 'react-table'
import TicketModal from '../components/ticket-modal.';

import { payOrder } from '../axios';
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
    let actuall_tickets: TicketType[] = []; 
    tickets.forEach((ticket)=>{
      var found = activities.filter(function(item) { return item.activity_id == ticket.activity_id; });
      if(found.length != 0){
        var actuall_ticket = ticket
 

        actuall_ticket['activity_info'] = found[0]['activity_info']
        actuall_ticket['activity_name'] = found[0]['activity_name']
        actuall_ticket['price'] = found[0]['price']

        actuall_tickets.push(actuall_ticket);
        // if(typeof actuall_tickets_map.get(ticket.activity_id) !== 'undefined'){
        //   actuall_ticket['cnt'] = actuall_tickets_map.get(ticket.activity_id)['cnt'] += 1
        // } else {
        //   actuall_ticket['cnt'] = 1
        // }
        actuall_tickets_map.set(ticket.activity_id, actuall_ticket)
      } 
    })
    // for (const [key, value] of actuall_tickets_map.entries()) {
    //    actuall_tickets.push(value);
    // }
    // actuall_tickets.reverse()
    setShowTickets(actuall_tickets)
  }, [tickets])

  const convertStatus = (status:number) => {
    if(status == 1) { return '已付款'}
    else{ return '未付款'}
  }
   
  const columns = React.useMemo(
    () => [
      {
        Header: '已購買活動票券',
        columns: [
          {
            Header: '訂單編號',
            accessor: 'key',
          },
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
            Header: '付款狀態',
            accessor: 'has_paid',
            Cell: ({ cell }:CellProps<Event>) => (
              <div 
              style={{textDecoration:'underline' }}
                onClick={async ()=>{
                  if(cell.row.values.has_paid == 0){
                    const order = {
                      ticket_id: encodeURIComponent(cell.row.values.key)
                    }
                    await payOrder(order);
                    var found = tickets.filter(function(item) { return item.key == cell.row.values.key})
                    var after_tickets = tickets.filter(function(item) { return item.key != cell.row.values.key})
                    if(found.length != 0){
                      found[0]['has_paid'] = '1'
                      after_tickets.push(found[0])
                    }
                    // after_tickets.reverse()
                    setShowTickets(after_tickets)    
                  }
              }
              }>{convertStatus(cell.row.values.has_paid)} {cell.row.values.has_paid == 1? (<></>):(`(按下付款)`)}</div>
            ),
          },
          
          // {
          //   Header: '票券張數',
          //   accessor: 'cnt',
          //   // Cell: TicketCell(tickets)
          //   Cell: ({ cell }:CellProps<Event>) => (
          //     <div style={{ textAlign: "center", color: 'blue', textDecoration:'underline' }}>
          //        <TicketModal cnt={cell.row.cells[4].value} activity_id={cell.row.cells[0].value} tickets = {tickets.filter(function(item) { return item.activity_id == cell.row.cells[0].value; })}></TicketModal> 
          //       {/* <p onClick={}>{cell.row.values.cnt}</p> */}
          //     </div>
          //   )
          // },
        ],
      },
    ],
    [tickets]
  )
  return (
    <React.Fragment>
      <div style={{
        // "backgroundImage": "url('view-1.png')",
        // "backgroundColor": "rgba(0, 0, 0, .6)"
        "backgroundSize": "cover",
        "paddingTop": "100px"
      }}>
       
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
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