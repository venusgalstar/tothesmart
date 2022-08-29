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
                <div data-animation="default" data-collapse="medium" data-duration="400" data-easing="ease" data-easing2="ease" role="banner" class="navbar w-nav">
                    <div class="cont w-container">
                        <div class="divlogo"><a href="#" class="logo w-inline-block"></a>
                            <div class="div-block"></div>
                        </div>
                        <nav role="navigation" class="nav-menu w-nav-menu">
                            <a href="#home" class="nav-link w-nav-link">Home</a>
                            <a href="https://bscscan.com/address/0x2f9315577d7f45025a50ca744f474069ebb2b1f3" target="_blank" class="nav-link w-nav-link">Contract</a>
                            <a href="https://hazecrypto.net/audit/tothesmart" target="_blank" class="nav-link w-nav-link">Audit</a>
                            <a href="#referral" class="nav-link w-nav-link">Referral</a></nav>
                        <div class="menu-button w-nav-button">
                            <div class="icon-2 w-icon-nav-menu"></div>
                        </div>
                        <div class="panel-l">
                            <div class="div-lang">
                                <a href="china.html" class="flag w-inline-block"></a>
                                <a href="esp.html" class="flag _2 w-inline-block"></a>
                                <a href="index.html" class="flag _3 w-inline-block"></a>
                                <a href="hindy.html" class="flag _4 w-inline-block"></a>
                            </div>
                            <div>
                                <a id="connect-btn" target="_blank" class="button w-button" onclick="Wallet()">
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