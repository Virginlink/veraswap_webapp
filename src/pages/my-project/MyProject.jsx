import { Container } from "@material-ui/core";
import React, { Component } from "react";
import { Menu, Dropdown, Empty, Spin } from "antd";
import { BiMenuAltRight } from "react-icons/bi";
import AppBar from "../../components/AppBar";
import Sidebar from "../../components/Sidebar";
import { LaunchPadBanner, ProjectListCard } from "../../components/launchPad";
import { ProjectReviewModal } from "../../components/modals";
import { client } from "../../apollo/client";
import {
	GET_COMPLETED_PROJECTS_BY_USER,
	GET_ONGOING_PROJECTS_BY_USER,
	GET_PROJECTS_BY_USER_UNDER_REVIEW,
	GET_UPCOMING_PROJECTS_BY_USER,
} from "../../apollo/queries";
import moment from "moment";
import { ethers } from "ethers";
export default class MyProject extends Component {
	constructor(props) {
		super(props);
		this.state = {
			projectReviewVisible: false,
			fetchingProjectsUnderReview: true,
			projectsUnderReview: [],
			fetchingProjects: true,
			projects: [],
			tab: "upcoming",
		};
	}

	componentDidMount() {
		const { walletConnected } = this.props;
		if (walletConnected) {
			this.fetchProjectsUnderReview();
			this.fetchAllProjects();
		}
	}

	componentDidUpdate(prevProps) {
		if (
			(this.props.walletConnected !== prevProps.walletConnected && this.props.walletConnected) ||
			(this.props.walletAddress !== prevProps.walletAddress && this.props.walletAddress)
		) {
			this.fetchProjectsUnderReview();
			this.fetchAllProjects(this.state.tab);
		}
	}

	fetchProjectsUnderReview = (skip = 0) => {
		const { walletAddress } = this.props;
		client
			.query({
				query: GET_PROJECTS_BY_USER_UNDER_REVIEW,
				variables: {
					userAddress: walletAddress.toLowerCase(),
					skip,
				},
			})
			.then((res) => {
				this.setState({
					projectsUnderReview:
						skip === 0
							? res.data.projects
							: [...this.state.projectsUnderReview, ...res.data.projects],
				});
			})
			.catch((err) => console.log(err))
			.finally(() => skip === 0 && this.setState({ fetchingProjectsUnderReview: false }));
	};

	fetchAllProjects = (type = "upcoming", skip = 0) => {
		const { walletAddress } = this.props;
		const query =
			type === "upcoming"
				? GET_UPCOMING_PROJECTS_BY_USER
				: type === "ongoing"
				? GET_ONGOING_PROJECTS_BY_USER
				: GET_COMPLETED_PROJECTS_BY_USER;
		client
			.query({
				query: query,
				variables: {
					userAddress: walletAddress.toLowerCase(),
					skip,
					date: moment().unix(),
				},
			})
			.then((res) => {
				this.setState({
					projects: skip === 0 ? res.data.projects : [...this.state.projects, ...res.data.projects],
				});
			})
			.catch((err) => console.log(err))
			.finally(() => skip === 0 && this.setState({ fetchingProjects: false }));
	};

	handleProjectsShowMore = () => {
		const { projects, tab } = this.state;
		this.fetchAllProjects(tab, projects.length);
	};

	handleReviewProjectsShowMore = () => {
		const { projectsUnderReview } = this.state;
		this.fetchProjectsUnderReview(projectsUnderReview.length);
	};

	handleTabChange = (e, type = "upcoming") => {
		e.preventDefault();
		this.setState({ tab: type, fetchingProjects: true }, () => this.fetchAllProjects(type));
	};

	toggleProjectReview = () => {
		this.setState((state) => ({
			projectReviewVisible: !state.projectReviewVisible,
		}));
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

		const {
			projectReviewVisible,
			fetchingProjects,
			projects,
			fetchingProjectsUnderReview,
			projectsUnderReview,
			tab,
		} = this.state;

		const menu = (
			<Menu>
				<Menu.Item key="upcoming" className={tab === "upcoming" ? "dropdown-active" : ""}>
					<a href="##" onClick={(e) => this.handleTabChange(e, "upcoming")}>
						Upcoming Pools
					</a>
				</Menu.Item>
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
								header="My Projects"
								desc="Collection of your priceless projects that raised capital on our decentralized and interoperable environment based on Binance."
								buttonText="Back to Launchpad"
							/>
							<h3 className="team-review">Projects paused for Team Review</h3>
							<div className="upcoming-card-parent" style={{ marginBottom: "100px" }}>
								{walletConnected ? (
									fetchingProjectsUnderReview ? (
										<Spin size="large" className="projects-loader" />
									) : projectsUnderReview.length > 0 ? (
										<>
											{projectsUnderReview.map((project) => (
												<ProjectListCard
													owner
													id={project.id}
													key={project.id}
													projectStatus="Paused"
													projectName={project.name}
													totalRaise={
														parseFloat(ethers.utils.formatUnits(project.totalUSDRaised, 18)) > 0
															? parseFloat(ethers.utils.formatUnits(project.totalUSDRaised, 18))
															: "TBA"
													}
													minAlloc="TBA"
													maxAlloc={project.tokensAllocated}
													tokenSymbol={project.tokenSymbol}
													access="TBA"
													saleCompletion={false}
													toggleProjectReview={this.toggleProjectReview}
												/>
											))}
										</>
									) : (
										<Empty
											className="projects-empty-status"
											description="Currently there are no projects under review"
										/>
									)
								) : (
									<Empty
										className="projects-empty-status"
										description="Connect your wallet to view your projects"
									/>
								)}
							</div>
							{projectsUnderReview.length >= 3 && projectsUnderReview.length % 6 > 0 && (
								<div className="show-more-section" style={{ marginTop: "-5rem" }}>
									<button onClick={this.handleReviewProjectsShowMore}>Show more</button>
								</div>
							)}
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
							<div className="upcoming-card-parent" style={{ marginBottom: "50px" }}>
								{walletConnected ? (
									fetchingProjects ? (
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
																	ethers.utils.formatUnits(
																		project.tokensSold,
																		project.tokenDecimals
																	)
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
												owner
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
									)
								) : (
									<Empty
										className="projects-empty-status"
										description="Connect your wallet to view your projects"
									/>
								)}
							</div>
							{projects.length >= 3 && projects.length % 6 > 0 && (
								<div className="show-more-section" style={{ marginTop: "-1.5rem" }}>
									<button onClick={this.handleProjectsShowMore}>Show more</button>
								</div>
							)}
						</div>
						<ProjectReviewModal open={projectReviewVisible} onClose={this.toggleProjectReview} />
					</Container>
				</div>
			</>
		);
	}
}
