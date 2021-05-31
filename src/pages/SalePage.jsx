import React, { Component } from "react";
import { Container } from "@material-ui/core";
import AppBar from "../components/AppBar";
import Sale from "../components/Sale/Sale";
import Sidebar from "../components/Sidebar";

export default class SalePage extends Component {
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
						<Sale
							onModalOpenRequest={this.props.onModalOpenRequest}
							walletConnected={this.props.walletConnected}
							vrapBalance={this.props.vrapBalance}
							ethBalance={this.props.ethBalance}
							usdtBalance={this.props.usdtBalance}
							address={this.props.address}
							fetchBalance={this.props.fetchBalance}
							buyWithEther={this.props.buyWithEther}
							approved={this.props.approved}
							approving={this.props.approving}
							approveTether={this.props.approveTether}
							buyWithTether={this.props.buyWithTether}
							onResetBuyStatus={this.props.onResetBuyStatus}
							ethBuying={this.props.ethBuying}
						/>
					</Container>
				</div>
			</>
		);
	}
}
