import React, { useState } from "react";
import { GrPowerCycle } from "react-icons/gr";

const getPoolSharePercent = (userTokens, totalTokens) =>
	parseFloat((parseFloat(userTokens) / parseFloat(totalTokens)) * 100).toFixed(2);

const LiquidityInfo = ({ tokenA, tokenASupply, tokenB, tokenBSupply, liquidityInfo, theme }) => {
	const [inverted, setInverted] = useState(false);

	const invertPrice = () => setInverted((inverted) => !inverted);

	return (
		<>
			<div
				className="flex-spaced-container"
				style={{
					alignItems: "center",
					marginTop: "1rem",
					color: theme === "light" ? "#333" : "#FFF",
					fontSize: "13px",
					fontFamily: "normal",
				}}
			>
				<div>Price</div>
				<div
					style={{
						textAlign: "right",
						display: "flex",
						alignItems: "center",
						justifyContent: "flex-end",
					}}
				>
					{!inverted ? (
						<div>
							1 {tokenA} = {(parseFloat(tokenBSupply) / parseFloat(tokenASupply)).toFixed(6)}{" "}
							{tokenB}
						</div>
					) : (
						<div>
							1 {tokenB} = {(parseFloat(tokenASupply) / parseFloat(tokenBSupply)).toFixed(6)}{" "}
							{tokenA}
						</div>
					)}
					<button className="invert-button" onClick={invertPrice}>
						<GrPowerCycle size={15} />
					</button>
				</div>
			</div>
			{parseFloat(liquidityInfo.total) > 0 && (
				<div className="details-section">
					<div
						className="flex-spaced-container"
						style={{
							alignItems: "flex-start",
							color: theme === "light" ? "#000" : "#FFF",
							fontSize: "13px",
						}}
					>
						<div>Your total pooled tokens</div>
						<div style={{ textAlign: "right" }}>{parseFloat(liquidityInfo.total).toFixed(6)}</div>
					</div>
					<div
						className="flex-spaced-container"
						style={{
							alignItems: "flex-start",
							color: theme === "light" ? "#000" : "#FFF",
							fontSize: "13px",
						}}
					>
						<div>Your pool share</div>
						<div style={{ textAlign: "right" }}>
							{getPoolSharePercent(liquidityInfo.total, liquidityInfo.totalSupply)} %
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default LiquidityInfo;
