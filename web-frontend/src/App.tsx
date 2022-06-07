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
import BasicLayout from './components/BasicLayout';
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const [refreshCnt, setRefreshCnt] = React.useState(0)
  React.useEffect( ()=>{
    console.log('version 1.0')
  }, [])
  return (
    <Switch>
      <Route path="/login">
        <LoginPage/>
      </Route>

      <Route path="/my-tickets">
        <BasicLayout>{
          <ThemeProvider theme={darkTheme}>
            <div style={{
              "backgroundSize": "cover",
              "height": "1130px"
            // "backgroundColor": "rgba(0, 0, 0, .6)"
            // "backgroundImage": "url('view-3.jpg')",
            }}>
            <MyTickets/>
            </div>
          </ThemeProvider>}
        </BasicLayout>
      </Route>

      <Route path="/search-for-activities">
        <BasicLayout>{
          <ThemeProvider theme={darkTheme}>
            <div style={{
              "backgroundSize": "cover",
              "height": "1130px",
              "backgroundImage": "url('view-4.jpeg')",
               // "backgroundColor": "rgba(0, 0, 0, .6)"
            }}>
              <SearchForActivitiesPage/>
            </div>
          </ThemeProvider>
          }
        </BasicLayout>
      </Route>

      <Route path="/create-activity">
        <BasicLayout>{
              <div style={{
                "backgroundSize": "cover",
                "height": "1130px",
                "backgroundImage": "url('view-1.png')"
              // "backgroundColor": "rgba(0, 0, 0, .6)"
              // "backgroundImage": "url('view-3.jpg')",
              }}>
                <CreateActivityPage/>
              </div>}
        </BasicLayout>
      </Route>
      <Route path="/">
        <LoginPage/>
      </Route>
    </Switch> 
    
  );
}

export default App;
