import { Container } from "@material-ui/core";
import React, { Component } from "react";
import { FiArrowLeft } from "react-icons/fi";
import Chart from "react-apexcharts";
import AppBar from "../../components/AppBar";
import Sidebar from "../../components/Sidebar";
import { InfoCard, ProjectHeaderTab } from "../../components/launchPad";
import "./ProjectFund.css";
import powerRed from "../../assets/images/power-red.png";

export default class ProjectFund extends Component {
	state = {
		options: {
			chart: {
				id: "basic-bar",
				toolbar: {
					show: false,
				},
			},
			fill: {
				colors: "#E60000",
				type: "gradient",
				gradient: {
					shade: "light",
					type: "diagonal2",
					gradientToColors: "#62181A",
					shadeIntensity: 0,
					opacityFrom: 0.7,
					opacityTo: 0.9,
					stops: [0, 90, 100],
				},
			},
			dataLabels: {
				enabled: false,
			},
			grid: {
				show: false,
			},
			xaxis: {
				categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
				labels: {
					show: false,
				},
				axisTicks: {
					show: false,
				},
				axisBorder: {
					show: true,
					color: "#4B5563",
				},
			},
			yaxis: {
				labels: {
					show: false,
				},
			},
			plotOptions: {
				bar: {
					columnWidth: "50%",
				},
			},
			tooltip: {
				enabled: false,
			},
			states: {
				hover: {
					filter: {
						type: "none",
						value: 0,
					},
				},
				active: {
					allowMultipleDataPointsSelection: false,
					filter: {
						type: "none",
						value: 0,
					},
				},
			},
		},
		series: [
			{
				name: "series-1",
				data: [30, 40, 45, 50, 49, 60, 70, 91],
			},
		],
	};
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
								projectBnb="1BNB=0.1145 name"
								salePercentage="95"
								bnbNum="222.1698694303834 / 234.BNB"
								liveStatus="Live Now"
								solidBtn="Claim Raised Funds"
								borderBtn="View BscScan"
							/>
							<div className="about-project-container">
								<div className="about-project-img-wrapper">
									<div className="data-sec-wrapper">
										<div className="img-data-container">
											<div className="img-data-sec">
												<div className="img-data-box bd-right">
													<h1 className="tba">
														<span>224 BNB</span>
													</h1>
													<p className="project-id">Total Funds Raised</p>
												</div>
												<div className="img-data-box bd-right">
													<h1 className="tba">
														<span>100 BNB</span>
													</h1>
													<p className="project-id">Max BNB</p>
												</div>
											</div>
											<div className="img-data-sec">
												<div className="img-data-box bd-right remove-bd">
													<h1 className="tba">
														<span>600</span>
													</h1>
													<p className="project-id">Participants</p>
												</div>
												<div className="img-data-box">
													<h1 className="tba">
														<span>Jul 14, 2021</span>
													</h1>
													<p className="project-id">Jul 14, 2021</p>
												</div>
											</div>
										</div>
									</div>
									<img className="power-red" src={powerRed} alt="powerRed" />
								</div>
								<div className="project-detail-wrapper">
									<div className="bar-chart-container">
										<h3 className="team-review" style={{ fontSize: "20px", margin: "0" }}>
											Funds Raised by this Project Month-wise
										</h3>
										<Chart
											options={this.state.options}
											series={this.state.series}
											type="bar"
											width="100%"
											height="500"
										/>
									</div>
									<h3 className="team-review" style={{ fontSize: "20px" }}>
										Pool Details
									</h3>
									<div className="info-container">
										<InfoCard
											cardTitle="Pool information"
											tokenDistribution="22/05/2021, 3:59 AM UTC"
											auditStatus="Passed"
											totalSaleAmount="$50,000.00"
											avialablePurchase="200,000.00 NAME"
											marketCap="$50,000"
											kyc="No"
										/>
										<InfoCard
											cardTitle="Token information"
											name="Name"
											symbol="SYM"
											address="0x163f182c32d24a09090090"
											blockchain="Binance Smart Chain"
											initialSupply="400,000.0"
											totalSupply="1,000,000.0"
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
