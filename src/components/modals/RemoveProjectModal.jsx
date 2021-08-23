import React, { Component } from "react";
import { CircularProgress, Dialog, Fade } from "@material-ui/core";
import { RiCloseFill } from "react-icons/ri";
import { removeProject } from "../../utils/idoHelpers";
import { notification } from "antd";
import { ExternalLink } from "../../assets/icons/ReactIcons";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Fade timeout={{ enter: 1000, exit: 2000 }} ref={ref} {...props} />;
});

export default class RemoveProjectModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			removing: false,
		};
	}

	handleRemove = () => {
		const { projectId, signer, onRemove } = this.props;
		this.setState({ removing: true }, () => {
			removeProject({ projectId, signer })
				.then(async (res) => {
					notification.info({
						key: "removalProcessingNotification",
						message: "Project removal is being processed. You can view the transaction here.",
						btn: <ExternalLink hash={res.data.hash}>View Transaction</ExternalLink>,
						icon: (
							<CircularProgress
								size={25}
								thickness={5}
								style={{
									color: "#DE0102",
									position: "relative",
									top: "6px",
								}}
							/>
						),
						duration: 0,
					});
					await res.data.wait();
					notification.close("removalProcessingNotification");
					notification.success({
						key: "removalSuccessNotification",
						message: "Project removed successfully. You can view the transaction here",
						btn: <ExternalLink hash={res.data.hash}>View Transaction</ExternalLink>,
						duration: 3,
					});
					onRemove();
				})
				.catch((err) => {
					notification["error"]({
						message: "Couldn't remove project",
						description: err.message,
					});
				})
				.finally(() => this.setState({ removing: false }));
		});
	};

	handleClose = () => {
		this.setState({ removing: false }, () => this.props.onClose());
	};

	render() {
		const {
			theme,
			visible,
			projectWalletAddress,
			walletAddress,
			deposited,
			token: { symbol },
			onWithdraw,
		} = this.props;
		const { removing } = this.state;

		const isAdmin = projectWalletAddress?.toLowerCase() === walletAddress?.toLowerCase();

		return (
			<Dialog
				open={visible}
				TransitionComponent={Transition}
				onClose={this.handleClose}
				onBackdropClick={this.handleClose}
				BackdropProps={{ style: { backgroundColor: "rgba(0, 0, 0, 0.3)" } }}
				PaperProps={{
					style: {
						width: "50vw",
						boxShadow: "rgba(47, 128, 237, 0.05) 0px 4px 8px 0px",
						maxWidth: "500px",
						maxHeight: "90vh",
						display: "flex",
						borderRadius: "20px",
						padding: "1.5rem 0.5rem",
					},
				}}
				scroll="paper"
			>
				<div
					className="modal-header flex-spaced-container"
					style={{ color: theme === "light" ? "#000" : "#FFF", paddingTop: 0 }}
				>
					<h3>{isAdmin ? "Remove project" : "Connect project wallet"}</h3>
					<button className="close-modal-button" onClick={this.handleClose}>
						<RiCloseFill />
					</button>
				</div>
				<div className="modal-content">
					{isAdmin ? (
						<>
							<div className="admin-connect-notice">
								{parseFloat(deposited) > 0 ? (
									<>
										<p>
											Deposited Tokens: {deposited} {symbol}
										</p>
										<p>Please withdraw all deposited tokens to remove the project.</p>
									</>
								) : (
									<p>
										Are you sure to remove the project? Project will be paused until you request to
										resume it again.
									</p>
								)}
								<p>
									Note: Removed projects can be found under the paused projects section in my
									projects
								</p>
							</div>
							<div className="staking-modal-footer">
								{parseFloat(deposited) > 0 ? (
									<button className="staking-modal-button-primary" onClick={onWithdraw}>
										Withdraw {symbol}
									</button>
								) : (
									<button className="staking-modal-button-primary" onClick={this.handleRemove}>
										{removing ? (
											<>
												Removing{" "}
												<CircularProgress
													size={16}
													thickness={5}
													style={{ color: "#FFF", position: "relative", top: "3px" }}
												/>
											</>
										) : (
											"Remove"
										)}
									</button>
								)}
							</div>
						</>
					) : (
						<div className="admin-connect-notice">
							Project can be removed only from the specified project wallet. Connect to project
							wallet account to continue.
							<br />
							<br />
							The project wallet for this project is{" "}
							<span style={{ fontWeight: "bold", color: "#e60000" }}>
								{projectWalletAddress?.slice(0, 5)}...{projectWalletAddress?.slice(-5)}
							</span>
						</div>
					)}
				</div>
			</Dialog>
		);
	}
}
