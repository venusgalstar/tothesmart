import React, { useEffect } from "react";
import { connect } from 'react-redux';

class Contract extends React.Component {

	constructor(props){
        super(props);
        this.state = {
        }
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
							<a href="https://bscscan.com/address/0x2f9315577d7f45025a50ca744f474069ebb2b1f3" target="_blank" className="div-block-5 w-inline-block">
								<div className="point" data-ix="aniim-online">
								</div>
								<div className="text-block-23">View</div>
							</a>
						</div>
						<div className="head-values">
							<div className="div-colum">
								<div className="text-block-4">Members Total</div>
								<div className="item-values">
									<div className="text-block-6" id="us2">00</div>
								</div>
								<div className="item-values-rela">
									<div className="text-block-7"  id="us">00</div>
								</div>
							</div>
							<div className="div-colum">
								<div className="text-block-4">Transactions made</div>
								<div className="item-values">
									<div className="text-block-6" id="de2">00</div>
								</div>
								<div className="item-values-rela">
									<div className="text-block-7" id="de">00</div>
								</div>
							</div>
							<div className="div-colum">
								<div className="text-block-4">Turnover, BUSD</div>
								<div className="item-values">
									<div className="text-block-6" id="vo2">0</div>
								</div>
								<div className="item-values-rela">
									<div className="text-block-7"  id="vo">00</div>
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
        miner: state.miner,
    };
}

const mapDispatchToProps = dispatch => {
    return { dispatch }
}


export default connect(mapStateToProps, mapDispatchToProps)(Contract);