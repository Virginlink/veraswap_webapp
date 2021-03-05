import React, { Component } from 'react';
import { Dialog, Fade } from '@material-ui/core';
import Metamask from './assets/images/metamask.png';
import WalletConnect from './assets/images/walletConnect.svg';
import CoinbaseWallet from './assets/images/coinbaseWallet.svg';
import FortMatic from './assets/images/fortMatic.png';
import PorTis from './assets/images/portis.png';
import TrustWallet from './assets/images/trustWallet.svg';
import {ThemeProvider} from "styled-components";
import { GlobalStyles } from "./components/globalStyles";
import {PROVIDER,TOKEN_ABI,TOKEN_ADDRESS,TETHER_ABI,TETHER_ADDRESS,PRESALE_ABI,PRESALE_ADDRESS,STAKING_ADDRESS, STAKING_ABI} from './utils/contracts';
import { lightTheme, darkTheme } from "./components/Themes";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Fortmatic from 'fortmatic';
import Portis from '@portis/web3';
import Transactions from './components/Transactions/Transactions';
import { Redirect, Route, Switch } from 'react-router-dom';
import SalePage from './pages/SalePage';
import StakePage from './pages/StakePage';
import StakeDeposit from './pages/StakeDeposit';
import {TOKEN} from './utils/tokens';
import './App.css';
import './components/Navbar.css';
import './components/Sale/Sale.css';
import { useWallet } from 'use-wallet'
import { notification } from 'antd';
const {ethers} = require('ethers');

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Fade timeout={{enter: 1000, exit: 2000}} ref={ref} {...props} />;
});

class App extends Component {
	constructor() {
		super();
		this.state={
			theme: 'light',
			connectWalletModalVisible: false,
			showWalletConnection: false,
			selectedWallet: 'metamask',
			connectionError: false,
			walletConnected: false,
			walletConnectionActive: false,
			activeWallet: '',
			copied: false,
			walletAddress : '',
			ethBalance : '',
			vrapBalance : '',
			usdtBalance : '',
			signer : null,
			approved : false,
			approving : false,
			staking: false,
			ethBuying : false,
			sapproved : false,
			sapproving : false,
			claiming : false
		}
		this.fetchBalance = this.fetchBalance.bind(this);
		this.buyWithEther = this.buyWithEther.bind(this);
		this.approveTether = this.approveTether.bind(this);
		this.buyWithTether = this.buyWithTether.bind(this);
		this.approveStaking = this.approveStaking.bind(this);
		this.stakeToken = this.stakeToken.bind(this);
		this.claim = this.claim.bind(this);
	}

	componentDidMount() {
		const theme = localStorage.getItem('theme')
        if (theme) {
			if (theme === 'light') {
				this.setState({theme: 'light'})
			} else {
				this.setState({theme: 'dark'})
			}
        }
	}

	toggleTheme = () => {
		if (this.state.theme === 'light') {
			this.setState({theme: 'dark'}, () => localStorage.setItem('theme', 'dark'))
		} else {
			this.setState({theme: 'light'}, () => localStorage.setItem('theme', 'light'))
		}
	}

	toggleWalletConnectModal = () => {
		if (this.state.walletConnected) {
			this.setState({showWalletConnection: true, connectWalletModalVisible: !this.state.connectWalletModalVisible})
		} else {
			this.setState({connectWalletModalVisible: !this.state.connectWalletModalVisible, showWalletConnection: false})
		}
	}

	connectToWallet = (type) => {
		if(type === 'metamask'){
			this.handleMetmask()
		}
		else if(type === 'walletConnect'){
			this.handleWalletConnect()
		}
		else if(type === 'trustwallet'){
			this.handleTrustWallet()
		}
		else {
			this.handleFormaticWallet()
		}
		this.setState({selectedWallet: type, showWalletConnection: true,walletConnected : false})
	}

	fetchBalance(){
		if(this.state.walletAddress){
		this.fetchEthBalance(this.state.walletAddress)
		this.fetchVrapBalance(this.state.walletAddress)
		this.fetchTetherBalance(this.state.walletAddress)
		}
	}

