/* eslint-disable @typescript-eslint/no-unused-expressions */

import TicketsTable from '../components/TicketsTable';
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import { getAllTicketsByUser } from '../axios';
import { getAllActivities } from '../axios';
import { TicketType } from '../Types/ticket';
import { ActivityType } from '../Types/ticket';
import type { CellProps } from 'react-table'
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

function MyTicketsPageContent() {
  const [tickets, setTickets] = React.useState<TicketType[]>([]);
  const [activities, setActivities] = React.useState<ActivityType[]>([]);
  const [showTickets, setShowTickets] = React.useState<TicketType[]>([]);

  React.useEffect( ()=>{
    getAllActivities(setActivities)
    getAllTicketsByUser(setTickets)
  }, [])

  React.useEffect( ()=>{
    // let actuall_tickets_map = new Map();
    let actuall_tickets: TicketType[] = []; 
    tickets.forEach((ticket)=>{
      var activity = activities.filter(function(item) { return item.activity_id == ticket.activity_id; });
      if(activity.length != 0){
        var actuall_ticket = ticket
        actuall_ticket['activity_info'] = activity[0]['activity_info']
        actuall_ticket['activity_name'] = activity[0]['activity_name']
        actuall_ticket['price'] = activity[0]['price']
        actuall_tickets.push(actuall_ticket);
        // 計算張數
        // if(typeof actuall_tickets_map.get(ticket.activity_id) !== 'undefined'){
        //   actuall_ticket['cnt'] = actuall_tickets_map.get(ticket.activity_id)['cnt'] += 1
        // } else {
        //   actuall_ticket['cnt'] = 1
        // }
        // actuall_tickets_map.set(ticket.activity_id, actuall_ticket)
      } 
    })
    // for (const [key, value] of actuall_tickets_map.entries()) {
    //    actuall_tickets.push(value);
    // }
    // actuall_tickets.reverse()
    actuall_tickets.sort((a: TicketType, b:TicketType) => 
      (a.order_timestamp > b.order_timestamp) ? 1 : ((b.order_timestamp > a.order_timestamp) ? -1 : 0))
    setShowTickets(actuall_tickets)
  }, [tickets])
  
  // 重新整理
  React.useEffect( ()=>{
  }, [showTickets])

  const convertStatus = (status:number) => {
    if(status == 1) { return '已付款'}
    else{ return '未付款'}
  }
  const clickToPayOrder = async (ticket: any)=>{
    if(ticket.has_paid == 0){
      const order = { ticket_id: encodeURIComponent(ticket.key)}
      await payOrder(order);
      var found = tickets.filter(function(item) { return item.key == ticket.key})
      var after_tickets = tickets.filter(function(item) { return item.key != ticket.key})
      if(found.length != 0){
        found[0]['has_paid'] = '1'
        after_tickets.push(found[0])
      }
      after_tickets.sort((a: TicketType, b:TicketType) => 
      (a.order_timestamp > b.order_timestamp) ? 1 : ((b.order_timestamp > a.order_timestamp) ? -1 : 0))
      setShowTickets(after_tickets)    
    }
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
              style={{textDecoration:`${cell.row.values.has_paid == 0? "underline": ""}` }}
              onClick={ () => {clickToPayOrder(cell.row.values)} }>
                {convertStatus(cell.row.values.has_paid)} 
                {cell.row.values.has_paid == 1? (<></>):(`(按下付款)`)}
              </div>
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
      <div style={{ "backgroundSize": "cover", "paddingTop": "100px"}}>
        <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
        <CssBaseline />
        <Container  style={{ "backgroundColor": "white", "padding": "100px", 
                              "height": "800px", "borderRadius": "25px", 
                              "border": "6px solid gray",
                              "color": "black",
                          }}>
          <div style={{  "backgroundColor": "white"}}>
            <TicketsTable style=
            {{ "padding": "100px",  "backgroundColor": "white",
                "border": "8px solid gray"}} 
              columns={columns} data={ showTickets || []}/>
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default function SearchForActivitiesPage() {
  return (<div>
    <MyTicketsPageContent/>
    <Copyright sx={{ mt: 5 }} />
  </div>);
}