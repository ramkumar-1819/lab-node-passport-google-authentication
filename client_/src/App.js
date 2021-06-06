import logo from './logo.svg';
import './App.css';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import Success from './Components/Success';
import{
  BrowserRouter as Router,
    Route,
    Switch,
    Link
} from 'react-router-dom';
function App() {
  return (
    //There are 3 pages Login,Signup,Success - if Authentication success then it will go to success page
    <>
    <Router>
      <Switch>
        <Route exact path='/'>
          <Login/>
        </Route>
        <Route path='/success'>
          <Success/>
        </Route>
        <Route exact path='/signup'>
          <Signup/>
        </Route>
        <Route exact path='/login'>
          <Login/>
        </Route>
      </Switch>
    </Router>
    </>
  ) 
}

export default App;
