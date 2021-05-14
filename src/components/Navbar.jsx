import React, { Component } from "react";
import { Tooltip } from "antd";
import { withRouter } from "react-router-dom";
import { ClickAwayListener, Fade } from "@material-ui/core";
import Logo from "../assets/images/logo.png";
import AppContext from "../state/AppContext";
import {
	AccountAvatar,
	Blog,
	Docs,
	More,
	Question,
	Settings,
	Telegram,
	Twitter,
} from "../assets/icons/ReactIcons";
import { ClaimVRAPModal, ExpertModeModal, VRAPDetailsModal } from "./modals";

class Navbar extends Component {
	static contextType = AppContext;

	constructor() {
		super();
		this.state = {
			loggedIn: false,
			moonBalance: "",
			moonModalVisible: false,
			connectModalVisible: false,
			settingsVisible: false,
			localSlippage: "",
			slippage: "",
			deadline: "",
			expertModeOn: false,
			expertModeConfirmationModalVisible: false,
			theme: "light",
			moreLinksVisible: false,
			claimModalVisible: false,
			walletAddress: "",
			addressValid: false,
			addressError: false,
		};
	}

	componentDidMount() {
		const expertMode = localStorage.getItem("expertMode");
		if (expertMode && expertMode === "true") {
			this.setState({ expertModeOn: true });
		}
		this.setState({ theme: this.props.theme });
		const { deadline, slippage } = this.context;
		this.setState({
			deadline: deadline,
			slippage: slippage,
		});
	}

	componentDidUpdate() {
		const { deadline, slippage } = this.context;
		if (deadline !== this.state.deadline) {
			this.setState({
				deadline: deadline,
			});
		}
		if (slippage !== this.state.slippage) {
			this.setState({
				slippage: slippage,
			});
		}
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (prevState.theme !== nextProps.theme) {
			return {
				theme: nextProps.theme,
			};
		} else if (prevState.modalVisible !== nextProps.modalVisible) {
			return {
				connectModalVisible: nextProps.modalVisible,
			};
		}
		return null;
	}

	handleSlippageChange = (e) => {
		const { updateSlippage } = this.context;
		if (e.target.value.match(/^(\d+)?([.]?\d{0,9})?$/)) {
			this.setState({ slippage: e.target.value, localSlippage: e.target.value }, () =>
				updateSlippage(e.target.value)
			);
		}
	};

	handleDeadlineChange = (e) => {
		if (e.target.value.match(/^[0-9]*$/)) {
			this.setState({ deadline: e.target.value });
		}
	};

	handleExpertModeToggle = () => {
		if (this.state.expertModeOn) {
			this.setState({ expertModeOn: false }, () => localStorage.setItem("expertMode", "false"));
		} else {
			this.setState({
				settingsVisible: false,
				expertModeConfirmationModalVisible: true,
			});
		}
	};

	turnOnExpertMode = () => {
		const promptValue = prompt('Please type the word "confirm" to enable expert mode.');
		if (promptValue === "confirm") {
			this.setState(
				{
					expertModeOn: true,
					expertModeConfirmationModalVisible: false,
				},
				() => localStorage.setItem("expertMode", "true")
			);
		}
	};

	handleMenuClose = () => {
		const { updateDeadline, updateSlippage } = this.context;
		const { localDeadline, slippage, localSlippage } = this.state;
		this.setState({ settingsVisible: false }, () => {
			if (localDeadline) {
				setTimeout(() => {
					updateDeadline(localDeadline);
					this.setState({ localDeadline: "" });
				}, 500);
			}
			if (parseFloat(slippage) < 0.1) {
				updateSlippage("0.5");
			}
			if (localSlippage) {
				setTimeout(() => {
					this.setState({ localSlippage: "" });
				}, 500);
			}
		});
	};

