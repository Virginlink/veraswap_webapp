import React, { Component } from "react";
import "./InfoCard.css";

export default class PoolInfoCard extends Component {
	render() {
		const { TokenDistribution, AuditStatus, TotalSaleAmount, AvialablePurchase, MarketCap, Kyc } =
			this.props;

		return (
			<div className="info-card">
				<h3 className="team-review info-header">Pool information</h3>
				<div className="info-column">
					<p className="info-column-left">Token Distribution</p>
					<p className="info-column-right">{TokenDistribution}</p>
				</div>
				<div className="info-column">
					<p className="info-column-left">Audit Status</p>
					<p className="info-column-right">{AuditStatus}</p>
				</div>
				<div className="info-column">
					<p className="info-column-left">Total Sale Amount</p>
					<p className="info-column-right">{TotalSaleAmount}</p>
				</div>
				<div className="info-column">
					<p className="info-column-left">Available for Purchase</p>
					<p className="info-column-right">{AvialablePurchase}</p>
				</div>
				<div className="info-column">
					<p className="info-column-left">Initial Market Cap</p>
					<p className="info-column-right">{MarketCap}</p>
				</div>
				<div className="info-column">
					<p className="info-column-left">KYC Required</p>
					<p className="info-column-right">{Kyc}</p>
				</div>
			</div>
		);
	}
}
