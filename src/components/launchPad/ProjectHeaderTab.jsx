import React, { Component } from "react";
import { Progress } from "antd";
import "./ProjectHeaderTab.css";
import powerWhite from "../../assets/images/power-white.png";

export default class ProjectHeaderTab extends Component {
	render() {
		const {
			projectName,
			projectAddress,
			projectBNB,
			salePercentage,
			BNBNum,
			liveStatus,
			solidBtn,
			borderBtn,
		} = this.props;

		return (
			<div className="launchpad-banner-container banner-divider">
				<div style={{ flex: "1" }}>
					<img className="powerWhite" src={powerWhite} alt="icon" />
					<h3 className="header-project">
						<span>{projectName}</span>
					</h3>
					<p className="project-id">{projectAddress}</p>
					<div className="project-bnb">{projectBNB}</div>
				</div>
				<div className="sale-card">
					<p className="sale-live">{liveStatus}</p>
					<div className="sale-comp">
						<p className="live-comp">Sale Completion</p>
						<p className="sale-percentage" style={{ color: "#fff" }}>
							{salePercentage}%
						</p>
					</div>
					<Progress
						strokeColor={"#fff"}
						trailColor={"#FFBDBD"}
						percent={salePercentage}
						showInfo={false}
					/>
					<p className="numbnb live-comp">{BNBNum}</p>
					<div className="header-tab-btn-container">
						<button className="btn-solid btn-common">{solidBtn}</button>
						<button className="btn-border btn-common">{borderBtn}</button>
					</div>
				</div>
			</div>
		);
	}
}
