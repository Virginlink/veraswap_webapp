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

export default class MyProject extends Component {
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
								header="My Projects"
								desc="Collection of your priceless projects that raised capital on our decentralized and interoperable environment based on Binance."
								buttonText="Back to Launchpad"
							/>
							<h3 className="team-review">Projects under Team Review</h3>
							<div className="upcoming-card-parent" style={{marginBottom: "100px"}}>
								<UpComingProjectCard />
								<UpComingProjectCard />
							</div>
							<div className="featured">
								<h3 className="project-name">Featured Pools</h3>
								<Dropdown placement={"bottomRight"} overlay={menu} trigger={["click"]}>
									<button className="dropdown-btn">
										<BiMenuAltRight size={20} />
									</button>
								</Dropdown>
							</div>
							<div className="upcoming-card-parent" style={{marginBottom: "50px"}}>
								<OnGoingProjectCard />
								<OnGoingProjectCard />
								<OnGoingProjectCard />
								<OnGoingProjectCard />
								<OnGoingProjectCard />
								<OnGoingProjectCard />
							</div>
						</div>
					</Container>
				</div>
			</>
		);
	}
}
