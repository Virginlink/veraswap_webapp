import React, { Component, lazy } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./components/globalStyles";
import { lightTheme, darkTheme } from "./components/Themes";
import {
	PROVIDER,
	TOKEN_ABI,
	TOKEN_ADDRESS,
	TETHER_ABI,
	TETHER_ADDRESS,
	PRESALE_ABI,
	PRESALE_ADDRESS,
	STAKING_ADDRESS,
	STAKING_ABI,
	STAKING_ADDRESS_V1,
} from "./utils/contracts";
import { ethers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { TOKEN } from "./utils/tokens";
import { notification } from "antd";
import { ConnectWalletModal } from "./components/modals";
import Footer from "./components/Footer";
import ExternalLink from "./components/Transactions/ExternalLink";
import AppLoader from "./components/AppLoader";
import SuspenseWithChunkError from "./components/SuspenseWithChunkError";
import "./components/Navbar(deprecated).css";
import "./components/Sale/Sale.css";

const Landing = lazy(() => import("./pages/landing/Landing"));
const WhyVeraswap = lazy(() => import("./pages/why-veraswap/WhyVeraswap"));
const Swap = lazy(() => import("./pages/ExchangeBNB"));
const Stake = lazy(() => import("./pages/StakePage"));
const Liquidity = lazy(() => import("./pages/LiquidityPage"));
const StakeDeposit = lazy(() => import("./pages/StakeDeposit"));
const Pool = lazy(() => import("./pages/LiquidityBNB"));
const ImportLiquidity = lazy(() => import("./pages/ImportLiquidity"));
const RemoveLiquidity = lazy(() => import("./pages/RemoveLiquidityBNB"));
const CirculatingSupply = lazy(() => import("./pages/CirculatingSupply"));
const TotalSupply = lazy(() => import("./pages/TotalSupply"));

class App extends Component {
	constructor() {
		super();
		this.state = {
			theme: "dark",
			connectWalletModalVisible: false,
			showWalletConnection: false,
			selectedWallet: "metamask",
			connectionError: false,
			walletConnected: false,
			web3Provider: null,
			walletConnectionActive: false,
			activeWallet: "",
			walletAddress: "",
			ethBalance: "",
			vrapBalance: "",
			usdtBalance: "",
			signer: null,
			approved: false,
			approving: false,
			staking: false,
			stakeSuccess: false,
			ethBuying: false,
			sapproved: false,
			sapproving: false,
			claiming: false,
		};
		this.fetchBalance = this.fetchBalance.bind(this);
		this.buyWithEther = this.buyWithEther.bind(this);
		this.approveTether = this.approveTether.bind(this);
		this.buyWithTether = this.buyWithTether.bind(this);
		this.approveStaking = this.approveStaking.bind(this);
		this.stakeToken = this.stakeToken.bind(this);
		this.claim = this.claim.bind(this);
	}

	componentDidMount() {
		if (window.ethereum) {
			window.ethereum.addListener("accountsChanged", this.handleAccountsChange);
			window.ethereum.addListener("chainChanged", () => window.location.reload());
		}
		const theme = localStorage.getItem("theme");
		if (theme) {
			if (theme === "light") {
				this.setState({ theme: "light" });
			} else {
				this.setState({ theme: "dark" });
			}
		}
	}

	componentWillUnmount() {
		if (window.ethereum) {
			window.ethereum.removeListener("accountsChanged", this.handleAccountsChange);
			window.ethereum.removeListener("chainChanged", () => window.location.reload());
		}
	}

	toggleTheme = () => {
		if (this.state.theme === "light") {
			this.setState({ theme: "dark" }, () => localStorage.setItem("theme", "dark"));
		} else {
			this.setState({ theme: "light" }, () => localStorage.setItem("theme", "light"));
		}
	};

	toggleWalletConnectModal = () => {
		if (this.state.walletConnected) {
			this.setState({
				showWalletConnection: true,
				connectWalletModalVisible: !this.state.connectWalletModalVisible,
			});
		} else {
			this.setState({
				connectWalletModalVisible: !this.state.connectWalletModalVisible,
				showWalletConnection: false,
			});
		}
	};

	connectToWallet = (type) => {
		if (type === "metamask") {
			this.handleMetmask();
		} else if (type === "walletConnect") {
			this.handleWalletConnect();
		} else if (type === "trustwallet") {
			this.handleTrustWallet();
		}
		this.setState({
			selectedWallet: type,
			showWalletConnection: true,
			walletConnected: false,
		});
	};

	fetchBalance() {
		if (this.state.walletAddress) {
			this.fetchEthBalance(this.state.walletAddress);
			this.fetchVrapBalance(this.state.walletAddress);
			this.fetchTetherBalance(this.state.walletAddress);
		}
	}

	async approveStaking(value, tokenAddress) {
		if (value && tokenAddress) {
			this.setState({ sapproving: true });
			let info = TOKEN.filter((data) => data.contractAddress === tokenAddress);
			if (info.length > 0) {
				let contract = new ethers.Contract(
					info[0].contractAddress,
					info[0].contractABI,
					this.state.signer
				);
				try {
					let tx = await contract.approve(STAKING_ADDRESS, value);
					if (tx.hash) {
						notification.info({
							key: "approvalProcessingNotification",
							message: `${info[0].ticker} approval is being processed. You can view the transaction here`,
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
						let intervalId = setInterval(() => {
							PROVIDER.getTransactionReceipt(tx.hash).then((res) => {
								try {
									if (res && res.blockNumber) {
										notification.close("approvalProcessingNotification");
										notification.success({
											key: "approvalSuccessNotification",
											message: `${info[0].ticker} approval successful. You can view the transaction here`,
											btn: <ExternalLink hash={tx.hash}>View Transaction</ExternalLink>,
											duration: 0,
										});
										this.setState({ sapproved: true, sapproving: false });
										clearInterval(intervalId);
									}
								} catch (e) {
									console.log(e);
									if (e.toString() !== "TypeError: Cannot read property 'blockNumber' of null") {
										this.setState({ sapproving: false });
									}
								}
							});
						}, 1000);
					}
				} catch (e) {
					console.log(e);
					this.setState({ sapproving: false });
					return false;
				}
			} else {
				this.setState({ sapproving: false });
				return false;
			}
		} else {
			this.setState({ sapproving: false });
			return false;
		}
	}

	async stakeToken(value, tokenAddress) {
		if (value && tokenAddress) {
			this.setState({ staking: true });
			let info = TOKEN.filter((data) => data.contractAddress === tokenAddress);
			if (info.length > 0) {
				let contract = new ethers.Contract(STAKING_ADDRESS, STAKING_ABI, this.state.signer);
				try {
					let tx = await contract.stake(
						ethers.utils.parseUnits(String(value), info[0].decimalCorrection),
						info[0].contractAddress
					);
					notification.info({
						key: "stakingProcessingNotification",
						message: `${info[0].ticker} staking is being processed. You can view the transaction here`,
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
					return {
						success: true,
						message: `Transaction Successful. Refer Hash : ${tx.hash}`,
						hash: tx.hash,
					};
				} catch (e) {
					this.setState({ staking: false });
					console.log(e);
					return {
						success: false,
						message: e.message,
					};
				}
			}
		}
	}

	async approveTether(value) {
		if (value) {
			this.setState({ approving: true });
			let contract = new ethers.Contract(TETHER_ADDRESS, TETHER_ABI, this.state.signer);
			try {
				let tx = await contract.approve(PRESALE_ADDRESS, ethers.utils.parseEther(value));
				console.log(tx);
				if (tx.hash) {
					let intervalId = setInterval(() => {
						PROVIDER.getTransactionReceipt(tx.hash).then((res) => {
							try {
								if (res && res.blockNumber) {
									this.setState({ approved: true, approving: false });
									clearInterval(intervalId);
								}
							} catch (e) {
								console.log(e);
							}
						});
					}, 1000);
				} else {
					this.setState({ approving: false });
					return false;
				}
			} catch (e) {
				console.log(e);
				this.setState({ approving: false });
				return false;
			}
		}
	}

	async buyWithEther(value) {
		if (value) {
			this.setState({ ethBuying: true });
			try {
				let contract = new ethers.Contract(PRESALE_ADDRESS, PRESALE_ABI, this.state.signer);
				console.log(contract);
				let status = await contract.PurchaseWithEther({
					value: ethers.utils.parseEther(value),
				});
				if (status.hash) {
					this.setState({ ethBuying: false });
					return status.hash;
				} else {
					this.setState({ ethBuying: false });
					return false;
				}
			} catch (e) {
				console.log(e, "Error");
				this.setState({ ethBuying: false });
				return false;
			}
		}
	}

	async buyWithTether(value) {
		let contract = new ethers.Contract(PRESALE_ADDRESS, PRESALE_ABI, this.state.signer);
		let status = await contract.PurchaseWithTether(ethers.utils.parseEther(value));
		if (status.hash) {
			setTimeout(() => this.setState({ approved: false, approving: false }), 5000);
			return status.hash;
		} else {
			this.setState({ approved: false, approving: false });
			return false;
		}
	}

	handleAccountsChange = () => {
		if (this.state.selectedWallet === "metamask") {
			this.handleMetmask();
		}
	};

	async handleMetmask() {
		try {
			if (typeof window.ethereum !== undefined) {
				let provider = new ethers.providers.Web3Provider(window.ethereum);
				await window.ethereum.request({ method: "eth_requestAccounts" });
				const address = await provider.listAccounts();
				let network = await provider.getNetwork();
				// const chainId = process.env.NODE_ENV === 'development' ? 97 : 56
				const chainId = 56;
				if (network.chainId !== chainId) {
					notification["error"]({
						message: "Wrong Network Detected. Please connect to Binance Smart Chain",
					});
					this.setState({ connectWalletModalVisible: false });
				} else {
					let signer = await provider.getSigner();
					this.fetchEthBalance(address[0]);
					if (process.env.NODE_ENV === "production") {
						this.fetchVrapBalance(address[0]);
						this.fetchTetherBalance(address[0]);
					}
					this.setState({
						walletConnected: true,
						walletAddress: address[0],
						connectWalletModalVisible: false,
						activeWallet: "metamask",
						signer: signer,
					});
				}
			} else {
				notification["error"]({
					message: "Couldn't find any wallets",
					description: "Make sure metamask is supported and installed on your browser",
				});
			}
		} catch (err) {
			this.setState({ showWalletConnection: false }, () => {
				notification["error"]({
					message: "Couldn't connect wallet",
					description: err.message,
				});
			});
		}
	}

	async handleWalletConnect() {
		try {
			const web3Provider = new WalletConnectProvider({
				rpc: {
					56: "https://bsc-dataseed.binance.org/",
				},
				qrcode: true,
				chainId: 56,
			});
			await web3Provider.enable().catch((err) => {
				this.setState({ showWalletConnection: false }, () => {
					notification["error"]({
						message: "Couldn't connect wallet",
						description: err.message,
					});
				});
			});
			const provider = new ethers.providers.Web3Provider(web3Provider);
			const address = await provider.listAccounts();
			const signer = provider.getSigner();
			let network = await provider.getNetwork();
			if (network.chainId !== 56) {
				notification["error"]({
					message: "Wrong Network Detected. Please connect to Binance Smart Chain",
				});
				this.setState({ connectWalletModalVisible: false });
			} else {
				web3Provider.on("disconnect", this.handleWalletConnectDisconnect);
				web3Provider.on("chainChanged", () => window.location.reload());
				this.fetchEthBalance(address[0]);
				if (process.env.NODE_ENV === "production") {
					this.fetchVrapBalance(address[0]);
					this.fetchTetherBalance(address[0]);
				}
				this.setState({
					web3Provider: web3Provider,
					walletConnected: true,
					walletAddress: address[0],
					connectWalletModalVisible: false,
					activeWallet: "walletConnect",
					signer: signer,
				});
			}
		} catch (err) {
			console.log(err);
			this.setState({ showWalletConnection: false }, () => {
				notification["error"]({
					message: "Couldn't connect wallet",
					description: err.message,
				});
			});
		}
	}

	handleWalletConnectDisconnect = () => {
		localStorage.removeItem("walletconnect");
		this.setState({
			showWalletConnection: false,
			walletConnected: false,
			walletAddress: "",
			activeWallet: "",
			web3Provider: null,
		});
	};

	async handleTrustWallet() {
		try {
			if (typeof window.ethereum !== undefined) {
				let provider = new ethers.providers.Web3Provider(window.ethereum);
				await window.ethereum.request({ method: "eth_requestAccounts" });
				const address = await provider.listAccounts();
				let signer = await provider.getSigner();
				this.fetchEthBalance(address[0]);
				this.fetchVrapBalance(address[0]);
				this.fetchTetherBalance(address[0]);
				this.setState({
					walletConnected: true,
					walletAddress: address[0],
					connectWalletModalVisible: false,
					activeWallet: "metamask",
					signer: signer,
				});
			}
		} catch (err) {
			this.setState({ showWalletConnection: false }, () => {
				notification["error"]({
					message: "Couldn't connect wallet",
					description: err.message,
				});
			});
		}
	}

	async fetchEthBalance(address) {
		let balance = await PROVIDER.getBalance(address);
		balance = ethers.utils.formatEther(balance);
		this.setState({ ethBalance: balance });
	}

	async fetchVrapBalance(address) {
		let contract = new ethers.Contract(TOKEN_ADDRESS, TOKEN_ABI, PROVIDER);
		let balance = await contract.balanceOf(address);
		balance = ethers.utils.formatEther(balance);
		this.setState({ vrapBalance: balance });
	}

	async fetchTetherBalance(address) {
		let contract = new ethers.Contract(TETHER_ADDRESS, TETHER_ABI, PROVIDER);
		let balance = await contract.balanceOf(address);
		balance = ethers.utils.formatEther(balance);
		this.setState({ usdtBalance: balance });
	}

	cancelWalletConnection = () => {
		this.setState({ showWalletConnection: false }, () => {
			setTimeout(() => this.setState({ selectedWallet: "" }), 200);
		});
	};

	cancelWithTimeout = () => {
		setTimeout(() => {
			this.setState({
				showWalletConnection: false,
				selectedWallet: "",
			});
		}, 500);
	};

	backToAccountSection = () => {
		this.setState({
			showWalletConnection: true,
			activeWalletHeader: false,
		});
	};

	async claim(contractAddress, version) {
		let contract = new ethers.Contract(
			version === "1" ? STAKING_ADDRESS_V1 : STAKING_ADDRESS,
			STAKING_ABI,
			this.state.signer
		);
		try {
			let result = await contract.claim(contractAddress);
			return {
				error: false,
				message: `Claim Successful`,
				hash: result.hash,
			};
		} catch (e) {
			return {
				error: true,
				message: e.message,
			};
		}
	}

	resetStakeStatus = () => {
		this.setState({
			stakeSuccess: false,
			sapproving: false,
			sapproved: false,
			staking: false,
		});
	};

	resetBuyStatus = () => {
		this.setState({
			approving: false,
			ethBuying: false,
		});
	};

	closeBanner = () => {
		this.setState({ showBanner: false }, () => {
			localStorage.setItem("sb", "true");
		});
	};

	render() {
		const {
			connectWalletModalVisible,
			selectedWallet,
			showWalletConnection,
			connectionError,
			walletConnected,
			walletAddress,
			signer,
			walletConnectionActive,
			activeWallet,
			theme,
			ethBalance,
			vrapBalance,
			usdtBalance,
			address,
			approved,
			approving,
			claiming,
			sapproved,
			sapproving,
			staking,
			stakeSuccess,
			web3Provider,
		} = this.state;
		return (
			<>
				<ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
					<GlobalStyles />
					<SuspenseWithChunkError fallback={<AppLoader />}>
						<Switch>
							<Route
								exact
								path="/"
								render={(props) => (
									<Landing
										{...props}
										modalVisible={connectWalletModalVisible}
										onModalToggle={this.toggleWalletConnectModal}
										theme={theme}
										onThemeToggle={this.toggleTheme}
										walletConnected={walletConnected}
										walletAddress={walletAddress}
										ethBalance={ethBalance}
										vrapBalance={vrapBalance}
									/>
								)}
							/>
							<Route
								exact
								path="/why-veraswap"
								render={(props) => (
									<WhyVeraswap
										{...props}
										modalVisible={connectWalletModalVisible}
										onModalToggle={this.toggleWalletConnectModal}
										theme={theme}
										onThemeToggle={this.toggleTheme}
										walletConnected={walletConnected}
										walletAddress={walletAddress}
										ethBalance={ethBalance}
										vrapBalance={vrapBalance}
									/>
								)}
							/>
							<Route
								exact
								path="/totalsupply"
								render={(props) => (
									<TotalSupply
										{...props}
										modalVisible={connectWalletModalVisible}
										onModalToggle={this.toggleWalletConnectModal}
										theme={theme}
										onThemeToggle={this.toggleTheme}
										walletConnected={walletConnected}
										walletAddress={walletAddress}
										ethBalance={ethBalance}
										vrapBalance={vrapBalance}
									/>
								)}
							/>
							<Route
								exact
								path="/circulatingsupply"
								render={(props) => (
									<CirculatingSupply
										{...props}
										modalVisible={connectWalletModalVisible}
										onModalToggle={this.toggleWalletConnectModal}
										theme={theme}
										onThemeToggle={this.toggleTheme}
										walletConnected={walletConnected}
										walletAddress={walletAddress}
										ethBalance={ethBalance}
										vrapBalance={vrapBalance}
									/>
								)}
							/>
							{/* <Route
									path="/sale"
									render={(props) => (
										<SalePage
											{...props}
											modalVisible={connectWalletModalVisible}
											onModalToggle={this.toggleWalletConnectModal}
											theme={theme}
											onThemeToggle={this.toggleTheme}
											walletConnected={walletConnected}
											walletAddress={this.state.walletAddress}
											ethBalance={this.state.ethBalance}
											vrapBalance={this.state.vrapBalance}
											onModalOpenRequest={this.toggleWalletConnectModal}
											usdtBalance={this.state.usdtBalance}
											address={this.state.address}
											fetchBalance={this.fetchBalance}
											buyWithEther={this.buyWithEther}
											approved={this.state.approved}
											approving={this.state.approving}
											approveTether={this.approveTether}
											buyWithTether={this.buyWithTether}
											onResetBuyStatus={this.resetBuyStatus}
											ethBuying={this.state.ethBuying}
										/>
									)}
								/> */}
							<Route
								exact
								path="/stake"
								render={(props) => (
									<Stake
										{...props}
										modalVisible={connectWalletModalVisible}
										onModalToggle={this.toggleWalletConnectModal}
										theme={theme}
										onThemeToggle={this.toggleTheme}
										walletConnected={walletConnected}
										walletAddress={walletAddress}
										ethBalance={ethBalance}
										vrapBalance={vrapBalance}
										onModalOpenRequest={this.toggleWalletConnectModal}
										usdtBalance={usdtBalance}
										address={address}
										fetchBalance={this.fetchBalance}
										buyWithEther={this.buyWithEther}
										approved={approved}
										approving={approving}
										approveTether={this.approveTether}
										buyWithTether={this.buyWithTether}
									/>
								)}
							/>
							<Route
								exact
								path="/liquidity-mining"
								render={(props) => (
									<Liquidity
										{...props}
										modalVisible={connectWalletModalVisible}
										onModalToggle={this.toggleWalletConnectModal}
										theme={theme}
										onThemeToggle={this.toggleTheme}
										walletConnected={walletConnected}
										walletAddress={walletAddress}
										ethBalance={ethBalance}
										vrapBalance={vrapBalance}
										onModalOpenRequest={this.toggleWalletConnectModal}
										usdtBalance={usdtBalance}
										address={address}
										fetchBalance={this.fetchBalance}
										buyWithEther={this.buyWithEther}
										approved={approved}
										approving={approving}
										approveTether={this.approveTether}
										buyWithTether={this.buyWithTether}
									/>
								)}
							/>
							<Route
								exact
								path="/stake/:address/:version"
								render={(props) => (
									<StakeDeposit
										{...props}
										modalVisible={connectWalletModalVisible}
										onModalToggle={this.toggleWalletConnectModal}
										theme={theme}
										claiming={claiming}
										onThemeToggle={this.toggleTheme}
										walletConnected={walletConnected}
										walletAddress={walletAddress}
										ethBalance={ethBalance}
										vrapBalance={vrapBalance}
										onModalOpenRequest={this.toggleWalletConnectModal}
										usdtBalance={usdtBalance}
										address={address}
										fetchBalance={this.fetchBalance}
										buyWithEther={this.buyWithEther}
										approved={approved}
										approving={approving}
										approveTether={this.approveTether}
										buyWithTether={this.buyWithTether}
										sapproved={sapproved}
										sapproving={sapproving}
										staking={staking}
										approveStaking={this.approveStaking}
										stakeToken={this.stakeToken}
										claim={this.claim}
										stakeSuccess={stakeSuccess}
										onResetStakeStatus={this.resetStakeStatus}
									/>
								)}
							/>
							<Route
								exact
								path="/swap"
								render={(props) => (
									<Swap
										{...props}
										theme={theme}
										onThemeToggle={this.toggleTheme}
										walletConnected={walletConnected}
										walletAddress={walletAddress}
										onModalToggle={this.toggleWalletConnectModal}
										modalVisible={connectWalletModalVisible}
										signer={signer}
										ethBalance={ethBalance}
										vrapBalance={vrapBalance}
									/>
								)}
							/>
							<Route
								exact
								path="/pool"
								render={(props) => (
									<Pool
										{...props}
										theme={theme}
										onThemeToggle={this.toggleTheme}
										walletConnected={walletConnected}
										walletAddress={this.state.walletAddress}
										onModalToggle={this.toggleWalletConnectModal}
										modalVisible={connectWalletModalVisible}
										signer={signer}
										ethBalance={ethBalance}
										vrapBalance={vrapBalance}
									/>
								)}
							/>
							<Route
								exact
								path="/pool/remove"
								render={(props) => (
									<RemoveLiquidity
										{...props}
										theme={theme}
										onThemeToggle={this.toggleTheme}
										walletConnected={walletConnected}
										walletAddress={this.state.walletAddress}
										onModalToggle={this.toggleWalletConnectModal}
										modalVisible={connectWalletModalVisible}
										signer={signer}
										ethBalance={ethBalance}
										vrapBalance={vrapBalance}
									/>
								)}
							/>
							<Route
								exact
								path="/find"
								render={(props) => (
									<ImportLiquidity
										{...props}
										theme={theme}
										onThemeToggle={this.toggleTheme}
										walletConnected={walletConnected}
										walletAddress={walletAddress}
										onModalToggle={this.toggleWalletConnectModal}
										modalVisible={connectWalletModalVisible}
										signer={signer}
										ethBalance={ethBalance}
										vrapBalance={vrapBalance}
									/>
								)}
							/>
							<Redirect path="/" to="/swap" />
						</Switch>
						<Footer />
					</SuspenseWithChunkError>
					<ConnectWalletModal
						open={connectWalletModalVisible}
						onClose={() =>
							this.setState({ connectWalletModalVisible: false }, () => this.cancelWithTimeout())
						}
						onConnect={(type) => this.connectToWallet(type)}
						onCancelConnection={this.cancelWalletConnection}
						backToAccountSection={this.backToAccountSection}
						showWalletConnection={showWalletConnection}
						walletConnectionActive={walletConnectionActive}
						connectionError={connectionError}
						activeWallet={activeWallet}
						onWalletChange={() => {
							if (activeWallet === "walletConnect") {
								web3Provider.disconnect();
								localStorage.removeItem("walletconnect");
							}
							this.setState({
								showWalletConnection: false,
								walletConnected: false,
								walletAddress: "",
								activeWallet: "",
								web3Provider: null,
							});
						}}
						walletAddress={walletAddress}
						walletConnected={walletConnected}
						selectedWallet={selectedWallet}
					/>
					{/* <Dialog
						open={showBanner}
						onClose={this.closeBanner}
						disableScrollLock
						disableBackdropClick
					>
						<IoClose onClick={this.closeBanner} style={{cursor: 'pointer', position: 'absolute', right: '8px', top: '8px'}} size={32} color="#FFF" />
						<img src={Banner} alt="Veraswap Exchange Banner" style={{width: '100%', height: 'auto'}} />
					</Dialog> */}
				</ThemeProvider>
			</>
		);
	}
}

export default App;
