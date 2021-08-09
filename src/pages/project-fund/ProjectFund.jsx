import { Container } from "@material-ui/core";
import React, { Component } from "react";
import { FiArrowLeft } from "react-icons/fi";
import Chart from "react-apexcharts";
import AppBar from "../../components/AppBar";
import Sidebar from "../../components/Sidebar";
import { ProjectHeaderTab } from "../../components/launchPad";
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
				colors: "#e60000",
				type: "gradient",
				gradient: {
					type: "verticle",
					shadeIntensity: 1,
					gradientToColors: "#62181a",
					opacityFrom: 0.7,
					opacityTo: 1,
					stops: [0, 50, 100],
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
					color: "#333333",
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
					colors: {
						ranges: [
							{
								color: "linear-gradient(180deg, #E60000 0%, #62181A 100%)",
							},
						],
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

		const fundDatas = [
			{
				title: "Total Funds Raised",
				data: "224 BNB",
			},
			{
				title: "Max BNB",
				data: "100 BNB",
			},
			{
				title: "Participants",
				data: "600",
			},
			{
				title: "Published On",
				data: "Jul 14, 2021",
			},
		];

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
								liveStatus="Live Now"
								solidBtn="Claim Raised Funds"
								borderBtn="View BscScan"
							/>
							<div className="about-project-container">
								<div className="about-project-img-wrapper">
									<div className="data-sec-wrapper">
										<ul className="img-data-container">
											{fundDatas.map((fundData) => (
												<li key={fundData.title} className="img-data-box">
													<h1 className="tba">
														<span>{fundData.data}</span>
													</h1>
													<p className="project-id">{fundData.title}</p>
												</li>
											))}
										</ul>
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
								</div>
							</div>
						</div>
					</Container>
				</div>
			</>
		);
	}
}
