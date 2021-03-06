import React, { Component } from "react";
import moment from "moment";
import { withRouter } from "react-router";
import Pool from "../components/exchange/Pool";
import {
	getLPAddress,
	getLPInfo,
	getTokenApproval,
	getTokenBalance,
	approveToken,
	addLiquidity,
	fetchPoolData,
	storePoolData,
	fetchImportedTokens,
	getBNBBalance,
	addLiquidityWithBNB,
} from "../utils/helpers";
import { TOKENS } from "../utils/appTokens";
import { CircularProgress, Container } from "@material-ui/core";
import { notification } from "antd";
import { PROVIDER } from "../utils/contracts";
import AppContext from "../state/AppContext";
import Sidebar from "../components/Sidebar";
import AppBar from "../components/AppBar";
import { ApproveModal, CreatePoolModal } from "../components/modals";
import LiquidityInfo from "../components/exchange/LiquidityInfo";
import ExternalLink from "../components/Transactions/ExternalLink";
class LiquidityBNB extends Component {
	static contextType = AppContext;

	constructor(props) {
		super(props);
		this.state = {
			pools: [],
			liquiditySectionVisible: true,
			tokenA: TOKENS[0].symbol,
			tokenAIcon: TOKENS[0].icon,
			tokenADecimals: TOKENS[0].decimals,
			tokenAAddress: TOKENS[0].contractAddress,
			tokenABalance: "",
			tokenAAmount: "",
			tokenAAllowance: "",
			tokenAApproved: false,
			approvingTokenA: false,
			tokenASupply: "",
			tokenB: "",
			tokenBIcon: "",
			tokenBDecimals: "",
			tokenBAddress: "",
			tokenBBalance: "",
			tokenBAmount: "",
			tokenBAllowance: "",
			tokenBApproved: false,
			approvingTokenB: false,
			tokenBSupply: "",
			lpAddress: "",
			liquidityInfo: null,
			supplying: false,
			loading: false,
			approvalModalVisible: false,
			approvalToken: "",
			approvalAmount: "",
			approving: false,
			createLiquidityModalVisible: false,
		};
	}

	componentDidMount() {
		const { walletAddress } = this.props;
		if (walletAddress) {
			const importedTokens = fetchImportedTokens();
			let allTokens = [...TOKENS];
			if (importedTokens) {
				allTokens = [...TOKENS, ...importedTokens.data];
			}
			const selectedToken = allTokens.filter((token) => token.symbol === this.state.tokenA);
			if (selectedToken[0].symbol === "BNB") {
				this.fetchBNBBalance("A");
			} else {
				this.fetchBalance(
					walletAddress,
					selectedToken[0].contractAddress,
					selectedToken[0].contractABI,
					selectedToken[0].decimals,
					"A"
				);
				this.fetchApproval(
					walletAddress,
					selectedToken[0].contractAddress,
					selectedToken[0].decimals,
					"A"
				);
			}
			let pools = fetchPoolData();
			if (pools) {
				pools = pools.data.filter((account) => account.address === walletAddress);
				if (pools.length > 0) {
					pools = pools[0].pools;
					const invalidPoolIndex = pools.findIndex((pool) => !pool.lpAddress);
					if (invalidPoolIndex === -1) {
						this.setState({ pools: pools });
					} else {
						let newPools = fetchPoolData();
						const accountIndex = newPools.data.findIndex(
							(account) => account.address === walletAddress
						);
						newPools.data[accountIndex].pools.splice(invalidPoolIndex, 1);
						storePoolData(newPools);
						const currentAccountPools = newPools.data.filter(
							(account) => account.address === walletAddress
						)[0];
						this.setState({ pools: currentAccountPools.pools });
					}
				} else {
					this.setState({ pools: [] });
				}
			}
		}
	}

