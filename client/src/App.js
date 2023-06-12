import './App.css';
import { Route } from 'react-router-dom'
import Home from './components/home/home.jsx';
import Form from './components/form/form.jsx';
import LangingPage from './components/landingPage/landingPage.jsx';
import Detail from './components/detail/detail';
import Profile from './components/profile/profile';
import axios from 'axios';
import ProtectedRoute from './components/protectedRoute/protectedRoute';
axios.defaults.baseURL = "https://pi-dogs-production-61cb.up.railway.app/"

function App() {
  return (
    <div className="App">
      {/* <NavBar/> */}
        <Route exact path="/">
          <LangingPage/>
        </Route>
        <Route exact path="/dogs/:id">
          <Detail/>
        </Route>
        <Route exact path="/home">
          <Home/>
        </Route>
        <Route exact path="/form">
          <ProtectedRoute component={Form}/>
        </Route>
        <Route exact path="/profile">
           <Profile/>
        </Route>
    </div>
  );
}

export default App;
