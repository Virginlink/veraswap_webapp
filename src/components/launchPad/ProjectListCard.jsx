import React, { Component } from "react";
import { Progress } from "antd";
import "./ProjectListCard.css";
import cardImg from "../../assets/images/card-img.jpg";
import { withRouter } from "react-router-dom";

class ProjectListCard extends Component {
	render() {
		const {
			history,
			ProjectStatus,
			ProjectName,
			TotalRaise,
			MinAlloc,
			MaxAlloc,
			Access,
			SaleCompletion,
			BNBname,
			Percentage,
			BNBno,
			Participants,
			MaxBNB,
			toggleProjectReview,
		} = this.props;

		const cardRoute = () => {
			if (SaleCompletion && history.location.pathname === "/launch-pad") {
				history.push("/project-detail");
			} else if (history.location.pathname === "/my-projects") {
				history.push("/project-fund");
			}
		};

		return (
			<div
				className={`upcoming-card-container ${SaleCompletion ? "ongoing-hg" : null}`}
				onClick={toggleProjectReview ? toggleProjectReview : cardRoute}
			>
				<div className="project-img-container">
					<img width="378" height="219" src={cardImg} alt="Project" />
					<div className={`project-status ${SaleCompletion ? "status-bg" : null}`}>
						{ProjectStatus}
					</div>
				</div>
				<div className="project-data">
					<div className="project-name-container">
						<div className="project-avatar"></div>
						<div>
							<h3 className="project-name">{ProjectName}</h3>
							{BNBname ? <p className="tba-desc">{BNBname}</p> : null}
						</div>
					</div>
					<div className="tba-raise-box">
						<h1 className="tba">
							<span>{TotalRaise}</span>
						</h1>
						<p className="tba-desc">Total raise</p>
					</div>
					{SaleCompletion ? (
						<>
							<div className="sale-comp">
								<p className="sale-text">Sale Completion</p>
								<p className="sale-percentage">{Percentage}%</p>
							</div>
							<Progress
								strokeColor={"#e60000"}
								trailColor={"#E5E7EB"}
								percent={Percentage}
								showInfo={false}
							/>
							<p className="numbnb sale-text">{BNBno}</p>
						</>
					) : null}
					<div className="tba-bottom-container">
						<div className="tba-bottom-box">
							<h1 className="tba">
								<span>
									{Participants}
									{MinAlloc}
								</span>
							</h1>
							<p className="tba-desc">
								{Participants ? "Participants" : MinAlloc ? "Min alloc." : null}
							</p>
						</div>
						<div className="tba-bottom-box">
							<h1 className="tba">
								<span>
									{MaxBNB}
									{MaxAlloc}
								</span>
							</h1>
							<p className="tba-desc">{MaxBNB ? "Max BNB" : MaxAlloc ? "Max alloc." : null}</p>
						</div>
						<div className="tba-bottom-box">
							<h1 className="tba">
								<span>{Access}</span>
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
