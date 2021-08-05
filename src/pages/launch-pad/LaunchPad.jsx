import { Container } from "@material-ui/core";
import React, { Component } from "react";
import { Menu, Dropdown } from "antd";
import { BiMenuAltRight } from "react-icons/bi";
import AppBar from "../../components/AppBar";
import Sidebar from "../../components/Sidebar";
import {
	LaunchPadBanner,
	UpComingProjectCard,
	OnGoingProjectCard,
} from "../../components/launchPad";
import "./LaunchPad.css";

export default class LaunchPad extends Component {
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

		const menu = (
			<Menu>
				<Menu.Item key="0" className="dropdown-active">
					<a href="https://www.antgroup.com">Ongoing Pools</a>
				</Menu.Item>
				<Menu.Item key="1">
					<a href="https://www.aliyun.com">Completed Pools</a>
				</Menu.Item>
			</Menu>
		);
		
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
					/>
					<Container>
						<div className="ido-parent-container">
							<LaunchPadBanner
								header="Welcome to VRAP LaunchPad"
								desc="Enabling projects to raise capital on a decentralized and interoperable environment based on Binance. Not a member already? Sign up today! And Become A Member of World's Best Decentralized Fund Raising Community"
								buttonText="My Projects"
							/>
							<h3 className="team-review">Upcoming Pools</h3>
							<div className="upcoming-card-parent">
								<UpComingProjectCard />
								<UpComingProjectCard />
							</div>
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
									<button>Apply for IDO</button>
								</div>
							</section>
							<div className="featured">
								<h3 className="project-name">Featured Pools</h3>
								<Dropdown placement={"bottomRight"} overlay={menu} trigger={["click"]}>
									<button className="dropdown-btn">
										<BiMenuAltRight size={20} />
									</button>
								</Dropdown>
							</div>
							<div className="upcoming-card-parent">
								<OnGoingProjectCard />
								<OnGoingProjectCard />
								<OnGoingProjectCard />
								<OnGoingProjectCard />
								<OnGoingProjectCard />
								<OnGoingProjectCard />
							</div>
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
