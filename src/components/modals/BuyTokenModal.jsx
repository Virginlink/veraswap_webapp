import React from "react";
import { Dialog, Fade } from "@material-ui/core";
import { Close } from "../../assets/icons/ReactIcons";
import TrustWallet from "../../assets/images/trustWallet.svg";
import Binance from "../../assets/images/binance.svg";
import Veraswap from "../../assets/images/vrap-red.svg";
import Cake from "../../assets/images/cake.png";
import Bake from "../../assets/images/bake.svg";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Fade timeout={{ enter: 1000, exit: 2000 }} ref={ref} {...props} />;
});

const modalDatas = [
	{
		image: Binance,
		title: "BNB",
		desc: "Binance Coin",
	},
	{
		image: Veraswap,
		title: "VRAP",
		desc: "Veraswap",
	},
	{
		image: TrustWallet,
		title: "TWT",
		desc: "Trust Wallet Token",
	},
	{
		image: Cake,
		title: "Cake",
		desc: "Pancakeswap Token",
	},
	{
		image: Bake,
		title: "Bake",
		desc: "Bakery Token",
	},
	// extra bake token added to check scroll behaviour(remove on intregration)
	{
		image: Bake,
		title: "Bake",
		desc: "Bakery Token",
	},
	{
		image: Bake,
		title: "Bake",
		desc: "Bakery Token",
	},
];

const BuyTokenModal = ({ open, onClose }) => {
	return (
		<Dialog
			open={open}
			TransitionComponent={Transition}
			onClose={onClose}
			BackdropProps={{ style: { backgroundColor: "rgba(0, 0, 0, 0.3)" } }}
			PaperProps={{
				style: {
					width: "50vw",
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
					<div className="modal-header">
						<h3 style={{ flex: "1 1 0%", textAlign: "center" }}>Select a token</h3>
					</div>
					<div className="modal-close-button" onClick={onClose}>
						<Close />
					</div>
					<div className="modal-input-container">
						<input type="text" placeholder="Paste Token address" />
						<div className="select-token-wrapper">
							{modalDatas.map((modalData) => (
								<div className="token-box" key={modalData.title}>
									<img src={modalData.image} alt="token logos" />
									<div className="token-text-box">
										<h1 className="token-title">{modalData.title}</h1>
										<p className="token-desc">{modalData.desc}</p>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</Dialog>
	);
};

export default BuyTokenModal;
