import React from "react";
import { ethers } from "ethers";
import { STAKING_ABI, STAKING_ADDRESS, PROVIDER, STAKING_ADDRESS_V1 } from "../../utils/contracts";
import { TOKEN } from "../../utils/tokens";
export default class LiquidityDeposits extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			liquidity: 0.0,
			walletAddress: "",
		};
	}

	componentDidMount() {
		if (this.props.ticker && this.props.currentToken && this.props.walletAddress !== "") {
			this.setState({ walletAddress: this.props.walletAddress });
			this.fetch(this.props.walletAddress);
		}
	}

	UNSAFE_componentWillReceiveProps(props) {
		if (props.ticker && props.currentToken && props.walletAddress !== this.state.walletAddress) {
			this.setState({ walletAddress: props.walletAddress });
			this.fetch(props.walletAddress);
		}
	}

	fetch(walletAddress) {
		let { version } = this.props;
		let token = TOKEN.filter((data) => data.contractAddress === this.props.currentToken);
		let decimal = token[0].decimal;
		let contract = new ethers.Contract(
			version === "1" ? STAKING_ADDRESS_V1 : STAKING_ADDRESS,
			STAKING_ABI,
			PROVIDER
		);
		contract
			.users(walletAddress, this.props.currentToken)
			.then((res) => {
				let currentStake = ethers.utils.formatEther(res.currentStake) * 10 ** decimal;
				currentStake = parseFloat(currentStake).toFixed(4);
				this.setState({ liquidity: currentStake });
				this.props.setLiquidity(currentStake);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	render() {
		return (
			<div className="sale-block-inner-grid-wrapper">
				<div className="sale-block-inner-grid">
					<div className="sale-block-title-container">
						<div className="sale-block-title">Your liquidity deposits</div>
					</div>
					<div className="sale-block-content-container" style={{ alignItems: "baseline" }}>
						<div className="balance">{this.state.liquidity}</div>
						<div className="sale-block-title">{this.props.ticker}</div>
					</div>
				</div>
			</div>
		);
	}
}
