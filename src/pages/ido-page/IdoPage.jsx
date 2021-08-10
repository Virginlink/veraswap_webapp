import { Container } from "@material-ui/core";
import React, { Component } from "react";
import AppBar from "../../components/AppBar";
import Sidebar from "../../components/Sidebar";
import "./IdoPage.css";
import IdoImg from "../../assets/images/Isometric-07.png";

export default class IdoPage extends Component {
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
				<Sidebar active="ico" theme={theme} onThemeToggle={onThemeToggle} />
				<div className="app-container">
					<AppBar
						active="stake"
						theme={theme}
						onThemeToggle={onThemeToggle}
						modalVisible={modalVisible}
						onModalToggle={onModalToggle}
						walletAddress={walletAddress}
						walletConnected={walletConnected}
						ethBalance={ethBalance}
						vrapBalance={vrapBalance}
					/>
					<div className="container-helper">
						<Container maxWidth="md">
							<div className="ido-parent-container">
								<div className="ido-container">
									<h1 className="ido-header">
										<span>Veraswap</span> IDO Application
									</h1>
									<main className="ido-main">
										<section className="ido-image-sec">
											<div className="ido-image-container">
												<img src={IdoImg} alt="ido" />
											</div>
											<button
												className="new-app-btn"
												onClick={() => history.push("/application-form")}
											>
												New Application
											</button>
										</section>
										<section className="ido-desc">
											<p>
												Welcome to the future of decentralised fundraising on Veraswap. Our mission
												is to bring the highest quality projects together with investors to enable
												the launch of innovative startups and technology. With this goal, it is the
												responsibility of the Veraswap to act as a governance board to ensure
												quality and due diligence for the projects we launch.
												<br />
												<br />
												The Council will review and vote on your application for launch on Veraswap.
												Each application is submitted to a thorough and rigorous review during the
												due diligence process, and then evaluated based on objective merits. Each of
												the Council members will cast their vote, and projects having greater than
												60% of the Council's vote are approved for launch. If approved, projects
												will be provided with detailed instructions on how to prepare for and
												execute their launch on Polkastarter.
												<br />
												<br />
												Interested projects should create a profile using this website, and create
												and submit an application. A member of the Veraswap review team will contact
												you with further instructions.
												<br />
												<br />
												Thank you for your interest.
											</p>
										</section>
									</main>
								</div>
							</div>
						</Container>
					</div>
				</div>
			</>
		);
	}
}
