import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Index from "./pages/IndexPage/IndexPage";
import cv from "./pages/CvPage/CvPage";
import Main from "./pages/MainPage/MainPage";
import DetailPage from "./pages/DetailPage/DetailPage";
import ShareModal from "./pages/DetailPage/ShareModal";
import FilterModal from "./pages/MainPage/MainFilter/FilterModal";

import cvDetail from "./pages/CvDetailPage/CvDetailPage";

class Routes extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Index} />

          <Route exact path="/cv" component={cv} />
          <Route exact path="/cv/:index" component={cvDetail} />
          <Route exact path="/main" component={Main} />
          <Route exact path="/DetailPage" component={DetailPage} />
          <Route exact path="/ShareModal" component={ShareModal} />
          <Route exact path="/FilterModal" component={FilterModal} />

        </Switch>
      </Router>
    );
  }
}

export default Routes;
