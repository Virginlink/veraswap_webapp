import React from "react";
import { Dialog, Fade } from "@material-ui/core";
import { Close } from "../../assets/icons/ReactIcons";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Fade timeout={{ enter: 1000, exit: 2000 }} ref={ref} {...props} />;
});

const VRAPDetailsModal = ({ open, onClose, walletConnected, balance }) => {
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
			<div className="coloured-modal-outer-container">
				<div className="coloured-modal-container">
					<span className="rotation"></span>
					<span className="noise"></span>
					<div className="coloured-modal-header">
						<div className="coloured-modal-header-inner">
							<div className="coloured-modal-header-title">
								Your VRAP Breakdown
								<Close onClick={onClose} />
							</div>
						</div>
						<div className="coloured-modal-divider" />
						{walletConnected && (
							<>
								{/* <div className="grid-8px" style={{padding: '1rem', zIndex: 1}}>
                          <div className="grid" style={{justifyContent: 'center'}}>
                            <img width="48px" src={Logo} alt="Logo" className="spinning-logo" />
                          <div className="balance-large">0.00</div>
                        </div>
                    </div> */}
								<div className="coloured-modal-content-rows-container">
									<div className="coloured-modal-content-row">
										<div className="coloured-modal-text">Balance:</div>
										<div className="coloured-modal-text">
											{balance ? parseFloat(balance).toFixed(3) : "0"} VRAP
										</div>
									</div>
									{/* <div className="coloured-modal-content-row">
                            <div className="coloured-modal-text">
                              Unclaimed:
                            </div>
                            <div className="coloured-modal-text">
                              0.0000
                            </div>
                      </div> */}
								</div>
								<div className="coloured-modal-divider" />
							</>
						)}
						<div className="coloured-modal-content">
							<div className="coloured-modal-content-rows-container">
								<div className="coloured-modal-content-row">
									<div className="coloured-modal-text">VRAP Price:</div>
									<div className="coloured-modal-text">$ 0.05</div>
								</div>
								<div className="coloured-modal-content-row">
									<div className="coloured-modal-text">VRAP in circulation:</div>
									<div className="coloured-modal-text">100,000,000</div>
								</div>
								<div className="coloured-modal-content-row">
									<div className="coloured-modal-text">Total supply:</div>
									<div className="coloured-modal-text">100,000,000</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Dialog>
	);
};

export default VRAPDetailsModal;
