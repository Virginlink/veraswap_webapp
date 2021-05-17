import React, { useState } from "react";
import { Dialog, Fade } from "@material-ui/core";
import {
	AccountAvatar,
	Close,
	Copy,
	ExternalLink,
	Loaded,
	Loading,
} from "../../assets/icons/ReactIcons";
import Metamask from "../../assets/images/metamask.png";
import WalletConnect from "../../assets/images/walletConnect.svg";
import CoinbaseWallet from "../../assets/images/coinbaseWallet.svg";
import FortMatic from "../../assets/images/fortMatic.png";
import TrustWallet from "../../assets/images/trustWallet.svg";
import Transactions from "../Transactions/Transactions";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Fade timeout={{ enter: 1000, exit: 2000 }} ref={ref} {...props} />;
});

const ConnectWalletModal = ({
	open,
	onClose,
	showWalletConnection,
	walletConnected,
	onCancelConnection,
	backToAccountSection,
	walletConnectionActive,
	connectionError,
	activeWallet,
	onWalletChange,
	walletAddress,
	selectedWallet,
	onConnect,
}) => {
	const [copied, setCopied] = useState(false);

	const copyWalletAddress = () => {
		setCopied(true);
		navigator.clipboard.writeText(walletAddress).then(() => {
			setTimeout(() => setCopied(false), 1000);
		});
	};

	return (
		<Dialog
			open={open}
			TransitionComponent={Transition}
			onClose={onClose}
			onBackdropClick={onClose}
			BackdropProps={{ style: { backgroundColor: "rgba(0, 0, 0, 0.3)" } }}
			PaperProps={{
				style: {
					width: "50vw",
					backgroundColor: "#FFF",
					boxShadow: "rgba(47, 128, 237, 0.05) 0px 4px 8px 0px",
					maxWidth: "420px",
					maxHeight: "90vh",
					display: "flex",
					borderRadius: "20px",
					margin: "0 0 2rem",
					padding: "1.5rem 0.5rem",
				},
			}}
		>
			<div className="modal-outer-container-wrapper">
				<div className="modal-outer-container">
					<div className="modal-close-button" onClick={onClose}>
						<Close />
					</div>
					{showWalletConnection ? (
						walletConnected ? (
							<div className="modal-header">
								<h3 style={{ flex: "1 1 0%", textAlign: "center" }}>Account</h3>
							</div>
						) : (
							<div className="modal-back-header">
								<div style={{ cursor: "pointer" }} onClick={onCancelConnection}>
									Back
								</div>
							</div>
						)
					) : walletConnected ? (
						<div className="modal-back-header">
							<div style={{ cursor: "pointer" }} onClick={backToAccountSection}>
								Back
							</div>
						</div>
					) : (
						<div className="modal-header">
							<h3 style={{ flex: "1 1 0%", textAlign: "center" }}>Connect to a wallet</h3>
						</div>
					)}
					<div
						style={{ padding: !showWalletConnection ? "2rem 2rem 0" : 0 }}
						className={`${showWalletConnection ? "wallet-main-container" : "modal-content"}`}
					>
						{showWalletConnection ? (
							<div
								style={{
									display: walletConnectionActive && "block",
									padding: !walletConnectionActive && "2rem",
								}}
								className={`${walletConnectionActive && "wallet-connection-container"}`}
							>
								{!walletConnected ? (
									<div
										className={`modal-content-button-disabled ${
											connectionError ? "connection-error" : ""
										}`}
									>
										<div className="connection-status">
											{connectionError ? (
												<div
													style={{
														display: "flex",
														flexFlow: "row nowrap",
														alignItems: "center",
														justifyContent: "flex-start",
													}}
												>
													<div className="connection-error-text">Error connecting.</div>
													<div className="retry-button">Try again</div>
												</div>
											) : (
												<>
													<Loading />
													Initializing...
												</>
											)}
										</div>
									</div>
								) : (
									<div className="connected-wallet-container" style={{ paddingTop: "1rem" }}>
										<div className="connected-wallet-title-container">
											<div className="connected-wallet-title">
												Connected with{" "}
												{activeWallet === "metamask"
													? "MetaMask"
													: activeWallet === "walletConnect"
													? "WalletConnect"
													: activeWallet === "fortmatic"
													? "Fortmatic"
													: "Portis"}
											</div>
											<div>
												<button className="change-wallet-button" onClick={onWalletChange}>
													Change
												</button>
											</div>
										</div>
										<div className="wallet-address-container">
											<div className="wallet-address-inner-container">
												<div
													style={{
														borderRadius: "50px",
														overflow: "hidden",
														padding: 0,
														margin: 0,
														width: "16px",
														height: "16px",
														display: "inline-block",
													}}
												>
													<AccountAvatar />
												</div>
												<p>
													{`${walletAddress}`.substring(0, 6) +
														"..." +
														`${walletAddress}`.substring(37, 42)}
												</p>
											</div>
										</div>
										<div className="wallet-address-container">
											<div className="wallet-address-inner-container">
												{!copied ? (
													<button className="copy-address-button" onClick={copyWalletAddress}>
														<span className="copy-icon">
															<Copy />
														</span>
														<span
															style={{
																marginLeft: "4px",
																fontSize: "13px",
															}}
														>
															Copy Address
														</span>
													</button>
												) : (
													<button className="copy-address-button">
														<span className="copy-icon">
															<Loaded />
														</span>
														<span
															style={{
																marginLeft: "4px",
																fontSize: "13px",
															}}
														>
															Copied
														</span>
													</button>
												)}
												<a
													target="_blank"
													rel="noopener noreferrer"
													href={`https://${
														process.env.NODE_ENV === "development"
															? "testnet.bscscan.com"
															: "bscscan.com"
													}/address/${walletAddress}`}
													className="wallet-address-link"
												>
													<ExternalLink />
													<span style={{ fontSize: "13px" }}>View on Explorer</span>
												</a>
											</div>
										</div>
									</div>
								)}
								{!walletConnected ? (
									<div className="wallet-description">
										<div className="wallet-description-content">
											<div className="wallet-title">
												{selectedWallet === "metamask"
													? "MetaMask"
													: selectedWallet === "walletConnect"
													? "WalletConnect"
													: selectedWallet === "trustwallet"
													? "Trust Wallet"
													: "Portis"}
											</div>
											<div className="wallet-caption">
												{selectedWallet === "metamask"
													? "Easy-to-use browser extension."
													: selectedWallet === "walletConnect"
													? "Connect to Trust Wallet, Rainbow Wallet and more..."
													: selectedWallet === "trustwallet"
													? "Login using Trust Wallet Dapp Browser"
													: "Login using Portis hosted wallet"}
											</div>
										</div>
										<div className="wallet-description-content">
											{selectedWallet === "metamask" ? (
												<img src={Metamask} alt="icon" width="24px" height="24px" />
											) : selectedWallet === "walletConnect" ? (
												<img src={WalletConnect} alt="icon" width="24px" height="24px" />
											) : selectedWallet === "coinbaseWallet" ? (
												<img src={CoinbaseWallet} alt="icon" width="24px" height="24px" />
											) : selectedWallet === "fortmatic" ? (
												<img src={FortMatic} alt="icon" width="24px" height="24px" />
											) : (
												<img src={TrustWallet} alt="icon" width="24px" height="24px" />
											)}
										</div>
									</div>
								) : (
									<div className="connected-wallet-footer-container">
										<div className="connected-wallet-footer-text">
											<Transactions />
										</div>
									</div>
								)}
							</div>
						) : (
							<>
								<div className="modal-content-grid">
									{window.innerWidth > 900 ? (
										<button
											className={`modal-content-button ${
												activeWallet === "metamask" && "active-wallet-button"
											}`}
											onClick={() => onConnect("metamask")}
										>
											<div
												className="modal-content-button-title"
												style={{
													display: "flex",
													flexDirection: activeWallet === "metamask" && "row",
												}}
											>
												{activeWallet === "metamask" && (
													<div className="wallet-active-dot">
														<div />
													</div>
												)}
												MetaMask
											</div>
											<div className="modal-content-button-icon">
												<img src={Metamask} alt="icon" />
											</div>
										</button>
									) : null}
									<button
										className={`modal-content-button ${
											activeWallet === "walletConnect" && "active-wallet-button"
										}`}
										onClick={() => onConnect("walletConnect")}
										style={{
											display: "flex",
											flexDirection: activeWallet === "walletConnect" && "row",
										}}
									>
										<div className="modal-content-button-title">
											{activeWallet === "walletConnect" && (
												<div className="wallet-active-dot">
													<div />
												</div>
											)}
											WalletConnect
										</div>
										<div className="modal-content-button-icon">
											<img src={WalletConnect} alt="icon" />
										</div>
									</button>
									<button
										className={`modal-content-button ${
											activeWallet === "trustwallet" && "active-wallet-button"
										}`}
										onClick={() => onConnect("trustwallet")}
										style={{
											display: "flex",
											flexDirection: activeWallet === "trustwallet" && "row",
										}}
									>
										<div className="modal-content-button-title">
											{activeWallet === "trustwallet" && (
												<div className="wallet-active-dot">
													<div />
												</div>
											)}
											Trust Wallet
										</div>
										<div className="modal-content-button-icon">
											<img src={TrustWallet} alt="icon" />
										</div>
									</button>
								</div>
								<div className="modal-footer">
									<span>New to Ethereum?</span>
									<a
										target="_blank"
										rel="noopener noreferrer"
										href="https://ethereum.org/wallets/"
										class="modal-footer-link"
									>
										Learn more about wallets
									</a>
								</div>
							</>
						)}
					</div>
				</div>
			</div>
		</Dialog>
	);
};

export default ConnectWalletModal;
