import { Container } from "@material-ui/core";
import React, { Component } from "react";
import AppBar from "../../components/AppBar";
import Sidebar from "../../components/Sidebar";

export default class ProjectFund extends Component {
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
			// history,
		} = this.props;
		return (
			<>
				<Sidebar active="ico" theme={theme} onThemeToggle={onThemeToggle} />
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
						<div className="ido-parent-container">Coming Soon</div>
					</Container>
				</div>
			</>
		);
	}
}
