import NavBar from "../component/nav_bar";
import Home from "../component/home";
import Contract from "../component/contract";
import Audit from "../component/audit";
import Referral from "../component/referral";
import Section from "../component/section";
import Footer from "../component/footer";
import { Component } from "react";
import { connect } from 'react-redux';


class Main extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.loadRateUsdt();
    }

    async loadRateUsdt() {
    }

    render() {
        return (
            <>
                <body class="body">
                    <NavBar/>
                    <Home/>
                    <Contract/>
                    <Audit/>
                    <Referral/>
                    <Section/>
                    <Footer/>
                </body>
            </>
        );
    }
}

const mapStateToProps = state => {
    return state;
}

const mapDispatchToProps = dispatch => {
    return {
        dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);