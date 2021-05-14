import { Container } from "@material-ui/core";
import React, { Component } from "react";
import { FiChevronRight } from "react-icons/fi";
import { withRouter } from "react-router";
import AppBar from "../../components/AppBar";
import Sidebar from "../../components/Sidebar";
import Hero from "../../assets/images/landing/main.svg";
import WhyVeraswap from "../../assets/images/landing/why-veraswap.svg";
import DefiProtocols from "../../assets/images/landing/defi-protocols.svg";
import Swap from "../../assets/icons/swap-white.svg";
import Stake from "../../assets/icons/stake-white.svg";
import Pool from "../../assets/icons/pool-white.svg";
import "./Landing.css";

class Landing extends Component {
	render() {
		const {
			theme,
			onThemeToggle,
			modalVisible,
			onModalToggle,
			walletAddress,
			walletConnected,
			ethBalance,
			vrapBalance,
			history,
		} = this.props;
		return (
			<>
				<Sidebar active="swap" theme={theme} onThemeToggle={onThemeToggle} />
				<div className="app-container">
					<AppBar
						modalVisible={modalVisible}
						onModalToggle={onModalToggle}
						walletAddress={walletAddress}
						walletConnected={walletConnected}
						ethBalance={ethBalance}
						vrapBalance={vrapBalance}
					/>
					<Container maxWidth="md">
						<main className="landing-main">
							<section className="landing-section">
								<img width="400px" height="auto" src={Hero} alt="User friendly defi exchange" />
								<div>
									<h1>
										<span>User-friendly</span> Decentralized Exchange
									</h1>
									<p>
										VeraSwap is a user-friendly decentralized exchange running on Binance Smart
										Chain (BSC), with lots of other features that let you stake and earn tokens.
										<br />
										<br />
										It's fast, cheap, and secure, hence anyone can use it without any prior
										knowledge.
									</p>
									<button onClick={() => history.push("/sale")}>
										Launch App <FiChevronRight size={26} />
									</button>
								</div>
							</section>
							<section className="landing-section-inverted">
								<img width="500px" height="auto" src={WhyVeraswap} alt="Why veraswap?" />
								<div>
									<h1>
										Why <span>VeraSwap?</span>
									</h1>
									<p>
										The advantage of using veraswap is far from just being built on Binance Smart
										Chain which allows fast transactions with the lowest minimum gas fee, the simple
										and user-friendly interphase with staking pools that let users earn while they
										trade, and many more.
										<br />
										<br />
										Users can enjoy high performance decentralized trading experience with a very
										little fee as low as 1 cent (depends upon the network traffic).
									</p>
								</div>
							</section>
							<section className="landing-section-centered">
								<h1>
									Several <span>Decentralized Finance</span> protocols under one platform
								</h1>
								<p>
									The public sale commenced on 1st March 2021 by 2:00 PM UTC. We've raised 1500 BNB
									so far in the first 2 phases of the sale. Phase 3 Starts on 5th March at 12 PM UTC
									and will last for only one hour.
								</p>
								<img
									width="500px"
									height="auto"
									src={DefiProtocols}
									alt="Defi Protocols"
									style={{ marginTop: "4rem" }}
								/>
							</section>
							<section className="landing-section-centered">
								<h1>
									Explore <span>VRAP</span>
								</h1>
								<div className="landing-cards-container">
									<div className="landing-card">
										<div className="icon">
											<img width="35px" height="auto" src={Swap} alt="swap" />
										</div>
										<h2>Swap</h2>
										<p>Swap or exchange two tokens on the Binance Smart Chain</p>
									</div>
									<div className="landing-card">
										<div className="icon">
											<img width="35px" height="auto" src={Stake} alt="stake" />
										</div>
										<h2>Stake</h2>
										<p>Earn VRAP tokens by staking in your favorite pools</p>
									</div>
									<div className="landing-card">
										<div className="icon">
											<img width="35px" height="auto" src={Pool} alt="pool" />
										</div>
										<h2>Pool</h2>
										<p>
											Each token asset has an independent weight, and can be traded against any
											other token in the pool
										</p>
									</div>
								</div>
							</section>
						</main>
					</Container>
				</div>
			</>
		);
	}
}

export default withRouter(Landing);
