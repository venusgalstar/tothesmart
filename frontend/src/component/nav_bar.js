import React, { useEffect } from "react";
import store from "../store";
import { connect } from 'react-redux';

class NavBar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            account: "Сonnect wallet",
            moment: "",
            menuOpen: false,
        }

        this.Wallet = this.Wallet.bind(this);
    }

    // This keeps your state in sync with the opening/closing of the menu
    // via the default means, e.g. clicking the X, pressing the ESC key etc.
    handleStateChange (state) {
        this.setState({menuOpen: state.isOpen})
    }

    // This can be used to close the menu, e.g. when a user clicks a menu item
    closeMenu () {
        this.setState({menuOpen: false})
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
                            <a href="https://bscscan.com/address/0x9f0434a404A936bFA064dB3E34AaB2Ca1fBFcfA6" target="_blank" className="nav-link w-nav-link">Contract</a>
                            <a href="" target="_blank" className="nav-link w-nav-link">Audit</a>
                        </nav>
                        <div className="panel-l">
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