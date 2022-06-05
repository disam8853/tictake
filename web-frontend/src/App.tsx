import React from 'react';
import logo from './logo.svg';
import { Switch, Route } from 'react-router-dom'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './assets/other.css'
import LoginPage from './containers/signIn-page'
import CreateActivityPage from './containers/create-activity-page'
import SearchForActivitiesPage from './containers/search-for-activities-page';
import blue from '@mui/material/colors/blue';
import MyTickets from './containers/my-tickets-page';
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const [refreshCnt, setRefreshCnt] = React.useState(0)
  React.useEffect( ()=>{}, [refreshCnt])
  return (
    <Switch>
      <Route path="/login">
        <LoginPage/>
      </Route>

      <Route path="/my-tickets">
      <ThemeProvider theme={darkTheme}>
      <div style={{
          // "backgroundImage": "url('view-3.jpg')",
          "backgroundSize": "cover",
          "height": "1130px"
        // "backgroundColor": "rgba(0, 0, 0, .6)"
        }}>
        <MyTickets/>
        </div>
        </ThemeProvider>
      </Route>

      <Route path="/search-for-activities">
        <ThemeProvider theme={darkTheme}>
          {/* <div style={{"backgroundColor": "rgb(0, 30, 60)", "height": "1130px"}} > */}
          <div style={{
              // "backgroundColor": "rgba(0, 0, 0, .9)",
          // "backgroundImage": "url('view-2.jpg')",
          "backgroundSize": "cover",
          "height": "1130px"
        
        }}>
            <SearchForActivitiesPage/>
          </div>
        </ThemeProvider>
      </Route>

      <Route path="/create-activity">
        <div style={{
          "backgroundImage": "url('view-1.png')",
          "backgroundSize": "cover",
          "height": "1130px"
        // "backgroundColor": "rgba(0, 0, 0, .6)"
        }}>
        <CreateActivityPage/> 
        </div>
      </Route>
    </Switch> 
    
  );
}

export default App;
