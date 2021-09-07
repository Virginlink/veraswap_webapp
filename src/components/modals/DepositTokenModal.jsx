import React, { Component } from "react";
import { ethers } from "ethers";
import { CircularProgress, Dialog, Fade } from "@material-ui/core";
import { RiCloseFill } from "react-icons/ri";

import Empty from "../../assets/icons/Empty.png";
import { ERC20_ABI, KOVAN_PROVIDER } from "../../utils/contracts";
import { IDO_ADDRESS } from "../../utils/idoContracts";
import { notification } from "antd";
import { depositToken } from "../../utils/idoHelpers";
import ExternalLink from "../Transactions/ExternalLink";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Fade timeout={{ enter: 1000, exit: 2000 }} ref={ref} {...props} />;
});

export default class DepositTokenModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			fetchingBalance: true,
			fetchingAllowance: true,
			balance: "0",
			allowance: "0",
			amount: "",
			approving: false,
			depositing: false,
		};
	}

	componentDidMount() {
		const {
			token: { address },
			walletAddress,
		} = this.props;
		if (address && walletAddress) {
			this.fetchTokenBalance();
			this.fetchTokenAllowance();
		}
	}

	componentDidUpdate(prevProps) {
		if (
			(this.props.token.address !== prevProps.token.address && this.props.token.address) ||
			(this.props.visible !== prevProps.visible && this.props.visible) ||
			(this.props.walletAddress !== prevProps.walletAddress && this.props.walletAddress)
		) {
			this.fetchTokenBalance();
			this.fetchTokenAllowance();
		}
	}

	fetchTokenBalance = () => {
		const {
			token: { address, decimals },
			walletAddress,
			projectWalletAddress,
		} = this.props;
		if (address && walletAddress.toLowerCase() === projectWalletAddress.toLowerCase()) {
			const tokenContract = new ethers.Contract(address, ERC20_ABI, KOVAN_PROVIDER);
			tokenContract
				.balanceOf(walletAddress)
				.then((res) => {
					const balance = ethers.utils.formatUnits(res, decimals);
					// console.log(`${symbol} balance`, balance);
					this.setState({ balance });
				})
				.catch((err) => console.log(err))
				.finally(() => this.setState({ fetchingBalance: false }));
		}
	};

	fetchTokenAllowance = () => {
		const {
			token: { address, decimals },
			walletAddress,
			projectWalletAddress,
		} = this.props;
		if (address && walletAddress.toLowerCase() === projectWalletAddress.toLowerCase()) {
			const tokenContract = new ethers.Contract(address, ERC20_ABI, KOVAN_PROVIDER);
			tokenContract
				.allowance(walletAddress, IDO_ADDRESS)
				.then((res) => {
					const allowance = ethers.utils.formatUnits(res, decimals);
					// console.log(`${symbol} allowance`, allowance);
					this.setState({ allowance });
				})
				.catch((err) => console.log(err))
				.finally(() => this.setState({ fetchingAllowance: false }));
		}
	};

	onAmountChange = (e) =>
		e.target.value.match(/^(\d+)?([.]?\d{0,18})?$/) && this.setState({ amount: e.target.value });

	handleMax = () => this.setState({ amount: parseFloat(this.state.balance).toString() });

	handleApproval = () => {
		const { amount } = this.state;
		const {
			token: { address, symbol, decimals },
			signer,
		} = this.props;
		const tokenContract = new ethers.Contract(address, ERC20_ABI, signer);
		this.setState({ approving: true }, () => {
			tokenContract
				.approve(IDO_ADDRESS, ethers.utils.parseUnits(amount, decimals))
				.then(async (tx) => {
					notification.info({
						key: "approvalProcessingNotification",
						message: `${symbol} approval is being processed. You can view the transaction here.`,
						btn: (
							<ExternalLink ethereum hash={tx.hash}>
								View Transaction
							</ExternalLink>
						),
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
					await tx.wait();
					notification.close("approvalProcessingNotification");
					notification.success({
						key: "approvalSuccessNotification",
						message: `${symbol} approval successful. You can view the transaction here`,
						btn: (
							<ExternalLink ethereum hash={tx.hash}>
								View Transaction
							</ExternalLink>
						),
						duration: 3,
					});
					this.setState({ allowance: amount }, () => this.fetchTokenAllowance());
				})
				.catch((err) => {
					console.log(err);
					notification["error"]({
						message: `Couldn't approve ${symbol}`,
						description: "Something went wrong. Please try again later",
					});
				})
				.finally(() => {
					this.setState({ approving: false });
				});
		});
	};

	handleDeposit = () => {
		const {
			projectId,
			signer,
			token: { symbol, decimals },
			onDeposit,
			onClose,
		} = this.props;
		const { amount } = this.state;
		this.setState({ depositing: true }, () => {
			depositToken({ projectId, amount, decimals, signer })
				.then(async (res) => {
					notification.info({
						key: "depositProcessingNotification",
						message: `${symbol} deposit is being processed. You can view the transaction here.`,
						btn: (
							<ExternalLink ethereum hash={res.data.hash}>
								View Transaction
							</ExternalLink>
						),
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
					notification.close("depositProcessingNotification");
					notification.success({
						key: "depositSuccessNotification",
						message: `${symbol} deposit successful. You can view the transaction here`,
						btn: (
							<ExternalLink ethereum hash={res.data.hash}>
								View Transaction
							</ExternalLink>
						),
						duration: 3,
					});
					this.setState({ amount: "" }, () => {
						this.fetchTokenBalance();
						this.fetchTokenAllowance();
						onDeposit(amount);
						onClose();
					});
				})
				.catch((err) => {
					notification["error"]({
						message: `Couldn't deposit ${symbol}`,
						description: err.message,
					});
				})
				.finally(() => this.setState({ depositing: false }));
		});
	};

	calculateAvailableDeposit = () => {
		const { allocated, deposited } = this.props;
		if (allocated && deposited) {
			return parseFloat(allocated) - parseFloat(deposited);
		}
	};

	handleClose = () => {
		const { onClose } = this.props;
		this.setState({ approving: false, depositing: false });
		onClose();
	};

	render() {
		const {
			theme,
			visible,
			token: { symbol },
			projectWalletAddress,
			walletAddress,
		} = this.props;
		const { amount, balance, approving, allowance, depositing } = this.state;

		const isAdmin = projectWalletAddress?.toLowerCase() === walletAddress?.toLowerCase();
		const availableToDeposit = this.calculateAvailableDeposit() || "0";

		return (
			<Dialog
				open={visible}
				TransitionComponent={Transition}
				onClose={this.handleClose}
				onBackdropClick={this.handleClose}
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
				<div
					className="modal-header flex-spaced-container"
					style={{ color: theme === "light" ? "#000" : "#FFF", paddingTop: 0 }}
				>
					<h3>{isAdmin ? `Deposit ${symbol}` : "Connect project wallet"}</h3>
					<button className="close-modal-button" onClick={this.handleClose}>
						<RiCloseFill />
					</button>
				</div>
				<div className="modal-content">
					{isAdmin ? (
						<>
							<div className="form-control">
								<div className="flex-spaced-container">
									<div />
									<div style={{ textAlign: "right" }}>
										<div style={{ marginBottom: "6px" }}>
											balance:{" "}
											<span style={{ fontFamily: "normal" }}>{parseFloat(balance).toFixed(6)}</span>{" "}
											<span style={{ textTransform: "none" }}>{symbol}</span>
										</div>
										<div>
											available to deposit:{" "}
											<span style={{ fontFamily: "normal" }}>{availableToDeposit}</span>{" "}
											<span style={{ textTransform: "none" }}>{symbol}</span>
										</div>
									</div>
								</div>
								<div className="input-container without-max">
									<input
										style={{ width: "100%", paddingRight: "1rem" }}
										placeholder="0.0"
										value={amount}
										onChange={this.onAmountChange}
									/>
									<div>
										<button
											disabled={parseFloat(balance) === 0}
											className="max-button"
											onClick={this.handleMax}
										>
											max
										</button>
										<button disabled className="asset-select-button" style={{ cursor: "default" }}>
											<img src={Empty} alt="token-logo" />
											<span style={{ color: "#FFF" }}>{symbol}</span>
										</button>
									</div>
								</div>
							</div>
							<div className="staking-modal-footer">
								<button
									className="staking-modal-button-primary"
									disabled={
										parseFloat(amount) === 0 ||
										!amount ||
										approving ||
										parseFloat(amount) > parseFloat(balance) ||
										parseFloat(amount) > parseFloat(availableToDeposit) ||
										parseFloat(amount) <= parseFloat(allowance)
									}
									onClick={this.handleApproval}
								>
									{!approving ? (
										amount ? (
											parseFloat(amount) > 0 ? (
												parseFloat(amount) <= parseFloat(balance) ? (
													parseFloat(amount) <= parseFloat(availableToDeposit) ? (
														parseFloat(amount) <= parseFloat(allowance) ? (
															"Approved"
														) : (
															"Approve"
														)
													) : (
														"Allocated tokens exceeded"
													)
												) : (
													`Insufficient ${symbol} balance`
												)
											) : (
												"Invalid Amount"
											)
										) : (
											"Enter Amount"
										)
									) : (
										<>
											Approving{" "}
											<CircularProgress
												size={16}
												thickness={5}
												style={{ color: "#FFF", position: "relative", top: "3px" }}
											/>
										</>
									)}
								</button>
								<button
									disabled={
										!amount ||
										parseFloat(amount) === 0 ||
										parseFloat(amount) > parseFloat(allowance) ||
										parseFloat(amount) > parseFloat(availableToDeposit) ||
										parseFloat(amount) > parseFloat(balance) ||
										approving ||
										depositing
									}
									className="staking-modal-button-primary"
									onClick={this.handleDeposit}
								>
									{depositing ? (
										<>
											Depositing{" "}
											<CircularProgress
												size={16}
												thickness={5}
												style={{ color: "#FFF", position: "relative", top: "3px" }}
											/>
										</>
									) : (
										"Deposit"
									)}
								</button>
							</div>
						</>
					) : (
						<div className="admin-connect-notice">
							Deposits can be made only from the specified project wallet. Connect to project wallet
							account to continue.
							<br />
							<br />
							The project wallet for this project is{" "}
							<span style={{ fontWeight: "bold", color: "#e60000" }}>
								{projectWalletAddress?.slice(0, 5)}...{projectWalletAddress?.slice(-5)}
							</span>
						</div>
					)}
				</div>
			</Dialog>
		);
	}
}
