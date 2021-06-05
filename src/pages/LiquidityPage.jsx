import { Container } from "@material-ui/core";
import React, { Component } from "react";
import AppBar from "../components/AppBar";
import Sidebar from "../components/Sidebar";
import LiquidityMining from "../components/Stake/LiquidityMining";

export default class LiquidityPage extends Component {
	routeTo(path) {
		this.props.history.push(path);
	}

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
			onModalOpenRequest,
			usdtBalance,
			address,
			fetchBalance,
			buyWithEther,
			approved,
			approving,
			approveTether,
			buyWithTether,
		} = this.props;
		return (
			<>
				<Sidebar active="liquidity" theme={theme} onThemeToggle={onThemeToggle} />
				<div className="app-container">
					<AppBar
						active="liquidity"
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
						<LiquidityMining
							onModalOpenRequest={onModalOpenRequest}
							walletConnected={walletConnected}
							vrapBalance={vrapBalance}
							ethBalance={ethBalance}
							usdtBalance={usdtBalance}
							address={address}
							fetchBalance={fetchBalance}
							buyWithEther={buyWithEther}
							approved={approved}
							approving={approving}
							approveTether={approveTether}
							buyWithTether={buyWithTether}
						/>
					</Container>
				</div>
			</>
		);
	}
}
