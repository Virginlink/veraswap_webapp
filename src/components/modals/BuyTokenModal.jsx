import React, { Component } from "react";
import { ethers } from "ethers";
import { CircularProgress, Dialog, Fade } from "@material-ui/core";
import { RiCloseFill } from "react-icons/ri";

import Empty from "../../assets/icons/Empty.png";
import { ERC20_ABI, KOVAN_PROVIDER, TEST_TOKEN_ADDRESS } from "../../utils/contracts";
import { IDO_ADDRESS } from "../../utils/idoContracts";
import { notification, Spin } from "antd";
import { purchaseTokens } from "../../utils/idoHelpers";
import ExternalLink from "../Transactions/ExternalLink";
import { GrPowerCycle } from "react-icons/gr";
import { getVRAPPrice } from "../../utils/helpers";
import { client } from "../../apollo/client";
import { GET_AVAILABLE_TOKEN_AMOUNT } from "../../apollo/queries";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Fade timeout={{ enter: 1000, exit: 2000 }} ref={ref} {...props} />;
});

export default class BuyTokenModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			fetchingBalance: true,
			fetchingAllowance: true,
			balance: "0",
			allowance: "0",
			amount: "",
			approving: false,
			purchasing: false,
			inverted: false,
			fetchingPrice: true,
			vrapPrice: "0",
			rate: "0",
			purchaseAmount: "0",
			fetchingAvailableTokens: true,
			availableTokens: 0,
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
			this.fetchAvailableTokens();
		}
		this.fetchTokenRate();
	}

	componentDidUpdate(prevProps) {
		if (
			(this.props.token.address !== prevProps.token.address && this.props.token.address) ||
			(this.props.visible !== prevProps.visible && this.props.visible) ||
			(this.props.walletAddress !== prevProps.walletAddress && this.props.walletAddress)
		) {
			this.fetchTokenBalance();
			this.fetchTokenAllowance();
			this.fetchTokenRate();
			this.fetchAvailableTokens();
		}
	}

	fetchTokenBalance = () => {
		const { walletAddress } = this.props;
		if (walletAddress) {
			const tokenContract = new ethers.Contract(TEST_TOKEN_ADDRESS, ERC20_ABI, KOVAN_PROVIDER);
			tokenContract
				.balanceOf(walletAddress)
				.then((res) => {
					const balance = ethers.utils.formatUnits(res, 18);
					// console.log("VRAP balance", balance);
					this.setState({ balance });
				})
				.catch((err) => console.log(err))
				.finally(() => this.setState({ fetchingBalance: false }));
		}
	};

	fetchTokenAllowance = () => {
		const { walletAddress } = this.props;
		if (walletAddress) {
			const tokenContract = new ethers.Contract(TEST_TOKEN_ADDRESS, ERC20_ABI, KOVAN_PROVIDER);
			tokenContract
				.allowance(walletAddress, IDO_ADDRESS)
				.then((res) => {
					const allowance = ethers.utils.formatUnits(res, 18);
					// console.log("VRAP allowance", allowance);
					this.setState({ allowance });
				})
				.catch((err) => console.log(err))
				.finally(() => this.setState({ fetchingAllowance: false }));
		}
	};

	fetchTokenRate = () => {
		getVRAPPrice()
			.then((res) => {
				// console.log("VRAP price", res.price);
				this.setState({ vrapPrice: res.price }, () => this.calculateTokenRate());
			})
			.catch((err) => console.log(err))
			.finally(() => this.setState({ fetchingPrice: false }));
	};

	fetchAvailableTokens = () => {
		const {
			projectId,
			token: { decimals },
			onProjectStatsUpdate,
		} = this.props;
		client
			.query({
				query: GET_AVAILABLE_TOKEN_AMOUNT,
				variables: {
					projectId,
				},
			})
			.then((res) => {
				let tokensDeposited = res.data.project.tokensDeposited;
				tokensDeposited = ethers.utils.formatUnits(tokensDeposited, decimals);
				let tokensWithdrawn = res.data.project.tokensWithdrawn;
				tokensWithdrawn = ethers.utils.formatUnits(tokensWithdrawn, decimals);
				let tokensSold = res.data.project.tokensSold;
				tokensSold = ethers.utils.formatUnits(tokensSold, decimals);
				if (parseFloat(tokensDeposited) > 0) {
					const availableTokens =
						parseFloat(tokensDeposited) - parseFloat(tokensWithdrawn) - parseFloat(tokensSold);
					this.setState({ availableTokens }, () =>
						onProjectStatsUpdate({ tokensDeposited, tokensSold, tokensWithdrawn })
					);
				}
			})
			.catch((err) => console.log(err))
			.finally(() => this.setState({ fetchingAvailableTokens: false }));
	};

	calculateTokenRate = () => {
		const { inverted, vrapPrice } = this.state;
		const {
			token: { address, cost },
			onProjectStatsUpdate,
		} = this.props;
		if (address) {
			if (!inverted) {
				const tokenRate = parseFloat(vrapPrice) / parseFloat(cost);
				this.setState({ rate: tokenRate }, () => onProjectStatsUpdate({ tokenRate }));
			} else {
				const tokenRate = parseFloat(cost) / parseFloat(vrapPrice);
				this.setState({ rate: tokenRate });
			}
		}
	};

	onAmountChange = (e) => {
		if (e.target.value) {
			if (e.target.value.match(/^(\d+)?([.]?\d{0,18})?$/)) {
				const {
					token: { cost },
				} = this.props;
				const { vrapPrice } = this.state;
				const purchaseAmount =
					(parseFloat(e.target.value) * parseFloat(vrapPrice)) / parseFloat(cost);
				this.setState({ amount: e.target.value, purchaseAmount });
			}
		} else {
			this.setState({ purchaseAmount: "0", amount: "" });
		}
	};

	onPurchaseAmountChange = (e) => {
		if (e.target.value) {
			if (e.target.value.match(/^(\d+)?([.]?\d{0,18})?$/)) {
				const {
					token: { cost },
				} = this.props;
				const { vrapPrice } = this.state;
				const amount = (parseFloat(e.target.value) * parseFloat(cost)) / parseFloat(vrapPrice);
				this.setState({ purchaseAmount: e.target.value, amount });
			}
		} else {
			this.setState({ purchaseAmount: "", amount: "0" });
		}
	};

	handleMax = () =>
		this.setState({ amount: parseFloat(this.state.balance) }, () => {
			const {
				token: { cost },
			} = this.props;
			const { vrapPrice } = this.state;
			const purchaseAmount =
				(parseFloat(this.state.amount) * parseFloat(vrapPrice)) / parseFloat(cost);
			this.setState({ purchaseAmount });
		});

	toggleInversion = () =>
		this.setState(
			(state) => ({ inverted: !state.inverted }),
			() => this.calculateTokenRate()
		);

	handleApproval = () => {
		const { amount } = this.state;
		const { signer } = this.props;
		const tokenContract = new ethers.Contract(TEST_TOKEN_ADDRESS, ERC20_ABI, signer);
		this.setState({ approving: true }, () => {
			tokenContract
				.approve(IDO_ADDRESS, ethers.utils.parseUnits(parseFloat(amount).toString(), 18))
				.then(async (tx) => {
					notification.info({
						key: "approvalProcessingNotification",
						message: "VRAP approval is being processed. You can view the transaction here.",
						btn: <ExternalLink hash={tx.hash}>View Transaction</ExternalLink>,
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
						message: "VRAP approval successful. You can view the transaction here",
						btn: <ExternalLink hash={tx.hash}>View Transaction</ExternalLink>,
						duration: 3,
					});
					this.setState({ allowance: amount }, () => this.fetchTokenAllowance());
				})
				.catch((err) => {
					console.log(err);
					notification["error"]({
						message: "Couldn't approve VRAP",
						description: "Something went wrong. Please try again later",
					});
				})
				.finally(() => {
					this.setState({ approving: false });
				});
		});
	};

	handlePurchase = () => {
		const {
			projectId,
			signer,
			token: { symbol, decimals },
			onClose,
			walletAddress,
			onPurchaseSuccess,
		} = this.props;
		const { purchaseAmount } = this.state;
		this.setState({ purchasing: true }, () => {
			purchaseTokens({
				projectId,
				amount: parseFloat(purchaseAmount).toString(),
				decimals,
				signer,
				walletAddress,
			})
				.then(async (res) => {
					notification.info({
						key: "purchaseProcessingNotification",
						message: `${symbol} purchase is being processed. You can view the transaction here.`,
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
					notification.close("purchaseProcessingNotification");
					notification.success({
						key: "purchaseSuccessNotification",
						message: `${symbol} purchase successful. You can view the transaction here`,
						btn: <ExternalLink hash={res.data.hash}>View Transaction</ExternalLink>,
						duration: 3,
					});
					this.setState({ amount: "" }, () => {
						this.fetchTokenBalance();
						this.fetchTokenAllowance();
						this.fetchAvailableTokens();
						this.fetchTokenRate();
						onPurchaseSuccess();
						onClose();
					});
				})
				.catch((err) => {
					notification["error"]({
						message: `Couldn't purchase ${symbol}`,
						description: err.message,
					});
				})
				.finally(() => this.setState({ purchasing: false }));
		});
	};

	handleClose = () => {
		const { onClose } = this.props;
		this.setState({ approving: false, purchasing: false });
		onClose();
	};

	render() {
		const {
			theme,
			visible,
			token: { symbol },
		} = this.props;
		const {
			amount,
			balance,
			approving,
			allowance,
			purchasing,
			inverted,
			rate,
			purchaseAmount,
			fetchingBalance,
			fetchingAllowance,
			fetchingPrice,
			fetchingAvailableTokens,
			availableTokens,
		} = this.state;

		const loading =
			fetchingBalance || fetchingAllowance || fetchingPrice || fetchingAvailableTokens;

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
					<h3>Buy {symbol}</h3>
					<button className="close-modal-button" onClick={this.handleClose}>
						<RiCloseFill />
					</button>
				</div>
				{loading ? (
					<div
						className="modal-content"
						style={{
							height: "362px",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<Spin size="large" className="projects-loader" />
					</div>
				) : (
					<Fade in={!loading} timeout={{ enter: 300 }}>
						<div className="modal-content">
							<div className="form-control">
								<div className="flex-spaced-container">
									<div>You spend</div>
									<div style={{ textAlign: "right" }}>
										<div>
											balance:{" "}
											<span style={{ fontFamily: "normal" }}>{parseFloat(balance).toFixed(6)}</span>{" "}
											<span style={{ textTransform: "none" }}>VRAP</span>
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
											<span style={{ color: "#FFF" }}>VRAP</span>
										</button>
									</div>
								</div>
							</div>
							<div className="form-control" style={{ margin: "1rem 0" }}>
								<div className="flex-spaced-container">
									<div>You get</div>
									<div style={{ textAlign: "right" }}>
										<div>
											available to purchase:{" "}
											<span style={{ fontFamily: "normal" }}>
												{parseFloat(availableTokens).toFixed(6)}
											</span>{" "}
											<span style={{ textTransform: "none" }}>{symbol}</span>
										</div>
									</div>
								</div>
								<div className="input-container without-max">
									<input
										style={{ width: "100%", paddingRight: "1rem" }}
										placeholder="0.0"
										value={purchaseAmount}
										onChange={this.onPurchaseAmountChange}
									/>
									<div>
										<button disabled className="asset-select-button" style={{ cursor: "default" }}>
											<img src={Empty} alt="token-logo" />
											<span style={{ color: "#FFF" }}>{symbol}</span>
										</button>
									</div>
								</div>
							</div>
							<div
								style={{
									display: "flex",
									justifyContent: "center",
									marginTop: "1rem",
									fontSize: "13px",
									fontFamily: "normal",
									padding: "0 0.8rem",
								}}
							>
								<div
									style={{
										display: "flex",
										alignItems: "center",
										color: theme === "light" ? "#333" : "#FFF",
									}}
								>
									{!inverted ? (
										<div>
											1 VRAP ~ {parseFloat(rate).toFixed(4)} {symbol}
										</div>
									) : (
										<div>
											1 {symbol} ~ {parseFloat(rate).toFixed(4)} VRAP
										</div>
									)}
									<button className="invert-button" onClick={this.toggleInversion}>
										<GrPowerCycle size={15} />
									</button>
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
										parseFloat(purchaseAmount) > parseFloat(availableTokens) ||
										parseFloat(amount) <= parseFloat(allowance)
									}
									onClick={this.handleApproval}
								>
									{!approving ? (
										amount ? (
											parseFloat(amount) > 0 ? (
												parseFloat(amount) <= parseFloat(balance) ? (
													parseFloat(purchaseAmount) <= parseFloat(availableTokens) ? (
														parseFloat(amount) <= parseFloat(allowance) ? (
															"Approved"
														) : (
															"Approve"
														)
													) : (
														"Purchase limit exceeded"
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
										parseFloat(purchaseAmount) > parseFloat(availableTokens) ||
										parseFloat(amount) > parseFloat(balance) ||
										approving ||
										purchasing
									}
									className="staking-modal-button-primary"
									onClick={this.handlePurchase}
								>
									{purchasing ? (
										<>
											Purchasing{" "}
											<CircularProgress
												size={16}
												thickness={5}
												style={{ color: "#FFF", position: "relative", top: "3px" }}
											/>
										</>
									) : (
										"Purchase"
									)}
								</button>
							</div>
						</div>
					</Fade>
				)}
			</Dialog>
		);
	}
}