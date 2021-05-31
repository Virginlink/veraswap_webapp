import { Container } from "@material-ui/core";
import React, { Component } from "react";
import { withRouter } from "react-router";
import AppBar from "../../components/AppBar";
import Sidebar from "../../components/Sidebar";
import Interface from "../../assets/images/landing/interface.svg";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import "../landing/Landing.css";
import "./WhyVeraswap.css";

class WhyVeraswap extends Component {
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
				<Sidebar theme={theme} onThemeToggle={onThemeToggle} />
				<div className="app-container plain-bg">
					<AppBar
						home
						theme={theme}
						onThemeToggle={onThemeToggle}
						modalVisible={modalVisible}
						onModalToggle={onModalToggle}
						walletAddress={walletAddress}
						walletConnected={walletConnected}
						ethBalance={ethBalance}
						vrapBalance={vrapBalance}
					/>
					<Container maxWidth="md">
						<main className="landing-main why-veraswap-main">
							<section className="landing-section-inverted" style={{ alignItems: "flex-start" }}>
								<img width="400px" height="100%" src={Interface} alt="Why veraswap?" />
								<div>
									<h1 style={{ marginBottom: "3rem" }}>
										Why <span>VeraSwap?</span>
									</h1>
									<p style={{ width: "85%" }}>
										Veraswap brings together all in one place the most sort after use cases for
										decentralized finance.
										<br />
										<br />
										The ecosystem is built to incorporate the concept of an automatic market marker
										which uses a unique mathematical algorithm for token swap activities.
									</p>
								</div>
							</section>
						</main>
					</Container>
					<section className="app-features">
						<div className="features-grid">
							<div className="feature-card">
								There is also a staking pool feature which allows users to earn rewards in $Vrap
								token by staking their favourite cryptocurrencies through the profitable APY
								offering of theses pools.
							</div>
							<div className="feature-card">
								Veraswap also has built in its ecosystem a launchpad feature that allows other
								projects launch successfully while protecting participants.
							</div>
							<div className="feature-card">
								Built on the Binance Smart Chain, all these activities are carried out with low
								transaction fee within a user friendly interface.
							</div>
						</div>
					</section>
					<div className="navigation-buttons">
						<button className="nav-left" onClick={() => history.push("/")}>
							<FiChevronLeft size={26} /> Home
						</button>
						<button className="nav-right" onClick={() => history.push("/swap")}>
							Launch App <FiChevronRight size={26} />
						</button>
					</div>
				</div>
			</>
		);
	}
}

export default withRouter(WhyVeraswap);