	async approveStaking(value,tokenAddress){
		if(value && tokenAddress){
		this.setState({sapproving : true})
		let info = TOKEN.filter(data=>data.contractAddress === tokenAddress);
		if(info.length > 0){
			let contract = new ethers.Contract(info[0].contractAddress,info[0].contractABI,this.state.signer);
			console.log('CONTRACT', contract)
			try{
			let tx = await contract.approve(STAKING_ADDRESS,value)
			console.log(tx.hash)
			if(tx.hash){
				let intervalId = setInterval(()=>{
					PROVIDER.getTransactionReceipt(tx.hash)
					.then(res=>{
						try{
						if(typeof res!==null){
							if(res.blockNumber){
							this.setState({sapproved : true,sapproving : false});
							clearInterval(intervalId);
							}
						}
						}   
						catch(e){
							console.log(e)
							this.setState({sapproving : false})
						}
					})
				}, 1000)
			}
			}
			catch(e){
				console.log(e)
				this.setState({sapproving : false});
				return false;
			}
		}
		else{
			this.setState({sapproving : false})
			return false
		}}
		else{
			this.setState({sapproving : false})
			return false
		}
	}

	async stakeToken(value, depositAmount, tokenAddress){
		console.log('Staking...')
		if(value && tokenAddress){
			let info = TOKEN.filter(data=>data.contractAddress === tokenAddress);
			if(info.length > 0){
				let contract = new ethers.Contract(STAKING_ADDRESS,STAKING_ABI,this.state.signer);
				try{
				let tx = await contract.stake(value,info[0].contractAddress)
				if(tx.hash){
					// const hashArrayString = localStorage.getItem('hashData');
					// const newTx = {
					// 	hash: tx.hash,
					// 	amount: depositAmount,
					// 	summary: `Stake ${depositAmount} VRAP`
					// }
					// if (hashArrayString) {
					// 	let hashArray = JSON.parse(hashArrayString)
					// 	hashArray.data.push(newTx)
					// 	localStorage.setItem('hashData', JSON.stringify(hashArray))
					// } else {
					// 	const newHashArray = {
					// 		data: [newTx]
					// 	}
					// localStorage.setItem('hashData', JSON.stringify(newHashArray))
					// }
					// notification['info']({
					// 	key: 'txInitiation',
					// 	message: 'Your transaction is being processed. You can view the transaction status by either clicking the button below or monitoring the recent transactions section.',
					// 	duration: 0,
					// 	btn: (<a href={`https://kovan.etherscan.io/tx/${tx.hash}`} target="_blank" rel="noreferrer noopener">View on Etherscan</a>)
					// })
					this.setState({staking : true})
					let intervalId = setInterval(()=>{
						PROVIDER.getTransactionReceipt(tx.hash)
						.then(res=>{
							try{
							if(typeof res!==null){
								if(res.blockNumber){
									// const SuccessIcon = (
									// 	<div style={{color: 'rgb(39, 174, 96)'}}>
									// 		<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" style={{position: 'relative', top: '4px'}} viewBox="0 0 24 24" fill="none" stroke="currentColor" color="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
									// 	</div> 
									// )
									// notification.close('txInitiation')
									// notification['info']({
									// 	key: 'txSuccess',
									// 	message: `Stake ${depositAmount} VRAP`,
									// 	duration: 0,
									// 	icon: SuccessIcon,
									// 	btn: (<a href={`https://kovan.etherscan.io/tx/${tx.hash}`} target="_blank" rel="noreferrer noopener">View on Etherscan</a>)
									// })
									// clearInterval(intervalId);
									// this.setState({stakeSuccess: true});
								clearInterval(intervalId);
								this.setState({staking : false})
								return true;	
								}
							}
							}   
							catch(e){
								console.log(e)
								return false;
							}
						})
					},1000)
				}
				}
				catch(e){
					console.log(e)
					this.setState({staking : false, sapproving : false, sapproved : false})
					return false;
				}
			}
			else{
				return false;
			}}
			else{
				return false;
			}
	}

	async approveTether(value){
		if (value) {
			this.setState({approving : true})
			let contract = new ethers.Contract(TETHER_ADDRESS,TETHER_ABI,this.state.signer);
			try{
			let tx = await contract.approve(PRESALE_ADDRESS,ethers.utils.parseEther(value))
			console.log(tx);
			if(tx.hash){
				let intervalId = setInterval(()=>{
					PROVIDER.getTransactionReceipt(tx.hash)
					.then(res=>{
						try{
						if(typeof res!==null){
							if(res.blockNumber){
							this.setState({approved : true,approving : false});
							clearInterval(intervalId);
							}
						}
						}   
						catch(e){
							console.log(e)
						}
					})
				},1000)
			}
			else{
				this.setState({approving : false})
				return false;
			}
			}
			catch(e){
				console.log(e)
				this.setState({approving : false})
				return false;
			}
		}
	}

