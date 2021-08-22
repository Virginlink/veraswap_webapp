import React, { Component } from "react";
import { Container, IconButton, CircularProgress } from "@material-ui/core";
import { notification, Select, Tooltip } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import { AiFillPlusCircle, AiOutlineInfoCircle } from "react-icons/ai";
import { MdDeleteSweep } from "react-icons/md";
import moment from "moment";

import Web3 from "web3";
import { createProject } from "../../utils/idoHelpers";
import { getFileFromIPFS, uploadJSONToIPFS } from "../../utils/ipfs";
import AppBar from "../../components/AppBar";
import Sidebar from "../../components/Sidebar";
import { ProjectCheckoutModal, ProjectListedModal } from "../../components/modals";
import Logo from "../../assets/images/vrap-red.svg";
import "./ApplicationForm.css";
import ExternalLink from "../../components/Transactions/ExternalLink";

export default class ProjectFund extends Component {
	state = {
		isProjectListed: false,
		plan: ["standard"],
		socials: ["twitter", "facebook", "telegram"],
		selectedPlan: "standard",
		socialHandles: [
			{
				name: "twitter",
				link: "",
				error: "",
			},
		],
		nameError: "",
		websiteError: "",
		descriptionError: "",
		projectWalletAddressError: "",
		settlementAddressError: "",
		contractAddressError: "",
		tokensAllocatedError: "",
		tokenCostError: "",
		maxCapInVrapError: "",
		startDateError: "",
		creatingProject: false,
		confirmationModalVisible: false,
		projectData: null,
		name: "",
		website: "",
		description: "",
		projectWalletAddress: "",
		contractAddress: "",
		settlementAddress: "",
		tokensAllocated: "",
		tokenCost: "",
		maxCapInVrap: "",
		startDate: new Date(),
		endDate: new Date(moment().add(2, "days").format()),
	};

	async componentDidMount() {
		const project = await getFileFromIPFS("Qmd27TMbkojuNkHsZ3uhzHLYn3oUXhfH6vbVX9FLE75BGL");
		console.log("Retrieved file from hash", project);
	}

	setProjectPlan = (plan) => this.setState({ selectedPlan: plan, plan });

	toggleProjectListed = () => {
		this.setState((state) => ({
			isProjectListed: !state.isProjectListed,
		}));
	};

	generateArrayOfDays = () => {
		const days = [];
		const dateStart = moment();
		const dateEnd = moment().add(30, "days");
		while (dateEnd.diff(dateStart, "days") >= 0) {
			days.push(dateStart.format("D"));
			dateStart.add(1, "days");
		}
		return days.sort((a, b) => a - b);
	};

	generateArrayOfMonths = () =>
		Array.from({ length: 12 }, (_, i) =>
			new Date(null, i + 1, null).toLocaleDateString("en", { month: "long" })
		);

	generateArrayOfYears = () => {
		const max = new Date().getFullYear() + 5;
		const min = max - 99;
		let years = [];

		for (var i = max; i >= min; i--) {
			years.push(i);
		}
		return years;
	};

	handleInputChange = (e) => {
		const numberFields = ["tokensAllocated", "tokenCost", "maxCapInVrap"];
		if (numberFields.includes(e.target.name)) {
			e.target.value.match(/^(\d+)?([.]?\d{0,18})?$/) &&
				this.setState({ [e.target.name]: e.target.value, [`${e.target.name}Error`]: "" });
		} else {
			this.setState({ [e.target.name]: e.target.value, [`${e.target.name}Error`]: "" });
		}
	};

	handleSocialHandleChange = (e) => {
		const input = {
			name: e.target.name,
			link: e.target.value,
			error: "",
		};
		const handleIndex = this.state.socialHandles.findIndex(
			(handle) => handle.name === e.target.name
		);
		if (handleIndex > -1) {
			let updatedHandles = [...this.state.socialHandles];
			updatedHandles[handleIndex] = input;
			this.setState({ socialHandles: [...updatedHandles] });
		}
	};

	updateCurrentSocial = (current, original) => {
		const handleIndex = this.state.socialHandles.findIndex((handle) => handle.name === original);
		let updatedHandles = [...this.state.socialHandles];
		updatedHandles[handleIndex].name = current;
		this.setState({ socialHandles: [...updatedHandles] });
	};

