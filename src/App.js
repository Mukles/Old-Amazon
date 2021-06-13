import { Switch, Route } from "react-router-dom";
import Home from './Components/Home/Home';
import Register from './Components/Account/Register';
import LogIn from './Components/Account/Login';
import  Index from './Components/Dasboard/Index';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Components/Dasboard/dashboard.css';

function App() {
  return(
    <Switch>
      <Route exact path='/'>
        <Home />
      </Route>
      <Route path='/register'>
        <Register />
      </Route>
      <Route path='/login'>
        <LogIn />
      </Route>
      <Route path="/admin">
          <Index />
      </Route>
    </Switch>
  )
}

export default App;