	componentDidUpdate(prevProps) {
		const { walletAddress } = this.props;
		const { tokenA, tokenB } = this.state;
		if (walletAddress !== prevProps.walletAddress && walletAddress) {
			let pools = fetchPoolData();
			if (pools && walletAddress) {
				pools = pools.data.filter((account) => account.address === walletAddress);
				if (pools.length > 0) {
					pools = pools[0].pools;
					const invalidPoolIndex = pools.findIndex((pool) => !pool.lpAddress);
					if (invalidPoolIndex === -1) {
						this.setState({ pools: pools });
					} else {
						let newPools = fetchPoolData();
						const accountIndex = newPools.data.findIndex(
							(account) => account.address === walletAddress
						);
						newPools.data[accountIndex].pools.splice(invalidPoolIndex, 1);
						storePoolData(newPools);
						const currentAccountPools = newPools.data.filter(
							(account) => account.address === walletAddress
						)[0];
						this.setState({ pools: currentAccountPools.pools });
					}
				} else {
					this.setState({ pools: [] });
				}
			}
			const importedTokens = fetchImportedTokens();
			let allTokens = [...TOKENS];
			if (importedTokens) {
				allTokens = [...TOKENS, ...importedTokens.data];
			}
			const selectedToken = allTokens.filter((token) => token.symbol === tokenA);
			if (selectedToken[0].symbol === "BNB") {
				this.fetchBNBBalance("A");
			} else {
				this.fetchBalance(
					walletAddress,
					selectedToken[0].contractAddress,
					selectedToken[0].contractABI,
					selectedToken[0].decimals,
					"A"
				);
				this.fetchApproval(
					walletAddress,
					selectedToken[0].contractAddress,
					selectedToken[0].decimals,
					"A"
				);
			}
			if (tokenB) {
				const selectedToken = allTokens.filter((token) => token.symbol === tokenB);
				if (selectedToken[0].symbol === "BNB") {
					this.fetchBNBBalance("B");
				} else {
					this.fetchBalance(
						walletAddress,
						selectedToken[0].contractAddress,
						selectedToken[0].contractABI,
						selectedToken[0].decimals,
						"B"
					);
					this.fetchApproval(
						walletAddress,
						selectedToken[0].contractAddress,
						selectedToken[0].decimals,
						"B"
					);
				}
			}
			if (tokenA && tokenB) {
				this.fetchLiquidity();
			}
		} else if (walletAddress !== prevProps.walletAddress && !walletAddress) {
			this.setState({
				tokenAAmount: "",
				tokenABalance: "",
				tokenAAllowance: "",
				tokenBAmount: "",
				tokenBBalance: "",
				tokenBAllowance: "",
				liquidityInfo: null,
				lpAddress: "",
				tokenASupply: "",
				tokenBSupply: "",
			});
		}
	}

	updateDeadline = () => {
		// const { deadline } = this.context;
		// this.setState({
		// 	deadline: moment().add(deadline, 'm').format('X'),
		// })
	};

	toggleLiquiditySectionVisibility = () => {
		this.setState((state) => {
			return {
				liquiditySectionVisible: !state.liquiditySectionVisible,
			};
		});
	};

	fetchBalance = (walletAddress, contractAddress, contractABI, decimals, token) => {
		getTokenBalance(walletAddress, contractAddress, contractABI, decimals)
			.then((res) => {
				if (res.success) {
					this.setState({
						[token === "A" ? "tokenABalance" : "tokenBBalance"]: res.balance,
					});
				}
			})
			.catch((err) => {
				console.log("Unable to fetch balance", err.message);
			});
	};

	fetchBNBBalance = async (token) => {
		getBNBBalance(this.props.walletAddress)
			.then((res) => {
				if (res.success) {
					this.setState({
						[token === "A" ? "tokenABalance" : "tokenBBalance"]: res.balance,
					});
				}
			})
			.catch((err) => {
				console.log("Unable to fetch balance", err.message);
			});
	};

	fetchApproval = (walletAddress, contractAddress, decimals, token) => {
		getTokenApproval(walletAddress, contractAddress, decimals).then((allowance) => {
			if (parseFloat(allowance) > 0) {
				this.setState({
					[token === "A" ? "tokenAApproved" : "tokenBApproved"]: true,
					[token === "A" ? "tokenAAllowance" : "tokenBAllowance"]: allowance,
				});
			} else {
				this.setState({
					[token === "A" ? "tokenAAllowance" : "tokenBAllowance"]: allowance,
				});
			}
		});
	};

	fetchLiquidity = (createPool = false, hash) => {
		const {
			tokenA,
			tokenB,
			tokenAIcon,
			tokenBIcon,
			tokenAAddress,
			tokenBAddress,
			tokenADecimals,
			tokenBDecimals,
		} = this.state;
		if (tokenAAddress && tokenBAddress) {
			try {
				this.setState({ loading: true }, async () => {
					const lpAddress = await getLPAddress(tokenAAddress, tokenBAddress);
					if (lpAddress === "0x0000000000000000000000000000000000000000") {
						this.setState({
							loading: false,
							lpAddress: "",
							liquidityInfo: null,
						});
					} else {
						const liquidityInfo = await getLPInfo(
							lpAddress,
							this.props.walletAddress,
							tokenAAddress,
							tokenBAddress
						);
						this.setState(
							{
								lpAddress: lpAddress,
								liquidityInfo: liquidityInfo.data,
								tokenASupply: liquidityInfo.data.A,
								tokenBSupply: liquidityInfo.data.B,
								loading: false,
							},
							() => {
								if (liquidityInfo.hasLiquidity) {
									const tokenAPrice =
										parseFloat(this.state.tokenBSupply) / parseFloat(this.state.tokenASupply);
									const tokenBPrice =
										parseFloat(this.state.tokenASupply) / parseFloat(this.state.tokenBSupply);
									if (this.state.tokenAAmount) {
										const amount = parseFloat(this.state.tokenAAmount) * tokenAPrice;
										this.setState({ tokenBAmount: amount.toFixed(6) });
									} else if (this.state.tokenBAmount) {
										const amount = parseFloat(this.state.tokenBAmount) * tokenBPrice;
										this.setState({ tokenAAmount: amount.toFixed(6) });
									}
									if (createPool) {
										const createdPool = {
											tokenA: tokenA,
											tokenAIcon: tokenAIcon,
											tokenADecimals: tokenADecimals,
											tokenAAddress: tokenAAddress,
											tokenB: tokenB,
											tokenBIcon: tokenBIcon,
											tokenBDecimals: tokenBDecimals,
											tokenBAddress: tokenBAddress,
											lpAddress: lpAddress,
										};
										this.storeNewPool(createdPool, hash);
									}
								}
							}
						);
					}
				});
			} catch (err) {
				this.setState({ loading: false, lpAddress: "", liquidityInfo: null }, () => {
					console.log(err.message);
				});
			}
		}
	};