	async buyWithEther(value){
		console.log(value)
		if (value) {
			this.setState({ethBuying : true})
			try{
			let contract  = new ethers.Contract(PRESALE_ADDRESS,PRESALE_ABI,this.state.signer);
			console.log(contract);
			let status = await contract.PurchaseWithEther({value : ethers.utils.parseEther(value)})
			if(status.hash){
				this.setState({ethBuying : false})
				return status.hash
			}
			else { 
				this.setState({ethBuying : false})
				return false
			}
			}
			catch(e){
				console.log(e,"Error")
				this.setState({ethBuying : false})
				return false
			}
		}
	}

	async buyWithTether(value){
		let contract  = new ethers.Contract(PRESALE_ADDRESS,PRESALE_ABI,this.state.signer);
		let status = await contract.PurchaseWithTether(ethers.utils.parseEther(value))
		console.log(status)
		if(status.hash){
			setTimeout(
				() => this.setState({approved: false, approving: false}),
				5000
			)
			return status.hash
		}
		else { 
			this.setState({approved : false, approving : false})
			return false
		}
	}

	async handleMetmask(){
		try{
			if(typeof window.ethereum !== undefined){
				let provider = new ethers.providers.Web3Provider(window.ethereum);
				await window.ethereum.enable();
				const address = await provider.listAccounts();
				let network = await provider.getNetwork()
				if(network.chainId !== 56){
					notification['error']({
						message : 'Wrong Network Detected. Please connect to Binance Smart Chain'
					})
					this.setState({connectWalletModalVisible : false})
				}
				else{
				let signer = await provider.getSigner();
				this.fetchEthBalance(address[0])
				this.fetchVrapBalance(address[0])
				this.fetchTetherBalance(address[0])
				this.setState({walletConnected : true, walletAddress : address[0],connectWalletModalVisible : false, activeWallet : 'metamask',signer : signer})
			}}
			else{
				console.log("Error")
			}
		}
		catch(e){
			console.log(e)
		}
	}

	async handleWalletConnect(){
		try{
			const web3Provider = new WalletConnectProvider({
                rpc : {
					56 : 'https://bsc-dataseed.binance.org/',
				},
				qrcode : true,
				chainId : 56
            });      
			await web3Provider.enable()
			.catch(e=>{
				console.log(e)
			})
			const provider = new ethers.providers.Web3Provider(web3Provider);
			const address = await provider.listAccounts();
			const signer = provider.getSigner();
			let network = await provider.getNetwork()
				if(network.chainId !== 56){
					notification['error']({
						message : 'Wrong Network Detected. Please connect to Binance Smart Chain'
					})
					this.setState({connectWalletModalVisible : false})
			}
			else{
			this.fetchEthBalance(address[0])
			this.fetchVrapBalance(address[0])
			this.fetchTetherBalance(address[0])
			this.setState({walletConnected : true, walletAddress : address[0],connectWalletModalVisible : false, activeWallet : 'walletConnect',signer : signer})
		}}
		catch(e){
			console.log(e)
		}
	}

	async handleTrustWallet(){
		try{
			if(typeof window.ethereum !== undefined){
				let provider = new ethers.providers.Web3Provider(window.ethereum);
				await window.ethereum.enable();
				const address = await provider.listAccounts();
				let network = await provider.getNetwork()
				if(network.chainId !== 56){
					notification['error']({
						message : 'Wrong Network Detected. Please connect to Binance Smart Chain'
					})
					this.setState({connectWalletModalVisible : false})
				}
				else{
				let signer = await provider.getSigner();
				this.fetchEthBalance(address[0])
				this.fetchVrapBalance(address[0])
				this.fetchTetherBalance(address[0])
				this.setState({walletConnected : true, walletAddress : address[0],connectWalletModalVisible : false, activeWallet : 'metamask',signer : signer})
			}}
			else{
				console.log("Error")
			}
		}
		catch(e){
			console.log(e)
		}
	}

