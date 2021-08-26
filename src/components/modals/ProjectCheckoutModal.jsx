import React, { Component } from "react";
import {
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Fade,
} from "@material-ui/core";
import { RiCloseFill } from "react-icons/ri";
import { FaFacebook, FaTelegram, FaTwitter } from "react-icons/fa";
import { approveIDO, getPlanFee } from "../../utils/idoHelpers";
import { ERC20_ABI, KOVAN_PROVIDER, TEST_TOKEN_ADDRESS } from "../../utils/contracts";
import { ethers } from "ethers";
import { notification } from "antd";
import { IDO_ADDRESS } from "../../utils/idoContracts";
import ExternalLink from "../Transactions/ExternalLink";
import { getVRAPPrice } from "../../utils/helpers";

const socialIcons = {
	facebook: <FaFacebook size={20} />,
	twitter: <FaTwitter size={20} />,
	telegram: <FaTelegram size={20} />,
};

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Fade timeout={{ enter: 1000, exit: 2000 }} ref={ref} {...props} />;
});

const contract = new ethers.Contract(TEST_TOKEN_ADDRESS, ERC20_ABI, KOVAN_PROVIDER);

class ProjectCheckoutModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			step: 1,
			fetchingPrice: false,
			fetchingVrapBalance: false,
			fetchingFee: false,
			tokenRate: "0",
			fee: "0",
			vrapBalance: "0",
			approving: false,
			approved: false,
		};
	}

	componentDidMount() {
		this.fetchPrice();
		this.fetchPlanFee();
		this.fetchVrapBalance();
	}

	componentDidUpdate(prevProps) {
		if (this.props.visible !== prevProps.visible && this.props.visible) {
			this.fetchPrice();
			this.fetchPlanFee();
			this.fetchVrapBalance();
		}
		if (this.props.walletAddress !== prevProps.walletAddress) {
			this.fetchPrice();
			this.fetchPlanFee();
			this.fetchVrapBalance();
		}
	}

	fetchPrice = () => {
		const { tokenCost } = this.props;
		this.setState({ fetchingPrice: true }, () => {
			getVRAPPrice()
				.then((res) => {
					const price = res.price;
					const tokenRate = parseFloat(tokenCost) / price;
					this.setState({ tokenRate });
				})
				.catch((err) => console.log(err))
				.finally(() => this.setState({ fetchingPrice: false }));
		});
	};

	fetchPlanFee = () => {
		const { project, walletAddress } = this.props;
		this.setState({ fetchingFee: true }, () => {
			getPlanFee(project?.plan)
				.then((res) => {
					this.setState({ fee: res.fee }, async () => {
						try {
							if (walletAddress) {
								let allowance = await contract.allowance(walletAddress, IDO_ADDRESS);
								allowance = ethers.utils.formatUnits(allowance, 18);
								if (parseFloat(allowance) >= parseFloat(this.state.fee)) {
									this.setState({ approved: true });
								}
							}
						} catch (err) {
							console.log(err);
						}
					});
				})
				.catch((err) => console.log(err))
				.finally(() => this.setState({ fetchingFee: false }));
		});
	};

	fetchVrapBalance = () => {
		const { walletConnected, walletAddress } = this.props;
		if (walletConnected) {
			this.setState({ fetchingVrapBalance: true }, () => {
				contract
					.balanceOf(walletAddress)
					.then((res) => {
						const balance = ethers.utils.formatUnits(res, 18);
						this.setState({ vrapBalance: balance });
					})
					.catch((err) => console.log(err))
					.finally(() => this.setState({ fetchingVrapBalance: false }));
			});
		}
	};

	handleConfirmation = () => {
		const { fee, vrapBalance, approved } = this.state;
		const { onConfirm } = this.props;
		if (parseFloat(vrapBalance) < parseFloat(fee)) {
			notification["error"]({
				message: "Insufficient VRAP balance",
			});
		} else {
			if (approved) {
				onConfirm();
				this.handleClose();
			} else {
				this.setState({ step: 2 });
			}
		}
	};

	handleClose = () => this.setState({ step: 1, approving: false }, () => this.props.onClose());

	handleApproval = () => {
		const { fee } = this.state;
		const { signer, onConfirm } = this.props;
		this.setState({ approving: true }, () => {
			approveIDO({ amount: fee, signer })
				.then(async (res) => {
					notification.info({
						key: "approvalProcessingNotification",
						message: "VRAP approval is being processed. You can view the transaction here.",
						btn: <ExternalLink hash={res.data.hash}>View Transaction</ExternalLink>,
						icon: (
							<CircularProgress
								size={25}
								thickness={5}
								style={{
									color: "#DE0102",
									position: "relative",
									top: "6px",
								}}
							/>
						),
						duration: 0,
					});
					await res.data.wait();
					notification.close("approvalProcessingNotification");
					notification.success({
						key: "approvalSuccessNotification",
						message: "VRAP approval successful. You can view the transaction here",
						btn: <ExternalLink hash={res.data.hash}>View Transaction</ExternalLink>,
						duration: 3,
					});
					this.setState({ approving: false });
					onConfirm();
					this.handleClose();
				})
				.catch((err) => {
					console.log(err);
					this.setState({ approving: false });
					notification["error"]({
						message: "Couldn't approve tVRAP",
						description: "Something went wrong. Please try again later",
					});
				});
		});
	};

	render() {
		const { theme, visible, project, tokenSymbol } = this.props;
		const {
			fetchingFee,
			fetchingVrapBalance,
			fee,
			vrapBalance,
			step,
			approving,
			tokenRate,
			fetchingPrice,
		} = this.state;
		return (
			<Dialog
				open={visible}
				TransitionComponent={Transition}
				onClose={approving ? () => false : this.handleClose}
				onBackdropClick={approving ? () => false : this.handleClose}
				BackdropProps={{ style: { backgroundColor: "rgba(0, 0, 0, 0.3)" } }}
				PaperProps={{
					style: {
						width: "50vw",
						boxShadow: "rgba(47, 128, 237, 0.05) 0px 4px 8px 0px",
						maxWidth: "500px",
						maxHeight: "90vh",
						display: "flex",
						borderRadius: "20px",
						padding: "1.5rem 0.5rem",
					},
				}}
				scroll="paper"
			>
				<DialogTitle
					className="modal-header flex-spaced-container"
					style={{
						color: theme === "light" ? "#000" : "#FFF",
						paddingTop: 0,
						paddingBottom: 0,
						width: "100%",
					}}
				>
					<span style={{ marginBottom: 0, color: "#e60000" }}>
						{step === 1 ? "Review project" : "Approve fee"}
					</span>
					<button
						className="close-modal-button checkout"
						onClick={approving ? () => false : this.handleClose}
					>
						<RiCloseFill />
					</button>
				</DialogTitle>
				<DialogContent className="project-review-table-container">
					{step === 1 ? (
						<table className="project-review-table">
							<tbody>
								<tr>
									<td>Plan</td>
									<td style={{ textTransform: "capitalize" }}>{project?.plan}</td>
								</tr>
								<tr>
									<td>Name</td>
									<td>{project?.name}</td>
								</tr>
								<tr>
									<td>Description</td>
									<td>{project?.description}</td>
								</tr>
								<tr>
									<td>Website</td>
									<td>
										<a href={project?.website} target="_blank" rel="noreferrer noopener">
											{project?.website}
										</a>
									</td>
								</tr>
								<tr>
									<td>Social media handles</td>
									<td>
										<div className="social-handles">
											{project?.socialHandles?.map((social) => (
												<a
													key={social.link}
													href={social.link}
													target="_blank"
													rel="noreferrer noopener"
												>
													{socialIcons[social.name]}
												</a>
											))}
										</div>
									</td>
								</tr>
								<tr>
									<td>Project wallet address</td>
									<td>
										<a
											href={`https://kovan.etherscan.io/address/${project?.projectWalletAddress}`}
											target="_blank"
											rel="noreferrer noopener"
										>
											{project?.projectWalletAddress.slice(0, 5)}...
											{project?.projectWalletAddress.slice(-5)}
										</a>
									</td>
								</tr>
								<tr>
									<td>Settlement address</td>
									<td>
										<a
											href={`https://kovan.etherscan.io/address/${project?.settlementAddress}`}
											target="_blank"
											rel="noreferrer noopener"
										>
											{project?.settlementAddress.slice(0, 5)}...
											{project?.settlementAddress.slice(-5)}
										</a>
									</td>
								</tr>
								<tr>
									<td>Allocated token address</td>
									<td>
										<a
											href={`https://kovan.etherscan.io/address/${project?.contractAddress}`}
											target="_blank"
											rel="noreferrer noopener"
										>
											{project?.contractAddress.slice(0, 5)}...{project?.contractAddress.slice(-5)}
										</a>
									</td>
								</tr>
								<tr>
									<td>Allocated token symbol</td>
									<td>{tokenSymbol}</td>
								</tr>
								<tr>
									<td>Allocated tokens</td>
									<td>{project?.tokensAllocated}</td>
								</tr>
								<tr>
									<td>Cost per token</td>
									<td>${project?.tokenCost} </td>
								</tr>
								<tr>
									<td>Exchange rate</td>
									<td>
										{fetchingPrice ? (
											<CircularProgress
												size={22}
												thickness={5}
												style={{ color: "#e60000", position: "relative", top: "3px" }}
											/>
										) : (
											`1 ${tokenSymbol} ~ ${parseFloat(tokenRate).toFixed(4)} VRAP`
										)}
									</td>
								</tr>
								<tr>
									<td>Max cap</td>
									<td>{project?.maxCapInVrap} VRAP</td>
								</tr>
								<tr>
									<td>Project duration</td>
									<td>
										{new Date(project?.startDate * 1000).toLocaleDateString()} to{" "}
										{new Date(project?.endDate * 1000).toLocaleDateString()}
									</td>
								</tr>
							</tbody>
						</table>
					) : (
						<div className="project-review-approval">
							Approve <span style={{ fontWeight: "bold" }}>{fee} VRAP</span> to continue
						</div>
					)}
				</DialogContent>
				<DialogActions style={{ justifyContent: "center", flexDirection: "column" }}>
					{step === 1 && (
						<>
							{fetchingFee || fetchingVrapBalance ? (
								<CircularProgress
									size={22}
									thickness={5}
									style={{ color: "#e60000", margin: "1rem auto 1.5rem" }}
								/>
							) : (
								<>
									<p
										style={{
											color: theme === "light" ? "#000" : "#FFF",
											fontSize: "16px",
											textAlign: "center",
										}}
									>
										<span style={{ textTransform: "capitalize" }}>{project?.plan}</span> plan fee of{" "}
										{parseFloat(fee)} VRAP will be charged on confirmation
									</p>
									<p
										style={{
											color: theme === "light" ? "#000" : "#FFF",
											textAlign: "center",
										}}
									>
										Wallet balance: {parseFloat(vrapBalance).toFixed(6)} VRAP
									</p>
								</>
							)}
						</>
					)}
					<div className="project-review-actions">
						{step === 1 ? (
							<>
								<button onClick={this.handleClose}>Cancel</button>
								<button disabled={fetchingVrapBalance} onClick={this.handleConfirmation}>
									Confirm
								</button>
							</>
						) : (
							<>
								<button onClick={() => this.setState({ step: 1 })}>Back</button>
								<button disabled={approving} onClick={this.handleApproval}>
									{approving ? (
										<CircularProgress
											style={{ color: "#FFF", position: "relative", top: "3px" }}
											size={20}
											thickness={5}
										/>
									) : (
										"Approve & Submit"
									)}
								</button>
							</>
						)}
					</div>
				</DialogActions>
			</Dialog>
		);
	}
}

export default ProjectCheckoutModal;
