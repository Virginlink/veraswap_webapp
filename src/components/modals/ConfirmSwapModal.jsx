import React, { useContext } from "react";
import { Dialog } from "@material-ui/core";
import { RiCloseFill } from "react-icons/ri";
import { IoArrowDownSharp } from "react-icons/io5";
import { GrPowerCycle } from "react-icons/gr";
import { Tooltip } from "antd";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import AppContext from "../../state/AppContext";

const ConfirmSwapModal = ({
	open,
	onClose,
	onConfirm,
	theme,
	tokenA,
	tokenAIcon,
	tokenAAmount,
	tokenB,
	tokenBIcon,
	tokenBAmount,
	impact,
	inverted,
	onInvertToggle,
	tokenAPrice,
	tokenBPrice,
}) => {
	const context = useContext(AppContext);

	const minimumReceived =
		parseFloat(tokenBAmount) - parseFloat(tokenBAmount) * (parseFloat(context.slippage) / 100);

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
				<div>Confirm Swap</div>
				<button className="close-modal-button" onClick={onClose}>
					<RiCloseFill />
				</button>
			</div>
			<div className="modal-content" style={{ padding: "0rem 0 1rem" }}>
				<div className="swap-confirmation-header">
					<div className="swap-confirmation-token-row">
						<div>
							<img src={tokenAIcon} alt={tokenA} />
							{tokenAAmount}
						</div>
						<div>{tokenA}</div>
					</div>
					<IoArrowDownSharp />
					<div className="swap-confirmation-token-row">
						<div data-high-impact={parseFloat(impact) > 20}>
							<img src={tokenBIcon} alt={tokenB} />
							{tokenBAmount}
						</div>
						<div>{tokenB}</div>
					</div>
					<p>
						Output is estimated. You will receive atleast{" "}
						<strong>
							{minimumReceived.toFixed(6)} {tokenB}
						</strong>{" "}
						or transaction will revert.
					</p>
				</div>
				<div className="swap-confirmation-details">
					<div>
						<div>Price</div>
						<div>
							<div
								style={{
									display: "flex",
									alignItems: "center",
								}}
							>
								{!inverted ? (
									<div>
										{parseFloat(tokenAPrice).toFixed(4)} {tokenB} / {tokenA}
									</div>
								) : (
									<div>
										{parseFloat(tokenBPrice).toFixed(4)} {tokenA} / {tokenB}
									</div>
								)}
								<button className="invert-button" onClick={onInvertToggle}>
									<GrPowerCycle size={15} />
								</button>
							</div>
						</div>
					</div>
					<div>
						<div>
							Minimum received{" "}
							<Tooltip
								placement="right"
								title="Your transaction will revert if there is a large, unfavourable price movement before it is confirmed."
							>
								<AiOutlineQuestionCircle
									style={{
										position: "relative",
										top: "2px",
										cursor: "pointer",
									}}
								/>
							</Tooltip>
						</div>
						<div>
							{minimumReceived.toFixed(6)} {tokenB}
						</div>
					</div>
					<div>
						<div>
							Price Impact{" "}
							<Tooltip
								placement="right"
								title="The difference between the market price and your price due to trade size."
							>
								<AiOutlineQuestionCircle
									style={{
										position: "relative",
										top: "2px",
										cursor: "pointer",
									}}
								/>
							</Tooltip>
						</div>
						<div data-high-impact={parseFloat(impact) > 20}>
							{parseFloat(impact) < 0.01 ? "< 0.01" : impact}%
						</div>
					</div>
				</div>
				<div className="staking-modal-footer" style={{ padding: "0 1rem 0" }}>
					<button
						style={{
							width: "100%",
							backgroundColor: parseFloat(impact) > 20 && "#fd761f",
							borderColor: parseFloat(impact) > 20 && "#fd761f",
						}}
						className="staking-modal-button-primary"
						onClick={onConfirm}
					>
						{parseFloat(impact) > 20 ? "Swap Anyway" : "Confirm Swap"}
					</button>
				</div>
			</div>
		</Dialog>
	);
};

export default ConfirmSwapModal;
