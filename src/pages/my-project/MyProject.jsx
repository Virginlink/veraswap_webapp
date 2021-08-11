import { Container } from "@material-ui/core";
import React, { Component } from "react";
import { Menu, Dropdown } from "antd";
import { BiMenuAltRight } from "react-icons/bi";
import AppBar from "../../components/AppBar";
import Sidebar from "../../components/Sidebar";
import { LaunchPadBanner, ProjectListCard } from "../../components/launchPad";
import { ProjectReviewModal } from "../../components/modals";

export default class MyProject extends Component {
	state = {
		projectReviewVisible: false,
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
		} = this.props;

		const menu = (
			<Menu>
				<Menu.Item key="0" className="dropdown-active">
					<a href="!#">Ongoing Pools</a>
				</Menu.Item>
				<Menu.Item key="1">
					<a href="!#">Completed Pools</a>
				</Menu.Item>
			</Menu>
		);

		const toggleProjectReview = () => {
			this.setState((state) => ({
				projectReviewVisible: !state.projectReviewVisible,
			}));
		};

		const { projectReviewVisible } = this.state;

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
							<LaunchPadBanner
								header="My Projects"
								desc="Collection of your priceless projects that raised capital on our decentralized and interoperable environment based on Binance."
								buttonText="Back to Launchpad"
							/>
							<h3 className="team-review">Projects under Team Review</h3>
							<div className="upcoming-card-parent" style={{ marginBottom: "100px" }}>
								<ProjectListCard
									ProjectStatus="Upcomming"
									ProjectName="Project name"
									TotalRaise="TBA"
									MinAlloc="TBA"
									MaxAlloc="TBA"
									Access="TBA"
									SaleCompletion={false}
									toggleProjectReview={toggleProjectReview}
								/>
								<ProjectListCard
									ProjectStatus="Upcomming"
									ProjectName="Project name"
									TotalRaise="TBA"
									MinAlloc="TBA"
									MaxAlloc="TBA"
									Access="TBA"
									SaleCompletion={false}
									toggleProjectReview={toggleProjectReview}
								/>
							</div>
							<div className="featured">
								<h3 className="project-name">Featured Pools</h3>
								<Dropdown placement={"bottomRight"} overlay={menu} trigger={["click"]}>
									<button className="dropdown-btn">
										<BiMenuAltRight size={20} />
									</button>
								</Dropdown>
							</div>
							<div className="upcoming-card-parent" style={{ marginBottom: "50px" }}>
								{[...Array(6)].map((x, i) => (
									<ProjectListCard
										key={i}
										ProjectStatus="Ongoing"
										ProjectName="Project name"
										BNBname="1BNB=0.1145 name"
										TotalRaise="2025 BNB"
										Percentage={95}
										BNBno="222.1698694303834 / 234.BNB"
										Participants={600}
										MaxBNB={3.5}
										Access="Private"
										SaleCompletion={true}
									/>
								))}
							</div>
						</div>
						<ProjectReviewModal open={projectReviewVisible} onClose={toggleProjectReview} />
					</Container>
				</div>
			</>
		);
	}
}
