import { Container } from "@material-ui/core";
import React, { Component } from "react";
import { FiChevronRight } from "react-icons/fi";
import AppBar from "../../components/AppBar";
import Sidebar from "../../components/Sidebar";
import "./ComingSoon.css";

export default class ComingSoon extends Component {
	render() {
		const {
			theme,
			onThemeToggle,
			modalVisible,
			onModalToggle,
			walletAddress,
			walletConnected,
			ethBalance,
			vrapBalance,
			history,
		} = this.props;
		return (
			<>
				<Sidebar active="coming-soon" theme={theme} onThemeToggle={onThemeToggle} />
				<div className="app-container">
					<AppBar
						active="stake"
						theme={theme}
						onThemeToggle={onThemeToggle}
						modalVisible={modalVisible}
						onModalToggle={onModalToggle}
						walletAddress={walletAddress}
						walletConnected={walletConnected}
						ethBalance={ethBalance}
						vrapBalance={vrapBalance}
					/>
					<Container maxWidth="md">
						<div className="ido-parent-container">
							<h1 className="coming-soon-header">
								<span>We're coming soon.</span>
							</h1>
							<p className="coming-soon-desc">
								Our webapp is under construction. We'll be here soon with our new awesome site,
								subscribe to be notified.
							</p>
							<div className="coming-soon-timer-container">
								<div className="timer-box">
									<h1>153</h1>
									<p>days</p>
								</div>
								<div className="timer-box">
									<h1>05</h1>
									<p>hours</p>
								</div>
								<div className="timer-box">
									<h1>54</h1>
									<p>minutes</p>
								</div>
								<div className="timer-box">
									<h1>44</h1>
									<p>seconds</p>
								</div>
							</div>
							<div className="coming-soon-input-container">
								<input type="email" placeholder="Enter your email address" />
								<button className="email-submit-btn" type="submit">
									<FiChevronRight />
								</button>
							</div>
							<div className="email-btn-container">
								<button className="back-home-btn" onClick={() => history.push("/")}>
									<span>Back to Home </span> <FiChevronRight size={26} />
								</button>
							</div>
						</div>
					</Container>
				</div>
			</>
		);
	}
}
