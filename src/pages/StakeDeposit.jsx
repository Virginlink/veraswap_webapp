import React, { Component } from "react";
import { ethers } from "ethers";
import { Container, Dialog, Fade } from "@material-ui/core";
import PoolInfo from "./components/PoolInfo";
import LiquidityDeposits from "./components/LiquidityDeposits";
import Unclaimed from "./components/Unclaimed";
import { PROVIDER, STAKING_ABI, STAKING_ADDRESS, STAKING_ADDRESS_V1 } from "../utils/contracts";
import { TOKEN } from "../utils/tokens";
import { notification, Tag, Tooltip } from "antd";
import Sidebar from "../components/Sidebar";
import AppBar from "../components/AppBar";
import { FiArrowLeft } from "react-icons/fi";
import { withRouter } from "react-router";
import ExternalLink from "../components/Transactions/ExternalLink";
import { Close, Loading } from "../assets/icons/ReactIcons";
const Transition = React.forwardRef(function Transition(props, ref) {
	return <Fade timeout={{ enter: 1000, exit: 2000 }} ref={ref} {...props} />;
});

class StakeDeposit extends Component {
	constructor() {
		super();
		this.state = {
			depositModalVisible: false,
			txSuccess: false,
			error: false,
			txHash: "",
			depositAmount: "",
			currentToken: "",
			ticker: "",
			icon: [],
			balance: 0.0,
			loading: true,
			apy: 0.0,
			liquidity: 0.0,
			decimal: 0,
			claiming: false,
			version: 2,
		};
	}

	componentDidMount() {
		this.fetchBalance();
		this.fetchUnclaimed();
	}

	componentDidUpdate(prevProps) {
		if (prevProps.walletAddress !== this.props.walletAddress && this.props.walletAddress) {
			this.fetchBalance();
			this.fetchUnclaimed();
		}
	}

	fetchBalance = async () => {
		this.setState({
			currentToken: this.props.match.params.address,
			txSuccess: this.props.stakeSuccess,
			version: this.props.match.params.version,
		});
		let info = TOKEN.filter((data) => data.contractAddress === this.props.match.params.address);
		if (info.length > 0) {
			this.setState({ ticker: info[0].ticker, icon: info[0].icon });
			if (this.props.walletAddress) {
				let contract = new ethers.Contract(info[0].contractAddress, info[0].contractABI, PROVIDER);
				let balance = await contract.balanceOf(this.props.walletAddress);
				balance = ethers.utils.formatEther(balance) * 10 ** info[0].decimal;
				balance = parseFloat(balance);
				this.setState({
					loading: false,
					balance: balance,
					decimal: info[0].decimalCorrection,
				});
			} else {
				this.setState({ loading: false });
			}
		}
	};

	fetchUnclaimed = () => {
		let { version, address } = this.props.match.params;
		let token = TOKEN.filter((data) => data.contractAddress === address);
		let decimal = token[0].decimal;
		let contract = new ethers.Contract(
			version === "1" ? STAKING_ADDRESS_V1 : STAKING_ADDRESS,
			STAKING_ABI,
			PROVIDER
		);
		contract
			.users(this.props.walletAddress, address)
			.then((res) => {
				let currentStake = ethers.utils.formatEther(res.currentStake) * 10 ** decimal;
				currentStake = parseFloat(currentStake).toFixed(4);
				this.setState({ liquidity: currentStake });
			})
			.catch((err) => {
				console.log(err);
			});
	};

	setAPY = (apy) => {
		this.setState({ apy: apy });
	};

	setLiquidity = (liquidity) => {
		this.setState({ liquidity: liquidity });
	};

	handleClaim = async () => {
		this.setState({ claiming: true });
		let result = await this.props.claim(this.state.currentToken, this.state.version);
		if (!result.error) {
			notification["success"]({
				message: result.message,
			});
			this.setState({ claiming: false, liquidity: 0.0 });
		} else {
			notification["error"]({
				message: result.message,
			});
			this.setState({ claiming: false });
		}
	};

