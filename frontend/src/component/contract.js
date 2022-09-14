import React, { useEffect } from "react";
import { connect } from 'react-redux';

class Contract extends React.Component {

	constructor(props){
        super(props);
        this.state = {
			totalCount: "0",
			newCount: "0",
			totalTransaction: "0",
			newTransaction: "0",
			totalBUSD: "0",
			newBUSD:"0"
        }

		this.updateTime();
		this.timer = setInterval(() => {
            this.updateTime();
        }, 60 * 1000);
    }


	updateTime(){
		const requestOptions = {
            method: 'GET'
        };
        fetch('http://localhost:9000/getTransactionInfo', requestOptions)
            .then(response => response.json())
            .then(data => {
                this.setState({totalTransaction: data.total_transaction, 
					newTransaction:data.new_transaction,
					totalBUSD:data.total_busd,
					newBUSD:data.new_busd});
            });         

		fetch('http://localhost:9000/getWalletCount', requestOptions)
            .then(response => response.json())
            .then(data => {
                this.setState({totalCount: data.total_count, 
					newCount:data.new_count});
            });  
	}

	render (){
		return (<>
			<div id="Contract" className="se2 wf-section">
				<div className="div3">
					<div className="divcontentl _2">
						<div className="div-block-4">
							<h2 className="h2 contra">Tothesmart contract</h2>
							<div className="div-block-5">

							</div>
							<a href="https://bscscan.com/address/0x9f0434a404A936bFA064dB3E34AaB2Ca1fBFcfA6" target="_blank" className="div-block-5 w-inline-block">
								<div className="point" data-ix="aniim-online">
								</div>
								<div className="text-block-23">View</div>
							</a>
						</div>
						<div className="head-values">
							<div className="div-colum">
								<div className="text-block-4">Members Total</div>
								<div className="item-values">
									<div className="text-block-6" id="us2">{this.state.totalCount}</div>
								</div>
								<div className="item-values-rela">
									<div className="text-block-7"  id="us">+{this.state.newCount}</div>
								</div>
							</div>
							<div className="div-colum">
								<div className="text-block-4">Transactions made</div>
								<div className="item-values">
									<div className="text-block-6" id="de2">{this.state.totalTransaction}</div>
								</div>
								<div className="item-values-rela">
									<div className="text-block-7" id="de">+{this.state.newTransaction}</div>
								</div>
							</div>
							<div className="div-colum">
								<div className="text-block-4">Turnover, BUSD</div>
								<div className="item-values">
									<div className="text-block-6" id="vo2">{this.state.totalBUSD}</div>
								</div>
								<div className="item-values-rela">
									<div className="text-block-7"  id="vo">+{this.state.newBUSD}</div>
								</div>
							</div>
						</div>
						<div className="item-values-dop">
							<div className="item-dop">
								<div className="item-head">
									<div className="text-block-8">Daily Return</div>
								</div>
								<div className="item-value" data-ix="anim1">
									<div>5%</div>
								</div>
							</div>
							<div className="item-dop">
								<div className="item-head">
									<div className="text-block-8">APR</div>
								</div>
								<div className="item-value _2">
									<div>1800%</div>
								</div>
							</div>
							<div className="item-dop">
								<div className="item-head">
									<div className="text-block-8">Re-Mining bonus</div>
								</div>
								<div className="item-value _3">
									<div>5%</div>
								</div>
							</div>
							<div className="item-dop _4">
								<div className="item-head">
									<div className="text-block-8">Dev fee</div>
								</div>
								<div className="item-value _4">
									<div>5%</div>
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
    };
}

const mapDispatchToProps = dispatch => {
    return { dispatch }
}


export default connect(mapStateToProps, mapDispatchToProps)(Contract);