	storeNewPool = (newPool, hash) => {
		// console.log('NEW POOL', newPool)
		const { walletAddress } = this.props;
		let pools = fetchPoolData();
		if (pools) {
			const accountExists =
				pools.data.filter((account) => account.address === walletAddress).length > 0;
			if (accountExists) {
				const accountIndex = pools.data.findIndex((account) => account.address === walletAddress);
				const poolExists =
					pools.data[accountIndex].pools.filter(
						(pool) => pool.tokenA === newPool.tokenA && pool.tokenB === newPool.tokenB
					).length > 0;
				if (!poolExists) {
					pools.data[accountIndex].pools.push(newPool);
					storePoolData(pools);
					this.setState({ pools: pools.data[accountIndex].pools }, () =>
						this.handleCreatePoolSuccess(hash)
					);
				} else {
					this.handleCreatePoolSuccess(hash);
				}
			} else {
				pools.data.push({
					address: walletAddress,
					pools: [newPool],
				});
				storePoolData(pools);
				const accountIndex = pools.data.findIndex((account) => account.address === walletAddress);
				this.setState({ pools: pools.data[accountIndex].pools }, () =>
					this.handleCreatePoolSuccess(hash)
				);
			}
		} else {
			const newPools = {
				data: [
					{
						address: walletAddress,
						pools: [newPool],
					},
				],
			};
			storePoolData(newPools);
			this.setState({ pools: newPools.data[0].pools }, () => this.handleCreatePoolSuccess(hash));
		}
	};

	handleCreatePoolSuccess = (hash) => {
		const { walletAddress } = this.props;
		const { tokenAAddress, tokenBAddress } = this.state;
		notification.close("supplyProcessingNotification");
		notification.success({
			key: "supplySuccessNotification",
			message: "Liquidity added successfully. You can view the transaction here.",
			btn: <ExternalLink hash={hash}>View Transaction</ExternalLink>,
			duration: 0,
		});
		this.setState(
			{
				supplying: false,
				tokenAAmount: "",
				tokenBAmount: "",
			},
			() => {
				const importedTokens = fetchImportedTokens();
				let allTokens = [...TOKENS];
				if (importedTokens) {
					allTokens = [...TOKENS, ...importedTokens.data];
				}
				const A = allTokens.filter((token) => token.symbol === this.state.tokenA)[0];
				const B = allTokens.filter((token) => token.symbol === this.state.tokenB)[0];
				if (A.symbol === "BNB") {
					this.fetchBNBBalance("A");
				} else {
					this.fetchBalance(walletAddress, tokenAAddress, A.contractABI, A.decimals, "A");
				}
				if (B.symbol === "BNB") {
					this.fetchBNBBalance("B");
				} else {
					this.fetchBalance(walletAddress, tokenBAddress, B.contractABI, B.decimals, "B");
				}
			}
		);
	};

	updateTokenA = (token) => {
		const { walletAddress, walletConnected } = this.props;
		const { tokenB } = this.state;
		if (token.symbol !== tokenB) {
			this.setState(
				{
					tokenA: token.symbol,
					tokenAIcon: token.icon,
					tokenADecimals: token.decimals,
					tokenAAddress: token.contractAddress,
				},
				() => {
					if (walletConnected) {
						if (token.symbol === "BNB") {
							this.fetchBNBBalance("A");
						} else {
							this.fetchBalance(
								walletAddress,
								token.contractAddress,
								token.contractABI,
								token.decimals,
								"A"
							);
							this.fetchApproval(walletAddress, token.contractAddress, token.decimals, "A");
						}
						this.fetchLiquidity();
					}
				}
			);
		} else {
			this.swapTokens();
		}
	};

	updateTokenB = (token) => {
		const { walletAddress, walletConnected } = this.props;
		const { tokenA } = this.state;
		if (token.symbol !== tokenA) {
			this.setState(
				{
					tokenB: token.symbol,
					tokenBIcon: token.icon,
					tokenBDecimals: token.decimals,
					tokenBAddress: token.contractAddress,
				},
				() => {
					if (walletConnected) {
						if (token.symbol === "BNB") {
							this.fetchBNBBalance("B");
						} else {
							this.fetchBalance(
								walletAddress,
								token.contractAddress,
								token.contractABI,
								token.decimals,
								"B"
							);
							this.fetchApproval(walletAddress, token.contractAddress, token.decimals, "B");
						}
						this.fetchLiquidity();
					}
				}
			);
		} else {
			this.swapTokens();
		}
	};

