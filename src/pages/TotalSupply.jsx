import { Container } from "@material-ui/core";
import React from "react";
import AppBar from "../components/AppBar";
import Sidebar from "../components/Sidebar";
export default class TotalSupply extends React.Component {
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
		return (
			<>
				<Sidebar theme={theme} onThemeToggle={onThemeToggle} />
				<div className="app-container">
					<AppBar
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
						<div className="stats-wrapper">
							<div className="stats-card">
								<h3 className="stats-text-heading">Total Supply</h3>
								<p className="stats-text">100,000,000 VRAP</p>
							</div>
						</div>
					</Container>
				</div>
			</>
		);
	}
}
