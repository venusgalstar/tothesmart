import NavBar from "./component/nav_bar";
import Home from "./component/home";
import Audit from "./component/audit";
import Referral from "./component/audit";
import Section from "./component/section";
import Footer from "./component/footer";

import logo from './logo.svg';
import './App.css';
import { Component } from "react";


function App() {
  return (
    <body class="body">
      <div className="App">
        <NavBar/>
        <Home/>
        <Audit/>
        <Referral/>
        <Section/>
        <Footer/>
      </div>
    </body>
  );
}

export default App;