	async handleFormaticWallet(){
		try{
			const fm = new Fortmatic('pk_live_BF6CBA62373566D4')
			const provider = new ethers.providers.Web3Provider(fm.getProvider());
			const address = await provider.listAccounts();
			const signer = provider.getSigner();
			this.fetchEthBalance(address[0])
			this.fetchVrapBalance(address[0])
			this.fetchTetherBalance(address[0])
			this.setState({walletConnected : true, walletAddress : address[0],connectWalletModalVisible : false, activeWallet : 'formatic',signer : signer})
		}
		catch(e){
			console.log(e)
		}
	}

	async fetchEthBalance(address){
		let balance = await PROVIDER.getBalance(address);
			balance = ethers.utils.formatEther(balance);  
		this.setState({ethBalance : balance});
	}

	async fetchVrapBalance(address){
		let contract = new ethers.Contract(TOKEN_ADDRESS,TOKEN_ABI,PROVIDER);
		let balance	 = await contract.balanceOf(address)
			balance = ethers.utils.formatEther(balance);
		this.setState({vrapBalance : balance})
	}

	async fetchTetherBalance(address){
		let contract = new ethers.Contract(TETHER_ADDRESS,TETHER_ABI,PROVIDER);
		let balance	 = await contract.balanceOf(address)
			balance = ethers.utils.formatEther(balance);
		this.setState({usdtBalance : balance})
	}

	cancelWalletConnection = () => {
		this.setState({showWalletConnection: false,}, () => {
			setTimeout(
				() => this.setState({selectedWallet: ''}),
				200
			)
		})
	}

	cancelWithTimeout = () => {
		setTimeout(
			() => {
				this.setState({
					showWalletConnection: false,
					selectedWallet: ''
				})
			},
			500
		)
	}

	backToAccountSection = () => {
		this.setState({
			showWalletConnection: true,
			activeWalletHeader: false
		})
	}

	copyWalletAddress = () => {
		this.setState({copied: true}, () => {
			navigator.clipboard.writeText(this.state.walletAddress).then(() => {
				setTimeout(
					() => this.setState({copied: false}),
					1000
				)
			})
		})
	}

	claim(contractAddress){
		this.setState({claiming : true})
		let contract = new ethers.Contract(STAKING_ADDRESS,STAKING_ABI,this.state.signer);
		contract.claim(contractAddress)
		.then(res=>{
			if(res.hash){
				let intervalId = setInterval(()=>{
					PROVIDER.getTransactionReceipt(res.hash)
					.then(res=>{
						try{
						if(typeof res!==null){
							if(res.blockNumber){
								clearInterval(intervalId);
								this.setState({claiming : false})
								return true;
							}
						}
						}   
						catch(e){
							return false
						}
					})
				},1000)
			}
			else{
				this.setState({claiming : false})
				return false;
			}
		})
		.catch(err=>{
			console.log(err);
			this.setState({claiming : false})
			return false;
		})
	}

	resetStakeStatus = () => {
		this.setState({
			stakeSuccess: false,
			sapproving: false,
			sapproved: false,
			staking: false,
		})
	}

	resetBuyStatus = () => {
		this.setState({
			approving: false,
			ethBuying: false
		})
	}

