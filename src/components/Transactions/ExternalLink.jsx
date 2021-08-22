import React from "react";

const ExternalLink = ({ hash, children }) => {
	return (
		<a
			style={{ textDecoration: "underline", color: "rgb(220, 36, 16)" }}
			target="_blank"
			rel="noreferrer noopener"
			href={`https://${
				process.env.NODE_ENV === "development" ? "kovan.etherscan.io" : "bscscan.com"
			}/tx/${hash}`}
		>
			{children}
		</a>
	);
};

export default ExternalLink;
