import React from "react";
import { Dialog, Fade } from "@material-ui/core";
import { Close } from "../../assets/icons/ReactIcons";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Fade timeout={{ enter: 1000, exit: 2000 }} ref={ref} {...props} />;
});

const ExpertModeModal = ({ open, onClose, onConfirm }) => {
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
			<div className="confirmation-modal-container">
				<div className="confirmation-modal-grid">
					<div className="confirmation-modal-header">
						<div className="confirmation-modal-title">Are you sure?</div>
						<Close onClick={onClose} />
					</div>
					<div className="modal-divider" />
					<div className="confirmation-modal-content">
						Expert mode turns off the confirm transaction prompt and allows high slippage trades
						that often result in bad rates and lost funds.
					</div>
					<div className="confirmation-modal-content-bold">
						ONLY USE THIS MODE IF YOU KNOW WHAT YOU ARE DOING.
					</div>
					<button className="confirmation-modal-button" onClick={onConfirm}>
						<div className="confirmation-modal-button-text">Turn On Expert Mode</div>
					</button>
				</div>
			</div>
		</Dialog>
	);
};

export default ExpertModeModal;
