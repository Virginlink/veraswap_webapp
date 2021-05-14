import React, { Component } from "react";
import { withRouter } from "react-router";
import { ExpertModeModal } from "./modals";
import { FaMedium, FaTelegramPlane, FaTwitter } from "react-icons/fa";
import Logo from "../assets/images/vrap-red.svg";
import Stake from "../assets/icons/stake.svg";
import Swap from "../assets/icons/swap.svg";
import Pool from "../assets/icons/pool.svg";
import Blog from "../assets/icons/blog.svg";
import Docs from "../assets/icons/docs.svg";
import "./Sidebar.css";

class Sidebar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			expertModeConfirmationModalVisible: false,
			expertMode: false,
			darkMode: false,
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

	render() {
		const { expertMode, expertModeConfirmationModalVisible, darkMode } = this.state;
		return (
			<aside className="app-sidebar">
				<div className="sidebar-logo">
					<a href="/" onClick={(e) => this.navigateTo(e, "/")}>
						<img src={Logo} height="50px" width="auto" alt="VRAP" />
					</a>
				</div>
				<ul className="app-links">
					<li>
						<a href="/stake" onClick={(e) => this.navigateTo(e, "/stake")}>
							<img src={Stake} alt="stake" height="20px" width="auto" />
							Stake
						</a>
					</li>
					<li>
						<a href="/swap" onClick={(e) => this.navigateTo(e, "/swap")}>
							<img src={Swap} alt="swap" height="20px" width="auto" />
							Swap
						</a>
					</li>
					<li>
						<a href="/pool" onClick={(e) => this.navigateTo(e, "/pool")}>
							<img
								src={Pool}
								alt="pool"
								height="20px"
								width="auto"
								style={{ marginRight: "18px" }}
							/>
							Pool
						</a>
					</li>
				</ul>
				<ul className="app-links">
					<li>
						<a href="##" onClick={(e) => this.navigateTo(e, "/")}>
							<img
								src={Blog}
								alt="blog"
								height="23px"
								width="auto"
								style={{ marginRight: "22px" }}
							/>
							Blog
						</a>
					</li>
					<li>
						<a href="##" onClick={(e) => this.navigateTo(e, "/")}>
							<img
								src={Docs}
								alt="docs"
								height="23px"
								width="auto"
								style={{ marginRight: "26px" }}
							/>
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
						<a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
							<FaTwitter size={24} />
						</a>
						<a href="https://telegram.org" target="_blank" rel="noopener noreferrer">
							<FaTelegramPlane size={24} />
						</a>
						<a href="https://medium.com" target="_blank" rel="noopener noreferrer">
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
			</aside>
		);
	}
}

export default withRouter(Sidebar);
