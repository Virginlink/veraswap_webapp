import React, { Component } from "react";
import { CircularProgress, ClickAwayListener, Fade } from "@material-ui/core";
import LogoWhite from "../assets/images/vrap-white.svg";
import { ExpertModeModal } from "./modals";
import { FaMedium, FaTelegramPlane, FaTwitter } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";
import Logo from "../assets/images/vrap-red.svg";
import {
	Stake,
	Swap,
	Pool,
	VRAPDocs,
	ICO,
	Audit,
	Analytics,
	VRAPBlog,
} from "../assets/icons/ReactIcons";
import { RiSettingsFill, RiWallet3Fill } from "react-icons/ri";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { AccountAvatar } from "../assets/icons/ReactIcons";
import AppContext from "../state/AppContext";
import { Drawer } from "antd";
import { withRouter } from "react-router";
import { getVRAPPrice } from "../utils/helpers";
import "./Sidebar.css";
class AppBar extends Component {
	static contextType = AppContext;

	constructor(props) {
		super(props);
		this.state = {
			vrapPrice: "",
			fetchingVrapPrice: false,
			slippage: "0.5",
			localSlippage: "",
			localDeadline: "",
			deadline: "",
			settingsMenuVisible: false,
			vrapDetailsVisible: false,
			sidebarVisible: false,
			expertModeConfirmationModalVisible: false,
			expertMode: false,
			darkMode: false,
			swapDropdownVisible: false,
			auditDropdownVisible: false,
		};
	}

