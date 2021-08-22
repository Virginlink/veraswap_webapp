import React from "react";
import { Dialog, Fade } from "@material-ui/core";
import { FiChevronRight } from "react-icons/fi";
import powerRed from "../../assets/images/power-red.png";
import { withRouter } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Fade timeout={{ enter: 1000, exit: 2000 }} ref={ref} {...props} />;
});

const ProjectListedModal = ({ open, onClose, history }) => {
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
					maxWidth: "500px",
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
					<div className="listed-container">
						<img src={powerRed} alt="listed" />
						<div>
							<h3 className="listed-project-text">Yay!</h3>
							<h3 className="listed-project-text">Your Project has been Listed</h3>
						</div>
						<button
							style={{ marginTop: "0", justifyContent: "center" }}
							className="back-home-btn"
							onClick={() => history.push(`/my-projects`)}
						>
							<span>View Project</span> <FiChevronRight size={26} />
						</button>
					</div>
				</div>
			</div>
		</Dialog>
	);
};

export default withRouter(ProjectListedModal);
