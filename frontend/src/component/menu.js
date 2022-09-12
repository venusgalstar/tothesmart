import React from "react";
import { slide as Menu } from 'react-burger-menu';
import logo from '../asset/logo.svg';

class Burger extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menuOpen: false
        }
    }

    showSettings (event) {
        event.preventDefault();
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

    render () {
        return (
            <>
                <div className={"burger-container"}>
                    <Menu right width={'100%'}
                          isOpen={this.state.menuOpen}
                          onStateChange={(state) => this.handleStateChange(state)}
                    >
                       <a href="#home" className="nav-link w-nav-link w--nav-link-open" 
                            onClick={() => this.closeMenu()} >Home</a>
                        <a href="https://bscscan.com/address/0x9f0434a404A936bFA064dB3E34AaB2Ca1fBFcfA6" 
                            target="_blank" className="nav-link w-nav-link w--nav-link-open" 
                            onClick={() => this.closeMenu()}>Contract</a>
                        <a href="#referral" className="nav-link w-nav-link w--nav-link-open"
                            onClick={() => this.closeMenu()} >Referral</a>
                    </Menu>
                </div>
            </>
        );
    }
}

export default Burger;