	render() {
		const {
			moonModalVisible,
			settingsVisible,
			slippage,
			deadline,
			expertModeOn,
			expertModeConfirmationModalVisible,
			theme,
			moreLinksVisible,
			claimModalVisible,
			walletAddress,
			addressValid,
			addressError,
			localSlippage,
		} = this.state;
		return (
			<div className="navbar-container">
				<div className="navbar">
					<div className="navbar-pages-main-container">
						<a href="." className="navbar-logo-outer-container">
							<div className="navbar-logo-inner-container">
								<img src={Logo} alt="logo" />
							</div>
						</a>
						<div className="navbar-pages-container">
							<a
								href="/sale"
								className={`${this.props.active === "sale" && "active-page"}`}
								onClick={(e) => {
									e.preventDefault();
									this.props.history.push("/sale");
								}}
							>
								Sale
							</a>
							<a
								href="/stake"
								className={`${this.props.active === "stake" && "active-page"}`}
								onClick={(e) => {
									e.preventDefault();
									this.props.history.push("/stake");
								}}
							>
								Stake
							</a>
							<a
								href="/swap"
								className={`${this.props.active === "swap" && "active-page"}`}
								onClick={(e) => {
									e.preventDefault();
									this.props.history.push("/swap");
								}}
							>
								Swap
							</a>
							<a
								href="/pool"
								className={`${this.props.active === "pool" && "active-page"}`}
								onClick={(e) => {
									e.preventDefault();
									this.props.history.push("/pool");
								}}
							>
								Pool
							</a>
						</div>
					</div>
					<div className="navbar-actions-main-container">
						<div className="navbar-actions-1">
							{this.props.network && (
								<button
									disabled
									style={{ cursor: "default" }}
									className="navbar-action-button network"
								>
									Kovan
								</button>
							)}
							<span
								className="moon-button-container"
								onClick={() => this.setState({ moonModalVisible: true })}
							>
								<div className="moon-button">
									{this.props.vrapBalance === ""
										? "VRAP"
										: parseFloat(this.props.vrapBalance).toFixed(3) + " VRAP"}
								</div>
								<div className="moon-button hidden-tablet">VRAP</div>
								<span className="noise" />
							</span>
							{this.props.walletConnected ? (
								<div className="wallet-details-container">
									<div className="wallet-balance" style={{ flexShrink: 0 }}>
										{this.props.ethBalance === ""
											? 0.0
											: parseFloat(this.props.ethBalance).toFixed(3)}{" "}
										BNB
									</div>
									<button className="wallet-address-button" onClick={this.props.onModalToggle}>
										<p>
											{`${this.props.walletAddress}`.substring(0, 6) +
												"..." +
												`${this.props.walletAddress}`.substring(37, 42)}
										</p>
										<div
											style={{
												borderRadius: "50px",
												overflow: "hidden",
												padding: 0,
												margin: 0,
												width: "16px",
												height: "16px",
												display: "inline-block",
											}}
										>
											<AccountAvatar />
										</div>
									</button>
								</div>
							) : (
								<div className="connect-to-wallet-container" onClick={this.props.onModalToggle}>
									<button className="connect-to-wallet-button">
										<p>Connect to a wallet</p>
									</button>
								</div>
							)}
						</div>
						<div className="navbar-actions-2">
							<div className="navbar-action-button-container">
								<button
									className="navbar-action-button"
									onClick={() => this.setState({ settingsVisible: true })}
								>
									<Settings />
									{expertModeOn && (
										<div className="expert-mode-icon">
											<span role="img" aria-label="wizard-icon">
												🧙
											</span>
										</div>
									)}
								</button>
								{settingsVisible && (
									<ClickAwayListener onClickAway={this.handleMenuClose}>
										<Fade in>
											<span className="settings-menu">
												<div className="grid" style={{ padding: "1rem" }}>
													<div className="settings-title">Transaction Settings</div>
													<div className="grid">
														<div className="grid-8px">
															<div className="settings-option-container">
																<div className="settings-option-title">Slippage tolerance</div>
																<span
																	style={{
																		marginLeft: "4px",
																	}}
																>
																	<div
																		style={{
																			display: "inline-block",
																		}}
																	>
																		<Tooltip
																			overlayClassName="tooltip-card"
																			arrowPointAtCenter
																			placement="left"
																			title={
																				"Your transaction will revert if the price changes unfavorably by more than this percentage."
																			}
																		>
																			<div className="info-icon">
																				<Question />
																			</div>
																		</Tooltip>
																	</div>
																</span>
															</div>
															<div className="settings-button-group">
																<button
																	className={`tolerance-button ${
																		slippage === "0.1" && "tolerance-active"
																	}`}
																	onClick={() =>
																		this.setState(
																			{
																				slippage: "0.1",
																			},
																			() => this.context.updateSlippage("0.1")
																		)
																	}
																>
																	0.1%
																</button>
																<button
																	className={`tolerance-button ${
																		slippage === "0.5" && "tolerance-active"
																	}`}
																	onClick={() =>
																		this.setState(
																			{
																				slippage: "0.5",
																			},
																			() => this.context.updateSlippage("0.5")
																		)
																	}
																>
																	0.5%
																</button>
																<button
																	className={`tolerance-button ${
																		slippage === "1" && "tolerance-active"
																	}`}
																	onClick={() =>
																		this.setState(
																			{
																				slippage: "1",
																			},
																			() => this.context.updateSlippage("1")
																		)
																	}
																>
																	1%
																</button>
																<button tabIndex="-1" className="tolerance-input-button">
																	<div className="tolerance-input-container">
																		<input
																			className="tolerance-input"
																			onChange={this.handleSlippageChange}
																			placeholder={slippage}
																			value={localSlippage}
																		/>
																		<span
																			style={{
																				position: "relative",
																				top: "1px",
																			}}
																		>
																			%
																		</span>
																	</div>
																</button>
															</div>
															{slippage === "0.1" && (
																<div
																	style={{
																		fontSize: "14px",
																		paddingTop: "7px",
																		color: "rgb(243, 132, 30)",
																	}}
																>
																	Your transaction may fail
																</div>
															)}
														</div>
														<div className="grid-8px">
															<div className="settings-option-container">
																<div className="settings-option-title">Transaction deadline</div>
																<span
																	style={{
																		marginLeft: "4px",
																	}}
																>
																	<div
																		style={{
																			display: "inline-block",
																		}}
																	>
																		<Tooltip
																			overlayClassName="tooltip-card"
																			arrowPointAtCenter
																			placement="left"
																			title={
																				"Your transaction will revert if it is pending for more than this long."
																			}
																		>
																			<div className="info-icon">
																				<Question />
																			</div>
																		</Tooltip>
																	</div>
																</span>
															</div>
															<div
																style={{
																	width: "150px",
																}}
																className="tolerance-input-container"
															>
																<button tabIndex="-1" className="tolerance-input-button">
																	<input
																		className="tolerance-input"
																		onChange={this.handleDeadlineChange}
																		placeholder="5"
																		style={{
																			color: deadline === "0" && "red",
																		}}
																		value={deadline}
																	/>
																</button>
																<span
																	style={{
																		paddingLeft: "8px",
																		fontSize: "14px",
																	}}
																>
																	minutes
																</span>
															</div>
														</div>
													</div>
													<div className="settings-title">Transaction Settings</div>
													<div className="settings-toggle">
														<div className="settings-option-container">
															<div className="settings-option-title">Toggle Expert Mode</div>
															<span
																style={{
																	marginLeft: "4px",
																}}
															>
																<div
																	style={{
																		display: "inline-block",
																	}}
																>
																	<Tooltip
																		overlayClassName="tooltip-card"
																		arrowPointAtCenter
																		placement="left"
																		title={
																			"Bypasses confirmation modals and allows high slippage trades. Use at your own risk"
																		}
																	>
																		<div className="info-icon">
																			<Question />
																		</div>
																	</Tooltip>
																</div>
															</span>
														</div>
														<div className="toggle-button" onClick={this.handleExpertModeToggle}>
															<span className={`toggle-on ${expertModeOn && "toggle-active"}`}>
																On
															</span>
															<span className={expertModeOn ? "toggle-on" : "toggle-off"}>Off</span>
														</div>
													</div>
													<div className="settings-toggle">
														<div className="settings-option-container">
															<div className="settings-option-title">Toggle Dark Mode</div>
														</div>
														<div className="toggle-button" onClick={this.props.onThemeToggle}>
															<span className={`toggle-on ${theme === "dark" && "toggle-active"}`}>
																On
															</span>
															<span className={theme === "dark" ? "toggle-on" : "toggle-off"}>
																Off
															</span>
														</div>
													</div>
												</div>
											</span>
										</Fade>
									</ClickAwayListener>
								)}
							</div>
							<div className="navbar-action-button-container">
								<button
									className="navbar-action-button"
									onClick={() =>
										this.setState({
											moreLinksVisible: true,
										})
									}
								>
									<More />
								</button>
								{moreLinksVisible && (
									<ClickAwayListener
										onClickAway={() =>
											this.setState({
												moreLinksVisible: false,
											})
										}
									>
										<Fade in>
											<div className="links-container">
												<a
													className="link"
													target="_blank"
													rel="noopener noreferrer"
													href="https://veraswap.medium.com/about"
												>
													<Blog />
													Blog
												</a>
												<a
													className="link"
													target="_blank"
													rel="noopener noreferrer"
													href="https://docs.veraswap.org/"
												>
													<Docs />
													Docs
												</a>
												<a
													className="link"
													target="_blank"
													rel="noopener noreferrer"
													href="https://twitter.com/veraswap"
												>
													<Twitter />
													Twitter
												</a>
												<a
													className="link"
													target="_blank"
													rel="noopener noreferrer"
													href="https://t.me/veraswap"
												>
													<Telegram />
													Telegram
												</a>
												<Tooltip title="Coming soon">
													<button className="claim-moon-button">Claim VRAP</button>
												</Tooltip>
											</div>
										</Fade>
									</ClickAwayListener>
								)}
							</div>
						</div>
					</div>
				</div>
				<VRAPDetailsModal
					open={moonModalVisible}
					onClose={() => this.setState({ moonModalVisible: false })}
					walletConnected={this.props.walletConnected}
					balance={this.props.vrapBalance}
				/>
				<ExpertModeModal
					open={expertModeConfirmationModalVisible}
					onClose={() =>
						this.setState({
							expertModeConfirmationModalVisible: false,
						})
					}
					onConfirm={this.turnOnExpertMode}
				/>
				<ClaimVRAPModal
					open={claimModalVisible}
					onClose={() => this.setState({ claimModalVisible: false })}
					address={walletAddress}
					onAddressChange={(e) =>
						this.setState({
							walletAddress: e.target.value,
						})
					}
					addressValid={addressValid}
					error={addressError}
					balance={this.props.vrapBalance}
					onClaim={() => {
						//Claim VRAP
					}}
				/>
			</div>
		);
	}
}

export default withRouter(Navbar);
