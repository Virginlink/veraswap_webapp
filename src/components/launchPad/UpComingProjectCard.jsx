import React, { Component } from "react";
import "./UpComingProjectCard.css";
import cardImg from "../../assets/images/card-img.jpg";

export default class UpComingProjectCard extends Component {
	render() {
		return (
			<div className="upcoming-card-container">
				<div className="project-img-container">
					<img width="378" height="219" src={cardImg} alt="Project" />
					<div className="project-status">Upcoming</div>
				</div>
				<div className="project-data">
					<div className="project-name-container">
						<div className="project-avatar"></div>
						<h3 className="project-name">Project name</h3>
					</div>
					<div className="tba-raise-box">
						<h1 className="tba">
							<span>TBA</span>
						</h1>
						<p className="tba-desc">Total raise</p>
					</div>

					<div className="tba-bottom-container">
						<div className="tba-bottom-box">
							<h1 className="tba">
								<span>TBA</span>
							</h1>
							<p className="tba-desc">Min alloc.</p>
						</div>
						<div className="tba-bottom-box">
							<h1 className="tba">
								<span>TBA</span>
							</h1>
							<p className="tba-desc">Max alloc.</p>
						</div>
						<div className="tba-bottom-box">
							<h1 className="tba">
								<span>TBA</span>
							</h1>
							<p className="tba-desc">Access</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
