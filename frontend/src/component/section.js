import React, { useEffect } from "react";


const Section = () => {
    return <>
    <div className="se6 wf-section">
			<div className="div7">
				<div className="div-block-18">
					<h2 className="h2">Transactions</h2>
					<div data-current="Tab 1" data-easing="ease" data-duration-in="300" data-duration-out="100" className="w-tabs">
						<div className="tabs-menu w-tab-menu">
							<a data-w-tab="Tab 1" className="tab w-inline-block w-tab-link w--current">
								<div>Buy and Sell</div>
							</a>
							<a data-w-tab="Tab 2" className="tab w-inline-block w-tab-link">
								<div>Ambassador program</div>
							</a>
						</div>
						<div className="w-tab-content">
							<div data-w-tab="Tab 1" className="panel w-tab-pane w--tab-active">
								<h3 className="h3 transactions"></h3>

								<div id="buy-sell-txs"></div>
					
							</div>

							<div data-w-tab="Tab 2" className="panel w-tab-pane">
								<h3 className="h3 transactions"></h3>

								<div id="referal-txs"></div>
								
							</div>

						</div>
					</div>
				</div>
			</div>
		</div>
    </>
}

export default Section;