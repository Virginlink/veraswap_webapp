import React from "react";
import { FaMedium, FaTelegramPlane, FaTwitter } from "react-icons/fa";

const Footer = () => {
	return (
		<footer className="app-footer">
			<div>&copy; 2021 Veraswap</div>
			<div>
				<a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
					<FaTwitter size={24} />
				</a>
				<a href="https://telegram.org" target="_blank" rel="noopener noreferrer">
					<FaTelegramPlane size={24} />
				</a>
				<a href="https://medium.com" target="_blank" rel="noopener noreferrer">
					<FaMedium size={24} />
				</a>
			</div>
		</footer>
	);
};

export default Footer;
