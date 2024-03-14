import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import NavBar from './component/NavBar/NavBar.jsx'
import Footer from './component/Footer/Footer.jsx'

import SignUp from './pages/SignUp/SignUp.jsx'
import LogIn from './pages/LogIn/LogIn.jsx'

import "./App.css";

function App() {
  return (
    <Router>
      <NavBar />
      <div className="App">
        <Switch>
          <Route exact path="/login">
            <LogIn />
          </Route>
          <Route exact path="/signup">
            <SignUp />
          </Route>
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