	render() {
		const {connectWalletModalVisible, selectedWallet, showWalletConnection, connectionError, walletConnected, copied, walletConnectionActive, activeWallet, theme} = this.state
		return (
			<>
				<ThemeProvider theme={this.state.theme === 'light' ? lightTheme : darkTheme}>
				<GlobalStyles/>
				{/* <Navbar
					modalVisible={connectWalletModalVisible}
					onModalToggle={this.toggleWalletConnectModal}
					theme={theme}
					onThemeToggle={this.toggleTheme}
					walletConnected={walletConnected}
					walletAddress = {this.state.walletAddress}
					ethBalance = {this.state.ethBalance}
					vrapBalance = {this.state.vrapBalance}
				/> */}
				<Switch>
					<Route 
						path="/sale" 
						render={(props) => (
							<SalePage 
								{...props}
								modalVisible={connectWalletModalVisible}
								onModalToggle={this.toggleWalletConnectModal}
								theme={theme}
								onThemeToggle={this.toggleTheme}
								walletConnected={walletConnected}
								walletAddress = {this.state.walletAddress}
								ethBalance = {this.state.ethBalance}
								vrapBalance = {this.state.vrapBalance}
								onModalOpenRequest={this.toggleWalletConnectModal} 
								usdtBalance = {this.state.usdtBalance}
								address = {this.state.address}
								fetchBalance={this.fetchBalance}
								buyWithEther = {this.buyWithEther}
								approved = {this.state.approved}
								approving = {this.state.approving}
								approveTether={this.approveTether}
								buyWithTether = {this.buyWithTether}
								onResetBuyStatus={this.resetBuyStatus}
								ethBuying={this.state.ethBuying}
							/>
						)} 
					/>
					<Route 
						exact
						path="/stake" 
						render={(props) => (
							<StakePage
								{...props}
								modalVisible={connectWalletModalVisible}
								onModalToggle={this.toggleWalletConnectModal}
								theme={theme}
								onThemeToggle={this.toggleTheme}
								walletConnected={walletConnected}
								walletAddress = {this.state.walletAddress}
								ethBalance = {this.state.ethBalance}
								vrapBalance = {this.state.vrapBalance}
								onModalOpenRequest={this.toggleWalletConnectModal} 
								usdtBalance = {this.state.usdtBalance}
								address = {this.state.address}
								fetchBalance={this.fetchBalance}
								buyWithEther = {this.buyWithEther}
								approved = {this.state.approved}
								approving = {this.state.approving}
								approveTether={this.approveTether}
								buyWithTether = {this.buyWithTether}
							/>
						)} 
					/>
					<Route
						exact
						path="/stake/:address" 
						render={(props) => (
							<StakeDeposit
								{...props}
								modalVisible={connectWalletModalVisible}
								onModalToggle={this.toggleWalletConnectModal}
								theme={theme}
								claiming = {this.state.claiming}
								onThemeToggle={this.toggleTheme}
								walletConnected={walletConnected}
								walletAddress = {this.state.walletAddress}
								ethBalance = {this.state.ethBalance}
								vrapBalance = {this.state.vrapBalance}
								onModalOpenRequest={this.toggleWalletConnectModal} 
								usdtBalance = {this.state.usdtBalance}
								address = {this.state.address}
								fetchBalance={this.fetchBalance}
								buyWithEther = {this.buyWithEther}
								approved = {this.state.approved}
								approving = {this.state.approving}
								approveTether={this.approveTether}
								buyWithTether = {this.buyWithTether}
								sapproved = {this.state.sapproved}
								sapproving = {this.state.sapproving}
								staking={this.state.staking}
								approveStaking = {this.approveStaking}
								stakeToken = {this.stakeToken}
								claim={this.claim}
								stakeSuccess={this.state.stakeSuccess}
								onResetStakeStatus={this.resetStakeStatus}
							/>
						)} 
					/>
					<Redirect path="/" to="/sale" />
				</Switch>
				<Dialog
					open={connectWalletModalVisible}
					TransitionComponent={Transition}
					onClose={() => this.setState({connectWalletModalVisible: false}, () => this.cancelWithTimeout())}
					onBackdropClick={() => this.setState({connectWalletModalVisible: false}, () => this.cancelWithTimeout())}
					BackdropProps={{style: {backgroundColor: 'rgba(0, 0, 0, 0.3)'}}}
					PaperProps={{
						style: {
							width: '50vw',
							backgroundColor: '#FFF',
							boxShadow: 'rgba(47, 128, 237, 0.05) 0px 4px 8px 0px',
							maxWidth: '420px',
							maxHeight: '90vh',
							display: 'flex',
							borderRadius: '20px',
							margin: '0 0 2rem'
						}
					}}
				>
					<div className="modal-outer-container-wrapper">
						<div className="modal-outer-container">
							<div className="modal-close-button" onClick={() => this.setState({connectWalletModalVisible: false}, () => this.cancelWithTimeout())}>
								<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="sc-exAgwC RXYfX"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
							</div>
							{
								showWalletConnection ?

								walletConnected ?

								<div className="modal-header">
									<div>Account</div>
								</div>

								:

								<div className="modal-back-header">
									<div style={{cursor: 'pointer'}} onClick={this.cancelWalletConnection}>Back</div>
								</div>

								: walletConnected ?

								<div className="modal-back-header">
									<div style={{cursor: 'pointer'}} onClick={this.backToAccountSection}>Back</div>
								</div>

								:

								<div className="modal-header">
									<div>Connect to a wallet</div>
								</div>

							}
							<div style={{padding: !showWalletConnection ? '2rem' : 0}} className={`${showWalletConnection ? 'wallet-main-container' : 'modal-content'}`}>
								{
									showWalletConnection ?

									<div style={{display: walletConnectionActive && 'block', padding: !walletConnectionActive && '2rem'}} className={`${walletConnectionActive && 'wallet-connection-container'}`}>
										{
											!walletConnected ?

											<div className={`modal-content-button-disabled ${connectionError ? 'connection-error' : ''}`}>
												<div className="connection-status">
													{
														connectionError ?

														<div style={{display: 'flex', flexFlow: 'row nowrap', alignItems: 'center', justifyContent: 'flex-start'}}>
															<div className="connection-error-text">Error connecting.</div>
															<div className="retry-button">
																Try again
															</div>
														</div>

														:

														<>
															<svg className="connection-loader" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="sc-bYSBpT fhfZBu sc-gqPbQI dCfdPK"><path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 9.27455 20.9097 6.80375 19.1414 5" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
															Initializing...
														</>
													}
												</div>
											</div>

											:

											<div className="connected-wallet-container" style={{paddingTop: '1rem'}}>
												<div className="connected-wallet-title-container">
													<div className="connected-wallet-title">
														Connected with {
															activeWallet === 'metamask' ?

															'MetaMask'

															: activeWallet === 'walletConnect' ?

															'WalletConnect'

															: activeWallet === 'fortmatic' ?

															'Fortmatic'

															: 'Portis'
														}
													</div>
													<div>
														<button className="change-wallet-button" onClick={() => {localStorage.clear();this.setState({showWalletConnection: false, walletConnected : false, activeWallet : ''})}}>
															Change
														</button>
													</div>
												</div>
												<div className="wallet-address-container">
													<div className="wallet-address-inner-container">
														<div style={{borderRadius: '50px', overflow: 'hidden', padding: 0, margin: 0, width: '16px', height: '16px', display: 'inline-block'}}>
															<svg height="100" version="1.1" width="100" xmlns="http://www.w3.org/2000/svg"  xmlnsXlink="http://www.w3.org/1999/xlink" style={{overflow: 'hidden', position: 'relative'}}><desc style={{WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)'}}>Created with Raphaël 2.3.0</desc><defs style={{WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)'}}></defs><rect x="0" y="0" width="16" height="16" rx="0" ry="0" fill="#f91e01" stroke="none" style={{WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)'}}></rect><rect x="0" y="0" width="16" height="16" rx="0" ry="0" fill="#c81465" stroke="none" transform="matrix(0.6111,-0.7916,0.7916,0.6111,-5.5477,11.7858)" style={{WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)'}}></rect><rect x="0" y="0" width="16" height="16" rx="0" ry="0" fill="#237fe1" stroke="none" transform="matrix(-0.7983,-0.6023,0.6023,-0.7983,1.3671,25.6874)" style={{WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)'}}></rect><rect x="0" y="0" width="16" height="16" rx="0" ry="0" fill="#18b7f2" stroke="none" transform="matrix(0.9689,-0.2476,0.2476,0.9689,-13.2583,-0.0478)" style={{WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)'}}></rect></svg>
														</div>
														<p>{`${this.state.walletAddress}`.substring(0,6) + '...' + `${this.state.walletAddress}`.substring(37,42)}</p>
													</div>
												</div>
												<div className="wallet-address-container">
													<div className="wallet-address-inner-container">
														{
															!copied ?

															<button className="copy-address-button" onClick={this.copyWalletAddress}>
																<span className="copy-icon">
																	<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
																</span>
																<span style={{marginLeft: '4px', fontSize: '13px'}}>Copy Address</span>
															</button>

															:

															<button className="copy-address-button">
																<span className="copy-icon">
																	<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
																</span>
																<span style={{marginLeft: '4px', fontSize: '13px'}}>Copied</span>
															</button>
														}
														<a target="_blank" rel="noopener noreferrer" href={`https://bscscan.com/address/${this.state.walletAddress}`} className="wallet-address-link">
															<svg style={{marginRight: '3px', position: 'relative', top: '3px'}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
															<span style={{fontSize: '13px'}}>View on Explorer</span>
														</a>
													</div>
												</div>
											</div>
										}
										{
											!walletConnected ?

											<div className="wallet-description">
												<div className="wallet-description-content">
													<div className="wallet-title">
														{
															selectedWallet === 'metamask' ?

															'MetaMask'

															: selectedWallet === 'walletConnect' ?

															'WalletConnect'

															: selectedWallet === 'trustwallet' ?

															'Trust Wallet'

															: 'Portis'
														}
													</div>
													<div className="wallet-caption">
														{
															selectedWallet === 'metamask' ?

															'Easy-to-use browser extension.'

															: selectedWallet === 'walletConnect' ?

															'Connect to Trust Wallet, Rainbow Wallet and more...'

															: selectedWallet === 'trustwallet' ?

															'Login using Trust Wallet Dapp Browser'

															: 'Login using Portis hosted wallet'
														}
													</div>
												</div>
												<div className="wallet-description-content">
													{
														selectedWallet === 'metamask' ?

														<img src={Metamask} alt="icon" width="24px" height="24px" />

														: selectedWallet === 'walletConnect' ?

														<img src={WalletConnect} alt="icon" width="24px" height="24px" />

														: selectedWallet === 'coinbaseWallet' ?

														<img src={CoinbaseWallet} alt="icon" width="24px" height="24px" />

														: selectedWallet === 'fortmatic' ?

														<img src={FortMatic} alt="icon" width="24px" height="24px" />

														: <img src={TrustWallet} alt="icon" width="24px" height="24px" />
													}
												</div>
											</div>

											:

											<div className="connected-wallet-footer-container">
												<div className="connected-wallet-footer-text">
													{/* Your transactions will appear here... */}
													<Transactions />
												</div>
											</div>
										}
									</div>

									:

									<>
										<div className="modal-content-grid">
											{window.innerWidth > 900 ?
											<button className={`modal-content-button ${activeWallet === 'metamask' && 'active-wallet-button'}`} onClick={() => this.connectToWallet('metamask')}>
												<div className="modal-content-button-title" style={{display: 'flex', flexDirection: activeWallet === 'metamask' && 'row'}}>
													{
														activeWallet === 'metamask' &&

														<div className="wallet-active-dot">
															<div />
														</div>
													}
													MetaMask
												</div>
												<div className="modal-content-button-icon">
													<img src={Metamask} alt="icon" />
												</div>
											</button> : null }
											<button className={`modal-content-button ${activeWallet === 'walletConnect' && 'active-wallet-button'}`} onClick={() => this.connectToWallet('walletConnect')} style={{display: 'flex', flexDirection: activeWallet === 'walletConnect' && 'row'}}>
												<div className="modal-content-button-title">
													{
														activeWallet === 'walletConnect' &&

														<div className="wallet-active-dot">
															<div />
														</div>
													}
													WalletConnect
												</div>
												<div className="modal-content-button-icon">
													<img src={WalletConnect} alt="icon" />
												</div>
											</button>
											<button className={`modal-content-button ${activeWallet === 'trustwallet' && 'active-wallet-button'}`} onClick={() => this.connectToWallet('trustwallet')} style={{display: 'flex', flexDirection: activeWallet === 'trustwallet' && 'row'}}>
												<div className="modal-content-button-title">
													{
														activeWallet === 'trustwallet' &&

														<div className="wallet-active-dot">
															<div />
														</div>
													}
													Trust Wallet
												</div>
												<div className="modal-content-button-icon">
													<img src={TrustWallet} alt="icon" />
												</div>
											</button>
											{/* <button className={`modal-content-button ${activeWallet === 'portis' && 'active-wallet-button'}`} onClick={() => this.connectToWallet('portis')}>
												<div className="modal-content-button-title" style={{display: 'flex', flexDirection: activeWallet === 'portis' && 'row'}}>
													{
														activeWallet === 'portis' &&

														<div className="wallet-active-dot">
															<div />
														</div>
													}
													Portis
												</div>
												<div className="modal-content-button-icon">
													<img src={PorTis} alt="icon" />
												</div>
											</button> */}
										</div>
										<div className="modal-footer">
											<span>New to Ethereum?</span>
											<a target="_blank" rel="noopener noreferrer" href="https://ethereum.org/wallets/" class="modal-footer-link">Learn more about wallets</a>
										</div>
									</>
								}
							</div>
						</div>
					</div>
				</Dialog>
				</ThemeProvider>
			</>
		)
	};
}

export default App;
