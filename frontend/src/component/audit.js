import React, { useEffect } from "react";


const Audit = () => {
    return <>
    <div id="Audit" class="se3 wf-section">
			<div class="monitor">
				<div class="timer">
					<div class="timer-blockchain">
						<div class="text-block-18">TIME POOL</div>
						<div class="text-block-19" id="timer3">00:00</div>
						<div class="div-block-16">
							<div class="text-block-20" id="contractbalancePOOL">000.0000 BUSD</div>
						</div>
						<div class="div-block-20">
							<div class="text-block-25">Last Wallet Address :</div>
							<div class="example" id="lastuserpool"></div>
						</div>
						<div class="wallet-text">If there are no purchases of miners in the amount of $50 or more within an hour after you, then the entire amount of Time Pool will automatically be credited to your wallet. This is guaranteed by a<a href="../https@bscscan.com/address/0x0cff03d61af4ef29a374b8aeef8bbedd6abc63b5" target="_blank" class="link-text"> smart contract</a></div>
					</div>
				</div>
				<div class="div4">
					<div class="divcontentl-wallet">
						<h2 class="h2">Buy Miners</h2>
						<div class="divitem">
							<div class="div-block-12">
								<div class="itemscore-sale">
									<div class="text-score">Contract</div>
									<div class="text-meaning" id="ba2">000.0000 BUSD</div>
								</div>
							</div>
							<div class="div-block-12">
								<div class="itemscore-sale">
									<div class="text-score">My Miners</div>
									<div class="text-meaning" id="myminers">000</div>
								</div>
							</div>
						</div>
						<div class="div-block-11">
							<div class="w-form">
								<form id="email-form" name="email-form" data-name="Email Form" method="get">
									<div class="div-field">
                                        <input id="stake-input" class="text-field w-input placeholder" placeholder="Minimun 50 BUSD" min="1" value="50" />
										<div class="iconka">
											<div id="stake-max-ctr">
												<div id="stake-max" onClick="stakemax()">max</div>
											</div>
										</div>
									</div>
									<div class="div-block-13"><a class="button-dop w-button" onClick="approveBUSD()">Approve BUSD</a><a class="button-dop w-button" onClick="BuyMin()">Buy Miner</a></div>
								</form>
								<div class="w-form-done">
									<div>Thank you! Your submission has been received!</div>
								</div>
								<div class="w-form-fail">
									<div>Oops! Something went wrong while submitting the form.</div>
								</div>
								<div class="w-form-ref-error">
									<div>To buy miners follow the referral link</div>
								</div>
							</div>
						</div>
					</div>
					<div class="divcontentl-sale">
						<h2 class="h2">Re-Mining & Sell</h2>
						<div class="divitem">
							<div class="div-block-12">
								<div class="itemscore-sale">
									<div class="text-score">My Tokens</div>
									<div class="text-meaning" id="Tokens">00.000</div>
								</div>
							</div>
							<div class="div-block-12">
								<div class="itemscore-sale">
									<div class="text-score">My Rewards</div>
									<div class="text-meaning" id="myrewards">00.0000 BUSD</div>
								</div>
							</div>
						</div>
						<div class="textre">For each Re-Mining you will receive a 5% bonus. For each Withdraw, you will pay a 5% tax on the miners you have.</div>
						<div class="div-block-13 _2"><a class="button-dop w-button" onClick="reinvest()">Re-Mining</a>
						<a class="button-dop w-button" onClick="SellMin()">Sell Tokens</a></div>
						<div class="error-info">
							<div>You have to buy miners to unlock the sale or Re-Mine</div>
						</div>
					</div>
				</div>
			</div>
		</div>
    </>
}

export default Audit;