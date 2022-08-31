import React, { useEffect } from "react";
import store from "../store";
import { connect } from 'react-redux';

class NavBar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            account: "Сonnect wallet",
            moment: "",
        }

        this.Wallet = this.Wallet.bind(this);
    }

    // Helper for minimize address to => '0x000...00001'
    minimizeStr = (str, start = 5, end = 5) => {
        if( str[0] !== '0')
            return str;
        return str.slice(0, start) + "..." + str.slice(-end)
    }

    Wallet(){
        store.dispatch({
            type: "CONNECT_WALLET"
        }); 
    }

    render() {
        return (
            <>
                <div data-animation="default" data-collapse="medium" data-duration="400" data-easing="ease" data-easing2="ease" role="banner" className="navbar w-nav">
                    <div className="cont w-container">
                        <div className="divlogo">
                            <a href="#" className="logo w-inline-block"></a>
                            <div className="div-block"></div>
                        </div>
                        <nav role="navigation" className="nav-menu w-nav-menu">
                            <a href="#home" className="nav-link w-nav-link">Home</a>
                            <a href="" target="_blank" className="nav-link w-nav-link">Contract</a>
                            <a href="" target="_blank" className="nav-link w-nav-link">Audit</a>
                            <a href="#referral" className="nav-link w-nav-link">Referral</a>
                        </nav>
                        <div className="menu-button w-nav-button">
                            <div className="icon-2 w-icon-nav-menu"></div>
                        </div>
                        <div className="panel-l">
                            <div className="div-lang">
                                <a href="china.html" className="flag w-inline-block"></a>
                                <a href="esp.html" className="flag _2 w-inline-block"></a>
                                <a href="index.html" className="flag _3 w-inline-block"></a>
                                <a href="hindy.html" className="flag _4 w-inline-block"></a>
                            </div>
                            <div>
                                <button id="connect-btn" className="button w-button" onClick={this.Wallet}>
                                    {this.minimizeStr(this.props.account)}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        account: state.account,
        moment: state.moment,
        timePassed: state.timePassed,
    };
}

const mapDispatchToProps = dispatch => {
    return { dispatch }
}


export default connect(mapStateToProps, mapDispatchToProps)(NavBar);