	swapTokens = () => {
		const {
			tokenA,
			tokenAIcon,
			tokenABalance,
			tokenB,
			tokenBIcon,
			tokenBBalance,
			tokenAAmount,
			tokenBAmount,
			tokenAAddress,
			tokenBAddress,
			tokenADecimals,
			tokenBDecimals,
		} = this.state;
		const { walletConnected } = this.props;
		this.setState(
			{
				tokenB: tokenA,
				tokenBIcon: tokenAIcon,
				tokenBDecimals: tokenADecimals,
				tokenBBalance: tokenABalance,
				tokenBAddress: tokenAAddress,
				tokenA: tokenB,
				tokenAIcon: tokenBIcon,
				tokenADecimals: tokenBDecimals,
				tokenABalance: tokenBBalance,
				tokenAAddress: tokenBAddress,
				tokenAAmount: tokenBAmount,
				tokenBAmount: tokenAAmount,
			},
			() => {
				if (walletConnected) {
					this.fetchLiquidity();
				}
			}
		);
	};

	updateAmount = (value, type) => {
		const { liquidityInfo } = this.state;
		const { walletConnected } = this.props;
		this.setState(
			{
				[type === "A" ? "tokenAAmount" : "tokenBAmount"]: value,
			},
			() => {
				if (walletConnected) {
					if (liquidityInfo) {
						if (liquidityInfo.hasLiquidity) {
							this.estimate(type);
						}
					}
				}
			}
		);
	};

	estimate = (type) => {
		const { tokenASupply, tokenBSupply, tokenAAmount, tokenBAmount } = this.state;
		const tokenAPrice = parseFloat(tokenBSupply) / parseFloat(tokenASupply);
		const tokenBPrice = parseFloat(tokenASupply) / parseFloat(tokenBSupply);
		if (type === "A") {
			const amount = parseFloat(tokenAAmount) * tokenAPrice;
			if (tokenAAmount) {
				this.setState({ tokenBAmount: amount.toFixed(6) });
			} else {
				this.setState({ tokenBAmount: "" });
			}
		} else if (type === "B") {
			const amount = parseFloat(tokenBAmount) * tokenBPrice;
			if (tokenBAmount) {
				this.setState({ tokenAAmount: amount.toFixed(6) });
			} else {
				this.setState({ tokenAAmount: "" });
			}
		}
	};

	handleMax = (token) => {
		const { tokenABalance, tokenBBalance, liquidityInfo } = this.state;
		this.setState(
			{
				[token === "A" ? "tokenAAmount" : "tokenBAmount"]:
					token === "A" ? tokenABalance : tokenBBalance,
			},
			() => {
				if (liquidityInfo && liquidityInfo.hasLiquidity) {
					this.estimate(token);
				}
			}
		);
	};

