import { Container } from "@material-ui/core";
import React, { Component } from "react";
import { Menu, Dropdown, Spin, Empty } from "antd";
import { BiMenuAltRight } from "react-icons/bi";
import AppBar from "../../components/AppBar";
import Sidebar from "../../components/Sidebar";
import { LaunchPadBanner, ProjectListCard } from "../../components/launchPad";
import "./LaunchPad.css";
import { client } from "../../apollo/client";
import {
	GET_ALL_COMPLETED_PROJECTS,
	GET_ALL_ONGOING_PROJECTS,
	GET_ALL_UPCOMING_PROJECTS,
} from "../../apollo/queries";
import moment from "moment";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import { ethers } from "ethers";

class LaunchPad extends Component {
	constructor(props) {
		super(props);
		this.state = {
			fetchingUpcomingProjects: true,
			upcomingProjects: [],
			fetchingProjects: true,
			projects: [],
			tab: "ongoing",
		};
	}

	componentDidMount() {
		this.fetchAllProjects("upcoming");
		this.fetchAllProjects();
	}

	fetchAllProjects = (type = "ongoing", skip = 0) => {
		const query =
			type === "upcoming"
				? GET_ALL_UPCOMING_PROJECTS
				: type === "ongoing"
				? GET_ALL_ONGOING_PROJECTS
				: GET_ALL_COMPLETED_PROJECTS;
		client
			.query({
				query: query,
				variables: {
					skip,
					date: moment().unix(),
				},
			})
			.then((res) => {
				// console.log(`All ${type} projects`, res.data.projects);
				const projects = type === "upcoming" ? this.state.upcomingProjects : this.state.projects;
				this.setState({
					[type === "upcoming" ? "upcomingProjects" : "projects"]:
						skip === 0 ? res.data.projects : [...projects, ...res.data.projects],
				});
			})
			.catch((err) => console.log(err))
			.finally(
				() =>
					skip === 0 &&
					this.setState({
						[type === "upcoming" ? "fetchingUpcomingProjects" : "fetchingProjects"]: false,
					})
			);
	};

	handleShowMore = () => {
		const { tab, projects } = this.state;
		this.fetchAllProjects(tab, projects.length);
	};

	handleUpcomingShowMore = () => {
		const { upcomingProjects } = this.state;
		this.fetchAllProjects("upcoming", upcomingProjects.length);
	};

