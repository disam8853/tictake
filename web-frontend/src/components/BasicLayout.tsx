import React from "react"
import GlobalStyles from '@mui/material/GlobalStyles'
import CssBaseline from '@mui/material/CssBaseline'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import SmartToyIcon from '@mui/icons-material/SmartToy'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import Button from '@mui/material/Button'
// eslint-disable-next-line @typescript-eslint/naming-convention
import  { logOut } from '../axios/index'

type Props = {
    children: React.ReactNode,
};

export default function basicLayout({ children }: Props) {
  return(
    <div>
      {/* <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline /> */}
      <AppBar
        position="static"
        color="inherit"
        elevation={0}
        style={{"backgroundColor": "black" ,"color": "white",
      
        // "marginBottom": "100px",
 
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
             onClick={()=>{
              logOut()

             }}
          >
            Log Out
          </Button>
        </Toolbar>
      </AppBar>
    
      {children}
    </div>
  )
}