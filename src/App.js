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
import { lightTheme, darkTheme } from "./components/Themes"
import './App.css';
import './components/Navbar.css';
import './components/Sale/Sale.css';

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
			selectedWallet: '',
			connectionError: false
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

	toggleWalletConnectModal = () => this.setState({connectWalletModalVisible: !this.state.connectWalletModalVisible})

	connectToWallet = (type) => {
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

	render() {
		const {connectWalletModalVisible, selectedWallet, showWalletConnection, connectionError} = this.state
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

								<div className="modal-back-header">
									<div style={{cursor: 'pointer'}} onClick={this.cancelWalletConnection}>Back</div>
								</div>

								:

								<div className="modal-header">
									<div>Connect to a wallet</div>
								</div>
							}
							<div className="modal-content">
								{
									showWalletConnection ?

									<div className="wallet-connection-container">
										<div className={`modal-content-button-disabled ${connectionError ? 'connection-error' : ''}`}>
											<div className="connection-status">
												{
													!connectionError ?

													<>
														<svg className="connection-loader" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="sc-bYSBpT fhfZBu sc-gqPbQI dCfdPK"><path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 9.27455 20.9097 6.80375 19.1414 5" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
														Initializing...
													</>

													:

													<div style={{display: 'flex', flexFlow: 'row nowrap', alignItems: 'center', justifyContent: 'flex-start'}}>
														<div className="connection-error-text">Error connecting.</div>
														<div className="retry-button">
															Try again
														</div>
													</div>
												}
											</div>
										</div>
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
									</div>

									:

									<>
										<div className="modal-content-grid">
											<button className="modal-content-button" onClick={() => this.connectToWallet('metamask')}>
												<div className="modal-content-button-title">
													MetaMask
												</div>
												<div className="modal-content-button-icon">
													<img src={Metamask} alt="icon" />
												</div>
											</button>
											<button className="modal-content-button" onClick={() => this.connectToWallet('walletConnect')}>
												<div className="modal-content-button-title">
													WalletConnect
												</div>
												<div className="modal-content-button-icon">
													<img src={WalletConnect} alt="icon" />
												</div>
											</button>
											<button className="modal-content-button" onClick={() => this.connectToWallet('coinbaseWallet')}>
												<div className="modal-content-button-title">
													Coinbase Wallet
												</div>
												<div className="modal-content-button-icon">
													<img src={CoinbaseWallet} alt="icon" />
												</div>
											</button>
											<button className="modal-content-button" onClick={() => this.connectToWallet('fortmatic')}>
												<div className="modal-content-button-title">
													Fortmatic
												</div>
												<div className="modal-content-button-icon">
													<img src={FortMatic} alt="icon" />
												</div>
											</button>
											<button className="modal-content-button" onClick={() => this.connectToWallet('portis')}>
												<div className="modal-content-button-title">
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