	componentDidMount() {
		const { deadline, slippage } = this.context;
		const { theme } = this.props;
		this.setState({
			deadline: deadline,
			slippage: slippage,
		});
		const expertMode = localStorage.getItem("expertMode");
		if (theme === "dark") {
			this.setState({ darkMode: true });
		}
		if (expertMode === "true") {
			this.setState({ expertMode: true });
		}
		this.fetchVRAPPrice();
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

	fetchVRAPPrice = () => {
		this.setState({ fetchingVrapPrice: true }, () => {
			getVRAPPrice()
				.then((res) => {
					this.setState({ fetchingVrapPrice: false }, () => {
						if (!res.error) {
							this.setState({
								vrapPrice: parseFloat(res.price).toFixed(3),
							});
						}
					});
				})
				.catch((_) => {
					this.setState({ fetchingVrapPrice: false });
				});
		});
	};

	toggleSettingsMenu = () => {
		const { settingsMenuVisible } = this.state;
		if (!settingsMenuVisible) {
			this.setState({ settingsMenuVisible: true });
		} else {
			this.handleMenuClose();
		}
	};

	handleSlippageChange = (e) => {
		e.persist();
		const { updateSlippage } = this.context;
		if (e.target.value.match(/^(\d+)?([.]?\d{0,9})?$/)) {
			this.setState({ slippage: e.target.value, localSlippage: e.target.value }, () =>
				updateSlippage(e.target.value)
			);
		}
	};

	handleDeadlineChange = (e) => {
		e.persist();
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

	toggleSidebar = () => {
		this.setState((state) => ({
			sidebarVisible: !state.sidebarVisible,
		}));
	};

	navigateTo = (e, path) => {
		e.preventDefault();
		this.props.history.push(path);
	};

	toggleExpertMode = () => {
		const { expertMode } = this.state;
		if (expertMode) {
			this.setState({ expertMode: false }, () => localStorage.setItem("expertMode", "false"));
		} else {
			this.setState({
				expertModeConfirmationModalVisible: true,
			});
		}
	};

	turnOnExpertMode = () => {
		const promptValue = prompt('Please type the word "confirm" to enable expert mode.');
		if (promptValue === "confirm") {
			this.setState(
				{
					expertMode: true,
					expertModeConfirmationModalVisible: false,
				},
				() => localStorage.setItem("expertMode", "true")
			);
		}
	};

	toggleDarkMode = () => {
		this.setState(
			(state) => {
				return {
					darkMode: !state.darkMode,
				};
			},
			() => this.props.onThemeToggle()
		);
	};

	toggleSwapDropdown = () => {
		this.setState((state) => ({
			swapDropdownVisible: !state.swapDropdownVisible,
		}));
	};

	toggleAuditDropdown = () => {
		this.setState((state) => ({
			auditDropdownVisible: !state.auditDropdownVisible,
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
			sidebarVisible,
			expertModeConfirmationModalVisible,
			expertMode,
			darkMode,
			fetchingVrapPrice,
			vrapPrice,
			swapDropdownVisible,
			auditDropdownVisible,
		} = this.state;
		const { onModalToggle, walletAddress, walletConnected, ethBalance, home, history, active } =
			this.props;
		return (
			<nav className="app-bar">
				<div>
					<div className="burger" onClick={this.toggleSidebar}>
						<HiOutlineMenuAlt2 size={30} />
					</div>
					{!home && (
						<img src={Logo} alt="VRAP" width="40" height="100%" onClick={() => history.push("/")} />
					)}
				</div>
				{home && (
					<img
						src={Logo}
						alt="VRAP"
						width="60"
						height="100%"
						className="landing-logo"
						onClick={() => history.push("/")}
					/>
				)}
				<div>
					{!home && (
						<ClickAwayListener onClickAway={this.handleMenuClose}>
							<div style={{ position: "relative" }}>
								<RiSettingsFill
									size={24}
									style={{
										cursor: "pointer",
										position: "relative",
										top: "3px",
										userSelect: "none",
									}}
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
											<div className="tolerance-input-container">
												<input
													className="tolerance-input"
													onChange={this.handleSlippageChange}
													placeholder={slippage}
													value={localSlippage}
													style={{ borderRadius: "5px", height: "1.9rem" }}
												/>
												<span
													style={{
														position: "relative",
														left: "4px",
													}}
												>
													%
												</span>
											</div>
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
					)}
					{walletConnected ? (
						<>
							<button className="wallet-mobile-button" onClick={onModalToggle}>
								<RiWallet3Fill size={24} />
							</button>
							<div className="wallet-details-container">
								<div className="wallet-balance" style={{ flexShrink: 0 }}>
									{ethBalance === "" ? 0.0 : parseFloat(ethBalance).toFixed(5)} BNB
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
						</>
					) : (
						<>
							<button className="wallet-mobile-button" onClick={onModalToggle}>
								<RiWallet3Fill size={24} />
							</button>
							<button className="connect-wallet-button" onClick={onModalToggle}>
								Connect to a wallet
							</button>
						</>
					)}
					<div>
						<ClickAwayListener onClickAway={() => this.setState({ vrapDetailsVisible: false })}>
							<div style={{ position: "relative" }}>
								<button className="vrap-button" onClick={this.toggleVRAPDetails}>
									<img src={LogoWhite} alt="VRAP" height="20px" width="auto" />
								</button>
								<Fade in={vrapDetailsVisible}>
									<div className="details-dropdown">
										<div className="category">Your VRAP Breakdown</div>
										<div className="detail">
											<>
												{fetchingVrapPrice ? (
													<CircularProgress size={16} thickness={5} />
												) : (
													<p>${vrapPrice}</p>
												)}
											</>
											<span>VRAP Price</span>
										</div>
										<div className="detail">
											<p>8,840,214.755</p>
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
				<Drawer
					onClose={this.toggleSidebar}
					maskClosable
					closable
					visible={sidebarVisible}
					placement="left"
					className="app-drawer"
				>
					<div className="sidebar-logo">
						<a href="/" onClick={(e) => this.navigateTo(e, "/")}>
							<img src={Logo} height="50px" width="auto" alt="VRAP" />
						</a>
					</div>
					<ul className="app-links">
						<ClickAwayListener onClickAway={() => this.setState({ swapDropdownVisible: false })}>
							<li>
								<a
									href="##"
									onClick={(e) => {
										e.preventDefault();
										this.toggleSwapDropdown();
									}}
									className={active === "swap" ? "active" : ""}
									data-hidden={!swapDropdownVisible}
								>
									<Swap />
									Swap
									<FiChevronDown size={16} className="down-arrow" style={{ right: "18px" }} />
								</a>
								<div className="sub-links" data-hidden={!swapDropdownVisible}>
									<ul>
										<li>
											<a
												href="ttps://veraswap.app/#/swap?inputCurrency=0x271c418b045d05a1d52c6bf849d47b5b5b4d769e"
												target="_blank"
												rel="noopener noreferrer"
											>
												V1
											</a>
										</li>
										<li>
											<a
												href="/swap"
												onClick={(e) => this.navigateTo(e, "/swap")}
												className={active === "swap" ? "active" : ""}
											>
												V2
											</a>
										</li>
									</ul>
								</div>
							</li>
						</ClickAwayListener>
						<li>
							<a
								href="/pool"
								onClick={(e) => this.navigateTo(e, "/pool")}
								className={active === "pool" ? "active" : ""}
							>
								<Pool />
								Pool
							</a>
						</li>
						<li>
							<a
								href="/stake"
								onClick={(e) => this.navigateTo(e, "/stake")}
								className={active === "stake" ? "active" : ""}
							>
								<Stake />
								Stake
							</a>
						</li>
						<li>
							<a
								href="##"
								onClick={(e) => e.preventDefault()}
								className={active === "ico" ? "active" : ""}
							>
								<ICO />
								IDO
							</a>
						</li>
						<ClickAwayListener onClickAway={() => this.setState({ auditDropdownVisible: false })}>
							<li>
								<a
									href="##"
									onClick={(e) => {
										e.preventDefault();
										this.toggleAuditDropdown();
									}}
									target="_blank"
									rel="noreferrer noopener"
									data-hidden={!auditDropdownVisible}
								>
									<Audit />
									Audits
									<FiChevronDown size={16} className="down-arrow" style={{ right: "10px" }} />
								</a>
								<div className="sub-links" data-hidden={!auditDropdownVisible}>
									<ul>
										<li>
											<a
												href="https://solidity.finance/audits/Vera-Staking/"
												target="_blank"
												rel="noopener noreferrer"
											>
												Staking
											</a>
										</li>
										<li>
											<a
												href="https://solidity.finance/audits/Vera/"
												target="_blank"
												rel="noopener noreferrer"
											>
												General
											</a>
										</li>
									</ul>
								</div>
							</li>
						</ClickAwayListener>
						<li>
							<a href="##" onClick={(e) => e.preventDefault()}>
								<Analytics style={{ transform: "scale(1.2)", position: "relative", left: "3px" }} />
								<span style={{ position: "relative", left: "5px" }}>Analytics</span>
							</a>
						</li>
						<li>
							<a href="##" onClick={(e) => e.preventDefault()}>
								<VRAPDocs />
								Listings
							</a>
						</li>
						<li>
							<a href="https://docs.veraswap.org/" target="_blank" rel="noreferrer noopener">
								<VRAPBlog />
								Docs
							</a>
						</li>
					</ul>
					<div className="interface-settings">
						<span>Expert mode</span>
						<div className="sidebar-switch">
							<button data-enabled={!expertMode} onClick={this.toggleExpertMode}>
								off
							</button>
							<button data-enabled={expertMode} onClick={this.toggleExpertMode}>
								on
							</button>
						</div>
					</div>
					<div className="interface-settings">
						<span>Dark mode</span>
						<div className="sidebar-switch">
							<button data-enabled={!darkMode} onClick={this.toggleDarkMode}>
								off
							</button>
							<button data-enabled={darkMode} onClick={this.toggleDarkMode}>
								on
							</button>
						</div>
					</div>
					<div className="app-sidebar-footer">
						<div className="sidebar-social-links">
							<a href="https://twitter.com/veraswap" target="_blank" rel="noopener noreferrer">
								<FaTwitter size={24} />
							</a>
							<a href="https://t.me/veraswap" target="_blank" rel="noopener noreferrer">
								<FaTelegramPlane size={24} />
							</a>
							<a href="https://veraswap.medium.com/about" target="_blank" rel="noopener noreferrer">
								<FaMedium size={24} />
							</a>
						</div>
						<div className="sidebar-copyrights">&copy; 2021 Veraswap</div>
					</div>
					<ExpertModeModal
						open={expertModeConfirmationModalVisible}
						onClose={() =>
							this.setState({
								expertModeConfirmationModalVisible: false,
							})
						}
						onConfirm={this.turnOnExpertMode}
					/>
				</Drawer>
			</nav>
		);
	}
}

export default withRouter(AppBar);
