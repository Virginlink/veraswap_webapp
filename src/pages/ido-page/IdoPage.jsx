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
				<Sidebar active="ido" theme={theme} onThemeToggle={onThemeToggle} />
				<div className="app-container">
					<AppBar
						active="ido"
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
												onClick={() => history.push("/ido/new-application")}
											>
												New Application
											</button>
										</section>
										<section className="ido-desc">
											<p>
												Welcome to the future of decentralized fundraising on Verapad. Our mission
												is to bring the best quality projects and enthused investors to support the
												launch of innovative startups and technology. With this goal, it is the
												responsibility of the Verapad to act as a governance board perform quality
												and due diligence for the projects we launch.
												<br />
												<br />
												The Council can review and vote on your application for launch on Verapad.
												every application is submitted to a radical and rigorous review throughout
												the due diligence process, and so evaluated based on objective merits. Every
												of the Council members will cast their vote, and projects having greater
												than 70% of the Council's vote are approved for launch. If approved,
												projects are provided with instructions on the execution of their launch on
												Verapad. Interested projects should create and submit an application. A
												member of the Verapad review team will contact you with further
												instructions.
												<br />
												<br />
												On the Application page, Projects applicants can choose between the
												“Standard” or “Premium” application type.
												<br />
												<br />
												Standard: This allows you to submit an application and list your project
												without passing Our team review and due diligence.
												<br />
												<br />
												Premium: This type of application sends applicants data to our council for a
												review and approval. Projects that passed through our council review will be
												given more priority and possibly be promoted by Verapad Team
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