	handleStake = async () => {
		let result = await this.props.stakeToken(
			parseFloat(this.state.depositAmount - 0.00000001),
			this.state.currentToken
		);
		if (result.success) {
			let intervalId = setInterval(async () => {
				try {
					let reciept = await PROVIDER.getTransaction(result.hash);
					if (reciept) {
						clearInterval(intervalId);
						this.fetchUnclaimed();
						notification.close("stakingProcessingNotification");
						notification.success({
							key: "stakingSuccessNotification",
							message: `${this.state.ticker} staking successful. You can view the transaction here`,
							btn: <ExternalLink hash={result.hash}>View Transaction</ExternalLink>,
							duration: 0,
						});
						this.setState({
							txSuccess: false,
							error: false,
							depositAmount: "",
						});
						this.props.onResetStakeStatus();
					}
				} catch (e) {
					console.log(e.message);
				}
			}, 5000);
			this.forceUpdate();
		} else {
			this.setState({ error: true });
			notification["error"]({
				message: result.message,
			});
		}
	};

	render() {
		const { depositModalVisible, txSuccess, txHash, error, depositAmount, claiming, version } =
			this.state;
		const {
			theme,
			onThemeToggle,
			modalVisible,
			walletAddress,
			walletConnected,
			ethBalance,
			onModalToggle,
			vrapBalance,
			history,
		} = this.props;
		return (this.state.ticker !== "" && this.state.icon !== "") || !this.state.loading ? (
			<>
				<Sidebar active="stake" theme={theme} onThemeToggle={onThemeToggle} />
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
					<Container maxWidth="md">
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								justifyContent: "center",
								paddingTop: window.innerWidth < 600 ? "30px" : "60px",
								paddingBottom: window.innerWidth < 600 ? "20px" : "0px",
								flex: "1 1 0%",
								zIndex: 1,
							}}
						>
							<div
								style={{
									display: "grid",
									gridAutoRows: "auto",
									rowGap: "24px",
									justifyItems: "center",
									width: "100%",
								}}
							>
								<div
									style={{
										display: "flex",
										alignItems: "center",
										justifyContent: "space-between",
										boxSizing: "border-box",
										margin: 0,
										padding: 0,
										minWidth: 0,
										width: "100%",
										gap: "24px",
									}}
								>
									<div
										className="heading"
										style={{ margin: 0, display: "flex", alignItems: "center" }}
									>
										<FiArrowLeft
											size={24}
											style={{ marginRight: "40px", cursor: "pointer" }}
											onClick={() => history.goBack()}
										/>
										{this.state.ticker} Liquidity Mining{" "}
										{this.state.version === "1" ? (
											<Tooltip
												title="This pool is inactive and you won't get rewards for staking."
												placement="right"
											>
												<Tag color="rgba(255,0,0,1)">Deprecated</Tag>
											</Tooltip>
										) : null}
									</div>
									<div
										style={{
											position: "relative",
											display: "flex",
											flexDirection: "row",
										}}
									>
										{!this.state.loading &&
											this.state.icon.map((icon, index) => {
												return (
													<img
														key={`${index}-${icon.toString()}}`}
														width="auto"
														height="40px"
														style={{
															borderRadius: "50%",
															boxShadow: "rgb(0 0 0 / 8%) 0px 6px 10px",
														}}
														alt={`${icon} logo`}
														src={icon}
													/>
												);
											})}
									</div>
								</div>
								<PoolInfo
									ticker={this.state.ticker}
									currentToken={this.state.currentToken}
									setAPY={this.setAPY}
									version={version}
								/>
								<div
									style={{
										display: "grid",
										gridAutoRows: "auto",
										rowGap: "24px",
										justifyItems: "center",
										position: "relative",
										width: "100%",
										opacity: 1,
									}}
								>
									<div className="stake-deposits-info-banner">
										<div
											style={{
												display: "grid",
												gridAutoRows: "auto",
												rowGap: "24px",
												justifyItems: "center",
												borderRadius: "12px",
												width: "100%",
												position: "relative",
											}}
										>
											<div
												className="sale-block-2-outer-container"
												style={{
													padding: "1rem 2rem",
													background:
														"transparent linear-gradient(180deg, #E60000 0%, #62181A 100%) 0% 0% no-repeat padding-box",
													border: "1px solid #7070704D",
													borderRadius: "20px",
												}}
											>
												<LiquidityDeposits
													version={version}
													walletAddress={this.props.walletAddress}
													ticker={this.state.ticker}
													currentToken={this.state.currentToken}
													setLiquidity={this.setLiquidity}
												/>
											</div>
											<div className="shaded-container">
												<Unclaimed
													version={version}
													ticker={this.state.ticker}
													currentToken={this.state.currentToken}
													walletAddress={this.props.walletAddress}
													liquidity={this.state.liquidity}
													apy={this.state.apy}
												/>
											</div>
										</div>
									</div>
									<div className="text-semibold" style={{ textAlign: "center", fontSize: "17px" }}>
										Your APY is calculated for every second. You can claim your rewards every
										second.
									</div>
									<div
										style={{
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
											boxSizing: "border-box",
											width: "100%",
											minWidth: 0,
											margin: "0 0 1rem 0",
											padding: 0,
											gap: "12px",
										}}
									>
										{parseFloat(this.state.liquidity) > 0 && !claiming ? (
											<button
												className="buy-button"
												onClick={
													this.props.walletConnected
														? () => this.handleClaim()
														: this.props.onModalOpenRequest
												}
											>
												Claim Now
											</button>
										) : claiming ? (
											<div className="transaction-status">
												<Loading />
												<span>Claiming</span>
											</div>
										) : this.state.version === "1" ? (
											<button
												className="buy-button"
												onClick={() =>
													notification["info"]({
														message:
															"Staking Pool V1 is deprecated . Please use the latest staking pool.",
													})
												}
											>
												Stake Now
											</button>
										) : (
											<button
												className="buy-button"
												onClick={
													this.props.walletConnected
														? () => this.setState({ depositModalVisible: true })
														: this.props.onModalOpenRequest
												}
											>
												Stake Now
											</button>
										)}
									</div>
								</div>
							</div>
						</div>
					</Container>
				</div>
				<Dialog
					open={depositModalVisible}
					TransitionComponent={Transition}
					onClose={() => {
						this.setState({
							depositModalVisible: false,
							txSuccess: false,
							error: false,
							depositAmount: "",
						});
						this.props.onResetStakeStatus();
					}}
					onBackdropClick={() => {
						this.setState({
							depositModalVisible: false,
							txSuccess: false,
							error: false,
							depositAmount: "",
						});
						this.props.onResetStakeStatus();
					}}
					BackdropProps={{ style: { backgroundColor: "rgba(0, 0, 0, 0.3)" } }}
					PaperProps={{
						style: {
							width: "50vw",
							backgroundColor: "#FFF",
							boxShadow: "rgba(47, 128, 237, 0.05) 0px 4px 8px 0px",
							maxWidth: "420px",
							maxHeight: "90vh",
							display: "flex",
							borderRadius: "20px",
							margin: "0 0 2rem",
						},
					}}
				>
					{this.props.stakeSuccess || txSuccess ? (
						<div className="buy-modal-grid">
							<div className="buy-modal-header">
								<div className="buy-modal-title">Transaction Successful</div>
								<Close
									onClick={() =>
										this.setState(
											{
												depositModalVisible: false,
												depositAmount: "",
												error: false,
											},
											() => this.props.onResetStakeStatus()
										)
									}
								/>
							</div>
							<p
								className="connected-wallet-footer-text"
								style={{
									width: "80%",
									marginLeft: "10%",
									textAlign: "center",
									lineHeight: "2rem",
								}}
							>
								It takes upto 5 minutes to mine your transaction. Once done your tokens will be
								automatically staked from your wallet. If you wish to track your transaction{" "}
								<a
									href={`https://bscscan.com/tx/${txHash}`}
									target="_blank"
									rel="noopener noreferrer"
								>
									click here
								</a>
							</p>
						</div>
					) : (
						<div className="buy-modal-grid">
							<div className="buy-modal-header">
								<div className="buy-modal-title">Deposit</div>
								<Close
									onClick={() =>
										this.setState(
											{
												depositModalVisible: false,
												depositAmount: "",
												error: false,
											},
											() => this.props.onResetStakeStatus()
										)
									}
								/>
							</div>
							{error ? (
								<p className="connected-wallet-footer-text">
									Error occured while depositing VRAP tokens. Please contact support.
								</p>
							) : null}
							<div className="buy-modal-container">
								<div className="buy-inner-container">
									<div className="available-deposit-container">
										<div className="available-deposit-inner-container">
											<div />
											<div style={{ display: "inline", cursor: "pointer" }}>
												{this.state.loading ? "Fetching Balance ...." : this.state.balance}
											</div>
										</div>
									</div>
									<div className="deposit-input-container">
										<input
											inputMode="decimal"
											type="text"
											autoComplete="off"
											autoCorrect="off"
											placeholder="0.0"
											pattern="^[0-9]*[.,]?[0-9]*$"
											minLength="1"
											maxLength="79"
											spellCheck="false"
											value={depositAmount}
											onChange={(e) =>
												this.setState({
													depositAmount: e.target.value,
													error: false,
												})
											}
										/>
										<button
											onClick={() => this.setState({ depositAmount: this.state.balance })}
											className="max-deposit-button"
										>
											MAX
										</button>
										<button className="token-select-button">
											<span
												style={{
													display: "flex",
													alignItems: "center",
													justifyContent: "space-between",
												}}
											>
												<div style={{ display: "flex", alignItems: "center" }}>
													{this.state.icon.map((icon, index) => (
														<img
															key={`${index}-${icon.toString()}`}
															style={{
																width: "24px",
																height: "24px",
																borderRadius: "24px",
																boxShadow: "rgba(0, 0, 0, 0.075) 0px 6px 10px",
															}}
															alt="logo"
															src={icon}
														/>
													))}
												</div>
												<div style={{ marginTop: "-2px" }}>
													<span
														style={{
															margin: "0px 0.25rem 0px 0.75rem",
															fontSize: "20px",
														}}
													>
														{this.state.ticker}
													</span>
												</div>
											</span>
										</button>
									</div>
								</div>
							</div>
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									paddingRight: "20px",
									paddingLeft: "20px",
									opacity: 1,
								}}
							>
								<div className="received-amount">Daily Rewards</div>
								<div className="received-amount">
									{!isNaN(
										(parseFloat(this.state.apy) * 10 ** -2 * parseFloat(this.state.depositAmount)) /
											365
									)
										? parseFloat(
												(parseFloat(this.state.apy) *
													10 ** -2 *
													parseFloat(this.state.depositAmount)) /
													365
										  ).toFixed(4)
										: "0.0000"}{" "}
									VRAP
									<span style={{ marginLeft: "0.5rem" }}>{this.props.ticker} / Day</span>
								</div>
							</div>

