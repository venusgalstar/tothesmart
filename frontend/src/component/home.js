import React, { useEffect } from "react";


const Home = () => {
    return <>
        <div id="home" class="se1 wf-section">
			<div class="div1">
				<h1 class="h1">To The Smart</h1>
				<div class="text-block"></div>
				<div class="embed">
					<div class="text-block-2" id="timerstart" >00 : 00 : 00</div>
				</div><a class="button-start w-button" onClick="GetFreeMin()">  Get Free Miners 10 BUSD</a>
				<div class="error-egs">
					<div>The bonus can only be received once</div>
				</div>
			</div>
			<div class="div2">
				<div class="divcontentl-what">
					<div class="div-block-3">
					</div>
					<div class="div-block-17">
						<div class="columwhat">
							<div class="col-l">
								<h2 class="h2">What is ToTheSmart</h2>
								<div class="text-block-3">
                                    Play To Earn a mining farm built on the Binance Smart Chain blockchain. Buy miners, mine MineToken, and exchange it for BUSD or reinvest in your farm and increase your daily income.                                                                                          Participate in the ToTheSmart Ambassador program and earn income from every purchase of miners as well as from the income of your followers 7 generations deep. Your income is unlimited.</div>
								{/* <div style="" class="video w-video w-embed">
									<video src="../www.youtube.com/watch@v=V548n_bXRQs" controls="controls" width="560" height="315"  />                                                                                                                                                
								</div> */}
							</div>
						</div>
						<div class="columwhat2">
							<div class="div-block-6">
								<div class="link">
									<div class="text-block-9">Tothesmart Whitepaper</div>
								</div>
								<div class="div-block-7"><a href="PDF/TOTheSmart(EN).pdf" target="_blank" class="link-pdf w-inline-block"><div class="text-block-10">English</div><div class="downl"></div></a><a href="PDF/TOTheSmart(CHINA).pdf" target="_blank" class="link-pdf _2 w-inline-block"><div class="text-block-10">Chinese</div><div class="downl"></div></a><a href="PDF/TOTheSmart(Hindi).pdf" target="_blank" class="link-pdf _3 w-inline-block"><div class="text-block-10">Hindi</div><div class="downl"></div></a><a href="PDF/TOTheSmart(ES).pdf" target="_blank" class="link-pdf _4 w-inline-block"><div class="text-block-10">Spanish</div><div class="downl"></div></a></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
    </>
}

export default Home;