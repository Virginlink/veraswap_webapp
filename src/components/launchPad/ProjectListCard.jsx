import React, { Component } from "react";
import { Progress } from "antd";
import "./ProjectListCard.css";
import cardImg from "../../assets/images/card-img.jpg";
import { withRouter } from "react-router-dom";

class ProjectListCard extends Component {
	render() {
		const {
			history,
			projectStatus,
			projectName,
			totalRaise,
			minAlloc,
			maxAlloc,
			access,
			saleCompletion,
			bnbName,
			percentage,
			bnbNo,
			participants,
			maxBnb,
			toggleProjectReview,
		} = this.props;

		const cardRoute = () => {
			if (saleCompletion && history.location.pathname === "/launch-pad") {
				history.push("/project-detail");
			} else if (history.location.pathname === "/my-projects") {
				history.push("/project-fund");
			}
		};

		return (
			<div
				className={`upcoming-card-container ${saleCompletion ? "ongoing-hg" : null}`}
				onClick={toggleProjectReview ? toggleProjectReview : cardRoute}
			>
				<div className="project-img-container">
					<img width="378" height="219" src={cardImg} alt="Project" />
					<div className={`project-status ${saleCompletion ? "status-bg" : null}`}>
						{projectStatus}
					</div>
				</div>
				<div className="project-data">
					<div className="project-name-container">
						<div className="project-avatar"></div>
						<div>
							<h3 className="project-name">{projectName}</h3>
							{bnbName ? <p className="tba-desc">{bnbName}</p> : null}
						</div>
					</div>
					<div className="tba-raise-box">
						<h1 className="tba">
							<span>{totalRaise}</span>
						</h1>
						<p className="tba-desc">Total raise</p>
					</div>
					{saleCompletion ? (
						<>
							<div className="sale-comp">
								<p className="sale-text">Sale Completion</p>
								<p className="sale-percentage">{percentage}%</p>
							</div>
							<Progress
								strokeColor={"#e60000"}
								trailColor={"#E5E7EB"}
								percent={percentage}
								showInfo={false}
							/>
							<p className="numbnb sale-text">{bnbNo}</p>
						</>
					) : null}
					<div className="tba-bottom-container">
						<div className="tba-bottom-box">
							<h1 className="tba">
								<span>
									{participants}
									{minAlloc}
								</span>
							</h1>
							<p className="tba-desc">
								{participants ? "Participants" : minAlloc ? "Min alloc." : null}
							</p>
						</div>
						<div className="tba-bottom-box">
							<h1 className="tba">
								<span>
									{maxBnb}
									{maxAlloc}
								</span>
							</h1>
							<p className="tba-desc">{maxBnb ? "Max BNB" : maxAlloc ? "Max alloc." : null}</p>
						</div>
						<div className="tba-bottom-box">
							<h1 className="tba">
								<span>{access}</span>
							</h1>
							<p className="tba-desc">Access</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default withRouter(ProjectListCard);
