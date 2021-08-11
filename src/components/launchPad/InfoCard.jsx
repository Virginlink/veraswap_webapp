import React, { Component } from "react";
import { MdContentCopy } from "react-icons/md";
import "./InfoCard.css";

export default class InfoCard extends Component {
	render() {
		const {
			TokenDistribution,
			AuditStatus,
			TotalSaleAmount,
			AvialablePurchase,
			MarketCap,
			Kyc,
			Name,
			Symbol,
			Address,
			Blockchain,
			InitialSupply,
			TotalSupply,
			CardTitle,
		} = this.props;

		return (
			<div className="info-card">
				<h3 className="team-review info-header">{CardTitle}</h3>
				<div className="info-column">
					<p className="info-column-left">
						{TokenDistribution ? "Token Distribution" : Name ? "Name" : null}
					</p>
					<p className="info-column-right">
						{TokenDistribution}
						{Name}
					</p>
				</div>
				<div className="info-column">
					<p className="info-column-left">
						{AuditStatus ? "Audit Status" : Symbol ? "Symbol" : null}
					</p>
					<p className="info-column-right">
						{AuditStatus}
						{Symbol}
					</p>
				</div>
				<div className="info-column">
					<p className="info-column-left">
						{TotalSaleAmount ? "Total Sale Amount" : Address ? "Address" : null}
					</p>
					<p className={`info-column-right ${Address ? "info-column-break" : null}`}>
						{TotalSaleAmount}
						{Address && Address.substring(0, 15) + "..."} {Address ? <MdContentCopy /> : null}
					</p>
				</div>
				<div className="info-column">
					<p className="info-column-left">
						{AvialablePurchase ? "Available for Purchase" : Blockchain ? "Blockchain" : null}
					</p>
					<p className="info-column-right">
						{AvialablePurchase}
						{Blockchain}
					</p>
				</div>
				<div className="info-column">
					<p className="info-column-left">
						{MarketCap ? "Initial Market Cap" : InitialSupply ? "Initial suply" : null}
					</p>
					<p className="info-column-right">
						{MarketCap}
						{InitialSupply}
					</p>
				</div>
				<div className="info-column">
					<p className="info-column-left">
						{Kyc ? "KYC Required" : TotalSupply ? "Total supply" : null}
					</p>
					<p className="info-column-right">
						{Kyc}
						{TotalSupply}
					</p>
				</div>
			</div>
		);
	}
}