							<div className="buy-modal-header">
								<button
									disabled={
										!depositAmount ||
										parseFloat(depositAmount) === 0 ||
										parseFloat(depositAmount) === 0 ||
										parseFloat(depositAmount) < 0 ||
										this.props.sapproved ||
										this.props.sapproving
									}
									className="buy-action-button"
									onClick={() => {
										this.props.approveStaking(
											ethers.utils.parseUnits(String(this.state.depositAmount), this.state.decimal),
											this.state.currentToken
										);
									}}
								>
									{this.props.sapproving ? (
										<div className="transaction-status">
											<Loading />
											<span>Approving</span>
										</div>
									) : depositAmount ? (
										parseFloat(depositAmount) === 0 ||
										parseFloat(depositAmount) === 0 ||
										parseFloat(depositAmount) < 0 ? (
											"Invalid amount"
										) : (
											"Approve"
										)
									) : (
										"Enter an amount"
									)}
								</button>
								<button
									onClick={() => {
										this.handleStake();
									}}
									disabled={!this.props.sapproved || this.props.sapproving || this.props.staking}
									className="buy-action-button"
								>
									{this.props.staking ? (
										<div className="transaction-status">
											<Loading />
											<span>Staking</span>
										</div>
									) : (
										"Stake Now"
									)}
								</button>
							</div>
							<div
								style={{
									display: "grid",
									gridAutoRows: "auto",
									justifyContent: "center",
								}}
							>
								<div
									style={{
										boxSizing: "border-box",
										margin: 0,
										minWidth: 0,
										display: "flex",
										padding: 0,
										alignItems: "center",
										justifyContent: "space-between",
										width: "200px",
									}}
								>
									<div
										style={{
											width: "calc(100% - 20px)",
											display: "flex",
											alignItems: "center",
										}}
									>
										<div className={`step ${this.props.sapproved && "step-active"}`}>1</div>
										<div className="step-bar"></div>
									</div>
									<div className={`step ${txSuccess && "step-active"}`}>2</div>
								</div>
							</div>
						</div>
					)}
				</Dialog>
			</>
		) : null;
	}
}

export default withRouter(StakeDeposit);
