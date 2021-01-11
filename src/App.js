import React, { Component } from 'react';
import { Dialog, Fade } from '@material-ui/core';
import Navbar from './components/Navbar';
import Sale from './components/Sale/Sale';
import Metamask from './assets/images/metamask.png';
import WalletConnect from './assets/images/walletConnect.svg';
import CoinbaseWallet from './assets/images/coinbaseWallet.svg';
import FortMatic from './assets/images/fortMatic.png';
import Portis from './assets/images/portis.png';
import {ThemeProvider} from "styled-components";
import { GlobalStyles } from "./components/globalStyles";
import { lightTheme, darkTheme } from "./components/Themes";
import './App.css';
import './components/Navbar.css';
import './components/Sale/Sale.css';

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
		}
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
			this.setState({connectWalletModalVisible: !this.state.connectWalletModalVisible})
		}
	}

	connectToWallet = (type) => {
		console.log(type);
		if(type === 'metamask'){
			this.handleMetmask()
		}
		this.setState({selectedWallet: type, showWalletConnection: true})
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
			setTimeout(
				() => this.setState({copied: false}),
				1000
			)
		})
	}

	render() {
		const {connectWalletModalVisible, selectedWallet, showWalletConnection, connectionError, walletConnected, copied, walletConnectionActive, activeWallet} = this.state
		return (
			<div>
				<ThemeProvider theme={this.state.theme === 'light' ? lightTheme : darkTheme}>
				<>
				<GlobalStyles/>
				<Navbar
					modalVisible={connectWalletModalVisible}
					onModalToggle={this.toggleWalletConnectModal}
					theme={this.state.theme}
					onThemeToggle={this.toggleTheme}
					walletConnected={walletConnected}
				/>
				<Sale onModalOpenRequest={this.toggleWalletConnectModal} />
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

															: activeWallet === 'coinbaseWallet' ?

															'Coinbase Wallet'

															: activeWallet === 'fortmatic' ?

															'Fortmatic'

															: 'Portis'
														}
													</div>
													<div>
														<button className="change-wallet-button" onClick={() => this.setState({showWalletConnection: false})}>
															Change
														</button>
													</div>
												</div>
												<div className="wallet-address-container">
													<div className="wallet-address-inner-container">
														<div style={{borderRadius: '50px', overflow: 'hidden', padding: 0, margin: 0, width: '16px', height: '16px', display: 'inline-block'}}>
															<svg height="100" version="1.1" width="100" xmlns="http://www.w3.org/2000/svg"  xmlnsXlink="http://www.w3.org/1999/xlink" style={{overflow: 'hidden', position: 'relative'}}><desc style={{WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)'}}>Created with Raphaël 2.3.0</desc><defs style={{WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)'}}></defs><rect x="0" y="0" width="16" height="16" rx="0" ry="0" fill="#f91e01" stroke="none" style={{WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)'}}></rect><rect x="0" y="0" width="16" height="16" rx="0" ry="0" fill="#c81465" stroke="none" transform="matrix(0.6111,-0.7916,0.7916,0.6111,-5.5477,11.7858)" style={{WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)'}}></rect><rect x="0" y="0" width="16" height="16" rx="0" ry="0" fill="#237fe1" stroke="none" transform="matrix(-0.7983,-0.6023,0.6023,-0.7983,1.3671,25.6874)" style={{WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)'}}></rect><rect x="0" y="0" width="16" height="16" rx="0" ry="0" fill="#18b7f2" stroke="none" transform="matrix(0.9689,-0.2476,0.2476,0.9689,-13.2583,-0.0478)" style={{WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)'}}></rect></svg>
														</div>
														<p>0x09FD...2842</p>
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
														<a target="_blank" rel="noopener noreferrer" href="https://etherscan.io" className="wallet-address-link">
															<svg style={{marginRight: '3px', position: 'relative', top: '3px'}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
															<span style={{fontSize: '13px'}}>View on Etherscan</span>
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

															: selectedWallet === 'coinbaseWallet' ?

															'Coinbase Wallet'

															: selectedWallet === 'fortmatic' ?

															'Fortmatic'

															: 'Portis'
														}
													</div>
													<div className="wallet-caption">
														{
															selectedWallet === 'metamask' ?

															'Easy-to-use browser extension.'

															: selectedWallet === 'walletConnect' ?

															'Connect to Trust Wallet, Rainbow Wallet and more...'

															: selectedWallet === 'coinbaseWallet' ?

															'Use Coinbase Wallet app on mobile device'

															: selectedWallet === 'fortmatic' ?

															'Login using Fortmatic hosted wallet'

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

														: <img src={Portis} alt="icon" width="24px" height="24px" />
													}
												</div>
											</div>

											:

											<div className="connected-wallet-footer-container">
												<div className="connected-wallet-footer-text">
													Your transactions will appear here...
												</div>
											</div>
										}
									</div>

									:

									<>
										<div className="modal-content-grid">
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
											</button>
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
											<button className={`modal-content-button ${activeWallet === 'coinbaseWallet' && 'active-wallet-button'}`} onClick={() => this.connectToWallet('coinbaseWallet')} style={{display: 'flex', flexDirection: activeWallet === 'coinbaseWallet' && 'row'}}>
												<div className="modal-content-button-title">
													{
														activeWallet === 'coinbaseWallet' &&

														<div className="wallet-active-dot">
															<div />
														</div>
													}
													Coinbase Wallet
												</div>
												<div className="modal-content-button-icon">
													<img src={CoinbaseWallet} alt="icon" />
												</div>
											</button>
											<button className={`modal-content-button ${activeWallet === 'fortmatic' && 'active-wallet-button'}`} onClick={() => this.connectToWallet('fortmatic')} style={{display: 'flex', flexDirection: activeWallet === 'fortmatic' && 'row'}}>
												<div className="modal-content-button-title">
													{
														activeWallet === 'fortmatic' &&

														<div className="wallet-active-dot">
															<div />
														</div>
													}
													Fortmatic
												</div>
												<div className="modal-content-button-icon">
													<img src={FortMatic} alt="icon" />
												</div>
											</button>
											<button className={`modal-content-button ${activeWallet === 'portis' && 'active-wallet-button'}`} onClick={() => this.connectToWallet('portis')}>
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
													<img src={Portis} alt="icon" />
												</div>
											</button>
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
				</>
				</ThemeProvider>
			</div>
		)
	};
}

export default App;
