import React from "react";
import AnimatedNumber from "react-animated-number";
import NumericLabel from "react-pretty-numbers";
import { ethers } from "ethers";
import { TOKEN } from "../../../utils/tokens";
import { Tag } from "antd";
import {
	PROVIDER,
	STAKING_ADDRESS,
	STAKING_ABI,
	STAKING_ADDRESS_V1,
} from "../../../utils/contracts";
class AssetCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			totalDeposit: 0.0,
			poolRate: 0.0,
		};
	}

	async componentDidMount() {
		if (this.props.data) {
			this.fetch();
			try {
				let token = TOKEN.filter((data) => data.contractAddress === this.props.data.tokenContract);
				let ContractABI = token[0].contractABI;
				let contract = new ethers.Contract(this.props.data.tokenContract, ContractABI, PROVIDER);
				let balance = await contract.balanceOf(
					this.props.data.version === 1 ? STAKING_ADDRESS_V1 : STAKING_ADDRESS
				);
				balance = ethers.utils.formatEther(balance) * 10 ** token[0].decimal;
				this.fetchPrice(balance);
				this.setState({ totalDeposit: balance });
			} catch (e) {
				console.log(e, this.props.data);
			}
		}
	}

	async fetch() {
		let { data } = this.props;
		let version = data.version;
		let contract = new ethers.Contract(
			version === 1 ? STAKING_ADDRESS_V1 : STAKING_ADDRESS,
			STAKING_ABI,
			PROVIDER
		);
		try {
			let poolRate = await contract.rFactor(this.props.data.tokenContract);
			poolRate = ethers.utils.formatEther(poolRate) * 3154 * 10 ** 6;
			this.setState({ poolRate: parseFloat(poolRate).toFixed(2) });
		} catch (e) {
			console.log(e);
		}
	}

	fetchPrice(balance) {
		let token = TOKEN.filter((data) => data.contractAddress === this.props.data.tokenContract);
		let ids = token[0].ids;
		if (token[0].fetchPrice) {
			fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`)
				.then((response) => response.json())
				.then((resJson) => {
					this.props.updateStaked(parseFloat(resJson[`${token[0].ids}`].usd) * parseFloat(balance));
				})
				.catch((err) => {
					// console.log(err);
				});
		}
	}

	render() {
		const { icons, ticker } = this.props.data;
		let { totalDeposit, poolRate } = this.state;
		return (
			<div className="asset-card">
				<div
					style={{
						display: "grid",
						gridTemplateColumns: "48px 1fr 120px",
						gap: 0,
						alignItems: "center",
						zIndex: 1,
						paddingBottom: "30px",
					}}
				>
					<div
						style={{
							position: "relative",
							display: "flex",
							flexDirection: "row",
						}}
					>
						{icons.map((icon) => {
							return (
								<img
									width="auto"
									height="40px"
									style={{
										borderRadius: "50%",
										boxShadow: "rgb(0 0 0 / 8%) 0px 6px 10px",
									}}
									alt={`${ticker} logo`}
									src={icon}
								/>
							);
						})}
					</div>
					<div
						style={{ marginLeft: icons.length > 1 ? "50px" : "10px" }}
						className="stake-card-heading"
					>
						{ticker}{" "}
						{this.props.data.version === 1 ? (
							<Tag
								color="rgba(255,0,0,1)"
								style={{ marginLeft: "12px", position: "relative", top: "-2px" }}
							>
								V1 Deprecated
							</Tag>
						) : null}
					</div>
					<button
						onClick={() =>
							this.props.history.push(
								`/stake/${this.props.data.tokenContract}/${this.props.data.version}`
							)
						}
						className="buy-action-button"
						style={{
							height: "44px",
							borderRadius: "10px",
							fontSize: "16px",
						}}
					>
						Deposit
					</button>
				</div>
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						flexDirection: "column",
						gap: "12px",
					}}
				>
					<div
						style={{
							width: "100%",
							minWidth: 0,
							margin: "0 0 -5px 0",
							padding: 0,
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
						}}
					>
						<div
							style={{
								fontSize: "16px",
								color: "#333",
								fontWeight: 500,
							}}
						>
							Total deposited
						</div>
						<div
							style={{
								fontSize: "16px",
								color: "#333",
								fontWeight: 500,
							}}
						>
							<AnimatedNumber
								component="text"
								value={totalDeposit}
								initialValue={0}
								default={0}
								stepPrecision={0}
								style={{
									transition: "0.8s ease-out",
									fontSize: 16,
									transitionProperty: "background-color, color, opacity",
								}}
								duration={800}
								formatValue={(deposit) => <NumericLabel>{deposit}</NumericLabel>}
							/>{" "}
							{ticker}
						</div>
					</div>
					<div
						style={{
							width: "100%",
							minWidth: 0,
							margin: 0,
							padding: 0,
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
						}}
					>
						<div
							style={{
								fontSize: "16px",
								color: "#333",
								fontWeight: 500,
							}}
						>
							Pool rate
						</div>
						<div
							style={{
								fontSize: "16px",
								color: "#333",
								fontWeight: 500,
							}}
						>
							{poolRate} % APY
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default AssetCard;
