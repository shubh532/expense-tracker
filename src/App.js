import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Switch, Redirect, Route } from 'react-router-dom/cjs/react-router-dom.min';
import './App.css';
import LogSignInForm from './Components/LogSignInForm';
import NavBar from './Components/NavBar';
import HomePage from './Pages/Home';
import Profile from './Pages/Profile';
import ResetPassword from './Components/ResetPassword';
import Product from './Pages/Product';
import { fetchExpenseData } from "./ReduxStore/ExpenseStore";
function App() {
  const email = useSelector(state => state.Authecation.email)
  const Dispatch = useDispatch()

  useEffect(() => {
    Dispatch(fetchExpenseData(email))
  }, [Dispatch, email])
  const IsLogin = useSelector(state => state.Authecation.isLogin)

  return (
    <React.Fragment>
      <header className='header'>
        <NavBar />
      </header>
      <main className="main">
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/product">
            {IsLogin ? <Product /> : <Redirect to="/login" />}
          </Route>
          <Route path="/abutus">
            {!IsLogin && <Redirect to="/login" />}
          </Route>
          <Route path="/login">
            <LogSignInForm />
          </Route>
          <Route path="/reset-password">
            <ResetPassword />
          </Route>
          <Route to="/profile">
            {IsLogin ? <Profile /> : <Redirect to="/login" />}
          </Route>
          <Route path="*">
            <Redirect to="/login" />
          </Route>
        </Switch>
      </main>
    </React.Fragment >

  );
}

export default App;
{/* */ }
