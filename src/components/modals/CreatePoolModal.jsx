import React from "react";
import { Dialog } from "@material-ui/core";
import { RiCloseFill } from "react-icons/ri";

const CreatePoolModal = ({
	open,
	onClose,
	theme,
	tokenA,
	tokenB,
	tokenAIcon,
	tokenBIcon,
	tokenAAmount,
	tokenBAmount,
	onCreate,
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
				<div>You are creating a pool</div>
				<button className="close-modal-button" onClick={onClose}>
					<RiCloseFill />
				</button>
			</div>
			<div className="modal-content">
				<div className="new-pool-details">
					<div className="new-pool-title">
						<h1>
							{tokenA}/{tokenB}
						</h1>
						<div className="new-pool-logos">
							<img src={tokenAIcon} alt="token-1-logo" />
							<img src={tokenBIcon} alt="token-2-logo" />
						</div>
					</div>
					<div className="details-grid">
						<div>
							<div>{tokenA} deposited</div>
							<div>{tokenAAmount}</div>
						</div>
						<div>
							<div>{tokenB} deposited</div>
							<div>{tokenBAmount}</div>
						</div>
						<div>
							<div>Rates</div>
							<div>
								1 {tokenA} = {(parseFloat(tokenBAmount) / parseFloat(tokenAAmount)).toFixed(4)}{" "}
								{tokenB}
								<br />1 {tokenB} ={" "}
								{(parseFloat(tokenAAmount) / parseFloat(tokenBAmount)).toFixed(4)} {tokenA}
							</div>
						</div>
						<div>
							<div>Share of Pool</div>
							<div>100%</div>
						</div>
					</div>
				</div>
				<div className="staking-modal-footer">
					<button
						className="staking-modal-button-primary"
						onClick={onCreate}
						style={{ width: "100%" }}
					>
						Create Pool & Supply
					</button>
				</div>
			</div>
		</Dialog>
	);
};

export default CreatePoolModal;
