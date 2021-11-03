import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import createTheme from '@material-ui/core/styles/createTheme';
import { ThemeProvider } from '@material-ui/core/styles';
import NavBar from './components/NavBar';
import Home from './pages/home'
import Login from './pages/login'
import Signup from './pages/signup'

const theme = createTheme({
  palette: {
    primary: {
      light: '#9a67ea',
      main: '#673ab7',
      dark: '#320b86',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#ffff56',
      main: '#ffea00',
      dark: '#c7b800',
      contrastText: '#000000',
    },
  },
  typography: {
    useNextVariants: true
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <NavBar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
            </Switch>
          </div>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
