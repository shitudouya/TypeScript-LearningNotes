import React, { Component } from "react";
import loadable from "./utils/loadable";
import { BrowserRouter } from "react-router-dom";
const BasicStructure = loadable(() => import("./components/BasicStructure"));

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <BasicStructure />
      </BrowserRouter>
    );
  }
}
