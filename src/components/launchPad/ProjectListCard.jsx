import React, { Component } from "react";
import { ethers } from "ethers";
import { Progress, Spin } from "antd";
import cardImg from "../../assets/images/card-img.jpg";
import { withRouter } from "react-router-dom";
import { Fade } from "@material-ui/core";
import { client } from "../../apollo/client";
import { GET_PROJECT_PARTICIPANT_COUNT } from "../../apollo/queries";
import { getVRAPPrice } from "../../utils/helpers";
import "./ProjectListCard.css";

class ProjectListCard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			fetchingParticipants: false,
			fetchingRate: false,
			participantCount: 0,
			tokenRate: "0",
		};
	}

	componentDidMount() {
		if (this.props.participants) {
			this.fetchParticipantCount();
			this.calculateTokenExchangeRate();
		}
	}

	fetchParticipantCount = () => {
		this.setState({ fetchingParticipants: true }, () => {
			client
				.query({
					query: GET_PROJECT_PARTICIPANT_COUNT,
					variables: {
						projectId: this.props.id,
					},
					fetchPolicy: "network-only",
				})
				.then((res) => {
					// console.log(res.data.purchaseActivities);
					this.setState({ participantCount: parseFloat(res.data.purchaseActivities.length) });
				})
				.catch((err) => console.log(err))
				.finally(() => this.setState({ fetchingParticipants: false }));
		});
	};

	calculateTokenExchangeRate = () => {
		this.setState({ fetchingRate: true }, async () => {
			try {
				const { tokenCost, tokenDecimals } = this.props;
				const priceResult = await getVRAPPrice();
				const price = priceResult.price;
				const tokenRate = price / parseFloat(ethers.utils.formatUnits(tokenCost, tokenDecimals));
				this.setState({ tokenRate, fetchingRate: false });
			} catch (err) {
				this.setState({ fetchingRate: false });
			}
		});
	};

	navigateToProject = () => {
		const { owner, id, history, projectStatus } = this.props;
		if (projectStatus === "ongoing") {
			if (!owner) {
				history.push(`/launchpad/${id}`);
			} else {
				history.push(`/my-projects/${id}`);
			}
		}
	};

	render() {
		const {
			projectStatus,
			projectName,
			totalRaise,
			minAlloc,
			maxAlloc,
			saleCompletion,
			bnbName,
			percentage,
			bnbNo,
			participants,
			maxBnb,
			toggleProjectReview,
			tokenSymbol,
			owner,
		} = this.props;
		const { fetchingParticipants, participantCount, fetchingRate, tokenRate } = this.state;
		const loading = fetchingParticipants || fetchingRate;

		return (
			<Fade in={!!projectName} timeout={{ enter: 500 }}>
				<div
					className={`upcoming-card-container ${
						saleCompletion && projectStatus === "ongoing" ? "ongoing-hg" : null
					}`}
					onClick={toggleProjectReview ? toggleProjectReview : this.navigateToProject}
					style={
						owner ? { cursor: "pointer" } : projectStatus === "ongoing" ? { cursor: "pointer" } : {}
					}
				>
					{loading ? (
						<div
							style={{
								height: "100%",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							<Spin size="large" className="projects-loader" />
						</div>
					) : (
						<Fade in={!loading} timeout={{ enter: 350 }}>
							<div>
								<div className="project-img-container">
									<img width="378" height="219" src={cardImg} alt="Project" />
									<div
										className={`project-status ${saleCompletion ? "status-bg" : null}`}
										style={{ textTransform: "capitalize" }}
									>
										{projectStatus}
									</div>
								</div>
								<div className="project-data">
									<div className="project-name-container">
										<div className="project-avatar"></div>
										<div>
											<h3 className="project-name">{projectName}</h3>
											{bnbName && (
												<p className="tba-desc">
													1 VRAP = {parseFloat(tokenRate).toFixed(4)} {tokenSymbol}
												</p>
											)}
										</div>
									</div>
									<div className="tba-raise-box">
										<h1 className="tba">
											<span>{totalRaise}</span>
										</h1>
										<p className="tba-desc">Total raise</p>
									</div>
									{saleCompletion && projectStatus === "ongoing" ? (
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
										{!minAlloc && (
											<div className="tba-bottom-box">
												<h1 className="tba">
													<span>
														{participantCount}
														{minAlloc}
													</span>
												</h1>
												<p className="tba-desc">
													{participants ? "Participants" : minAlloc ? "Min alloc." : null}
												</p>
											</div>
										)}
										<div className="tba-bottom-box" style={maxBnb ? { textAlign: "right" } : {}}>
											<h1 className="tba">
												<span>
													{maxBnb}
													{maxAlloc} {maxAlloc && tokenSymbol}
												</span>
											</h1>
											<p className="tba-desc">
												{maxBnb ? "Max VRAP" : maxAlloc ? "Max alloc." : null}
											</p>
										</div>
										{/* <div className="tba-bottom-box">
								<h1 className="tba">
									<span>{access}</span>
								</h1>
								<p className="tba-desc">Access</p>
							</div> */}
									</div>
								</div>
							</div>
						</Fade>
					)}
				</div>
			</Fade>
		);
	}
}

export default withRouter(ProjectListCard);
