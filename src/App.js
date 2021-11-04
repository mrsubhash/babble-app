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
import themeFile from './util/theme'
import jwtDecode from 'jwt-decode'
import AuthRoute from "./util/AuthRoute"
import { Provider } from 'react-redux';
import store from "./redux/reducers/store"

const theme = createTheme(themeFile);

let authenticated;
const token = localStorage.babbleToken
if (token) {
  const decodedToken = jwtDecode(token)
  if (decodedToken.exp * 1000 < Date.now()) {
    window.location.href = "/login"
    authenticated = false
  }
  else {
    authenticated = true
  }

}

function App () {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <div className="App">
          <Router>
            <NavBar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={Home} />
                <AuthRoute exact path="/login" component={Login} authenticated={authenticated} />
                <AuthRoute exact path="/signup" component={Signup} authenticated={authenticated} />
              </Switch>
            </div>
          </Router>
        </div>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
