import React from "react";
import { Dialog, Fade } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";
import { Spin, Space } from "antd";

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
					<div className="listed-container review-container-pd">
						<Space size="large">
							<Spin size="large" />
						</Space>
						<h3 className="listed-project-text">Your Project is under Team Review</h3>
						<p className="apply-desc token-desc">
							Your application is now under review by our team of researchers.
							<br />
							<br />
							<br />
							<br />
							We'll notify you shortly
						</p>
						<button
							style={{
								marginTop: "0",
								justifyContent: "center",
								whiteSpace: "nowrap",
								width: "100%",
							}}
							className="back-home-btn"
							onClick={() => history.push("/launch-pad")}
						>
							<span>Back to Launchpad</span> <FiChevronRight size={26} />
						</button>
					</div>
				</div>
			</div>
		</Dialog>
	);
};

export default withRouter(ProjectListedModal);
