import React, { Component } from "react";
import { Container, Fade } from "@material-ui/core";
import { FiArrowLeft } from "react-icons/fi";
import AppBar from "../../components/AppBar";
import Sidebar from "../../components/Sidebar";
import { InfoCard, ProjectHeaderTab } from "../../components/launchPad";
import powerRed from "../../assets/images/power-red.png";
import { client } from "../../apollo/client";
import { GET_PROJECT_BY_ID } from "../../apollo/queries";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import { getVRAPPrice } from "../../utils/helpers";
import { ethers } from "ethers";
import { Spin } from "antd";
import { BuyTokenModal } from "../../components/modals";
import moment from "moment";
import "./ProjectDetail.css";

let projectPollId;
class ProjectDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tokenRate: "0",
			fetchingProject: true,
			project: null,
			purchaseModalVisible: false,
		};
	}

	componentDidMount() {
		const {
			match: { params },
		} = this.props;
		const projectId = params.id;
		this.fetchProject(projectId);
	}

	componentDidUpdate(prevProps) {
		const { project } = this.state;
		const { history } = this.props;
		if (
			prevProps.walletAddress !== this.props.walletAddress &&
			this.props.walletAddress &&
			project
		) {
			const ownerWallets = [project?.owner.toLowerCase(), project?.projectWallet.toLowerCase()];
			if (ownerWallets.includes(this.props.walletAddress.toLowerCase())) {
				history.replace(`/my-projects/${project?.id}`);
			}
		}
	}

	componentWillUnmount() {
		clearTimeout(projectPollId);
	}

	fetchProject = (projectId) => {
		const { walletAddress, history } = this.props;
		client
			.query({
				query: GET_PROJECT_BY_ID,
				variables: {
					projectId,
				},
				fetchPolicy: "network-only",
			})
			.then(async (res) => {
				process.env.NODE_ENV === "development" && console.log(res.data.project);
				if (res.data.project && res.data.project.isApproved) {
					const ownerWallets = [
						res.data.project.owner.toLowerCase(),
						res.data.project.projectWallet.toLowerCase(),
					];
					if (!ownerWallets.includes(walletAddress.toLowerCase())) {
						const priceResult = await getVRAPPrice();
						const price = priceResult.price;
						const tokenRate =
							price /
							parseFloat(
								ethers.utils.formatUnits(res.data.project.tokenCost, res.data.project.tokenDecimals)
							);
						const tokensSold = ethers.utils.formatUnits(
							res.data.project.tokensSold,
							res.data.project.tokenDecimals
						);
						const tokenCost = ethers.utils.formatUnits(
							res.data.project.tokenCost,
							res.data.project.tokenDecimals
						);
						const tokensWithdrawn = ethers.utils.formatUnits(
							res.data.project.tokensWithdrawn,
							res.data.project.tokenDecimals
						);
						const tokensDeposited = ethers.utils.formatUnits(
							res.data.project.tokensDeposited,
							res.data.project.tokenDecimals
						);
						this.setState({
							project: {
								...res.data.project,
								tokensDeposited,
								tokensSold,
								tokenCost,
								tokensWithdrawn,
							},
							tokenRate,
						});
					} else {
						history.replace(`/my-projects/${res.data.project.id}`);
					}
				} else {
					history.replace("/launchpad");
				}
			})
			.catch((_) => history.replace("/launchpad"))
			.finally(() =>
				this.setState({ fetchingProject: false }, () => {
					projectPollId = setTimeout(() => this.fetchProject(projectId), 30000);
				})
			);
	};

	handleProjectStatsUpdate = (updatedStats) => {
		// console.log(updatedStats);
		this.setState({ project: { ...this.state.project, ...updatedStats } });
	};

	togglePurchaseModal = () =>
		this.setState((state) => ({ purchaseModalVisible: !state.purchaseModalVisible }));

	handlePurchaseClick = () => {
		const { walletConnected, onModalToggle } = this.props;
		if (walletConnected) {
			this.togglePurchaseModal();
		} else {
			onModalToggle(true);
		}
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
			signer,
		} = this.props;
		const { project, tokenRate, fetchingProject, purchaseModalVisible } = this.state;
		const projectStarted = project
			? moment(project?.startDate * 1000).isSameOrBefore(moment())
			: false;
		const projectEnded = project ? moment(project?.endDate * 1000).isBefore(moment()) : false;
		const salePercentage =
			parseFloat(project?.tokensDeposited) > 0
				? Math.ceil(
						(parseFloat(project?.tokensSold) /
							(parseFloat(project?.tokensDeposited) - parseFloat(project?.tokensWithdrawn))) *
							100
				  )
				: 0;
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
						isTestnet
					/>
					<Container>
						<div className="ido-parent-container">
							<div className="back-container">
								<FiArrowLeft
									size={28}
									className="back-arrow"
									onClick={() => history.push("/launchpad")}
								/>
								<h3 className="project-name" style={{ padding: "0" }}>
									Back
								</h3>
							</div>
							{fetchingProject ? (
								<div className="project-loading-container">
									<Spin size="large" />
									Fetching project
								</div>
							) : (
								<>
									<Fade in={!!project} timeout={{ enter: 500 }}>
										<div>
											<ProjectHeaderTab
												projectName={project?.name}
												projectAddress={project?.tokenAddress}
												projectBnb={`1 VRAP = ${parseFloat(tokenRate).toFixed(4)} ${
													project?.tokenSymbol
												}`}
												salePercentage={
													projectStarted && parseFloat(project?.tokensDeposited)
														? salePercentage
														: 0
												}
												bnbNum={`${parseFloat(project?.tokensSold).toFixed(4)} / ${(
													parseFloat(project?.tokensDeposited) -
													parseFloat(project?.tokensWithdrawn)
												).toFixed(4)} ${project?.tokenSymbol}`}
												liveStatus={
													projectEnded || salePercentage === 100
														? "Sale has ended"
														: projectStarted
														? "Sale Live Now"
														: "Sale not started yet"
												}
												solidBtn={
													projectStarted &&
													!projectEnded &&
													salePercentage < 100 &&
													`Buy ${project?.tokenSymbol}`
												}
												borderBtn="View on Etherscan"
												onSolidButtonClick={projectStarted ? this.handlePurchaseClick : () => false}
												onBorderedButtonClick={() =>
													window.open(
														`https://kovan.etherscan.io/address/${project?.tokenAddress}`,
														"_blank"
													)
												}
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
															{project?.description}
														</p>
													</div>
													<h3 className="team-review" style={{ fontSize: "20px" }}>
														Pool Details
													</h3>
													<div className="info-container">
														<InfoCard
															cardTitle="Pool information"
															tokenDistribution={new Date(
																project?.startDate * 1000
															).toLocaleString()}
															// auditStatus="Passed"
															totalSaleAmount={`$ ${
																parseFloat(project?.tokensAllocated) *
																parseFloat(project?.tokenCost)
															}`}
															avialablePurchase={`${(
																parseFloat(project?.tokensDeposited) -
																(parseFloat(project?.tokensWithdrawn) +
																	parseFloat(project?.tokensSold))
															).toFixed(4)} ${project?.tokenSymbol}`}
															// marketCap="$50,000"
															// kyc="No"
														/>
														<InfoCard
															cardTitle="Token information"
															name={project?.tokenName}
															symbol={project?.tokenSymbol}
															address={project?.tokenAddress}
															blockchain="Ethereum"
															// initialSupply="400,000.0"
															// totalSupply="1,000,000.0"
														/>
													</div>
												</div>
											</div>
										</div>
									</Fade>
								</>
							)}
						</div>
					</Container>
				</div>
				<BuyTokenModal
					visible={purchaseModalVisible}
					theme={theme}
					onClose={this.togglePurchaseModal}
					walletAddress={walletAddress}
					signer={signer}
					projectId={project?.id}
					token={{
						address: project?.tokenAddress,
						symbol: project?.tokenSymbol,
						decimals: project?.tokenDecimals,
						cost: project?.tokenCost,
					}}
					maxCapInVrap={project?.maxCapInVrap}
					onProjectStatsUpdate={this.handleProjectStatsUpdate}
					onPurchaseSuccess={() => this.fetchProject(project?.id)}
				/>
			</>
		);
	}
}

export default withRouter(ProjectDetail);
