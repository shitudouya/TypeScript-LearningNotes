import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import loadable from "../utils/loadable";
const Main = loadable(() => import("../pages/Main"));

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/:id" component={Main}></Route>
        <Redirect from="/*" to="/preface" />
      </Switch>
    );
  }
}

export default Routes;
