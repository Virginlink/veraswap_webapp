import React from "react";
import { Dialog, Fade } from "@material-ui/core";
import { Close } from "../../assets/icons/ReactIcons";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Fade timeout={{ enter: 1000, exit: 2000 }} ref={ref} {...props} />;
});

const ClaimVRAPModal = ({
	open,
	onClose,
	error,
	address,
	addressValid,
	onAddressChange,
	balance,
	onClaim,
}) => {
	return (
		<Dialog
			open={open}
			TransitionComponent={Transition}
			onClose={onClose}
			onBackdropClick={onClose}
			BackdropProps={{
				style: { backgroundColor: "rgba(0, 0, 0, 0.3)" },
			}}
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
				},
			}}
		>
			<div className="claim-modal-container">
				<div
					style={{
						display: "grid",
						gridAutoRows: "auto",
						rowGap: "24px",
						width: "100%",
					}}
				>
					<div className="gradient-header" style={{ marginBottom: "-24px" }}>
						<div className="rotation" />
						<div className="noise" />
						<div
							style={{
								display: "grid",
								gridAutoRows: "auto",
								rowGap: "12px",
								padding: "1rem",
								zIndex: 1,
							}}
						>
							<div
								style={{
									display: "flex",
									alignItems: "center",
									justifyContent: "space-between",
								}}
							>
								<div className="coloured-modal-header-title">Claim VRAP Token</div>
								<Close onClick={onClose} />
							</div>
							<div
								style={{
									margin: 0,
									minWidth: 0,
									fontWeight: 700,
									color: "#FFF",
									fontSize: "36px",
								}}
							>
								0 VRAP
							</div>
						</div>
					</div>
					<div className="modal-divider" />
					<div className="grid" style={{ padding: "0px 1rem 1rem" }}>
						<div className="claim-description">
							Enter an address to trigger a VRAP claim. If the address has any claimable VRAP it
							will be sent to them on submission.
						</div>
						<div
							style={{
								display: "flex",
								flexFlow: "column nowrap",
								position: "relative",
								borderRadius: "1.25rem",
								zIndex: 1,
								width: "100%",
							}}
						>
							<div
								className="claim-input-outer-container"
								style={{
									borderColor: !error ? "auto" : "rgb(255, 104, 113)",
								}}
							>
								<div
									style={{
										flex: "1 1 0%",
										padding: "1rem",
									}}
								>
									<div className="grid">
										<div
											style={{
												display: "flex",
												alignItems: "center",
												justifyContent: "space-between",
												padding: 0,
												width: "100%",
												margin: 0,
												minWidth: 0,
											}}
										>
											<div className="input-label">Recipient</div>
											{addressValid && (
												<a
													target="_blank"
													rel="noopener noreferrer"
													href={`https://bscscan.com/address/${address}`}
													className="external-link"
												>
													(View on Etherscan)
												</a>
											)}
										</div>
										<input
											className="claim-input"
											type="text"
											autocomplete="off"
											autocorrect="off"
											autocapitalize="off"
											spellcheck="false"
											placeholder="Wallet Address or ENS name"
											pattern="^(0x[a-fA-F0-9]{40})$"
											value={address}
											onChange={onAddressChange}
										/>
									</div>
								</div>
							</div>
							{addressValid && parseFloat(balance) === 0 ? (
								<div
									style={{
										fontSize: "16px",
										color: "rgb(255, 104, 113)",
										textAlign: "center",
										fontWeight: 500,
										marginTop: "0.5rem",
									}}
								>
									Address has no available claim
								</div>
							) : null}
							<button
								disabled
								className="buy-action-button"
								style={{ marginTop: "1.75rem" }}
								onClick={onClaim}
							>
								Claim VRAP
							</button>
						</div>
					</div>
				</div>
			</div>
		</Dialog>
	);
};

export default ClaimVRAPModal;
