import React, { Component } from "react";
import { Progress } from "antd";
import { FiExternalLink } from "react-icons/fi";
import powerWhite from "../../assets/images/power-white.png";
import "./ProjectHeaderTab.css";
// import { IconButton } from "@material-ui/core";
// import { MdDelete } from "react-icons/md";

export default class ProjectHeaderTab extends Component {
	render() {
		const {
			projectName,
			projectAddress,
			projectBnb,
			salePercentage,
			bnbNum,
			liveStatus,
			solidBtn,
			borderBtn,
			owner,
			onSolidButtonClick,
			onBorderedButtonClick,
			adminAddress,
			settlementAddress,
			// onRemoveProject,
		} = this.props;

		return (
			<div className="launchpad-banner-container banner-divider">
				<div style={{ flex: "1" }}>
					<img className="powerWhite" src={powerWhite} alt="icon" />
					<h3 className="header-project">
						<span>{projectName}</span>
					</h3>
					{owner ? (
						<a
							href={`https://kovan.etherscan.io/address/${projectAddress}`}
							target="_blank"
							rel="noreferrer noopener"
							className="project-id"
						>
							{projectAddress} <FiExternalLink />
						</a>
					) : (
						<p className="project-id">{projectAddress}</p>
					)}
					<div className="project-bnb" style={owner ? { marginTop: "0.75rem" } : {}}>
						{projectBnb}
					</div>
					{owner && (
						<div style={{ marginTop: "1.5rem" }}>
							<p className="project-id">
								Project Wallet:{" "}
								<a
									href={`https://kovan.etherscan.io/address/${adminAddress}`}
									target="_blank"
									rel="noreferrer noopener"
									className="project-id"
								>
									{adminAddress?.slice(0, 5)}....{adminAddress?.slice(-5)} <FiExternalLink />
								</a>
							</p>
							<p className="project-id">
								Settlement Wallet:{" "}
								<a
									href={`https://kovan.etherscan.io/address/${settlementAddress}`}
									target="_blank"
									rel="noreferrer noopener"
									className="project-id"
								>
									{settlementAddress?.slice(0, 5)}....{settlementAddress?.slice(-5)}{" "}
									<FiExternalLink />
								</a>
							</p>
						</div>
					)}
				</div>
				<div className="sale-card">
					{/* {owner ? (
						<div
							className="flex-spaced-container"
							style={{ marginBottom: "1rem", alignItems: "center" }}
						>
							<p className="sale-live" style={{ margin: 0 }}>
								{liveStatus}
							</p>
							<IconButton
								style={{ position: "relative", right: "-15px" }}
								onClick={onRemoveProject}
							>
								<MdDelete color="#FFF" />
							</IconButton>
						</div>
					) : ( */}
					<p className="sale-live">{liveStatus}</p>
					{/* )} */}
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
					<p className="numbnb live-comp">{bnbNum}</p>
					<div className="header-tab-btn-container">
						<button className="btn-solid btn-common" onClick={onSolidButtonClick}>
							{solidBtn}
						</button>
						<button className="btn-border btn-common" onClick={onBorderedButtonClick}>
							{borderBtn}
						</button>
					</div>
				</div>
			</div>
		);
	}
}
