import React, { Component } from "react";
import { MdContentCopy } from "react-icons/md";
import "./InfoCard.css";

export default class TokenInfoCard extends Component {
	render() {
		const { Name, Symbol, Address, Blockchain, InitialSupply, TotalSupply } = this.props;
		return (
			<div className="info-card">
				<h3 className="team-review info-header">Token information</h3>
				<div className="info-column">
					<p className="info-column-left">Name</p>
					<p className="info-column-right">{Name}</p>
				</div>
				<div className="info-column">
					<p className="info-column-left">Symbol</p>
					<p className="info-column-right">{Symbol}</p>
				</div>
				<div className="info-column">
					<p className="info-column-left">Address</p>
					<p className="info-column-right info-column-break">
						{Address.substring(0, 15) + "..."} <MdContentCopy />
					</p>
				</div>
				<div className="info-column">
					<p className="info-column-left">Blockchain</p>
					<p className="info-column-right">{Blockchain}</p>
				</div>
				<div className="info-column">
					<p className="info-column-left">Initial suply</p>
					<p className="info-column-right">{InitialSupply}</p>
				</div>
				<div className="info-column">
					<p className="info-column-left">Total supply</p>
					<p className="info-column-right">{TotalSupply}</p>
				</div>
			</div>
		);
	}
}
