import { CircularProgress } from "@material-ui/core";
import { notification, Tooltip } from "antd";
import React, { Component } from "react";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { FiChevronDown } from "react-icons/fi";
import { IoArrowBackSharp } from "react-icons/io5";
import { withRouter } from "react-router";
import CurrencySelectModal from "../components/exchange/CurrencySelectModal";
import LPCard from "../components/exchange/LPCard";
import Navbar from "../components/Navbar";
import { fetchPoolData, getLPAddress, getLPInfo, storePoolData } from "../utils/helpers";
import { TOKENS } from "../utils/appTokens";

class ImportLiquidity extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tokenA: TOKENS[0].symbol,
			tokenAAddress: TOKENS[0].contractAddress,
			tokenAIcon: TOKENS[0].icon,
			tokenAModalVisible: false,
			tokenB: "",
			tokenBAddress: "",
			tokenBIcon: "",
			tokenBModalVisible: false,
			loading: false,
			lpAddress: "",
			poolFound: false,
		};
	}

	componentDidUpdate(prevProps) {
		if (prevProps.walletConnected !== this.props.walletConnected && this.props.walletAddress) {
			this.findPool();
		}
	}

	toggleModalA = () => {
		this.setState((state) => {
			return {
				tokenAModalVisible: !state.tokenAModalVisible,
			};
		});
	};

	toggleModalB = () => {
		this.setState((state) => {
			return {
				tokenBModalVisible: !state.tokenBModalVisible,
			};
		});
	};

	updateTokenA = (token) => {
		this.setState(
			{
				tokenA: token.symbol,
				tokenAIcon: token.icon,
				tokenAAddress: token.contractAddress,
			},
			() => {
				this.findPool();
			}
		);
	};

	updateTokenB = (token) => {
		this.setState(
			{
				tokenB: token.symbol,
				tokenBIcon: token.icon,
				tokenBAddress: token.contractAddress,
			},
			() => {
				this.findPool();
			}
		);
	};

	findPool = () => {
		const { tokenA, tokenB, tokenAAddress, tokenBAddress } = this.state;
		if (tokenA && tokenB) {
			this.setState({ loading: true }, async () => {
				try {
					const lpAddress = await getLPAddress(tokenAAddress, tokenBAddress);
					if (lpAddress === "0x0000000000000000000000000000000000000000") {
						this.setState({ loading: false });
					} else {
						const liquidityInfo = await getLPInfo(
							lpAddress,
							this.props.walletAddress,
							tokenAAddress,
							tokenBAddress
						);
						this.setState({
							lpAddress: lpAddress,
							poolFound: parseFloat(liquidityInfo.data.total) > 0,
							loading: false,
						});
					}
				} catch (err) {
					this.setState({ loading: false }, () => {
						console.log(err.message);
					});
				}
			});
		}
	};

	importPool = () => {
		const { tokenA, tokenAIcon, tokenAAddress, tokenB, tokenBIcon, tokenBAddress, lpAddress } =
			this.state;
		const { history } = this.props;
		const createdPool = {
			tokenA: tokenA,
			tokenAIcon: tokenAIcon,
			tokenAAddress: tokenAAddress,
			tokenB: tokenB,
			tokenBIcon: tokenBIcon,
			tokenBAddress: tokenBAddress,
			lpAddress: lpAddress,
		};
		let pools = fetchPoolData();
		if (pools) {
			const poolExists =
				pools.data.filter(
					(pool) => pool.tokenA === createdPool.tokenA && pool.tokenB === createdPool.tokenB
				).length > 0;
			if (!poolExists) {
				pools.data.push(createdPool);
				storePoolData(pools);
				history.goBack();
			} else {
				notification["info"]({
					message: "This liquidity pool has been already added to the interface",
				});
			}
		} else {
			const newPool = {
				data: [createdPool],
			};
			storePoolData(newPool);
			history.goBack();
		}
	};

	render() {
		const {
			loading,
			poolFound,
			tokenAModalVisible,
			tokenBModalVisible,
			tokenA,
			tokenB,
			tokenAIcon,
			tokenBIcon,
			tokenAAddress,
			tokenBAddress,
			lpAddress,
		} = this.state;
		const {
			onModalToggle,
			walletConnected,
			walletAddress,
			history,
			modalVisible,
			theme,
			onThemeToggle,
			ethBalance,
			vrapBalance,
		} = this.props;
		return (
			<>
				<Navbar
					modalVisible={modalVisible}
					onModalToggle={onModalToggle}
					theme={theme}
					onThemeToggle={onThemeToggle}
					walletAddress={walletAddress}
					walletConnected={walletConnected}
					ethBalance={ethBalance}
					vrapBalance={vrapBalance}
				/>
				<div className="container">
					<div className="exchange-card">
						<div className="pool-form">
							<div
								className="flex-spaced-container"
								style={{
									marginBottom: "1.5rem",
									color: theme === "light" ? "#000" : "#FFF",
								}}
							>
								<IoArrowBackSharp
									size={16}
									style={{ cursor: "pointer" }}
									onClick={() => history.goBack()}
								/>
								<span>Import Pool</span>
								<Tooltip
									title="Use this tool to find pairs that don't automatically appear in the interface."
									placement="bottom"
								>
									<AiOutlineQuestionCircle size={16} />
								</Tooltip>
							</div>
							<button
								className="import-pool-select"
								style={{ marginBottom: "1rem" }}
								onClick={this.toggleModalA}
							>
								<div>
									<div
										style={{
											display: "flex",
											alignItems: "center",
										}}
									>
										<img className="import-pool-select-icon" src={tokenAIcon} alt="token-1" />
										<div style={{ fontWeight: 500 }}>{tokenA}</div>
									</div>
									<FiChevronDown size={15} />
								</div>
							</button>
							<button className="import-pool-select" onClick={this.toggleModalB}>
								<div>
									{tokenB ? (
										<div
											style={{
												display: "flex",
												alignItems: "center",
											}}
										>
											<img className="import-pool-select-icon" src={tokenBIcon} alt="token-1" />
											<div style={{ fontWeight: 500 }}>{tokenB}</div>
										</div>
									) : (
										<div
											style={{
												display: "flex",
												alignItems: "center",
											}}
										>
											<div style={{ fontWeight: 500 }}>Select a token</div>
										</div>
									)}
									<FiChevronDown size={15} />
								</div>
							</button>
							<div className="liquidity-section">
								{walletConnected && walletAddress ? (
									loading ? (
										<div
											style={{
												padding: "2rem 0",
												display: "flex",
												alignItems: "center",
												justifyContent: "center",
											}}
										>
											<CircularProgress
												size={16}
												thickness={5}
												style={{
													color: theme === "light" ? "#DE0102" : "#DEB501",
												}}
											/>
										</div>
									) : !poolFound ? (
										<span>You don’t have liquidity in this pool yet.</span>
									) : (
										<LPCard
											walletAddress={walletAddress}
											tokenA={tokenA}
											tokenB={tokenB}
											tokenAIcon={tokenAIcon}
											tokenBIcon={tokenBIcon}
											tokenAAddress={tokenAAddress}
											tokenBAddress={tokenBAddress}
											lpAddress={lpAddress}
											importLP
											onImport={this.importPool}
										/>
									)
								) : (
									<span>Connect to a wallet.</span>
								)}
							</div>
						</div>
					</div>
				</div>
				{tokenAModalVisible && (
					<CurrencySelectModal
						walletConnected={walletConnected}
						walletAddress={walletAddress}
						onModalClose={this.toggleModalA}
						onTokenSelect={this.updateTokenA}
						selectedToken={tokenB}
						// commonBases
					/>
				)}
				{tokenBModalVisible && (
					<CurrencySelectModal
						walletConnected={walletConnected}
						walletAddress={walletAddress}
						onModalClose={this.toggleModalB}
						onTokenSelect={this.updateTokenB}
						selectedToken={tokenA}
						// commonBases
					/>
				)}
			</>
		);
	}
}

export default withRouter(ImportLiquidity);
