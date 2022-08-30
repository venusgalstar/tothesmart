import React, { useEffect } from "react";
import { connect } from 'react-redux';

class Home extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			timeStarted: "00 : 00 : 00",
		}
	}

	render(){
		return <>
			<div id="home" className="se1 wf-section">
				<div className="div1">
					<h1 className="h1">To The Smart</h1>
					<div className="text-block"></div>
					<div className="embed">
						<div className="text-block-2" id="timerstart" >{this.props.timeStarted}</div>
					</div>
					{/* <a className="button-start w-button" onClick={this.GetFreeMin.bind(this)}>  Get Free Miners 10 BUSD</a> */}
					<div className="error-egs">
						<div>The bonus can only be received once</div>
					</div>
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
										<video src="www.youtube.com/watch@v=V548n_bXRQs" controls="controls" width="560" height="315"  />                                                                                                                                                
									</div>
								</div>
							</div>
							<div className="columwhat2">
								<div className="div-block-6">
									<div className="link">
										<div className="text-block-9">Tothesmart Whitepaper</div>
									</div>
									<div className="div-block-7"><a href="/PDF/TOTheSmart(EN).pdf" target="_blank" className="link-pdf w-inline-block">
									<div className="text-block-10">English</div><div className="downl"></div></a><a href="/PDF/TOTheSmart(CHINA).pdf" target="_blank" className="link-pdf _2 w-inline-block">
									<div className="text-block-10">Chinese</div><div className="downl"></div></a><a href="/PDF/TOTheSmart(Hindi).pdf" target="_blank" className="link-pdf _3 w-inline-block">
									<div className="text-block-10">Hindi</div><div className="downl"></div></a><a href="/PDF/TOTheSmart(ES).pdf" target="_blank" className="link-pdf _4 w-inline-block"><div className="text-block-10">Spanish</div><div className="downl"></div></a></div>
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
		timeStarted: state.timeStarted,
    };
}

const mapDispatchToProps = dispatch => {
    return { dispatch }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);