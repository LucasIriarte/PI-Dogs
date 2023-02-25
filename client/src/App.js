import './App.css';
import { Route } from 'react-router-dom'
import Home from './components/home/home.jsx';
import Form from './components/form/form.jsx';
import LangingPage from './components/landingPage/landingPage.jsx';
import Detail from './components/detail/detail';

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
          <Form/>
        </Route>
    </div>
  );
}

export default App;
