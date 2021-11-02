import "./app.scss";
import React from "react";
import Topbar from "./components/user-components/top-bar/Topbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Homepage from "./components/user-components/home/Home";
import { AuthProvider } from "./GlobalStates";
import AdminTopbar from "./components/admin-components/admin-topbar/AdminTopbar";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/home">
            <Topbar />
            <Homepage />
          </Route>
          <Route exact path="/login">
            <AuthProvider>
              <AdminTopbar />
            </AuthProvider>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