	addNewHandle = () => {
		const { socials, socialHandles } = this.state;
		const newHandleName = socials.filter(
			(handle) => !socialHandles.some((social) => social.name === handle)
		);
		if (newHandleName.length > 0) {
			const newHandle = {
				name: newHandleName[0],
				link: "",
				error: "",
			};
			this.setState({ socialHandles: [...socialHandles, newHandle] });
		}
	};

	removeSocialHandle = (index) => {
		let updatedHandles = [...this.state.socialHandles];
		updatedHandles.splice(index, 1);
		this.setState({ socialHandles: updatedHandles });
	};

	formatMonth = (month) => {
		const months = this.generateArrayOfMonths();
		return months[month];
	};

	updateDate = (type, period, value) => {
		let index = 0;
		if (period === "month") {
			const months = this.generateArrayOfMonths();
			index = months.findIndex((month) => month.toLowerCase() === value.toLowerCase());
		} else if (period === "date") {
			index = value;
		} else if (period === "year") {
			index = value;
		}
		const newDate = moment(type === "start" ? this.state.startDate : this.state.endDate).set(
			period,
			index
		);
		this.setState({ [`${type}Date`]: new Date(newDate), startDateError: "" });
	};

	handleSubmit = () => {
		const { walletConnected, onModalToggle } = this.props;

		const {
			selectedPlan,
			name,
			website,
			description,
			socialHandles: socials,
			projectWalletAddress,
			settlementAddress,
			contractAddress,
			tokensAllocated,
			maxCapInVrap,
			tokenCost,
			startDate,
			endDate,
		} = this.state;
		const stateVariables = Object.keys(this.state);
		const formVariables = stateVariables.slice(18, stateVariables.length - 2);
		const unfilledFormFields = formVariables.filter((field) => !this.state[field]);
		const unfilledSocialIndices = socials
			.map((social, index) => !social.link && index)
			.filter((value) => typeof value === "number");
		if (unfilledFormFields.length > 0 || unfilledSocialIndices.length > 0) {
			let updatedSocials = [...socials];
			updatedSocials = updatedSocials.map((social, index) =>
				unfilledSocialIndices.includes(index)
					? { ...social, error: "This field is required" }
					: social
			);
			this.setState({ socialHandles: updatedSocials });
			unfilledFormFields.map((field) =>
				this.setState({ [`${field}Error`]: "This field is required" })
			);
			return;
		}
		if (
			parseFloat(tokensAllocated) === 0 ||
			parseFloat(tokenCost) === 0 ||
			parseFloat(maxCapInVrap) === 0
		) {
			const numericalFields = ["tokensAllocated", "tokenCost", "maxCapInVrap"];
			const invalidFields = numericalFields.filter((field) => parseFloat(this.state[field]) === 0);
			invalidFields.map((field) =>
				this.setState({ [`${field}Error`]: "This field cannot be zero" })
			);
			return;
		}
		if (moment(startDate).isBefore(new Date().toDateString())) {
			this.setState({ startDateError: "Start date cannot be in the past" });
			return;
		}
		if (moment(startDate).isSameOrAfter(endDate)) {
			this.setState({ startDateError: "Start date cannot be on/after end date" });
			return;
		}
		if (!walletConnected) {
			onModalToggle(true);
			return;
		}
		const socialHandles = socials.map((handle) => ({ name: handle.name, link: handle.link }));
		const project = {
			plan: selectedPlan,
			name,
			website,
			description,
			socialHandles,
			projectWalletAddress,
			settlementAddress,
			contractAddress,
			tokensAllocated,
			tokenCost,
			maxCapInVrap,
			startDate:
				startDate.toLocaleDateString() === new Date().toLocaleDateString()
					? moment(startDate).add(30, "minutes").unix()
					: moment(startDate).unix(),
			endDate: moment(endDate).unix(),
		};
		this.setState({ confirmationModalVisible: true, projectData: project });
	};

