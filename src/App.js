import React, { useContext } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom/cjs/react-router-dom.min';
import './App.css';
import LogSignInForm from './Components/LogSignInForm';
import NavBar from './Components/NavBar';
import HomePage from './Pages/Home';
import TokenAPI from './ContextAPI/TokenAPI';
import Profile from './Pages/Profile';
import ResetPassword from './Components/ResetPassword';
function App() {
  
  const LogStatus = useContext(TokenAPI)
  return (
    <React.Fragment>
      <NavBar />

      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/product">
          {!LogStatus.isLogin&&<Redirect to="/login" />}
        </Route>
        <Route path="/abutus">
          {!LogStatus.isLogin&&<Redirect to="/login" />}
        </Route>
        <Route path="/login">
          <LogSignInForm />
        </Route>
        <Route path="/reset-password">
          <ResetPassword />
        </Route>
        <Route to="/profile">
          {LogStatus.isLogin ? <Profile /> : <Redirect to="/login" />}
        </Route>
        <Route path="*">
          <Redirect to="/login" />
        </Route>
      </Switch>
    </React.Fragment >

  );
}

export default App;
