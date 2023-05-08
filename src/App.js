import {useContext} from 'react';
import './App.css';
import LogSignInForm from './Components/LogSignInForm';
import NavBar from './Components/NavBar';
import HomePage from './Pages/Home';
import TokenAPI from './ContextAPI/TokenAPI';

function App() {

  const LogStatus=useContext(TokenAPI)
  console.log(LogStatus)

  return (
    <div className='LoginPage'>
      <NavBar/>
      {LogStatus.isLogin &&<HomePage/>}
      {!LogStatus.isLogin&&<LogSignInForm/>}
    </div>
    
  );
}

export default App;