	createProject = () => {
		const { signer } = this.props;
		const {
			projectData: project,
			settlementAddress,
			contractAddress,
			projectWalletAddress,
			tokenCost,
			selectedPlan,
			startDate,
			endDate,
		} = this.state;
		if (project) {
			this.setState({ creatingProject: true, confirmationModalVisible: false }, async () => {
				const web3 = new Web3();
				let ipfsHash = await uploadJSONToIPFS(project);
				if (ipfsHash) {
					ipfsHash = web3.utils.toHex(ipfsHash);
					const projectData = {
						settlementAddress,
						contractAddress,
						projectWallet: projectWalletAddress,
						costPerToken: tokenCost,
						ipfsHash,
						isPremium: selectedPlan === "premium",
						startDate:
							startDate.toLocaleDateString() === new Date().toLocaleDateString()
								? moment(startDate).add(30, "minutes").unix()
								: moment(startDate).unix(),
						endDate: moment(endDate).unix(),
						signer,
					};
					createProject(projectData)
						.then(async (res) => {
							notification.info({
								key: "projectCreationProcessingNotification",
								message: "Creating project. You can view the transaction here.",
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
							notification.close("projectCreationProcessingNotification");
							notification.success({
								key: "projectCreationSuccessNotification",
								message: `${this.state.name} created successfully. You can view the transaction here`,
								btn: <ExternalLink hash={res.data.hash}>View Transaction</ExternalLink>,
								duration: 3,
							});
							const stateVariables = Object.keys(this.state);
							const formVariables = stateVariables.slice(18, stateVariables.length - 2);
							formVariables.map((field) => this.setState({ [field]: "" }));
							const updatedSocialHandles = this.state.socialHandles.map((social) => ({
								...social,
								link: "",
							}));
							this.setState({
								isProjectListed: true,
								socialHandles: updatedSocialHandles,
								startDate: new Date(),
								endDate: new Date(moment().add(2, "days").format()),
							});
						})
						.catch((err) => {
							notification["error"]({
								message: "Couldn't create project",
								description: err.message,
							});
						})
						.finally(() => {
							this.setState({ creatingProject: false });
						});
				} else {
					this.setState({ creatingProject: false }, () => {
						notification["error"]({
							message: "Couldn't create project",
							description: "Something went wrong. Please try again",
						});
					});
				}
			});
		}
	};

	render() {
		const {
			theme,
			onThemeToggle,
			modalVisible,
			onModalToggle,
			walletAddress,
			walletConnected,
			ethBalance,
			vrapBalance,
			signer,
		} = this.props;

		const { Option } = Select;

		const plans = ["standard", "premium"];

		const {
			socials,
			plan,
			selectedPlan,
			name,
			nameError,
			website,
			websiteError,
			description,
			descriptionError,
			socialHandles,
			projectWalletAddress,
			projectWalletAddressError,
			settlementAddress,
			settlementAddressError,
			contractAddress,
			contractAddressError,
			tokensAllocated,
			tokensAllocatedError,
			tokenCost,
			tokenCostError,
			maxCapInVrap,
			maxCapInVrapError,
			isProjectListed,
			startDate,
			startDateError,
			endDate,
			creatingProject,
			confirmationModalVisible,
			projectData,
		} = this.state;
		const filteredOptions = plans.filter((o) => !plan.includes(o));
		return (
			<>
				<Sidebar active="ico" theme={theme} onThemeToggle={onThemeToggle} />
				<div className="app-container">
					<AppBar
						active="stake"
						theme={theme}
						onThemeToggle={onThemeToggle}
						modalVisible={modalVisible}
						onModalToggle={onModalToggle}
						walletAddress={walletAddress}
						walletConnected={walletConnected}
						ethBalance={ethBalance}
						vrapBalance={vrapBalance}
						isTestnet
					/>
					<Container maxWidth="md">
						<div className="ido-parent-container">
							<h1 className="ido-header" style={{ textAlign: "left" }}>
								New Application
							</h1>
							<p className="application-desc">
								Please fill in this form to apply for Veraswap Launchpad. Please note that the
								information you provide to us may be made public in the future in accordance with
								our data protection policy.
							</p>
							<div className="choose-plan">
								<h3 className="project-name" style={{ margin: 0, paddingTop: 0 }}>
									Choose your plan*
								</h3>
								<Select
									suffixIcon={<CaretDownOutlined />}
									defaultValue="Standard"
									value={selectedPlan}
									style={{ width: 193, textTransform: "capitalize" }}
									bordered={false}
									onChange={this.setProjectPlan}
								>
									{plan.length === 0 ? (
										<Option value="premium">Premium</Option>
									) : (
										filteredOptions.map((item) => (
											<Option key={item} value={item} style={{ textTransform: "capitalize" }}>
												{item}
											</Option>
										))
									)}
								</Select>
							</div>
							<div className="form-container">
								<div className="input-box">
									<p className="application-desc remove-opacity">Project Name</p>
									<div className="coming-soon-input-container input-div">
										<input
											required
											name="name"
											type="text"
											value={name}
											onChange={this.handleInputChange}
										/>
									</div>
								</div>
								<p className="error-message">{nameError}</p>
								<div className="input-box">
									<p className="application-desc remove-opacity">Project Website</p>
									<div className="coming-soon-input-container input-div">
										<input
											required
											name="website"
											type="url"
											value={website}
											onChange={this.handleInputChange}
										/>
									</div>
								</div>
								<p className="error-message">{websiteError}</p>
								<div className="input-box">
									<p className="application-desc remove-opacity align-desc">Project Description</p>
									<div className="coming-soon-input-container input-div">
										<textarea
											required
											rows="5"
											name="description"
											className="project-desc-input"
											type="text"
											value={description}
											onChange={this.handleInputChange}
										/>
									</div>
								</div>
								<p className="error-message">{descriptionError}</p>
								<div className="input-box" style={{ alignItems: "flex-start" }}>
									<p className="application-desc remove-opacity" style={{ paddingTop: "16px" }}>
										Social Media Handles
									</p>
									<div className="coming-soon-input-container input-div">
										<div
											style={{
												display: "grid",
												gridAutoRows: "auto",
												rowGap: "1.25rem",
												marginBottom: "1rem",
											}}
										>
											{socialHandles.map(({ name, link, error }, index) => (
												<div>
													<div className="with-prefix">
														<Select
															suffixIcon={<CaretDownOutlined />}
															value={name}
															style={{
																textTransform: "capitalize",
															}}
															bordered={false}
															dropdownClassName="social-dropdown"
															onChange={(e) => this.updateCurrentSocial(e, name)}
															disabled={socialHandles.length === socials.length}
														>
															{socials
																.filter(
																	(value) => !socialHandles.find((handle) => handle.name === value)
																)
																.map((social) => (
																	<Option
																		name={social}
																		key={social}
																		value={social}
																		style={{ textTransform: "capitalize", textAlign: "center" }}
																	>
																		{social}
																	</Option>
																))}
														</Select>
														<input
															required
															name={name}
															type="url"
															value={link}
															onChange={this.handleSocialHandleChange}
															data-with-suffix={index > 0}
														/>
														{index > 0 && (
															<IconButton
																className="remove-handle"
																onClick={() => this.removeSocialHandle(index)}
															>
																<MdDeleteSweep color="#e60000" />
															</IconButton>
														)}
													</div>
													<p className="error-message" style={{ marginTop: "0.5rem" }}>
														{error}
													</p>
												</div>
											))}
										</div>
										{socialHandles.length < socials.length && (
											<span style={{ color: "#e60000" }}>
												<IconButton onClick={this.addNewHandle}>
													<AiFillPlusCircle color="#e60000" />
												</IconButton>
												<span
													style={{ fontWeight: 600, fontSize: "15px", cursor: "pointer" }}
													onClick={this.addNewHandle}
												>
													Add another handle
												</span>
											</span>
										)}
									</div>
								</div>
								<div className="input-box">
									<p className="application-desc remove-opacity">Project Wallet Address</p>
									<div className="coming-soon-input-container input-div">
										<Tooltip
											placement="left"
											title="For deposits and withdrawals of tokens to be sold"
										>
											<AiOutlineInfoCircle className="tooltip-icon" size={20} />
										</Tooltip>
										<input
											required
											name="projectWalletAddress"
											type="text"
											value={projectWalletAddress}
											onChange={this.handleInputChange}
											data-with-suffix
										/>
									</div>
								</div>
								<p className="error-message">{projectWalletAddressError}</p>
								<div className="input-box">
									<p className="application-desc remove-opacity">Settlement Address</p>
									<div className="coming-soon-input-container input-div">
										<Tooltip placement="left" title="Address to which VRAP will be settled to">
											<AiOutlineInfoCircle className="tooltip-icon" size={20} />
										</Tooltip>
										<input
											required
											name="settlementAddress"
											type="text"
											value={settlementAddress}
											onChange={this.handleInputChange}
											data-with-suffix
										/>
									</div>
								</div>
								<p className="error-message">{settlementAddressError}</p>
								<div className="input-box">
									<p className="application-desc remove-opacity">Smart Contract Address</p>
									<div className="coming-soon-input-container input-div">
										<input
											required
											name="contractAddress"
											type="text"
											value={contractAddress}
											onChange={this.handleInputChange}
										/>
									</div>
								</div>
								<p className="error-message">{contractAddressError}</p>
								<div className="input-box">
									<p className="application-desc remove-opacity">Tokens allocated</p>
									<div className="coming-soon-input-container input-div">
										<input
											required
											name="tokensAllocated"
											type="text"
											value={tokensAllocated}
											onChange={this.handleInputChange}
										/>
									</div>
								</div>
								<p className="error-message">{tokensAllocatedError}</p>
								<div className="input-box">
									<p className="application-desc remove-opacity">Cost per Token ($)</p>
									<div className="coming-soon-input-container input-div">
										<input
											required
											name="tokenCost"
											type="text"
											value={tokenCost}
											onChange={this.handleInputChange}
										/>
									</div>
								</div>
								<p className="error-message">{tokenCostError}</p>
								<div className="input-box">
									<p className="application-desc remove-opacity">Max cap (VRAP)</p>
									<div className="coming-soon-input-container input-div">
										<input
											required
											name="maxCapInVrap"
											type="text"
											value={maxCapInVrap}
											onChange={this.handleInputChange}
										/>
									</div>
								</div>
								<p className="error-message">{maxCapInVrapError}</p>
								<div className="input-box">
									<p className="application-desc remove-opacity">Start Date</p>
									<div className="date-container input-div">
										<Select
											suffixIcon={<CaretDownOutlined />}
											value={this.formatMonth(startDate.getMonth())}
											bordered={false}
											onChange={(e) => this.updateDate("start", "month", e)}
										>
											{this.generateArrayOfMonths().map((month) => (
												<Option key={month} value={month}>
													{month}
												</Option>
											))}
										</Select>
										<Select
											suffixIcon={<CaretDownOutlined />}
											value={startDate.getDate()}
											bordered={false}
											onChange={(e) => this.updateDate("start", "date", e)}
										>
											{this.generateArrayOfDays().map((day) => (
												<Option key={day} value={day}>
													{day}
												</Option>
											))}
										</Select>
										<Select
											suffixIcon={<CaretDownOutlined />}
											value={startDate.getFullYear()}
											bordered={false}
											onChange={(e) => this.updateDate("start", "year", e)}
										>
											{this.generateArrayOfYears().map((year) => (
												<Option key={year} value={year}>
													{year}
												</Option>
											))}
										</Select>
									</div>
								</div>
								<p className="error-message" style={{ marginTop: "-1rem" }}>
									{startDateError}
								</p>
								<div className="input-box">
									<p className="application-desc remove-opacity">End Date</p>
									<div className="date-container input-div">
										<Select
											suffixIcon={<CaretDownOutlined />}
											bordered={false}
											value={this.formatMonth(endDate.getMonth())}
											onChange={(e) => this.updateDate("end", "month", e)}
										>
											{this.generateArrayOfMonths().map((month) => (
												<Option key={month} value={month}>
													{month}
												</Option>
											))}
										</Select>
										<Select
											suffixIcon={<CaretDownOutlined />}
											value={endDate.getDate()}
											bordered={false}
											onChange={(e) => this.updateDate("end", "date", e)}
										>
											{this.generateArrayOfDays().map((day) => (
												<Option key={day} value={day}>
													{day}
												</Option>
											))}
										</Select>
										<Select
											suffixIcon={<CaretDownOutlined />}
											value={endDate.getFullYear()}
											bordered={false}
											onChange={(e) => this.updateDate("end", "year", e)}
										>
											{this.generateArrayOfYears().map((year) => (
												<Option key={year} value={year}>
													{year}
												</Option>
											))}
										</Select>
									</div>
								</div>
								<div className="input-box">
									<p className="application-desc remove-opacity">Cost per Token</p>
									<div className="input-div">
										<div className="binance">
											<img src={Logo} alt="binance" />
											<p>VRAP</p>
										</div>
									</div>
								</div>
							</div>
							<div className="create-project-container">
								<button
									className="buy-action-button create-btn"
									disabled={creatingProject}
									onClick={this.handleSubmit}
								>
									{!creatingProject ? (
										"Create project"
									) : (
										<>
											Creating project{" "}
											<CircularProgress
												thickness={8}
												size={14}
												style={{ color: "#FFF", marginLeft: "8px" }}
											/>
										</>
									)}
								</button>
							</div>
						</div>
						<ProjectListedModal open={isProjectListed} onClose={this.toggleProjectListed} />
						<ProjectCheckoutModal
							theme={theme}
							visible={confirmationModalVisible}
							walletConnected={walletConnected}
							walletAddress={walletAddress}
							signer={signer}
							project={projectData}
							onClose={() => this.setState({ confirmationModalVisible: false, projectData: null })}
							onConfirm={this.createProject}
						/>
					</Container>
				</div>
			</>
		);
	}
}
