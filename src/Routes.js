import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Index from "./pages/IndexPage/IndexPage";
import Main from "./pages/MainPage/MainPage";

class Routes extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Index} />
          <Route exact path="/main" component={Main} />
        </Switch>
      </Router>
    );
  }
}

export default Routes;