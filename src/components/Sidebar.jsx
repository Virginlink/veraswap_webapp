import React, { Component } from "react";
import { withRouter } from "react-router";
import { ExpertModeModal } from "./modals";
import { FaMedium, FaTelegramPlane, FaTwitter } from "react-icons/fa";
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
import Logo from "../assets/images/vrap-red.svg";
import CMC from "../assets/icons/cmc.svg";
import CMCW from "../assets/icons/cmc-white.svg";
import "./Sidebar.css";
import { ClickAwayListener } from "@material-ui/core";
import { FiChevronDown } from "react-icons/fi";

class Sidebar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			expertModeConfirmationModalVisible: false,
			expertMode: false,
			darkMode: false,
			swapDropdownVisible: false,
		};
	}

	componentDidMount() {
		const { theme } = this.props;
		const expertMode = localStorage.getItem("expertMode");
		if (theme === "dark") {
			this.setState({ darkMode: true });
		}
		if (expertMode === "true") {
			this.setState({ expertMode: true });
		}
	}

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

	render() {
		const { expertMode, expertModeConfirmationModalVisible, darkMode, swapDropdownVisible } =
			this.state;
		const { active } = this.props;
		return (
			<aside className="app-sidebar">
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
								<FiChevronDown size={16} className="down-arrow" />
							</a>
							<div className="sub-links" data-hidden={!swapDropdownVisible}>
								<ul>
									<li>
										<a
											href="https://veraswap.app/#/swap?inputCurrency=0x271c418b045d05a1d52c6bf849d47b5b5b4d769e"
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
					<li>
						<a
							href="https://solidity.finance/audits/Vera-Staking/"
							target="_blank"
							rel="noreferrer noopener"
						>
							<Audit />
							Audits
						</a>
					</li>
					<li>
						<a href="##" onClick={(e) => e.preventDefault()}>
							<Analytics style={{ transform: "scale(1.2)", position: "relative", left: "3px" }} />
							<span style={{ position: "relative", left: "4px" }}>Analytics</span>
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
					<div className="sidebar-social-links" style={{marginTop: "1rem",marginBottom: "1.5rem"}}>
						<a href="https://coinmarketcap.com/currencies/veraswap/" target="_blank" rel="noopener noreferrer">
							{darkMode ? <img src={CMCW} style={{maxWidth:"100%"}} alt="coinmarketcap" /> : <img src={CMC} style={{maxWidth:"100%"}} alt="coinmarketcap" /> }
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
			</aside>
		);
	}
}

export default withRouter(Sidebar);
