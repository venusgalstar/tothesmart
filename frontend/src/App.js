import NavBar from "./component/nav_bar";
import Home from "./component/home";
import Contract from "./component/contract";
import Audit from "./component/audit";
import Referral from "./component/referral";
import Section from "./component/section";
import Footer from "./component/footer";

import './App.css';
import './asset/style.css';


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
