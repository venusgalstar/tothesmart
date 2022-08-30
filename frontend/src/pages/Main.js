import NavBar from "../component/nav_bar";
import Home from "../component/home";
import Contract from "../component/contract";
import Audit from "../component/audit";
import Referral from "../component/referral";
import Section from "../component/section";
import Footer from "../component/footer";
import { Component } from "react";
import { connect } from 'react-redux';
import store from "../store";


class Main extends Component {

    constructor(props) {
        super(props);

        this.props.dispatch({
            type: "CONTRACT_INFO"
        });

        this.timer = setInterval(() => {
            this.updateTimer();
        }, 1000);
    }

    updateTimer() {
        this.props.dispatch({
            type: "UPDATE_TIMER"
        });
    }

    async loadRateUsdt() {
    }

    render() {
        return (
            <>
                <NavBar/>
                <Home/>
                <Contract/>
                <Audit/>
                <Referral/>
                <Section/>
                <Footer/>
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