import { Container, Fade } from "@material-ui/core";
import React, { Component } from "react";
import { FiArrowLeft } from "react-icons/fi";
import AppBar from "../../components/AppBar";
import Sidebar from "../../components/Sidebar";
import { InfoCard, ProjectHeaderTab } from "../../components/launchPad";
import powerRed from "../../assets/images/power-red.png";
import PurchaseHistoryChart from "./PurchaseHistoryChart";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import NoConnection from "./NoConnection";
import { client } from "../../apollo/client";
import { GET_PROJECT_BY_ID, GET_PURCHASE_HISTORY_BY_PROJECT } from "../../apollo/queries";
import moment from "moment";
import { WithdrawTokensModal, DepositTokenModal } from "../../components/modals";
import { Spin } from "antd";
import { getVRAPPrice } from "../../utils/helpers";
import { ethers } from "ethers";
import "./ProjectFund.css";

let projectPollId;
let purchaseHistoryPollId;
class ProjectFund extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tokenRate: "0",
			fetchingProject: true,
			project: null,
			fetchingPurchaseHistory: true,
			purchaseHistory: [],
			depositModalVisible: false,
			withdrawModalVisible: false,
		};
	}

	componentDidMount() {
		const {
			match: { params },
			walletConnected,
		} = this.props;
		const projectId = params.id;
		if (walletConnected) {
			this.fetchProject(projectId);
			this.fetchPurchaseHistory(projectId);
		}
	}

	componentDidUpdate(prevProps) {
		const {
			match: { params },
			walletConnected,
			walletAddress,
		} = this.props;
		const projectId = params.id;
		if (
			(walletConnected !== prevProps.walletConnected && walletConnected) ||
			(walletAddress !== prevProps.walletAddress && walletAddress)
		) {
			this.fetchProject(projectId);
			this.fetchPurchaseHistory(projectId);
		}
	}

	componentWillUnmount() {
		clearTimeout(projectPollId);
		clearTimeout(purchaseHistoryPollId);
	}

	fetchProject = (projectId, updatedDepositAmount = "0") => {
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
				// console.log(res.data.project);
				if (res.data.project) {
					const allowedWallets = [
						res.data.project.owner.toLowerCase(),
						res.data.project.projectWallet.toLowerCase(),
					];
					if (allowedWallets.includes(walletAddress.toLowerCase())) {
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
						const totalVrapRaised = ethers.utils.formatEther(res.data.project.totalVrapRaised);
						const tokensWithdrawn = ethers.utils.formatUnits(
							res.data.project.tokensWithdrawn,
							res.data.project.tokenDecimals
						);
						if (parseFloat(updatedDepositAmount) > 0) {
							const totalTokensDeposited = parseFloat(
								ethers.utils.formatUnits(
									res.data.project.tokensDeposited,
									res.data.project.tokenDecimals
								)
							);
							const newTokensDeposited = parseFloat(updatedDepositAmount);
							const tokensDeposited = totalTokensDeposited + newTokensDeposited;
							const project = {
								...res.data.project,
								tokensDeposited,
								tokensSold,
								tokenCost,
								totalVrapRaised,
								tokensWithdrawn,
							};
							this.setState({ project, tokenRate });
						} else {
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
									totalVrapRaised,
									tokensWithdrawn,
								},
								tokenRate,
							});
						}
					} else {
						history.replace(`/launchpad/${res.data.project.id}`);
					}
				} else {
					history.replace("/my-projects");
				}
			})
			.catch((_) => history.replace("/my-projects"))
			.finally(() =>
				this.setState({ fetchingProject: false }, () => {
					projectPollId = setTimeout(() => this.fetchProject(projectId), 30000);
				})
			);
	};

	fetchPurchaseHistory = (projectId) => {
		const { history } = this.props;
		client
			.query({
				query: GET_PURCHASE_HISTORY_BY_PROJECT,
				variables: {
					projectId,
				},
				fetchPolicy: "network-only",
			})
			.then((res) => {
				// console.log(res.data.purchaseActivities);
				this.setState({ purchaseHistory: res.data.purchaseActivities });
			})
			.catch((_) => history.replace("/my-projects"))
			.finally(() =>
				this.setState({ fetchingPurchaseHistory: false }, () => {
					purchaseHistoryPollId = setTimeout(() => this.fetchPurchaseHistory(projectId), 30000);
				})
			);
	};

	toggleDepositModal = () =>
		this.setState((state) => ({ depositModalVisible: !state.depositModalVisible }));

	toggleWithdrawModal = () =>
		this.setState((state) => ({ withdrawModalVisible: !state.withdrawModalVisible }));

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
		const {
			project,
			depositModalVisible,
			fetchingProject,
			fetchingPurchaseHistory,
			tokenRate,
			purchaseHistory,
			withdrawModalVisible,
		} = this.state;

		const loading = fetchingProject || fetchingPurchaseHistory;

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
									onClick={() => history.push("/my-projects")}
								/>
								<h3 className="project-name" style={{ padding: "0" }}>
									Back
								</h3>
							</div>
							{walletConnected ? (
								loading ? (
									<div className="project-loading-container">
										<Spin size="large" />
										Fetching project
									</div>
								) : (
									<>
										<Fade in={!!project} timeout={{ enter: 500 }}>
											<div>
												<ProjectHeaderTab
													owner
													projectName={project?.name}
													projectAddress={project?.tokenAddress}
													adminAddress={project?.projectWallet}
													settlementAddress={project?.settlementAddress}
													projectBnb={`1 VRAP = ${parseFloat(tokenRate).toFixed(4)} ${
														project?.tokenSymbol
													}`}
													salePercentage={
														parseFloat(project?.tokensDeposited) > 0
															? Math.ceil(
																	(parseFloat(project?.tokensSold) /
																		(parseFloat(project?.tokensDeposited) -
																			parseFloat(project?.tokensWithdrawn))) *
																		100
															  )
															: 0
													}
													bnbNum={`${project?.tokensSold} / ${
														parseFloat(project?.tokensDeposited) -
														parseFloat(project?.tokensWithdrawn)
													} ${project?.tokenSymbol}`}
													liveStatus="Live Now"
													solidBtn="Withdraw tokens"
													borderBtn="Deposit tokens"
													onSolidButtonClick={this.toggleWithdrawModal}
													onBorderedButtonClick={this.toggleDepositModal}
												/>
											</div>
										</Fade>
										<div className="about-project-container">
											<Fade in={!!project} timeout={{ enter: 600 }}>
												<div className="about-project-img-wrapper">
													<div className="data-sec-wrapper">
														<div className="img-data-container">
															<div className="img-data-sec">
																<div className="img-data-box bd-right">
																	<h1 className="tba">
																		<span>
																			{parseFloat(project?.totalVrapRaised).toFixed(4)} VRAP
																		</span>
																	</h1>
																	<p className="project-id">Total Funds Raised</p>
																</div>
																<div className="img-data-box bd-right">
																	<h1 className="tba">
																		<span>{project?.maxCapInVrap} VRAP</span>
																	</h1>
																	<p className="project-id">Max VRAP</p>
																</div>
															</div>
															<div className="img-data-sec">
																<div className="img-data-box bd-right remove-bd">
																	<h1 className="tba">
																		<span>{purchaseHistory.length}</span>
																	</h1>
																	<p className="project-id">Participants</p>
																</div>
																<div className="img-data-box">
																	<h1 className="tba">
																		<span>
																			{moment(parseFloat(project?.endDate) * 1000).format(
																				"MMMM D, YYYY"
																			)}
																		</span>
																	</h1>
																	<p className="project-id">
																		{moment(parseFloat(project?.startDate) * 1000).format(
																			"MMMM D, YYYY"
																		)}
																	</p>
																</div>
															</div>
														</div>
													</div>
													<img className="power-red" src={powerRed} alt="powerRed" />
												</div>
											</Fade>
											<div className="project-detail-wrapper">
												<div className="bar-chart-container">
													<h3 className="team-review" style={{ fontSize: "20px", margin: "0" }}>
														Funds Raised by this Project Month-wise
													</h3>
													<PurchaseHistoryChart />
												</div>
												<h3 className="team-review" style={{ fontSize: "20px" }}>
													Pool Details
												</h3>
												<div className="info-container">
													<InfoCard
														cardTitle="Pool information"
														tokenDistribution={new Date(project?.startDate * 1000).toLocaleString()}
														auditStatus="Passed"
														totalSaleAmount={`$ ${
															parseFloat(project?.tokensAllocated) * parseFloat(project?.tokenCost)
														}`}
														avialablePurchase={`${
															parseFloat(project?.tokensDeposited) -
															parseFloat(project?.tokensWithdrawn)
														} ${project?.tokenSymbol}`}
														marketCap="$50,000"
														kyc="No"
													/>
													<InfoCard
														cardTitle="Token information"
														name={project?.tokenName}
														symbol={project?.tokenSymbol}
														address={project?.tokenAddress}
														blockchain="Ethereum"
														initialSupply="400,000.0"
														totalSupply="1,000,000.0"
													/>
												</div>
											</div>
										</div>
									</>
								)
							) : (
								<NoConnection />
							)}
						</div>
					</Container>
				</div>
				{!loading && (
					<>
						<DepositTokenModal
							visible={depositModalVisible}
							theme={theme}
							onClose={this.toggleDepositModal}
							projectWalletAddress={project?.projectWallet}
							walletAddress={walletAddress}
							signer={signer}
							projectId={project?.id}
							token={{
								address: project?.tokenAddress,
								symbol: project?.tokenSymbol,
								decimals: project?.tokenDecimals,
							}}
							allocated={project?.tokensAllocated}
							deposited={project?.tokensDeposited}
							onDeposit={(amount) => this.fetchProject(project?.id, amount)}
						/>
						<WithdrawTokensModal
							visible={withdrawModalVisible}
							theme={theme}
							onClose={this.toggleWithdrawModal}
							projectWalletAddress={project?.projectWallet}
							walletAddress={walletAddress}
							signer={signer}
							projectId={project?.id}
							token={{
								address: project?.tokenAddress,
								symbol: project?.tokenSymbol,
								decimals: project?.tokenDecimals,
							}}
							deposited={
								parseFloat(project?.tokensDeposited) - parseFloat(project?.tokensWithdrawn)
							}
							onWithdraw={() => this.fetchProject(project?.id)}
						/>
					</>
				)}
			</>
		);
	}
}

export default withRouter(ProjectFund);
