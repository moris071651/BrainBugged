import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import NavBar from "./component/NavBar/NavBar.jsx";
import Footer from "./component/Footer/Footer.jsx";

import SignUp from "./pages/SignUp/SignUp.jsx";
import LogIn from "./pages/LogIn/LogIn.jsx";

import Profile from "./pages/Profile/Profile.jsx";
import CreateProject from "./pages/CreateProject/CreateProject.jsx";
import HelpProject from "./pages/HelpProject/HelpProject.jsx";
import ApplicationProject from "./pages/ApplicationProject/ApplicationProject.jsx";
import ApprovePeople from "./pages/ApprovePeople/ApprovePeople.jsx";

import "./App.css";

import useToken from "./hooks/useToken.js";
import useCheckSession from "./hooks/useCheckSession.js";
import Projects from "./pages/Projects/Projects.jsx";

import Landing from "./pages/Landing/Landing.jsx";

function App() {
  const { token } = useToken();
  const { isLoggedIn } = useCheckSession({ token });

  return (
    <Router>
      <NavBar />
      <div className="App">
        <Switch>
          {!isLoggedIn && (
            <>
              <Route exact path="/login">
                <LogIn />
              </Route>
              <Route exact path="/signup">
                <SignUp />
              </Route>
            </>
          )}
          {isLoggedIn && (
            <>
              <Route exact path="/profile">
                <Profile />
              </Route>
              <Route exact path="/create">
                <CreateProject />
              </Route>
              <Route exact path="/help/:projectID">
                <HelpProject />
              </Route>
              <Route exact path="/application/:projectID">
                <ApplicationProject />
              </Route>
              <Route exact path="/projects">
                <Projects />
              </Route>
              <Route exact path="/approve/:projectID">
                <ApprovePeople />
              </Route>
            </>
          )}
          <Route exact path="/">
            <Landing />
          </Route>
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
