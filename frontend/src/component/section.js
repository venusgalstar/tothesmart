import React, { useEffect } from "react";


const Audit = () => {
    return <>
    <div class="se6 wf-section">
			<div class="div7">
				<div class="div-block-18">
					<h2 class="h2">Transactions</h2>
					<div data-current="Tab 1" data-easing="ease" data-duration-in="300" data-duration-out="100" class="w-tabs">
						<div class="tabs-menu w-tab-menu"><a data-w-tab="Tab 1" class="tab w-inline-block w-tab-link w--current"><div>Buy and Sell</div></a><a data-w-tab="Tab 2" class="tab w-inline-block w-tab-link"><div>Ambassador program</div></a></div>
						<div class="w-tab-content">
							<div data-w-tab="Tab 1" class="panel w-tab-pane w--tab-active">
								<h3 class="h3 transactions"></h3>

								<div id="buy-sell-txs"></div>
					
							</div>

							<div data-w-tab="Tab 2" class="panel w-tab-pane">
								<h3 class="h3 transactions"></h3>

								<div id="referal-txs"></div>
								
							</div>

						</div>
					</div>
				</div>
			</div>
		</div>
    </>
}

export default Audit;