import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import AssetCard from "./components/assetCard";
import { STAKED_TOKENS } from "../../utils/staked";

const formatter = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
	minimumFractionDigits: 2,
});

class Stake extends Component {
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
							<span className="sale-rotation"></span>
							<span className="noise"></span>
							<div className="sale-block-inner-grid-wrapper">
								<div className="sale-block-inner-grid">
									<div className="sale-block-title-container">
										<div className="sale-block-title">Veraswap Mining</div>
									</div>
									<div className="sale-block-content-container">
										<div className="sale-block-content">
											Deposit tokens / liquidity tokens to receive VRAP governance tokens{" "}
										</div>
									</div>
									<a
										href="https://docs.veraswap.org/yield-farming/liquidity-mining"
										target="_blank"
										rel="nooopener noreferrer"
										style={{
											color: "#FFF",
											fontSize: "14px",
											textDecoration: "underline",
										}}
									>
										More Info on <b>VRAP Mining</b>
									</a>
								</div>
							</div>
							<span className="sale-rotation"></span>
							<span className="noise"></span>
						</div>
					</div>
				</div>
				<div className="grid" style={{ width: "100%", maxWidth: "640px" }}>
					<div className="header-lp">
						<p className="heading" style={{ marginTop: "1.5rem" }}>
							Participating pools
						</p>
						<p
							className="total-liquidity"
							style={{
								marginTop: "1.75rem",
								paddingTop: ".25rem",
							}}
						>
							Total Liquidity : {formatter.format(totalStakedValue + totalStakedValue)}
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
						{STAKED_TOKENS.map((data) => {
							return (
								<AssetCard
									{...this.props}
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

export default withRouter(Stake);
