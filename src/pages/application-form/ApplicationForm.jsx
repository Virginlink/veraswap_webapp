import { Container } from "@material-ui/core";
import React, { Component } from "react";
import { Select } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import moment from "moment";
import AppBar from "../../components/AppBar";
import Sidebar from "../../components/Sidebar";
import "./ApplicationForm.css";
import binance from "../../assets/images/binance.svg";
import { ProjectListedModal } from "../../components/modals";

export default class ProjectFund extends Component {
	state = {
		projectListedVisible: false,
		selectedItems: [],
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
		} = this.props;

		const { Option } = Select;

		const dropdownItems = ["Standard", "Premium"];

		const getDefaultValue = (selectedItems) => {
			this.setState({
				selectedItems,
			});
		};

		const toggleProjectListed = () => {
			this.setState((state) => ({
				projectListedVisible: !state.projectListedVisible,
			}));
		};

		const { selectedItems, projectListedVisible } = this.state;
		const filteredOptions = dropdownItems.filter((o) => !selectedItems.includes(o));

		const generateArrayOfYears = () => {
			var max = new Date().getFullYear();
			var min = max - 99;
			var years = [];

			for (var i = max; i >= min; i--) {
				years.push(i);
			}
			return years;
		};

		const generateArrayOfMonths = Array.from({ length: 12 }, (e, i) => {
			return new Date(null, i + 1, null).toLocaleDateString("en", { month: "long" });
		});

		const generateArrayOfDays = () => {
			const days = [];
			const dateStart = moment();
			const dateEnd = moment().add(30, "days");
			while (dateEnd.diff(dateStart, "days") >= 0) {
				days.push(dateStart.format("D"));
				dateStart.add(1, "days");
			}
			return days;
		};

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
								<h3 className="project-name" style={{ margin: "0" }}>
									Choose your plan*
								</h3>
								<Select
									suffixIcon={<CaretDownOutlined />}
									defaultValue="Standard"
									style={{ width: 193 }}
									bordered={false}
									onChange={getDefaultValue}
								>
									{selectedItems.length === 0 ? (
										<Option value="Premium">Premium</Option>
									) : (
										filteredOptions.map((item) => (
											<Option key={item} value={item}>
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
										<input type="text" />
									</div>
								</div>
								<div className="input-box">
									<p className="application-desc remove-opacity">Project Website</p>
									<div className="coming-soon-input-container input-div">
										<input type="text" />
									</div>
								</div>
								<div className="input-box">
									<p className="application-desc remove-opacity align-desc">Project Description</p>
									<div className="coming-soon-input-container input-div">
										<input className="project-desc-input" type="text" />
									</div>
								</div>
								<div className="input-box">
									<p className="application-desc remove-opacity">Social Media Handles</p>
									<div className="coming-soon-input-container input-div">
										<input type="text" />
									</div>
								</div>
								<div className="input-box">
									<p className="application-desc remove-opacity">Smart Contract Address</p>
									<div className="coming-soon-input-container input-div">
										<input type="text" />
									</div>
								</div>
								<div className="input-box">
									<p className="application-desc remove-opacity">Token allocated</p>
									<div className="coming-soon-input-container input-div">
										<input type="text" />
									</div>
								</div>
								<div className="input-box">
									<p className="application-desc remove-opacity">Cost per Token</p>
									<div className="coming-soon-input-container input-div">
										<input type="text" />
									</div>
								</div>
								<div className="input-box">
									<p className="application-desc remove-opacity">Start Date</p>
									<div className="date-container input-div">
										<Select suffixIcon={<CaretDownOutlined />} defaultValue="July" bordered={false}>
											{generateArrayOfMonths.map((month) => (
												<Option key={month} value={month}>
													{month}
												</Option>
											))}
										</Select>
										<Select suffixIcon={<CaretDownOutlined />} defaultValue={12} bordered={false}>
											{generateArrayOfDays().map((day) => (
												<Option key={day} value={day}>
													{day}
												</Option>
											))}
										</Select>
										<Select suffixIcon={<CaretDownOutlined />} defaultValue={2021} bordered={false}>
											{generateArrayOfYears().map((year) => (
												<Option key={year} value={year}>
													{year}
												</Option>
											))}
										</Select>
									</div>
								</div>
								<div className="input-box">
									<p className="application-desc remove-opacity">End Date</p>
									<div className="date-container input-div">
										<Select
											suffixIcon={<CaretDownOutlined />}
											defaultValue="December"
											bordered={false}
										>
											{generateArrayOfMonths.map((month) => (
												<Option key={month} value={month}>
													{month}
												</Option>
											))}
										</Select>
										<Select suffixIcon={<CaretDownOutlined />} defaultValue={12} bordered={false}>
											{generateArrayOfDays().map((day) => (
												<Option key={day} value={day}>
													{day}
												</Option>
											))}
										</Select>
										<Select suffixIcon={<CaretDownOutlined />} defaultValue={2021} bordered={false}>
											{generateArrayOfYears().map((year) => (
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
											<img src={binance} alt="binance" />
											<p>Binance</p>
										</div>
									</div>
								</div>
							</div>
							<div className="create-project-container">
								<button className="buy-action-button create-btn" onClick={toggleProjectListed}>
									Create Project
								</button>
							</div>
						</div>
						<ProjectListedModal open={projectListedVisible} onClose={toggleProjectListed} />
					</Container>
				</div>
			</>
		);
	}
}