	handleTabChange = (e, type = "upcoming") => {
		e.preventDefault();
		this.setState({ tab: type, fetchingProjects: true }, () => this.fetchAllProjects(type));
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

		const { tab, fetchingUpcomingProjects, upcomingProjects, fetchingProjects, projects } =
			this.state;

		const menu = (
			<Menu>
				<Menu.Item key="ongoing" className={tab === "ongoing" ? "dropdown-active" : ""}>
					<a href="##" onClick={(e) => this.handleTabChange(e, "ongoing")}>
						Ongoing Pools
					</a>
				</Menu.Item>
				<Menu.Item key="completed" className={tab === "completed" ? "dropdown-active" : ""}>
					<a href="##" onClick={(e) => this.handleTabChange(e, "completed")}>
						Completed Pools
					</a>
				</Menu.Item>
			</Menu>
		);

		return (
			<>
				<Sidebar active="launch-pad" theme={theme} onThemeToggle={onThemeToggle} />
				<div className="app-container">
					<AppBar
						active="launch-pad"
						theme={theme}
						onThemeToggle={onThemeToggle}
						modalVisible={modalVisible}
						onModalToggle={onModalToggle}
						walletAddress={walletAddress}
						walletConnected={walletConnected}
						ethBalance={ethBalance}
						vrapBalance={vrapBalance}
						isTestnet
					/>
					<Container>
						<div className="ido-parent-container">
							<LaunchPadBanner
								header="Welcome to VRAP LaunchPad"
								desc="Enabling projects to raise capital on a decentralized and interoperable environment based on Binance Smart Chain. Hold VRAP and participate in the world's best Decentralized Fund Raising Community."
								buttonText="My Projects"
							/>
							<h3 className="team-review">Upcoming Pools</h3>
							<div className="upcoming-card-parent">
								{fetchingUpcomingProjects ? (
									<Spin size="large" className="projects-loader" />
								) : upcomingProjects.length > 0 ? (
									<>
										{upcomingProjects.map((project) => (
											<ProjectListCard
												id={project.id}
												key={project.id}
												projectStatus="upcoming"
												projectName={project.name}
												totalRaise="TBA"
												minAlloc="TBA"
												maxAlloc={project.tokensAllocated}
												tokenSymbol={project.tokenSymbol}
												access="TBA"
												saleCompletion={false}
											/>
										))}
									</>
								) : (
									<Empty
										className="projects-empty-status"
										description="There are no upcoming projects right now"
									/>
								)}
							</div>
							{upcomingProjects.length >= 3 && upcomingProjects.length % 6 > 0 && (
								<div className="show-more-section" style={{ marginTop: "1.5rem" }}>
									<button onClick={this.handleUpcomingShowMore}>Show more</button>
								</div>
							)}
							<section className="apply-sec">
								<div className="apply-text-container">
									<h1 className="apply-header">
										<span>Get your projects featured with us!</span>
									</h1>
									<p className="apply-desc">
										Welcome to the future of decentralised fundraising on Veraswap.
									</p>
								</div>
								<div className="apply-btn-container">
									<button onClick={() => this.props.history.push("/ido/new-application")}>
										Apply for IDO
									</button>
								</div>
							</section>
							<div className="featured">
								<h3 className="project-name" style={{ paddingTop: 0 }}>
									Featured Pools
								</h3>
								<Dropdown placement={"bottomRight"} overlay={menu} trigger={["click"]}>
									<button className="dropdown-btn">
										<BiMenuAltRight size={20} />
									</button>
								</Dropdown>
							</div>
							<div className="upcoming-card-parent">
								{fetchingProjects ? (
									<Spin size="large" className="projects-loader" />
								) : projects.length > 0 ? (
									projects.map((project) => (
										<ProjectListCard
											key={project.id}
											id={project.id}
											projectStatus={tab}
											projectName={project.name}
											bnbName
											totalRaise={`$${parseFloat(
												ethers.utils.formatUnits(project.totalUSDRaised, 18)
											).toPrecision(4)}`}
											percentage={
												parseFloat(
													ethers.utils.formatUnits(project.tokensDeposited, project.tokenDecimals)
												) > 0
													? Math.ceil(
															(parseFloat(
																ethers.utils.formatUnits(project.tokensSold, project.tokenDecimals)
															) /
																(parseFloat(
																	ethers.utils.formatUnits(
																		project.tokensDeposited,
																		project.tokenDecimals
																	)
																) -
																	parseFloat(
																		ethers.utils.formatUnits(
																			project.tokensWithdrawn,
																			project.tokenDecimals
																		)
																	))) *
																100
													  )
													: 0
											}
											bnbNo={`${parseFloat(
												ethers.utils.formatUnits(project.tokensSold, project.tokenDecimals)
											).toFixed(4)} / ${(
												parseFloat(
													ethers.utils.formatUnits(project.tokensDeposited, project.tokenDecimals)
												) -
												parseFloat(
													ethers.utils.formatUnits(project.tokensWithdrawn, project.tokenDecimals)
												)
											).toFixed(4)} ${project.tokenSymbol}`}
											participants
											maxBnb={project.maxCapInVrap}
											access="Private"
											saleCompletion={true}
											tokenCost={project.tokenCost}
											tokenSymbol={project.tokenSymbol}
											tokenDecimals={project.tokenDecimals}
										/>
									))
								) : (
									<Empty
										className="projects-empty-status"
										description={`There are no ${tab} projects`}
									/>
								)}
							</div>
							{projects.length >= 3 && projects.length % 6 > 0 && (
								<div className="show-more-section" style={{ marginTop: "1.5rem" }}>
									<button onClick={this.handleShowMore}>Show more</button>
								</div>
							)}
							<div className="lpbanner-bottom">
								<LaunchPadBanner
									header="Get Alerts For New Pools"
									desc="Subscribe to get notified about new pools and other relevant events."
									buttonText="Subscribe"
								/>
							</div>
						</div>
					</Container>
				</div>
			</>
		);
	}
}

export default withRouter(LaunchPad);