	approve = (token) => {
		const {
			tokenA,
			tokenB,
			tokenAAddress,
			tokenBAddress,
			approvalAmount,
			tokenADecimals,
			tokenBDecimals,
		} = this.state;
		const { walletAddress } = this.props;
		this.setState(
			{
				[token === "A" ? "approvingTokenA" : "approvingTokenB"]: true,
				approving: true,
			},
			() => {
				approveToken(
					token === "A" ? tokenAAddress : tokenBAddress,
					this.props.signer,
					approvalAmount,
					token === "A" ? tokenADecimals : tokenBDecimals
				)
					.then((res) => {
						if (res.success) {
							if (res.data.hash) {
								const hashArrayString = localStorage.getItem("hashData");
								const tx = {
									hash: res.data.hash,
									amount: parseFloat(approvalAmount).toFixed(4),
									summary: `Approve ${parseFloat(approvalAmount).toFixed(4)} ${
										token === "A" ? tokenA : tokenB
									}`,
								};
								if (hashArrayString) {
									let hashArray = JSON.parse(hashArrayString);
									hashArray.data.push(tx);
									localStorage.setItem("hashData", JSON.stringify(hashArray));
								} else {
									const newHashArray = {
										data: [tx],
									};
									localStorage.setItem("hashData", JSON.stringify(newHashArray));
								}
								notification.info({
									key: "approvalProcessingNotification",
									message: `${
										token === "A" ? tokenA : tokenB
									} approval is being processed. You can view the transaction here.`,
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
								try {
									let intervalId = setInterval(async () => {
										try {
											let reciept = await PROVIDER.getTransaction(res.data.hash);
											if (reciept) {
												if (token === "A") {
													if (tokenA !== "BNB") {
														this.fetchApproval(walletAddress, tokenAAddress, tokenADecimals, "A");
													}
												} else {
													if (tokenB !== "BNB") {
														this.fetchApproval(walletAddress, tokenBAddress, tokenBDecimals, "B");
													}
												}
												notification.close("approvalProcessingNotification");
												notification.success({
													key: "approvalSuccessNotification",
													message: `${
														token === "A" ? tokenA : tokenB
													} approval successful. You can view the transaction here`,
													btn: <ExternalLink hash={res.data.hash}>View Transaction</ExternalLink>,
													duration: 0,
												});
												this.setState(
													{
														approving: false,
														[token === "A" ? "approvingTokenA" : "approvingTokenB"]: false,
														[token === "A" ? "tokenAApproved" : "tokenBApproved"]: true,
														approvalModalVisible: false,
														[token === "A" ? "tokenAAllowance" : "tokenBAllowance"]:
															parseFloat(approvalAmount),
													},
													() => {
														setTimeout(() => this.setState({ approvalAmount: "" }), 500);
													}
												);
												clearInterval(intervalId);
											}
										} catch (e) {
											console.log(e.message);
										}
									}, 5000);
								} catch (e) {
									this.setState({
										[token === "A" ? "approvingTokenA" : "approvingTokenB"]: false,
										approving: false,
									});
									console.log(e);
								}
							}
						}
					})
					.catch(() => {
						this.setState(
							{
								[token === "A" ? "approvingTokenA" : "approvingTokenB"]: false,
								approving: false,
							},
							() => {
								notification.error({
									message: `Couldn't Approve ${token === "A" ? tokenA : tokenB}`,
									description: "Your transaction could not be processed. Please try again later.",
								});
							}
						);
					});
			}
		);
	};

	supply = () => {
		const { liquidityInfo, tokenA, tokenB } = this.state;
		if (!liquidityInfo) {
			this.setState({ createLiquidityModalVisible: true });
			return;
		} else if (!liquidityInfo.hasLiquidity) {
			this.setState({ createLiquidityModalVisible: true });
			return;
		}
		if (tokenA === "BNB" || tokenB === "BNB") {
			this.supplyWithBNB();
		} else {
			this.supplyPool();
		}
	};

	supplyPool = () => {
		const {
			tokenA,
			tokenB,
			tokenAIcon,
			tokenBIcon,
			tokenAAddress,
			tokenBAddress,
			tokenAAmount,
			tokenBAmount,
			lpAddress,
			tokenADecimals,
			tokenBDecimals,
		} = this.state;
		const { walletAddress, signer } = this.props;
		const deadline = moment().add(1, "years").format("X");
		const data = {
			walletAddress: walletAddress,
			addressA: tokenAAddress,
			addressB: tokenBAddress,
			amountA: tokenAAmount,
			amountB: tokenBAmount,
			deadline: parseFloat(deadline),
			signer: signer,
			decimalsA: tokenADecimals,
			decimalsB: tokenBDecimals,
		};
		this.setState({ supplying: true, createLiquidityModalVisible: false }, () => {
			addLiquidity(data)
				.then((res) => {
					if (res.success) {
						if (res.data.hash) {
							notification.info({
								key: "supplyProcessingNotification",
								message: "Transaction is being processed. You can view the transaction here.",
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
							try {
								let intervalId = setInterval(async () => {
									try {
										let reciept = await PROVIDER.getTransaction(res.data.hash);
										if (reciept) {
											if (lpAddress) {
												const createdPool = {
													tokenA: tokenA,
													tokenAIcon: tokenAIcon,
													tokenADecimals: tokenADecimals,
													tokenAAddress: tokenAAddress,
													tokenB: tokenB,
													tokenBIcon: tokenBIcon,
													tokenBDecimals: tokenBDecimals,
													tokenBAddress: tokenBAddress,
													lpAddress: lpAddress,
												};
												this.storeNewPool(createdPool, res.data.hash);
												this.fetchLiquidity();
											} else {
												this.fetchLiquidity(true, res.data.hash);
											}
											clearInterval(intervalId);
										}
									} catch (e) {
										console.log(e.message);
									}
								}, 5000);
							} catch (e) {
								this.setState({ supplying: false });
								console.log(e.message);
							}
						}
					}
				})
				.catch((err) => {
					this.setState({ supplying: false }, () => {
						notification.error({
							message: "Couldn't add liquidity",
							description: "Your transaction could not be processed. Please try again later.",
						});
					});
				});
		});
	};

	supplyWithBNB = () => {
		const {
			tokenA,
			tokenB,
			tokenAIcon,
			tokenBIcon,
			tokenAAddress,
			tokenBAddress,
			tokenAAmount,
			tokenBAmount,
			lpAddress,
			tokenADecimals,
			tokenBDecimals,
			liquidityInfo,
		} = this.state;
		const { walletAddress, signer } = this.props;
		const deadline = moment().add(1, "years").format("X");
		const amount = tokenA === "BNB" ? tokenBAmount : tokenAAmount;
		const BNBAmount = tokenA === "BNB" ? tokenAAmount : tokenBAmount;
		let amountMin, BNBAmountMin;
		if (liquidityInfo) {
			if (liquidityInfo.hasLiquidity) {
				amountMin =
					parseFloat(amount) - parseFloat(amount) * (parseFloat(this.context.slippage) / 100);
				BNBAmountMin =
					parseFloat(BNBAmount) - parseFloat(BNBAmount) * (parseFloat(this.context.slippage) / 100);
			} else {
				amountMin = amount;
				BNBAmountMin = BNBAmount;
			}
		} else {
			amountMin = amount;
			BNBAmountMin = BNBAmount;
		}
		const data = {
			walletAddress: walletAddress,
			address: tokenA === "BNB" ? tokenBAddress : tokenAAddress,
			amount: amount,
			amountMin: amountMin.toString(),
			BNBAmount: BNBAmount,
			BNBAmountMin: BNBAmountMin.toString(),
			deadline: parseFloat(deadline),
			signer: signer,
			decimals: tokenA === "BNB" ? tokenBDecimals : tokenADecimals,
			decimalsBNB: tokenA === "BNB" ? tokenADecimals : tokenBDecimals,
		};
		this.setState({ supplying: true, createLiquidityModalVisible: false }, () => {
			addLiquidityWithBNB(data)
				.then((res) => {
					if (res.success) {
						if (res.data.hash) {
							notification.info({
								key: "supplyProcessingNotification",
								message: "Transaction is being processed. You can view the transaction here.",
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
							try {
								let intervalId = setInterval(async () => {
									try {
										let reciept = await PROVIDER.getTransaction(res.data.hash);
										if (reciept) {
											if (lpAddress) {
												const createdPool = {
													tokenA: tokenA,
													tokenAIcon: tokenAIcon,
													tokenADecimals: tokenADecimals,
													tokenAAddress: tokenAAddress,
													tokenB: tokenB,
													tokenBIcon: tokenBIcon,
													tokenBDecimals: tokenBDecimals,
													tokenBAddress: tokenBAddress,
													lpAddress: lpAddress,
												};
												this.storeNewPool(createdPool, res.data.hash);
												this.fetchLiquidity();
											} else {
												this.fetchLiquidity(true, res.data.hash);
											}
											clearInterval(intervalId);
										}
									} catch (e) {
										console.log(e.message);
									}
								}, 5000);
							} catch (e) {
								this.setState({ supplying: false });
								console.log(e.message);
							}
						}
					}
				})
				.catch((err) => {
					this.setState({ supplying: false }, () => {
						notification.error({
							message: "Couldn't add liquidity",
							description: "Your transaction could not be processed. Please try again later.",
						});
					});
				});
		});
	};

	addLiquidity = (data) => {
		const { tokenA, tokenB } = data;
		const { walletAddress } = this.props;
		this.setState(
			{
				tokenA: tokenA.symbol,
				tokenAIcon: tokenA.icon,
				tokenADecimals: tokenA.decimals,
				tokenAAddress: tokenA.address,
				tokenB: tokenB.symbol,
				tokenBIcon: tokenB.icon,
				tokenBDecimals: tokenB.decimals,
				tokenBAddress: tokenB.address,
				liquiditySectionVisible: false,
			},
			() => {
				const importedTokens = fetchImportedTokens();
				let allTokens = [...TOKENS];
				if (importedTokens) {
					allTokens = [...TOKENS, ...importedTokens.data];
				}
				const tokenA = allTokens.filter((token) => token.symbol === this.state.tokenA)[0];
				const tokenB = allTokens.filter((token) => token.symbol === this.state.tokenB)[0];
				if (tokenA.symbol === "BNB") {
					this.fetchBNBBalance("A");
				} else {
					this.fetchBalance(
						walletAddress,
						tokenA.contractAddress,
						tokenA.contractABI,
						tokenA.decimals,
						"A"
					);
					this.fetchBalance(
						walletAddress,
						tokenB.contractAddress,
						tokenB.contractABI,
						tokenB.decimals,
						"B"
					);
				}
				if (tokenB.symbol === "BNB") {
					this.fetchBNBBalance("B");
				} else {
					this.fetchApproval(walletAddress, tokenA.contractAddress, tokenA.decimals, "A");
					this.fetchApproval(walletAddress, tokenB.contractAddress, tokenB.decimals, "B");
				}
				this.fetchLiquidity();
			}
		);
	};

	handleRefresh = (tokenSymbol, type) => {
		const importedTokens = fetchImportedTokens();
		let allTokens = [...TOKENS];
		if (importedTokens) {
			allTokens = [...TOKENS, ...importedTokens.data];
		}
		const selectedToken = allTokens.filter((token) => token.symbol === tokenSymbol)[0];
		if (selectedToken.symbol === "BNB") {
			this.fetchBNBBalance(type);
		} else {
			this.fetchBalance(
				this.props.walletAddress,
				selectedToken.contractAddress,
				selectedToken.contractABI,
				selectedToken.decimals,
				type
			);
		}
	};

	handleModalToggle = () => {
		this.setState((state) => {
			return {
				approvalModalVisible: !state.approvalModalVisible,
			};
		});
	};

	resetValues = () => {
		this.setState({
			approvalAmount: "",
			approving: false,
		});
	};

	handleCreateModalToggle = () => {
		this.setState((state) => {
			return {
				createLiquidityModalVisible: !state.createLiquidityModalVisible,
			};
		});
	};

	render() {
		const {
			liquiditySectionVisible,
			tokenA,
			tokenABalance,
			tokenB,
			tokenBBalance,
			tokenAIcon,
			tokenBIcon,
			tokenAAmount,
			tokenBAmount,
			pools,
			approvingTokenA,
			approvingTokenB,
			supplying,
			tokenAAllowance,
			tokenBAllowance,
			loading,
			approvalModalVisible,
			approvalToken,
			approvalAmount,
			approving,
			liquidityInfo,
			tokenASupply,
			tokenBSupply,
			createLiquidityModalVisible,
			tokenADecimals,
			tokenBDecimals,
		} = this.state;
		const {
			onModalToggle,
			walletConnected,
			walletAddress,
			signer,
			history,
			modalVisible,
			theme,
			onThemeToggle,
			ethBalance,
			vrapBalance,
		} = this.props;
		return (
			<>
				<Sidebar active="pool" theme={theme} onThemeToggle={onThemeToggle} />
				<div className="app-container">
					<AppBar
						active="pool"
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
						<div className="container">
							<div className="exchange-card">
								<div style={{ zIndex: 1, position: "relative" }}>
									<div className="tabs">
										<a
											href="/swap"
											onClick={(e) => {
												e.preventDefault();
												history.push("/swap");
											}}
										>
											Swap
										</a>
										<a href="/pool" onClick={(e) => e.preventDefault()} data-enabled={true}>
											Liquidity
										</a>
									</div>
									<Pool
										fetchingLiquidity={loading}
										theme={theme}
										liquiditySectionVisible={liquiditySectionVisible}
										pools={pools}
										onSectionToggle={this.toggleLiquiditySectionVisibility}
										walletConnected={walletConnected}
										walletAddress={walletAddress}
										signer={signer}
										tokenA={tokenA}
										tokenAIcon={tokenAIcon}
										tokenADecimals={tokenADecimals}
										tokenABalance={tokenABalance}
										tokenB={tokenB}
										tokenBIcon={tokenBIcon}
										tokenBDecimals={tokenBDecimals}
										tokenBBalance={tokenBBalance}
										onTokenAUpdate={this.updateTokenA}
										onTokenBUpdate={this.updateTokenB}
										tokenAAmount={tokenAAmount}
										tokenBAmount={tokenBAmount}
										onAmountChange={this.updateAmount}
										onMax={this.handleMax}
										onAddLiquidity={this.addLiquidity}
										onRefresh={this.handleRefresh}
									/>
									{walletConnected &&
										!liquiditySectionVisible &&
										tokenA &&
										tokenB &&
										!loading &&
										liquidityInfo &&
										liquidityInfo.hasLiquidity && (
											<LiquidityInfo
												tokenA={tokenA}
												tokenASupply={tokenASupply}
												tokenB={tokenB}
												tokenBSupply={tokenBSupply}
												liquidityInfo={liquidityInfo}
												theme={theme}
											/>
										)}
									<span style={{ display: "none" }}>{this.state.lpAddress}</span>
									{liquiditySectionVisible ? (
										<div className="exchange-button-container">
											<p>
												Don't see a pool you joined?{" "}
												<a
													href="/find"
													onClick={(e) => {
														e.preventDefault();
														history.push("/find");
													}}
												>
													Import it.
												</a>
											</p>
										</div>
									) : !walletConnected ? (
										<div className="exchange-button-container">
											<button onClick={onModalToggle}>Connect wallet</button>
										</div>
									) : !tokenA || !tokenB ? (
										<div className="exchange-button-container">
											<button disabled>Invalid pair</button>
										</div>
									) : loading || (!tokenAAllowance && !tokenBAllowance) ? (
										<div className="exchange-button-container">
											<button disabled>
												<CircularProgress size={12} thickness={5} style={{ color: "#FFF" }} />
											</button>
										</div>
									) : !tokenAAmount || !tokenBAmount ? (
										<div className="exchange-button-container">
											<button disabled>Enter an amount</button>
										</div>
									) : parseFloat(tokenAAmount) === 0 || parseFloat(tokenBAmount) === 0 ? (
										<div className="exchange-button-container">
											<button disabled>Enter an amount</button>
										</div>
									) : parseFloat(tokenAAmount) <= parseFloat(tokenABalance) &&
									  parseFloat(tokenBAmount) <= parseFloat(tokenBBalance) ? (
										tokenA !== "BNB" && tokenB !== "BNB" ? (
											parseFloat(tokenAAmount) <= parseFloat(tokenAAllowance) &&
											parseFloat(tokenBAmount) <= parseFloat(tokenBAllowance) ? (
												<div className="exchange-button-container">
													<button onClick={this.supply} disabled={loading || supplying}>
														Supply{" "}
														{supplying && (
															<CircularProgress
																size={12}
																thickness={5}
																style={{
																	color: "#FFF",
																	position: "relative",
																	top: "1px",
																}}
															/>
														)}
													</button>
												</div>
											) : parseFloat(tokenAAmount) > parseFloat(tokenAAllowance) ? (
												<div className="exchange-button-container">
													<button
														disabled={approvingTokenA || approvingTokenB}
														style={{ marginBottom: "0.25rem" }}
														onClick={() => {
															this.setState(
																{
																	approvalToken: "A",
																	approvalAmount: tokenAAmount,
																},
																() => this.handleModalToggle()
															);
														}}
													>
														Approve {tokenA}{" "}
														{approvingTokenA && (
															<CircularProgress
																size={12}
																thickness={5}
																style={{
																	color: "#FFF",
																	position: "relative",
																	top: "1px",
																}}
															/>
														)}
													</button>
													<button disabled>Supply</button>
												</div>
											) : parseFloat(tokenBAmount) > parseFloat(tokenBAllowance) ? (
												<div className="exchange-button-container">
													<button
														disabled={approvingTokenB || approvingTokenA}
														style={{ marginBottom: "0.25rem" }}
														onClick={() => {
															this.setState(
																{
																	approvalToken: "B",
																	approvalAmount: tokenBAmount,
																},
																() => this.handleModalToggle()
															);
														}}
													>
														Approve {tokenB}{" "}
														{approvingTokenB && (
															<CircularProgress
																size={12}
																thickness={5}
																style={{
																	color: "#FFF",
																	position: "relative",
																	top: "1px",
																}}
															/>
														)}
													</button>
													<button disabled>Supply</button>
												</div>
											) : (
												<div className="exchange-button-container">
													<button onClick={this.supply} disabled={loading || supplying}>
														Supply{" "}
														{supplying && (
															<CircularProgress
																size={12}
																thickness={5}
																style={{
																	color: "#FFF",
																	position: "relative",
																	top: "1px",
																}}
															/>
														)}
													</button>
												</div>
											)
										) : (tokenA === "BNB" &&
												parseFloat(tokenBAmount) <= parseFloat(tokenBAllowance)) ||
										  (tokenB === "BNB" &&
												parseFloat(tokenAAmount) <= parseFloat(tokenAAllowance)) ? (
											<div className="exchange-button-container">
												<button onClick={this.supply} disabled={loading || supplying}>
													Supply{" "}
													{supplying && (
														<CircularProgress
															size={12}
															thickness={5}
															style={{
																color: "#FFF",
																position: "relative",
																top: "1px",
															}}
														/>
													)}
												</button>
											</div>
										) : tokenA === "BNB" ? (
											<div className="exchange-button-container">
												<button
													disabled={approvingTokenB || approvingTokenA}
													style={{ marginBottom: "0.25rem" }}
													onClick={() => {
														this.setState(
															{
																approvalToken: "B",
																approvalAmount: tokenBAmount,
															},
															() => this.handleModalToggle()
														);
													}}
												>
													Approve {tokenB}{" "}
													{approvingTokenB && (
														<CircularProgress
															size={12}
															thickness={5}
															style={{
																color: "#FFF",
																position: "relative",
																top: "1px",
															}}
														/>
													)}
												</button>
												<button disabled>Supply</button>
											</div>
										) : (
											<div className="exchange-button-container">
												<button
													disabled={approvingTokenA || approvingTokenB}
													style={{ marginBottom: "0.25rem" }}
													onClick={() => {
														this.setState(
															{
																approvalToken: "A",
																approvalAmount: tokenAAmount,
															},
															() => this.handleModalToggle()
														);
													}}
												>
													Approve {tokenA}{" "}
													{approvingTokenA && (
														<CircularProgress
															size={12}
															thickness={5}
															style={{
																color: "#FFF",
																position: "relative",
																top: "1px",
															}}
														/>
													)}
												</button>
												<button disabled>Supply</button>
											</div>
										)
									) : (
										<div className="exchange-button-container">
											<button disabled>
												{parseFloat(tokenAAmount) > parseFloat(tokenABalance)
													? `Insufficient ${tokenA} balance`
													: `Insufficient ${tokenB} balance`}
											</button>
										</div>
									)}
								</div>
							</div>
						</div>
					</Container>
				</div>
				<ApproveModal
					open={approvalModalVisible}
					onClose={() => {
						this.handleModalToggle();
						this.resetValues();
					}}
					theme={theme}
					token={approvalToken === "A" ? tokenA : tokenB}
					tokenIcon={approvalToken === "A" ? tokenAIcon : tokenBIcon}
					tokenBalance={approvalToken === "A" ? tokenABalance : tokenBBalance}
					approvalAmount={approvalAmount}
					onAmountChange={(e) => {
						if (!approving) {
							if (e.target.value.match(/^(\d+)?([.]?\d{0,9})?$/)) {
								this.setState({ approvalAmount: e.target.value });
							}
						}
					}}
					onMax={() =>
						this.setState({
							approvalAmount: approvalToken === "A" ? tokenABalance : tokenBBalance,
						})
					}
					onApprove={() => this.approve(approvalToken)}
					approving={approving}
				/>
				<CreatePoolModal
					open={createLiquidityModalVisible}
					onClose={this.handleCreateModalToggle}
					theme={theme}
					tokenA={tokenA}
					tokenAIcon={tokenAIcon}
					tokenAAmount={tokenAAmount}
					tokenB={tokenB}
					tokenBIcon={tokenBIcon}
					tokenBAmount={tokenBAmount}
					onCreate={() => {
						if (tokenA === "BNB" || tokenB === "BNB") {
							this.supplyWithBNB();
						} else {
							this.supplyPool();
						}
					}}
				/>
			</>
		);
	}
}

export default withRouter(LiquidityBNB);
