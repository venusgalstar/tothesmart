import React, { useEffect } from "react";
import store from "../store";

class NavBar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            account: "Сonnect wallet",
        }

        this.Wallet = this.Wallet.bind(this);
    }
    Wallet = () =>{
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
                            <a href="https://bscscan.com/address/0x2f9315577d7f45025a50ca744f474069ebb2b1f3" target="_blank" className="nav-link w-nav-link">Contract</a>
                            <a href="https://hazecrypto.net/audit/tothesmart" target="_blank" className="nav-link w-nav-link">Audit</a>
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
                                <a id="connect-btn" target="_blank" className="button w-button" onClick={this.Wallet.bind(this)}>
                                    { this.props.account }
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
export default NavBar;