import React from "react";
import Navbar from "../components/Navbar";
export default class TotalSupply extends React.Component {
	render() {
		return (
			<div>
				<Navbar
					active="total-supply"
					modalVisible={this.props.modalVisible}
					onModalToggle={this.props.onModalToggle}
					theme={this.props.theme}
					onThemeToggle={this.props.onThemeToggle}
					walletConnected={this.props.walletConnected}
					walletAddress={this.props.walletAddress}
					ethBalance={this.props.ethBalance}
					vrapBalance={this.props.vrapBalance}
				/>
				<div className="stats-wrapper">
					<div className="stats-card">
						<h3 className="stats-text-heading">Total Supply</h3>
						<p className="stats-text">100,000,000 VRAP</p>
					</div>
				</div>
			</div>
		);
	}
}
