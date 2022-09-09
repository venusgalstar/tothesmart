import React, { useEffect } from "react";
import store from "../store";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux';
import fin5png from "../asset/fin5.png";
import fin6png from "../asset/fin6.png";
import fin7png from "../asset/fin7.png";
import fin8png from "../asset/fin8.png";
import marketwatch from "../asset/marketwatch.png";
import abnewswire from "../asset/abnewswire.png";
import getnews from "../asset/getnews.png";

class Home extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			timeContractPassed: "00 : 00 : 00 : 00",
			walletConnectStatus: false,
		}

		this.GetFreeMin = this.GetFreeMin.bind(this);

		this.timer = setInterval(() => {
            this.updateTime();
        }, 1000);
	}

	updateTime() {
		const deadline = new Date(1662180707 * 1000);
        const diff = new Date() - deadline;

        const days = diff > 0 ? Math.floor(diff / 1000 / 60 / 60 / 24) : 0;
        const hours = diff > 0 ? Math.floor(diff / 1000 / 60 / 60) % 24 : 0;
        const minutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0;
        const seconds = diff > 0 ? Math.floor(diff / 1000) % 60 : 0;
        const days2 = days < 10 ? '0' + days : days;
        const hours2 = hours < 10 ? '0' + hours : hours;
        const minutes2 = minutes < 10 ? '0' + minutes : minutes;
        const seconds2 = seconds < 10 ? '0' + seconds : seconds;

		const timeStarted = days2 + ' : ' + hours2 + ' : ' + minutes2 + ' : ' + seconds2;

		store.dispatch({
            type: "UPDATE_CONTRACT_TIME",
            payload: { timeContractPassed: timeStarted }
        }); 
    }

	GetFreeMin(){
		console.log("this.props.walletConnectStatus", this.props.walletConnectStatus);
		
		if( this.props.walletConnectStatus != true ){
			toast.info("Please connect metamask this website.", {
				position: "top-center",
				autoClose: 3000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
			return;
		}			

		store.dispatch({
            type: "GET_FREE_MINER"
        }); 
	}

	render(){
		return <>
			<ToastContainer/>
			<div id="home" className="se1 wf-section">
				<div className="div1">
					<h1 className="h1">To The Smart</h1>
					<div className="text-block"></div>
					{/* <div className="embed">
						<div className="text-block-2" id="timerstart" >{this.props.timeContractPassed}</div>
					</div> */}
					<button className="button-start w-button" onClick={this.GetFreeMin.bind(this)}>  
						Get Free Miners 10 BUSD
					</button>
					<div className="error-egs">
						<div>The bonus can only be received once</div>
					</div>
				</div>
				<div className='div3' >
					<a target="_blank" href="https://www.abnewswire.com/pressreleases/20000-in-one-minute-on-play-to-earn-game-tothesmartfinance_615073.html">
						<img className='social_link' src={abnewswire}></img>
					</a>
					<a target="_blank" href="https://www.marketwatch.com/press-release/20000-in-one-minute-on-play-to-earn-game-tothesmartfinance-2022-09-06?mod=search_headline">
						<img className='social_link' src={marketwatch}></img>
					</a>
					<a target="_blank" href="https://www.getnews.info/1253717/20000-in-one-minute-on-play-to-earn-game-tothesmartfinance.html">
						<img className='social_link' src={getnews}></img>
					</a>
				</div>
				<div className="div2">
					<div className="divcontentl-what">
						<div className="div-block-3">
						</div>
						<div className="div-block-17">
							<div className="columwhat">
								<div className="col-l">
									<h2 className="h2">What is ToTheSmart</h2>
									<div className="text-block-3">
										Play To Earn a mining farm built on the Binance Smart Chain blockchain. Buy miners, mine MineToken, and exchange it for BUSD or reinvest in your farm and increase your daily income.                                                                                          Participate in the ToTheSmart Ambassador program and earn income from every purchase of miners as well as from the income of your followers 7 generations deep. Your income is unlimited.</div>
									<div className="video w-video w-embed">
										<iframe width="560" height="315" src="https://youtu.be/Wzws8g5sH68" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen=""></iframe>
									</div>
								</div>
							</div>
							<div className="columwhat2">
								<div className="div-block-6">
									<div className="link">
										<div className="text-block-9">Tothesmart Whitepaper</div>
									</div>
									<div className="div-block-7">
										<a href="/PDF/TOTheSmart(EN).pdf" target="_blank" className="link-pdf _3 w-inline-block">
											<div className="text-block-10">English</div><div className="downl"></div>
										</a>
									</div>
								</div>
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
		timeContractPassed: state.timeContractPassed,
		walletConnectStatus: state.walletConnectStatus,
    };
}

const mapDispatchToProps = dispatch => {
    return { dispatch }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);