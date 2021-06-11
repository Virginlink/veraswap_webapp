import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import AssetCard from "./components/liquidityCard";
import { LIQUIDITY_TOKENS } from "../../utils/liquidity";

const formatter = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
	minimumFractionDigits: 2,
});

class LiquidityMining extends Component {
	constructor(props) {
		super(props);
		this.state = {
			totalStakedValue: 0.0,
		};
		this.updateStaked = this.updateStaked.bind(this);
	}

	updateStaked(staked) {
		this.setState({
			totalStakedValue: parseFloat(this.state.totalStakedValue) + parseFloat(staked),
		});
	}

	render() {
		const { totalStakedValue } = this.state;
		return (
			<div className="sale-main-container">
				<div className="empty-grid"></div>
				<div className="sale-grid-container">
					<div className="sale-block-outer-container-wrapper" style={{ gap: "24px" }}>
						<div className="sale-block-outer-container">
							<div className="sale-block-inner-grid-wrapper">
								<div className="sale-block-inner-grid">
									<div className="sale-block-title-container">
										<div className="sale-block-title">Veraswap Liquidity Mining</div>
									</div>
									<div className="sale-block-content-container">
										<div className="sale-block-content">
											Deposit liquidity pool tokens to receive VRAP governance tokens{" "}
										</div>
									</div>
									<a
										href="https://docs.veraswap.org/yield-farming/liquidity-mining"
										target="_blank"
										rel="nooopener noreferrer"
										style={{
											color: "#FFF",
											fontSize: "16px",
											paddingTop: "8px",
										}}
									>
										More Info on VRAP Mining
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="grid" style={{ width: "100%" }}>
					<div className="header-lp">
						<p className="heading">Available Liquidity pools</p>
						<p
							className="total-liquidity"
							style={{
								marginTop: "1.75rem",
							}}
						>
							Total Liquidity:{" "}
							<span style={{ color: "#E60000", fontFamily: "bold" }}>
								{formatter.format(totalStakedValue + totalStakedValue)}
							</span>
						</p>
					</div>
					<div
						style={{
							display: "grid",
							gridTemplateColumns: "1fr",
							gap: "15px 10px",
							width: "100%",
							justifySelf: "center",
							paddingBottom: "3rem",
						}}
					>
						{LIQUIDITY_TOKENS.map((data, index) => {
							return (
								<AssetCard
									{...this.props}
									key={`${index}-${data.tokenContract}`}
									data={data}
									routeTo={this.routeTo}
									updateStaked={this.updateStaked}
								/>
							);
						})}
					</div>
				</div>
			</div>
		);
	}
}

export default withRouter(LiquidityMining);
