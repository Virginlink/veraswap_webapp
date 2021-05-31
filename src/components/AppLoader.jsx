import React from "react";
import { CircularProgress } from "@material-ui/core";
import Logo from "../assets/images/vrap-red.svg";

const AppLoader = () => {
	return (
		<div className="loading-container">
			<div>
				<img src={Logo} alt="logo" />
				<CircularProgress size={100} thickness={1.5} />
			</div>
		</div>
	);
};

export default AppLoader;
