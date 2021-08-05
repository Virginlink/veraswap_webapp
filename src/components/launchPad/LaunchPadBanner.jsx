import React, { Component } from "react";
import { withRouter } from "react-router";

import "./LaunchPadBanner.css";

class LaunchPadBanner extends Component {
	render() {
		const { header, desc, buttonText, history } = this.props;
		return (
			<div className="launchpad-banner-container">
				<h1 className="banner-header">
					<span>{header}</span>
				</h1>
				<p className="banner-desc">{desc}</p>
				{buttonText === "My Projects" ? (
					<button className="banner-btn" onClick={() => history.push("/my-projects")}>
						{buttonText}
					</button>
				) : (
					""
				)}
				{buttonText === "Back to Launchpad" ? (
					<button className="banner-btn" onClick={() => history.push("/launch-pad")}>
						{buttonText}
					</button>
				) : (
					""
				)}
				{buttonText === "Subscribe" ? (
					<button className="banner-btn" style={{ padding: "10px 3.5rem" }}>
						{buttonText}
					</button>
				) : (
					""
				)}
			</div>
		);
	}
}

export default withRouter(LaunchPadBanner);
