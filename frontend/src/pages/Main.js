import NavBar from "../component/nav_bar";
import Burger from "../component/menu";
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

        this.props.dispatch({
            type: "CONTRACT_INFO"
        });

    }


    async loadRateUsdt() {
    }

    render() {
        return (
            <>
                <NavBar/>
                <Burger/>
                <Home/>
                <Contract/>
                <Audit/>
                <Referral/>
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