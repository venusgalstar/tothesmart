import React, { useEffect } from "react";
import store from "../store";
import { connect } from 'react-redux';

class Audit extends React.Component {

	constructor(props){
        super(props);
        this.state = {
			miner: "",
			tokens: "",
			reward: "",
			poolBalance: "",
			contractBalance: "",
			lastUser: "",
			moment: "",
            timePoolPassed: "",
			stakeAmount:50
        }
		
        this.timer = setInterval(() => {
            this.updateTime();
        }, 1000);

		this.onChangeValue = this.onChangeValue.bind(this);
		this.approveBUSD = this.approveBUSD.bind(this);
		this.BuyMin = this.BuyMin.bind(this);
		this.reinvest = this.reinvest.bind(this);
		this.SellMin = this.SellMin.bind(this);
    }

	reinvest(){
		store.dispatch({
			type:"REINVEST",
		})
	}

	SellMin(){
		store.dispatch({
			type:"SELL_MINER",
		})
	}

	onChangeValue(event, type) {
        var value = event.target.value;
        if (type === "stakeAmount") {
            this.setState({ stakeAmount: value, ownUpdate: true });
        }       
    }

	stakemax(){
		store.dispatch({
			type:"SET_MAX_STAKEAMOUNT",
		});
	}

	approveBUSD(){
		store.dispatch({
			type:"APPROVE_BUSD",
		})
	}

	BuyMin(){
		store.dispatch({
			type:"BUY_MINER",
		})
	}

    updateTime() {
        // Get current timestamp
        let currentTime = new Date().getTime();
        // Calculate distance
        let distance = (this.state.moment * 1000 + 3600000) - currentTime;

        let timePassedCal;

        if (distance > 0) {

            let minutes = Math.floor((distance / 1000 / 60) % 60);
            let seconds = Math.floor((distance / 1000) % 60);

            if (seconds < 10) seconds = '0' + seconds;
            if (minutes < 10) minutes = '0' + minutes;

            timePassedCal = minutes + ':' + seconds;
        } else {
            timePassedCal = "00:00";
        }

		store.dispatch({
            type: "UPDATE_TIMEPOOL_TIME",
            payload: { timePoolPassed: timePassedCal }
        }); 
    }

	render (){
		return <>
			<div id="Audit" className="se3 wf-section">
				<div className="monitor">
					<div className="timer">
						<div className="timer-blockchain">
							<div className="text-block-18">TIME POOL</div>
							<div className="text-block-19" id="timer3">{this.props.timePoolPassed}</div>
							<div className="div-block-16">
								<div className="text-block-20" id="contractbalancePOOL">{this.props.poolBalance}</div>
							</div>
							<div className="div-block-20">
								<div className="text-block-25">Last Wallet Address :</div>
								<div className="example" id="lastuserpool">{this.props.lastUser}</div>
							</div>
							<div className="wallet-text">
								If there are no purchases of miners in the amount of $50 or more within an hour after you, 
								then the entire amount of Time Pool will automatically be credited to your wallet. 
								This is guaranteed by a<a href="https://bscscan.com/address/0x0cff03d61af4ef29a374b8aeef8bbedd6abc63b5" target="_blank" className="link-text"> 
								smart contract</a></div>
						</div>
					</div>
					<div className="div4">
						<div className="divcontentl-wallet">
							<h2 className="h2">Buy Miners</h2>
							<div className="divitem">
								<div className="div-block-12">
									<div className="itemscore-sale">
										<div className="text-score">Contract</div>
										<div className="text-meaning" id="ba2">{this.props.contractBalance}</div>
									</div>
								</div>
								<div className="div-block-12">
									<div className="itemscore-sale">
										<div className="text-score">My Miners</div>
										<div className="text-meaning" id="myminers">{this.props.miner}</div>
									</div>
								</div>
							</div>
							<div className="div-block-11">
								<div className="w-form">
									<div id="email-form" name="email-form" data-name="Email Form" method="get">
										<div className="div-field">
											<input id="stake-input" className="text-field w-input placeholder" 
												placeholder="Minimun 50 BUSD" min="50" 
												value={this.state.stakeAmount}
												onChange={(event)=>{this.onChangeValue(event,"stakeAmount")}}/>
											<div className="iconka">
												<div id="stake-max-ctr">
													<div id="stake-max" onClick={this.stakemax.bind(this)}>max</div>
												</div>
											</div>
										</div>
										<div className="div-block-13">
											<button className="button-dop w-button" onClick={this.approveBUSD.bind(this)}>Approve BUSD</button>
											<button className="button-dop w-button" onClick={this.BuyMin.bind(this)}>Buy Miner</button>
										</div>
									</div>
									<div className="w-form-done">
										<div>Thank you! Your submission has been received!</div>
									</div>
									<div className="w-form-fail">
										<div>Oops! Something went wrong while submitting the form.</div>
									</div>
									<div className="w-form-ref-error">
										<div>To buy miners follow the referral link</div>
									</div>
								</div>
							</div>
						</div>
						<div className="divcontentl-sale">
							<h2 className="h2">Re-Mining & Sell</h2>
							<div className="divitem">
								<div className="div-block-12">
									<div className="itemscore-sale">
										<div className="text-score">My Tokens</div>
										<div className="text-meaning" id="Tokens">{this.props.tokens}</div>
									</div>
								</div>
								<div className="div-block-12">
									<div className="itemscore-sale">
										<div className="text-score">My Rewards</div>
										<div className="text-meaning" id="myrewards">{this.props.reward}</div>
									</div>
								</div>
							</div>
							<div className="textre">
								For each Re-Mining you will receive a 5% bonus. For each Withdraw, you will pay a 5% tax on the miners you have.
							</div>
							<div className="div-block-13 _2">
								<button className="button-dop w-button" onClick={this.reinvest.bind(this)}>Re-Mining</button>
								<button className="button-dop w-button" onClick={this.SellMin.bind(this)}>Sell Tokens</button>
							</div>
							<div className="error-info">
								<div>You have to buy miners to unlock the sale or Re-Mine</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	}
}

const mapStateToProps = state => {
    return {
        miner: state.miner,
		tokens: state.tokens,
		reward: state.reward,
		poolBalance: state.poolBalance, 
		contractBalance: state.contractBalance,
		lastUser: state.lastUser,
		timePoolPassed: state.timePoolPassed,
		moment: state.moment,
		stakeAmount: state.stakeAmount
    };
}

const mapDispatchToProps = dispatch => {
    return { dispatch }
}

export default connect(mapStateToProps, mapDispatchToProps)(Audit);
