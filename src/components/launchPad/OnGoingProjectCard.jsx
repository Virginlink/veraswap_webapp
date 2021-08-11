import React, { Component } from "react";
import { Progress } from "antd";
import "./UpComingProjectCard.css";
import "./OnGoingProjectCard.css";
import cardImg from "../../assets/images/card-img.jpg";
import { withRouter } from "react-router-dom";

class OnGoingProjectCard extends Component {
	render() {
		const { history } = this.props;

		const cardRoute = () => {
			if (history.location.pathname === "/launch-pad") {
				history.push("/project-detail");
			} else if (history.location.pathname === "/my-projects") {
				history.push("/project-fund");
			}
		};
		return (
			<div className="upcoming-card-container ongoing-hg" onClick={cardRoute}>
				<div className="project-img-container">
					<img width="378" height="219" src={cardImg} alt="Project" />
					<div className="project-status status-bg">Ongoing</div>
				</div>
				<div className="project-data">
					<div className="project-name-container">
						<div className="project-avatar"></div>
						<div>
							<h3 className="project-name">Project name</h3>
							<p className="tba-desc">1BNB=0.1145 name</p>
						</div>
					</div>
					<div className="tba-raise-box">
						<h1 className="tba">
							<span>2025 BNB</span>
						</h1>
						<p className="tba-desc">Total raise</p>
					</div>
					<div className="sale-comp">
						<p className="sale-text">Sale Completion</p>
						<p className="sale-percentage">95%</p>
					</div>
					<Progress strokeColor={"#e60000"} trailColor={"#E5E7EB"} percent={95} showInfo={false} />
					<p className="numbnb sale-text">222.1698694303834 / 234.BNB</p>
					<div className="tba-bottom-container">
						<div className="tba-bottom-box">
							<h1 className="tba">
								<span>600</span>
							</h1>
							<p className="tba-desc">Participants</p>
						</div>
						<div className="tba-bottom-box">
							<h1 className="tba">
								<span>3.5</span>
							</h1>
							<p className="tba-desc">Max BNB</p>
						</div>
						<div className="tba-bottom-box">
							<h1 className="tba">
								<span>Private</span>
							</h1>
							<p className="tba-desc">Access</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default withRouter(OnGoingProjectCard);
