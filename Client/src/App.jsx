import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import NavBar from "./component/NavBar/NavBar.jsx";
import Footer from "./component/Footer/Footer.jsx";

import SignUp from "./pages/SignUp/SignUp.jsx";
import LogIn from "./pages/LogIn/LogIn.jsx";

import "./App.css";
import useToken from "./hooks/useToken.js";
import useCheckSession from "./hooks/useCheckSession.js";

function App() {
  const { token } = useToken();
  const { isLoggedIn } = useCheckSession({ token });

  return (
    <Router>
      <NavBar />
      <div className="App">
        <Switch>
          {(!isLoggedIn && (
            <>
              <Route exact path="/login">
                <LogIn />
              </Route>
              <Route exact path="/signup">
                <SignUp />
              </Route>
            </>
          )) ||
            Hello}
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
