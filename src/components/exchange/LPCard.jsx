import { CircularProgress } from "@material-ui/core";
import React, { Component } from "react";
import { withRouter } from "react-router";
import { getLPInfo } from "../../utils/helpers";

class LPCard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			detailsVisible: false,
			liquidityInfo: null,
		};
	}

	toggleDetails = () => {
		this.setState(
			(state) => {
				return {
					detailsVisible: !state.detailsVisible,
				};
			},
			() => {
				if (this.state.detailsVisible) {
					if (!this.state.liquidityInfo) {
						this.fetchLiquidity();
					}
				}
			}
		);
	};

	getPoolSharePercent = (userTokens, totalTokens) => {
		return parseFloat((parseFloat(userTokens) / parseFloat(totalTokens)) * 100).toFixed(2);
	};

	fetchLiquidity = () => {
		const { tokenAAddress, tokenBAddress, walletAddress, lpAddress } = this.props;
		if (tokenAAddress && tokenBAddress) {
			try {
				this.setState({ loading: true }, async () => {
					// console.log(lpAddress)
					const liquidityInfo = await getLPInfo(
						lpAddress,
						walletAddress,
						tokenAAddress,
						tokenBAddress
					);
					this.setState({
						liquidityInfo: liquidityInfo.data,
						loading: false,
					});
				});
			} catch (err) {
				this.setState({ loading: false }, () => {
					console.log(err.message);
				});
			}
		}
	};

	render() {
		const {
			tokenA,
			tokenB,
			tokenAIcon,
			tokenBIcon,
			tokenAAddress,
			tokenBAddress,
			lpAddress,
			onAddLiquidity,
			history,
			walletAddress,
			importLP,
			onImport,
			tokenADecimals,
			tokenBDecimals,
		} = this.props;
		const { detailsVisible, liquidityInfo } = this.state;
		return (
			<div className="lp-card">
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						marginBottom: detailsVisible ? "15px" : 0,
					}}
				>
					<div className="lp-card-heading">
						<div className="lp-icons">
							<img src={tokenAIcon} alt="token-1" />
							<img src={tokenBIcon} alt="token-2" />
						</div>
						<span>
							{tokenA}/{tokenB}
						</span>
					</div>
					<a
						href="##"
						onClick={(e) => {
							e.preventDefault();
							this.toggleDetails();
						}}
					>
						Manage
					</a>
				</div>
				{detailsVisible &&
					(!liquidityInfo ? (
						<div
							style={{
								display: "flex",
								padding: "2rem 0",
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							<CircularProgress
								size={16}
								thickness={5}
								style={{
									color: "#DE0102",
								}}
							/>
						</div>
					) : (
						<>
							<div className="flex-spaced-container" style={{ alignItems: "flex-start" }}>
								<div>Your total pool tokens:</div>
								<div>{parseFloat(liquidityInfo.total).toFixed(8)}</div>
							</div>
							{/* <div className="flex-spaced-container">
                            <div>Pooled {tokenA}:</div>
                            <div>0.00007965 <img src={tokenAIcon} alt="token-1" /></div>
                        </div>
                        <div className="flex-spaced-container">
                            <div>Pooled {tokenB}:</div>
                            <div>0.00007965 <img src={tokenBIcon} alt="token-1" /></div>
                        </div> */}
							<div className="flex-spaced-container" style={{ alignItems: "flex-start" }}>
								<div>Your pool share:</div>
								<div>
									{this.getPoolSharePercent(liquidityInfo.total, liquidityInfo.totalSupply)} %
								</div>
							</div>
							{importLP ? (
								<div className="lp-card-buttons" style={{ display: "flex", width: "100%" }}>
									<button onClick={onImport}>Import</button>
								</div>
							) : (
								<div className="lp-card-buttons">
									<button
										onClick={() => {
											const data = {
												tokenA: {
													symbol: tokenA,
													icon: tokenAIcon,
													address: tokenAAddress,
													decimals: tokenADecimals,
												},
												tokenB: {
													symbol: tokenB,
													icon: tokenBIcon,
													address: tokenBAddress,
													decimals: tokenBDecimals,
												},
												lpAddress: lpAddress,
											};
											onAddLiquidity(data);
										}}
									>
										Add
									</button>
									<button
										onClick={() => {
											const data = {
												tokenA: {
													symbol: tokenA,
													icon: tokenAIcon,
													address: tokenAAddress,
													supply: liquidityInfo.A,
													decimals: tokenADecimals,
												},
												tokenB: {
													symbol: tokenB,
													icon: tokenBIcon,
													address: tokenBAddress,
													supply: liquidityInfo.B,
													decimals: tokenBDecimals,
												},
												lpAddress: lpAddress,
												walletAddress: walletAddress,
												totalPoolTokens: liquidityInfo.total,
												totalSupply: liquidityInfo.totalSupply,
											};
											history.push("/pool/remove", data);
										}}
									>
										Remove
									</button>
								</div>
							)}
						</>
					))}
			</div>
		);
	}
}

export default withRouter(LPCard);
