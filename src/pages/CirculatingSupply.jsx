import React from "react";
import { ethers } from "ethers";
import { STAKING_ADDRESS, TOKEN_ABI, TOKEN_ADDRESS, PROVIDER } from "../utils/contracts";
import Sidebar from "../components/Sidebar";
import AppBar from "../components/AppBar";
import { Container } from "@material-ui/core";
export default class CirculatingSupply extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			stakingBalance: 0,
			totalSupply: 100000000,
			adminWallet: 86000000,
			loading: true,
		};
	}

	componentDidMount = () => {
		this.fetch();
	};

	fetch = async () => {
		let contract = new ethers.Contract(TOKEN_ADDRESS, TOKEN_ABI, PROVIDER);
		let balance = await contract.balanceOf(STAKING_ADDRESS);
		balance = ethers.utils.formatEther(balance);
		this.setState({
			stakingBalance: parseFloat(balance),
			loading: false,
		});
	};

	render() {
		const { totalSupply, adminWallet, stakingBalance } = this.state;
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
		return this.state.loading ? null : (
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
								<h3 className="stats-text-heading">Circulating Supply</h3>
								<p className="stats-text">
									{new Intl.NumberFormat("en-US").format(
										parseFloat(totalSupply - (adminWallet + stakingBalance)).toFixed(4)
									)}{" "}
									VRAP
								</p>
							</div>
						</div>
					</Container>
				</div>
			</>
		);
	}
}
