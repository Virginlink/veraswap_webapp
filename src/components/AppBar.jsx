import React, { Component } from "react";
import { ClickAwayListener, Fade } from "@material-ui/core";
import Logo from "../assets/images/vrap-white.svg";
import { RiSettingsFill } from "react-icons/ri";
import { AccountAvatar } from "../assets/icons/ReactIcons";
import AppContext from "../state/AppContext";
import "./AppBar.css";

export default class AppBar extends Component {
	static contextType = AppContext;

	constructor(props) {
		super(props);
		this.state = {
			slippage: "0.5",
			localSlippage: "",
			localDeadline: "",
			deadline: "",
			settingsMenuVisible: false,
			vrapDetailsVisible: false,
		};
	}

	componentDidMount() {
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

	toggleSettingsMenu = () => {
		const { settingsMenuVisible } = this.state;
		if (!settingsMenuVisible) {
			this.setState({ settingsMenuVisible: true });
		} else {
			this.handleMenuClose();
		}
	};

	handleSlippageChange = (e) => {
		const { updateSlippage } = this.context;
		if (e.target.value.match(/^(\d+)?([.]?\d{0,9})?$/)) {
			this.setState({ slippage: e.target.value, localSlippage: e.target.value }, () =>
				updateSlippage(e.target.value)
			);
		}
	};

	handleDeadlineChange = (e) => {
		const { updateDeadline } = this.context;
		if (e.target.value.match(/^[0-9]*$/)) {
			this.setState({ deadline: e.target.value, localDeadline: e.target.value }, () =>
				updateDeadline(e.target.value)
			);
		}
	};

	handleMenuClose = () => {
		const { updateDeadline, updateSlippage } = this.context;
		const { localDeadline, slippage, localSlippage } = this.state;
		this.setState({ settingsMenuVisible: false }, () => {
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

	toggleVRAPDetails = () => {
		this.setState((state) => ({
			vrapDetailsVisible: !state.vrapDetailsVisible,
		}));
	};

	render() {
		const {
			settingsMenuVisible,
			slippage,
			localSlippage,
			deadline,
			localDeadline,
			vrapDetailsVisible,
		} = this.state;
		const { onModalToggle, walletAddress, walletConnected, ethBalance } = this.props;
		return (
			<nav className="app-bar">
				<div>
					<ClickAwayListener onClickAway={this.handleMenuClose}>
						<div style={{ position: "relative" }}>
							<RiSettingsFill
								size={24}
								style={{ cursor: "pointer", position: "relative", top: "3px", userSelect: "none" }}
								onClick={this.toggleSettingsMenu}
							/>
							<Fade in={settingsMenuVisible}>
								<div className="settings-dropdown">
									<div className="category">Slippage Tolerance</div>
									<div className="settings-button-group">
										<button
											className={`tolerance-button ${slippage === "0.1" && "tolerance-active"}`}
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
											className={`tolerance-button ${slippage === "0.5" && "tolerance-active"}`}
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
											className={`tolerance-button ${slippage === "1" && "tolerance-active"}`}
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
									<div className="category" style={{ marginTop: "20px" }}>
										Transaction Deadline
									</div>
									<div
										className="tolerance-input-container"
										style={{ width: "200px", margin: "0 auto 1rem" }}
									>
										<button tabIndex="-1" className="tolerance-input-button">
											<input
												className="tolerance-input"
												onChange={this.handleDeadlineChange}
												placeholder={deadline}
												style={{
													color: localDeadline === "0" && "red",
												}}
												value={localDeadline}
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
							</Fade>
						</div>
					</ClickAwayListener>
					{walletConnected ? (
						<div className="wallet-details-container">
							<div className="wallet-balance" style={{ flexShrink: 0 }}>
								{ethBalance === "" ? 0.0 : parseFloat(ethBalance).toFixed(3)} BNB
							</div>
							<button className="wallet-address-button" onClick={onModalToggle}>
								<p>
									{`${walletAddress}`.substring(0, 6) +
										"..." +
										`${walletAddress}`.substring(37, 42)}
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
						<button className="connect-wallet-button" onClick={onModalToggle}>
							Connect to a wallet
						</button>
					)}
					<div>
						<ClickAwayListener onClickAway={() => this.setState({ vrapDetailsVisible: false })}>
							<div style={{ position: "relative" }}>
								<button className="vrap-button" onClick={this.toggleVRAPDetails}>
									<img src={Logo} alt="VRAP" height="20px" width="auto" />
								</button>
								<Fade in={vrapDetailsVisible}>
									<div className="details-dropdown">
										<div className="category">Your VRAP Breakdown</div>
										<div className="detail">
											<p>$0.05</p>
											<span>VRAP Price</span>
										</div>
										<div className="detail">
											<p>100,000,000</p>
											<span>VRAP in circulation</span>
										</div>
										<div className="detail">
											<p>100,000,000</p>
											<span>Total supply</span>
										</div>
									</div>
								</Fade>
							</div>
						</ClickAwayListener>
					</div>
				</div>
			</nav>
		);
	}
}
