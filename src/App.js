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
import { SET_AUTHENTICATED } from './redux/reducers/types';
import { logoutUser, getUserData } from './redux/actions/userActions';
import axios from 'axios';


const theme = createTheme(themeFile);

const token = localStorage.babbleToken
if (token) {
  const decodedToken = jwtDecode(token)
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser())
    window.location.href = "/login"
  }
  else {
    store.dispatch({ type: SET_AUTHENTICATED })
    axios.defaults.headers.common["Authorization"] = token
    store.dispatch(getUserData())
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
                <AuthRoute exact path="/login" component={Login} />
                <AuthRoute exact path="/signup" component={Signup} />
              </Switch>
            </div>
          </Router>
        </div>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
