import React, { useEffect } from "react";
import Web3 from "web3";

import { connect } from 'react-redux';
import store from "../store";

class Referral extends React.Component {
	constructor(props){
        super(props);
        this.state = {
			referLink: "",
        }

		this.onChangeValue = this.onChangeValue.bind(this);
		this.copyTo = this.copyTo.bind(this);
    }

	componentDidMount(){
		const queryString = window.location.search;
		// console.log(queryString);
		const urlParams = new URLSearchParams(queryString);
		const refAddr = urlParams.get('ref')
		console.log(refAddr);

		store.dispatch({
			type:"UPDATE_REFERLINK",
			payload:{referLink:refAddr}
		});  
	}
		
	onChangeValue(event, type) {
		var value = event.target.value;
		// if (type === "referLink") {
		// 	this.setState({ stakeAmount: value, ownUpdate: true });
		// }  
		// store.dispatch({
		// 	type:"UPDATE_REFERLINK",
		// 	payload:{referLink:value}
		// })   
	}

	copyTo(){
		navigator.clipboard.writeText("https://tothesmart.finance/?ref=" + this.props.referLink);
	}

	render(){
		return (<>
		<div id="referral" className="se5 wf-section">
				<div className="div6">
					<div className="divcontentl _2">
						<div className="divimg">
							<div className="divimgg">
								<div className="divim"></div>
							</div>
						</div>
						<h2 className="h2">Ambassador community Program</h2>
						<div className="contentprogram">
							<div className="columprog">
								<div className="tabliz">
									<div className="echeika">
										<div className="text-block-26">Unlock Your Level</div>
									</div>
									<div className="echeikaznach">
										<div>1 Level</div>
									</div>
									<div className="echeikaznach">
										<div>2 Level</div>
									</div>
									<div className="echeikaznach">
										<div>3 Level</div>
									</div>
									<div className="echeikaznach">
										<div>4 Level</div>
									</div>
									<div className="echeikaznach">
										<div>5 Level</div>
									</div>
									<div className="echeikaznach">
										<div>6 Level</div>
									</div>
									<div className="echeikaznach">
										<div>7 Level</div>
									</div>
								</div>
								<div className="tabliz">
									<div className="echeika">
										<div>Min. Buy Miners</div>
									</div>
									<div className="echeikaznach">
										<div>100 Busd</div>
									</div>
									<div className="echeikaznach">
										<div>250 Busd</div>
									</div>
									<div className="echeikaznach">
										<div>500 Busd</div>
									</div>
									<div className="echeikaznach">
										<div>1000 Busd</div>
									</div>
									<div className="echeikaznach">
										<div>2500 Busd</div>
									</div>
									<div className="echeikaznach">
										<div>5000 Busd</div>
									</div>
									<div className="echeikaznach">
										<div>10000 Busd</div>
									</div>
								</div>
								<div className="tabliz">
									<div className="echeika">
										<div>When Buying Miners</div>
									</div>
									<div className="echeikaznach">
										<div>5%</div>
									</div>
									<div className="echeikaznach">
										<div>4%</div>
									</div>
									<div className="echeikaznach">
										<div>3%</div>
									</div>
									<div className="echeikaznach">
										<div>2%</div>
									</div>
									<div className="echeikaznach">
										<div>3%</div>
									</div>
									<div className="echeikaznach">
										<div>4%</div>
									</div>
									<div className="echeikaznach">
										<div>5%</div>
									</div>
								</div>
								<div className="tabliz">
									<div className="echeika">
										<div>When Selling MineToken</div>
									</div>
									<div className="echeikaznach">
										<div>-</div>
									</div>
									<div className="echeikaznach">
										<div>-</div>
									</div>
									<div className="echeikaznach">
										<div>-</div>
									</div>
									<div className="echeikaznach">
										<div>1%</div>
									</div>
									<div className="echeikaznach">
										<div>1%</div>
									</div>
									<div className="echeikaznach">
										<div>1%</div>
									</div>
									<div className="echeikaznach">
										<div>1%</div>
									</div>
								</div>
							</div>
							<div className="columprogram2">
								<h3 className="h3">Referral rewards</h3>
								<div className="text-block-16">Your referral rewards will be sent straight to your wallet, you don't have to withdraw it.</div>
								<div className="text-block-17">Your referral link</div>
								<div className="div-block-15">
									<input id="referral-link" className="itemfield" type="text" value={this.props.referLink} 
										onChange={(event)=>{this.onChangeValue(event,"referLink")}}/>
									<button id="copy-referral-link" className="referal-but w-button"
										onClick={this.copyTo}>Copy</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
    </>);
	}
    
}
const mapStateToProps = state => {
    return {
        referLink: state.referLink,
    };
}

const mapDispatchToProps = dispatch => {
    return { dispatch }
}

export default connect(mapStateToProps, mapDispatchToProps)(Referral);