import React from "react";
import { Dialog } from "@material-ui/core";
import { RiCloseFill } from "react-icons/ri";

const ApproveModal = ({
	open,
	onClose,
	theme,
	token,
	tokenIcon,
	tokenBalance,
	approvalAmount,
	onAmountChange,
	onMax,
	onApprove,
	approving,
}) => {
	return (
		<Dialog
			open={open}
			onClose={onClose}
			onBackdropClick={onClose}
			BackdropProps={{
				style: {
					zIndex: 0,
				},
			}}
			className="app-modal"
		>
			<div
				className="modal-header flex-spaced-container"
				style={{ color: theme === "light" ? "#000" : "#FFF" }}
			>
				<div>Approve {token}</div>
				<button className="close-modal-button" onClick={onClose}>
					<RiCloseFill />
				</button>
			</div>
			<div className="modal-content">
				<div className="form-control">
					<div className="flex-spaced-container">
						<div />
						<div>
							balance:{" "}
							<span style={{ fontFamily: "normal" }}>{parseFloat(tokenBalance).toFixed(6)}</span>{" "}
							<span style={{ textTransform: "none" }}>{token}</span>
						</div>
					</div>
					<div className="input-container without-max">
						<input
							style={{ width: "100%", paddingRight: "1rem" }}
							placeholder="0.0"
							value={approvalAmount}
							onChange={onAmountChange}
						/>
						<div>
							<button disabled={!tokenBalance} className="max-button" onClick={onMax}>
								max
							</button>
							<button className="asset-select-button" style={{ cursor: "default" }}>
								<img src={tokenIcon} alt="token-logo" />
								<span style={{ color: "#FFF" }}>{token}</span>
							</button>
						</div>
					</div>
				</div>
				<div className="staking-modal-footer">
					<button className="staking-modal-button" onClick={onClose}>
						Cancel
					</button>
					<button
						className="staking-modal-button-primary"
						disabled={
							parseFloat(approvalAmount) === 0 ||
							!approvalAmount ||
							approving ||
							parseFloat(approvalAmount) > parseFloat(tokenBalance)
						}
						onClick={onApprove}
					>
						{!approving
							? approvalAmount
								? parseFloat(approvalAmount) > 0
									? parseFloat(approvalAmount) <= parseFloat(tokenBalance)
										? "Approve"
										: `Insufficient balance`
									: "Invalid Amount"
								: "Enter Amount"
							: "Approving"}
					</button>
				</div>
			</div>
		</Dialog>
	);
};

export default ApproveModal;
