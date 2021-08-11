import { Container } from "@material-ui/core";
import React, { Component } from "react";
import { FiArrowLeft } from "react-icons/fi";
import AppBar from "../../components/AppBar";
import Sidebar from "../../components/Sidebar";
import { InfoCard, ProjectHeaderTab } from "../../components/launchPad";
import "./ProjectDetail.css";
import powerRed from "../../assets/images/power-red.png";

export default class ProjectDetail extends Component {
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
				<Sidebar active="launch-pad" theme={theme} onThemeToggle={onThemeToggle} />
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
					<Container>
						<div className="ido-parent-container">
							<div className="back-container">
								<FiArrowLeft
									size={28}
									className="back-arrow"
									onClick={() => history.push("/launch-pad")}
								/>
								<h3 className="project-name" style={{ padding: "0" }}>
									Back
								</h3>
							</div>
							<ProjectHeaderTab
								projectName="Project Name"
								projectAddress="0x0ced9271F49719997787D21DA466Deb94e60d9d6"
								projectBNB="1BNB=0.1145 name"
								salePercentage="95"
								BNBNum="222.1698694303834 / 234.BNB"
								liveStatus="Sale Live Now"
								solidBtn="Buy Token"
								borderBtn="View BscScan"
							/>
							<div className="about-project-container">
								<div className="about-project-img-wrapper">
									<img className="power-red" src={powerRed} alt="powerRed" />
								</div>
								<div className="project-detail-wrapper">
									<div className="overview-container">
										<h3 className="team-review" style={{ fontSize: "20px" }}>
											Project Overview
										</h3>
										<p className="tba-desc" style={{ fontSize: "16px" }}>
											Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
											incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
											nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
											Duis aute irure dolor in. Lorem ipsum dolor sit amet, consectetur adipiscing
											elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
											enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
											aliquip ex ea commodo consequat. Duis aute irure dolor in
										</p>
									</div>
									<h3 className="team-review" style={{ fontSize: "20px" }}>
										Pool Details
									</h3>
									<div className="info-container">
										<InfoCard
											CardTitle="Pool information"
											TokenDistribution="22/05/2021, 3:59 AM UTC"
											AuditStatus="Passed"
											TotalSaleAmount="$50,000.00"
											AvialablePurchase="200,000.00 NAME"
											MarketCap="$50,000"
											Kyc="No"
										/>
										<InfoCard
											CardTitle="Token information"
											Name="Name"
											Symbol="SYM"
											Address="0x163f182c32d24a09090090"
											Blockchain="Binance Smart Chain"
											InitialSupply="400,000.0"
											TotalSupply="1,000,000.0"
										/>
									</div>
								</div>
							</div>
						</div>
					</Container>
				</div>
			</>
		);
	}
}
