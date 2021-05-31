import React, { Component } from "react";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { IoArrowBackSharp } from "react-icons/io5";
import { MdAdd, MdRefresh } from "react-icons/md";
import CurrencySelectModal from "./CurrencySelectModal";
import { Tooltip } from "antd";
import LPCard from "./LPCard";

export default class Pool extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tokenAModalVisible: false,
			tokenBModalVisible: false,
		};
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

	render() {
		const {
			liquiditySectionVisible,
			onSectionToggle,
			tokenA,
			tokenABalance,
			tokenB,
			tokenBBalance,
			walletConnected,
			walletAddress,
			onTokenAUpdate,
			onTokenBUpdate,
			tokenAIcon,
			tokenBIcon,
			tokenAAmount,
			tokenBAmount,
			onAmountChange,
			pools,
			onMax,
			onAddLiquidity,
			onRefresh,
			theme,
			fetchingLiquidity,
		} = this.props;
		const { tokenAModalVisible, tokenBModalVisible } = this.state;
		return liquiditySectionVisible ? (
			<div className="pool-details">
				<button className="add-liquidity-button" onClick={onSectionToggle}>
					Add Liquidity
				</button>
				<div className="flex-spaced-container">
					<div>Your Liquidity</div>
					{/* <div>                            
            <AiOutlineQuestionCircle size={16} />
          </div> */}
				</div>
				<div className="liquidity-section">
					{walletConnected && walletAddress ? (
						pools.length === 0 ? (
							<span>Your liquidity will appear here.</span>
						) : (
							pools.map((pool) => {
								return (
									<LPCard
										theme={theme}
										walletAddress={walletAddress}
										tokenA={pool.tokenA}
										tokenB={pool.tokenB}
										tokenAIcon={pool.tokenAIcon}
										tokenBIcon={pool.tokenBIcon}
										tokenAAddress={pool.tokenAAddress}
										tokenBAddress={pool.tokenBAddress}
										tokenADecimals={pool.tokenADecimals}
										tokenBDecimals={pool.tokenBDecimals}
										lpAddress={pool.lpAddress}
										onAddLiquidity={onAddLiquidity}
									/>
								);
							})
						)
					) : (
						<span>Connect to a wallet to view your liquidity.</span>
					)}
				</div>
			</div>
		) : (
			<>
				<div className="swap-form">
					<div
						className="flex-spaced-container"
						style={{ marginBottom: "1.5rem", color: theme === "light" ? "#333" : "#FFF" }}
					>
						<IoArrowBackSharp size={24} style={{ cursor: "pointer" }} onClick={onSectionToggle} />
						<span style={{ fontSize: "18px" }}>Add Liquidity</span>
						<Tooltip
							title="When you add liquidity, you will receive pool tokens representing your position. These tokens automatically earn fees proportional to your share of the pool, and can be redeemed at any time."
							placement="bottom"
						>
							<AiOutlineQuestionCircle size={24} />
						</Tooltip>
					</div>
					<div
						className="form-control"
						style={{ borderRadius: "20px 20px 0 0", borderBottom: "none", paddingBottom: "26px" }}
					>
						<div className="flex-spaced-container">
							<div
								style={{
									color: theme === "dark" ? "#FFF" : "#000",
									textTransform: "none",
									opacity: 0.5,
									fontFamily: "normal",
								}}
							>
								Input
							</div>
							{walletConnected && walletAddress && tokenABalance && (
								<div className="pool-balance">
									<MdRefresh
										style={{
											cursor: "pointer",
											position: "relative",
											top: "1px",
										}}
										onClick={() => onRefresh(tokenA, "A")}
									/>{" "}
									balance: <span>{parseFloat(tokenABalance).toFixed(6)}</span>
								</div>
							)}
						</div>
						<div className="input-container without-max">
							<input
								placeholder="0.0"
								value={tokenAAmount}
								inputMode="numeric"
								onChange={(e) => {
									if (!fetchingLiquidity && e.target.value.match(/^(\d+)?([.]?\d{0,9})?$/)) {
										onAmountChange(e.target.value, "A");
									}
								}}
							/>
							<div style={{ opacity: 1 }}>
								{walletConnected && tokenA && parseFloat(tokenABalance) > 0 && (
									<button className="max-button" onClick={() => onMax("A")}>
										max
									</button>
								)}
								<button
									className="asset-select-button"
									style={
										!tokenA
											? {
													padding: "0 1.5rem",
											  }
											: {}
									}
									onClick={this.toggleModalA}
								>
									{tokenAIcon && <img src={tokenAIcon} alt="token-logo" />}
									<span style={{ textTransform: "none" }}>{tokenA || "Select"}</span>
								</button>
							</div>
						</div>
					</div>
					<div className="action">
						<MdAdd />
					</div>
					<div
						className="form-control"
						style={{ borderRadius: "0 0 20px 20px", borderTop: "none", paddingTop: "26px" }}
					>
						<div className="flex-spaced-container">
							<div
								style={{
									color: theme === "dark" ? "#FFF" : "#000",
									textTransform: "none",
									opacity: 0.5,
									fontFamily: "normal",
								}}
							>
								Input
							</div>
							{walletConnected && walletAddress && tokenBBalance && (
								<div className="pool-balance">
									<MdRefresh
										style={{
											cursor: "pointer",
											position: "relative",
											top: "1px",
										}}
										onClick={() => onRefresh(tokenB, "B")}
									/>{" "}
									balance: <span>{parseFloat(tokenBBalance).toFixed(6)}</span>
								</div>
							)}
						</div>
						<div className="input-container without-max">
							<input
								placeholder="0.0"
								value={tokenBAmount}
								onChange={(e) => {
									if (!fetchingLiquidity && e.target.value.match(/^(\d+)?([.]?\d{0,9})?$/)) {
										onAmountChange(e.target.value, "B");
									}
								}}
							/>
							<div style={{ opacity: 1 }}>
								{walletConnected && tokenB && parseFloat(tokenBBalance) > 0 && (
									<button className="max-button" onClick={() => onMax("B")}>
										max
									</button>
								)}
								<button
									className="asset-select-button"
									style={
										!tokenB
											? {
													padding: "0 1.5rem",
											  }
											: {}
									}
									onClick={this.toggleModalB}
								>
									{tokenBIcon && <img src={tokenBIcon} alt="token-logo" />}
									<span style={{ textTransform: "none" }}>{tokenB || "Select"}</span>
								</button>
							</div>
						</div>
					</div>
				</div>
				{tokenAModalVisible && (
					<CurrencySelectModal
						walletConnected={walletConnected}
						walletAddress={walletAddress}
						onModalClose={this.toggleModalA}
						onTokenSelect={onTokenAUpdate}
						selectedToken={tokenA}
						theme={theme}
						// commonBases
					/>
				)}
				{tokenBModalVisible && (
					<CurrencySelectModal
						walletConnected={walletConnected}
						walletAddress={walletAddress}
						onModalClose={this.toggleModalB}
						onTokenSelect={onTokenBUpdate}
						selectedToken={tokenB}
						theme={theme}
						// commonBases
					/>
				)}
			</>
		);
	}
}
