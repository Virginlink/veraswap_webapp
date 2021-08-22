import React, { Component } from "react";
import { CircularProgress, Dialog, Fade } from "@material-ui/core";
import { RiCloseFill } from "react-icons/ri";

import Empty from "../../assets/icons/Empty.png";
import { notification } from "antd";
import { withdrawTokens } from "../../utils/idoHelpers";
import ExternalLink from "../Transactions/ExternalLink";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Fade timeout={{ enter: 1000, exit: 2000 }} ref={ref} {...props} />;
});

export default class WithdrawTokensModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			amount: "",
			withdrawing: false,
		};
	}

	onAmountChange = (e) =>
		e.target.value.match(/^(\d+)?([.]?\d{0,18})?$/) && this.setState({ amount: e.target.value });

	handleMax = () => {
		this.setState({ amount: parseFloat(this.props.deposited) });
	};

	handleWithdraw = () => {
		const {
			projectId,
			signer,
			onWithdraw,
			onClose,
			token: { decimals, symbol },
		} = this.props;
		const { amount } = this.state;
		this.setState({ withdrawing: true }, () => {
			withdrawTokens({ projectId, amount, decimals, signer })
				.then(async (res) => {
					notification.info({
						key: "withdrawProcessingNotification",
						message: `${symbol} withdrawal is being processed. You can view the transaction here.`,
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
					notification.close("withdrawProcessingNotification");
					notification.success({
						key: "withdrawSuccessNotification",
						message: `${symbol} withdrawal successful. You can view the transaction here`,
						btn: <ExternalLink hash={res.data.hash}>View Transaction</ExternalLink>,
						duration: 3,
					});
					this.setState({ amount: "" }, () => {
						onWithdraw();
						onClose();
					});
				})
				.catch((err) => {
					notification["error"]({
						message: `Couldn't withdraw ${symbol}`,
						description: err.message,
					});
				})
				.finally(() => this.setState({ withdrawing: false }));
		});
	};

	handleClose = () => {
		const { onClose } = this.props;
		this.setState({ withdrawing: false });
		onClose();
	};

	render() {
		const {
			theme,
			visible,
			projectWalletAddress,
			walletAddress,
			token: { symbol },
			deposited,
		} = this.props;
		const { amount, withdrawing } = this.state;

		const isAdmin = projectWalletAddress?.toLowerCase() === walletAddress?.toLowerCase();

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
					<h3>{isAdmin ? `Withdraw ${symbol}` : "Connect project wallet"}</h3>
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
											total deposit:{" "}
											<span style={{ fontFamily: "normal" }}>
												{parseFloat(deposited).toFixed(4)}
											</span>{" "}
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
											disabled={parseFloat(deposited) === 0}
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
							<p style={{ color: theme === "light" ? "#000" : "#FFF", marginTop: "1.5rem" }}>
								Note: On each purchase, VRAP will be automatically settled to the settlement wallet.
							</p>
							<div className="staking-modal-footer">
								<button
									disabled={
										!amount ||
										parseFloat(amount) === 0 ||
										parseFloat(amount) > parseFloat(deposited) ||
										withdrawing
									}
									className="staking-modal-button-primary"
									onClick={this.handleWithdraw}
								>
									{withdrawing ? (
										<>
											Withdrawing{" "}
											<CircularProgress
												size={16}
												thickness={5}
												style={{ color: "#FFF", position: "relative", top: "3px" }}
											/>
										</>
									) : !amount || parseFloat(amount) === 0 ? (
										"Enter an amount"
									) : parseFloat(amount) > parseFloat(deposited) ? (
										"Insufficient funds"
									) : (
										"Withdraw"
									)}
								</button>
							</div>
						</>
					) : (
						<div className="admin-connect-notice">
							Withdrawals can be made only from the specified project wallet. Connect to project
							wallet account to continue.
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
