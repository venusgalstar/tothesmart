import NavBar from "./component/nav_bar";
import Home from "./component/home";
import Contract from "./component/contract";
import Audit from "./component/audit";
import Referral from "./component/audit";
import Section from "./component/section";
import Footer from "./component/footer";

import logo from './logo.svg';
import './App.css';
import './asset/style.css';
import { Component } from "react";


function App() {
  return (
    <body class="body">
      <NavBar/>
      <Home/>
      <Contract/>
      <Audit/>
      <Referral/>
      <Section/>
      <Footer/>
    </body>
  );
}

export default App;
