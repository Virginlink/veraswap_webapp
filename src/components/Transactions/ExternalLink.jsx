import React from "react";

const ExternalLink = ({ hash, children, ethereum = false }) => {
	return (
		<a
			style={{ textDecoration: "underline", color: "rgb(220, 36, 16)" }}
			target="_blank"
			rel="noreferrer noopener"
			href={`https://${ethereum ? "kovan.etherscan.io" : "bscscan.com"}/tx/${hash}`}
		>
			{children}
		</a>
	);
};

export default ExternalLink;
