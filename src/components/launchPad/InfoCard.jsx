import React, { Component } from "react";
import { MdContentCopy } from "react-icons/md";
import "./InfoCard.css";

export default class InfoCard extends Component {
	render() {
		const {
			tokenDistribution,
			// auditStatus,
			totalSaleAmount,
			avialablePurchase,
			// marketCap,
			// kyc,
			name,
			symbol,
			address,
			blockchain,
			// initialSupply,
			// totalSupply,
			cardTitle,
		} = this.props;

		return (
			<div className="info-card">
				<h3 className="team-review info-header">{cardTitle}</h3>
				<div className="info-column">
					<p className="info-column-left">
						{tokenDistribution ? "Token Distribution" : name ? "Name" : null}
					</p>
					<p className="info-column-right">
						{tokenDistribution}
						{name} {name && `(${symbol})`}
					</p>
				</div>
				{/* <div className="info-column">
						<p className="info-column-left">
							{auditStatus ? "Audit Status" : symbol ? "Symbol" : null}
						</p>
						<p className="info-column-right">
							{auditStatus}
							{symbol}
						</p>
					</div>
				 */}
				<div className="info-column">
					<p className="info-column-left">
						{totalSaleAmount ? "Total Sale Amount" : address ? "Address" : null}
					</p>
					<p className={`info-column-right ${address ? "info-column-break" : null}`}>
						{totalSaleAmount}
						{address && address.slice(0, 6) + "..." + address.slice(-6)}{" "}
						{address ? <MdContentCopy /> : null}
					</p>
				</div>
				<div className="info-column">
					<p className="info-column-left">
						{avialablePurchase ? "Available for Purchase" : blockchain ? "Blockchain" : null}
					</p>
					<p className="info-column-right">
						{avialablePurchase}
						{blockchain}
					</p>
				</div>
				{/* <div className="info-column">
					<p className="info-column-left">
						{marketCap ? "Initial Market Cap" : initialSupply ? "Initial suply" : null}
					</p>
					<p className="info-column-right">
						{marketCap}
						{initialSupply}
					</p>
				</div> */}
				{/* <div className="info-column">
						<p className="info-column-left">
							{kyc ? "KYC Required" : totalSupply ? "Total supply" : null}
						</p>
						<p className="info-column-right">
							{kyc}
							{totalSupply}
						</p>
					</div> */}
			</div>
		);
	}
}
