import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,

} from "react-router-dom";
import HomePage from './components/HomePage/HomePage';
import Login from './components/Login/Login';
import CreateAccount from './components/CreateAccount/CreateAccount';
import Header from './components/Header/Header';
import { createContext, useState } from 'react';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import WhereTo from './components/WhereTo/WhereTo';
import NavBar from './components/NavBar/NavBar';
import Destination from './components/Destination/Destination';


export const UserContext = createContext();

function App(props) {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
  
      <NavBar></NavBar>
      
      <Router>
        <Switch>
          <Route path="/home">
            <HomePage />
          </Route>
          <Route path="/header">
            <Header />
          </Route>
          <Route path="/createAccount">
            <CreateAccount />
          </Route>
          <PrivateRoute path="/destination">
          <Destination></Destination>
          </PrivateRoute>
          <PrivateRoute path="/login">
          <Login></Login>
          </PrivateRoute>
          <PrivateRoute path="/whereTo">
            <WhereTo />
          </PrivateRoute>
          <Route exact path="/">
            <HomePage></HomePage>
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
