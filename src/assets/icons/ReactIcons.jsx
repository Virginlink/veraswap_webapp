import React from "react";

const Loading = ({ style }) => {
	return (
		<svg
			style={style || {}}
			className="connection-loader"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 9.27455 20.9097 6.80375 19.1414 5"
				strokeWidth="2.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			></path>
		</svg>
	);
};

const Loaded = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="16"
			height="16"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			color="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
			<polyline points="22 4 12 14.01 9 11.01"></polyline>
		</svg>
	);
};

const AccountAvatar = () => {
	return (
		<svg
			height="100"
			version="1.1"
			width="100"
			xmlns="http://www.w3.org/2000/svg"
			xmlnsXlink="http://www.w3.org/1999/xlink"
			style={{
				overflow: "hidden",
				position: "relative",
			}}
		>
			<rect
				x="0"
				y="0"
				width="16"
				height="16"
				rx="0"
				ry="0"
				fill="#f91e01"
				stroke="none"
				style={{
					WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
				}}
			></rect>
			<rect
				x="0"
				y="0"
				width="16"
				height="16"
				rx="0"
				ry="0"
				fill="#c81465"
				stroke="none"
				transform="matrix(0.6111,-0.7916,0.7916,0.6111,-5.5477,11.7858)"
				style={{
					WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
				}}
			></rect>
			<rect
				x="0"
				y="0"
				width="16"
				height="16"
				rx="0"
				ry="0"
				fill="#237fe1"
				stroke="none"
				transform="matrix(-0.7983,-0.6023,0.6023,-0.7983,1.3671,25.6874)"
				style={{
					WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
				}}
			></rect>
			<rect
				x="0"
				y="0"
				width="16"
				height="16"
				rx="0"
				ry="0"
				fill="#18b7f2"
				stroke="none"
				transform="matrix(0.9689,-0.2476,0.2476,0.9689,-13.2583,-0.0478)"
				style={{
					WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
				}}
			></rect>
		</svg>
	);
};

const Settings = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<circle cx="12" cy="12" r="3"></circle>
			<path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
		</svg>
	);
};

const Question = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="16"
			height="16"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<circle cx="12" cy="12" r="10"></circle>
			<path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
			<line x1="12" y1="17" x2="12.01" y2="17"></line>
		</svg>
	);
};

const More = () => {
	return (
		<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
			<path
				d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			></path>
			<path
				d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			></path>
			<path
				d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			></path>
		</svg>
	);
};

const Blog = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="14"
			height="14"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<circle cx="12" cy="12" r="10"></circle>
			<line x1="12" y1="16" x2="12" y2="12"></line>
			<line x1="12" y1="8" x2="12.01" y2="8"></line>
		</svg>
	);
};

const Docs = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="14"
			height="14"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
			<path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
		</svg>
	);
};

const Twitter = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="14"
			height="14"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
		</svg>
	);
};

const Telegram = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="14"
			height="14"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
		</svg>
	);
};

const Close = ({ onClick }) => {
	return (
		<svg
			style={{ cursor: "pointer" }}
			onClick={onClick}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<line x1="18" y1="6" x2="6" y2="18"></line>
			<line x1="6" y1="6" x2="18" y2="18"></line>
		</svg>
	);
};

const Copy = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="16"
			height="16"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
			<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
		</svg>
	);
};

const ExternalLink = () => {
	return (
		<svg
			style={{
				marginRight: "3px",
				position: "relative",
				top: "3px",
			}}
			xmlns="http://www.w3.org/2000/svg"
			width="16"
			height="16"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
			<polyline points="15 3 21 3 21 9"></polyline>
			<line x1="10" y1="14" x2="21" y2="3"></line>
		</svg>
	);
};

const Stake = ({ style }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="34.133"
			height="30.881"
			viewBox="0 0 34.133 30.881"
			style={style || {}}
		>
			<g transform="translate(0.001 -15.004)">
				<path
					className="a"
					d="M11.377,24.756c6.512,0,11.377-2.574,11.377-4.876S17.888,15,11.377,15,0,17.578,0,19.88,4.865,24.756,11.377,24.756Z"
					transform="translate(-0.001)"
				/>
				<path
					className="a"
					d="M11.377,234.176a23.819,23.819,0,0,0,2.735-.156,13.017,13.017,0,0,1-1.794-3.112c-.312.011-.626.018-.941.018a22.691,22.691,0,0,1-9.921-2.076A12.881,12.881,0,0,1,0,228v1.3C0,231.6,4.865,234.176,11.377,234.176Z"
					transform="translate(-0.001 -189.917)"
				/>
				<path
					className="a"
					d="M11.376,174.185h.1a13.073,13.073,0,0,1,0-3.251h-.1a22.692,22.692,0,0,1-9.921-2.076A12.891,12.891,0,0,1,0,168.013v1.3C0,171.611,4.865,174.185,11.376,174.185Z"
					transform="translate(0 -136.427)"
				/>
				<path
					className="a"
					d="M11.376,114.193q.484,0,.955-.019a13.022,13.022,0,0,1,2.035-3.4,27.317,27.317,0,0,1-2.99.164,22.692,22.692,0,0,1-9.921-2.076A12.889,12.889,0,0,1,0,108.021v1.3C0,111.619,4.865,114.193,11.376,114.193Z"
					transform="translate(0 -82.937)"
				/>
				<path
					className="a"
					d="M136.592,124.327a9.716,9.716,0,0,0-1.627,5.388,9.8,9.8,0,0,0,.1,1.391,9.677,9.677,0,0,0,1.015,3.133,9.757,9.757,0,1,0,.512-9.912Z"
					transform="translate(-120.34 -93.583)"
				/>
			</g>
		</svg>
	);
};

const Swap = ({ style }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="34.133"
			height="31.557"
			viewBox="0 0 34.133 31.557"
			style={style || {}}
		>
			<defs></defs>
			<g transform="translate(0 -19.32)">
				<path
					className="a"
					d="M6.179,32.432a1.067,1.067,0,0,0,1.508,0l1.379-1.379a1.067,1.067,0,0,0,0-1.508L7.687,28.165H26.667a3.2,3.2,0,0,1,3.2,3.2,1.6,1.6,0,0,0,1.6,1.6h1.067a1.6,1.6,0,0,0,1.6-1.6A7.475,7.475,0,0,0,26.667,23.9H7.687l1.379-1.379a1.067,1.067,0,0,0,0-1.508L7.687,19.632a1.067,1.067,0,0,0-1.508,0L.156,25.655a.534.534,0,0,0,0,.755Z"
				/>
				<path
					className="a"
					d="M27.954,288.533a1.067,1.067,0,0,0-1.508,0l-1.379,1.379a1.065,1.065,0,0,0,0,1.508l1.379,1.379H7.467a3.2,3.2,0,0,1-3.2-3.2,1.6,1.6,0,0,0-1.6-1.6H1.6A1.6,1.6,0,0,0,0,289.6a7.475,7.475,0,0,0,7.467,7.467H26.446l-1.379,1.379a1.065,1.065,0,0,0,0,1.508l1.379,1.379a1.067,1.067,0,0,0,1.508,0l6.023-6.023a.534.534,0,0,0,0-.755Z"
					transform="translate(0 -250.768)"
				/>
			</g>
		</svg>
	);
};

const Pool = ({ style }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="39.103"
			height="27.649"
			viewBox="0 0 39.103 27.649"
			style={style || {}}
		>
			<defs></defs>
			<g transform="translate(0 -60.99)">
				<path
					className="a"
					d="M37.958,390.99H1.146A1.13,1.13,0,0,0,0,392.1v1.113a2.26,2.26,0,0,0,2.291,2.226H36.812a2.26,2.26,0,0,0,2.291-2.226V392.1A1.13,1.13,0,0,0,37.958,390.99Z"
					transform="translate(0 -306.803)"
				/>
				<path
					className="a"
					d="M30,62.1V83.253H64.651V62.1A1.131,1.131,0,0,0,63.5,60.99H31.15A1.131,1.131,0,0,0,30,62.1Zm18.811,4.126a1.088,1.088,0,0,1,0-1.574,1.177,1.177,0,0,1,1.626,0l2.3,2.226a1.088,1.088,0,0,1,0,1.574l-2.3,2.226a1.177,1.177,0,0,1-1.626,0,1.088,1.088,0,0,1,0-1.574L50.3,67.669ZM41.7,69.4,44,64.945a1.172,1.172,0,0,1,1.543-.5,1.1,1.1,0,0,1,.514,1.494l-2.3,4.453a1.169,1.169,0,0,1-1.543.5A1.1,1.1,0,0,1,41.7,69.4Zm1.029,3.837h16.1a1.114,1.114,0,1,1,0,2.226h-16.1a1.114,1.114,0,1,1,0-2.226Zm0,4.452h16.1a1.114,1.114,0,1,1,0,2.226h-16.1a1.114,1.114,0,1,1,0-2.226ZM35.012,66.882l2.3-2.226a1.177,1.177,0,0,1,1.626,0,1.088,1.088,0,0,1,0,1.574l-1.487,1.439,1.487,1.439a1.088,1.088,0,0,1,0,1.574,1.177,1.177,0,0,1-1.626,0l-2.3-2.226A1.088,1.088,0,0,1,35.012,66.882Zm.813,6.353h2.3a1.114,1.114,0,1,1,0,2.226h-2.3a1.114,1.114,0,1,1,0-2.226Zm0,4.452h2.3a1.114,1.114,0,1,1,0,2.226h-2.3a1.114,1.114,0,1,1,0-2.226Z"
					transform="translate(-27.774 0)"
				/>
			</g>
		</svg>
	);
};

const VRAPBlog = ({ style }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="36.475"
			height="36.475"
			viewBox="0 0 36.475 36.475"
			style={style || {}}
		>
			<path d="M18.238,0A18.238,18.238,0,1,0,36.475,18.238,18.227,18.227,0,0,0,18.238,0Zm0,33.626A15.388,15.388,0,1,1,33.626,18.238,15.379,15.379,0,0,1,18.238,33.626Z" />
			<g transform="translate(16.813 9.181)">
				<path
					d="M237.425,128.877A1.425,1.425,0,0,0,236,130.3v9.175a1.425,1.425,0,1,0,2.85,0V130.3A1.425,1.425,0,0,0,237.425,128.877Z"
					transform="translate(-236 -128.877)"
				/>
			</g>
			<g transform="translate(16.314 22.951)">
				<circle cx="1.924" cy="1.924" r="1.924" />
			</g>
		</svg>
	);
};

const VRAPDocs = ({ style }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="26.527"
			height="34.825"
			viewBox="0 0 26.527 34.825"
			style={style || {}}
		>
			<g transform="translate(-61)">
				<path d="M79.3,10.2a2.383,2.383,0,0,1-2.381-2.381V0H64.741A3.745,3.745,0,0,0,61,3.741V31.084a3.745,3.745,0,0,0,3.741,3.741H83.786a3.745,3.745,0,0,0,3.741-3.741V10.2ZM66.577,24.486h4.946a1.02,1.02,0,1,1,0,2.041H66.577a1.02,1.02,0,0,1,0-2.041Zm-1.02-4.421a1.02,1.02,0,0,1,1.02-1.02H81.541a1.02,1.02,0,1,1,0,2.041H66.577A1.02,1.02,0,0,1,65.557,20.065ZM81.541,13.6a1.02,1.02,0,1,1,0,2.041H66.577a1.02,1.02,0,0,1,0-2.041Z" />
				<path
					d="M325,13.62a.34.34,0,0,0,.34.34h7.775a3.732,3.732,0,0,0-.715-.934l-6.558-6.2a3.75,3.75,0,0,0-.842-.6v7.4Z"
					transform="translate(-246.044 -5.798)"
				/>
			</g>
		</svg>
	);
};

const ICO = () => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
			<path
				d="M16,32A16,16,0,0,1,4.686,4.685a15.99,15.99,0,0,1,24.6,20.2,1.25,1.25,0,0,1-2.078-1.389,13.409,13.409,0,1,0-4.227,4.063,1.25,1.25,0,1,1,1.3,2.138A15.974,15.974,0,0,1,16,32ZM8.5,20.249V11.5a1.25,1.25,0,0,0-2.5,0v8.75a1.25,1.25,0,1,0,2.5,0Zm18.625-2.917V14.416a4.188,4.188,0,0,0-8.375,0v2.917a4.188,4.188,0,0,0,8.375,0Zm-2.5-2.916v2.917a1.688,1.688,0,0,1-3.375,0V14.416a1.688,1.688,0,0,1,3.375,0Zm-7.312,4.2a1.25,1.25,0,0,0-2.5,0,.43.43,0,0,1-.468.383h-.981a.761.761,0,0,1-.8-.753V13.5a.761.761,0,0,1,.8-.753h.981a.43.43,0,0,1,.468.383,1.25,1.25,0,0,0,2.5,0,2.93,2.93,0,0,0-2.968-2.883h-.981a3.312,3.312,0,0,0-2.322.931,3.206,3.206,0,0,0-.979,2.322v4.745a3.206,3.206,0,0,0,.979,2.322,3.312,3.312,0,0,0,2.322.931h.981a2.93,2.93,0,0,0,2.968-2.883Zm0,0"
				transform="translate(0.001 0.001)"
			/>
		</svg>
	);
};

const Audit = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="28.916"
			height="36.475"
			viewBox="0 0 28.916 36.475"
		>
			<path
				d="M27.492,25.148a1.425,1.425,0,0,0,1.425-1.425V9.261a5.706,5.706,0,0,0-5.7-5.7H18.729V1.425A1.425,1.425,0,0,0,17.3,0H11.6A1.425,1.425,0,0,0,10.18,1.425V3.562H5.7A5.706,5.706,0,0,0,0,9.261V30.776a5.706,5.706,0,0,0,5.7,5.7H23.217a5.706,5.706,0,0,0,5.7-5.7,1.425,1.425,0,1,0-2.85,0,2.853,2.853,0,0,1-2.85,2.85H5.7a2.853,2.853,0,0,1-2.85-2.85V9.261A2.853,2.853,0,0,1,5.7,6.412h4.48v.712a4.274,4.274,0,1,0,8.549,0V6.412h4.488a2.853,2.853,0,0,1,2.85,2.85V23.723A1.425,1.425,0,0,0,27.492,25.148ZM15.879,7.124a1.425,1.425,0,1,1-2.85,0V2.85h2.85Zm6.227,9.092a1.425,1.425,0,0,1,.358,1.983l-6.339,9.133c-.019.027-.039.054-.06.08a3.672,3.672,0,0,1-2.612,1.361c-.081.005-.162.008-.242.008a3.673,3.673,0,0,1-2.527-1.01l-.02-.019L6.9,24.028A1.425,1.425,0,1,1,8.9,22l3.754,3.713a.814.814,0,0,0,1.163-.058l6.3-9.082a1.425,1.425,0,0,1,1.983-.358Zm0,0"
				transform="translate(0)"
			/>
		</svg>
	);
};

const Analytics = ({ style }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="37.563"
			height="27.563"
			viewBox="0 0 27.563 27.563"
			style={style || {}}
		>
			<path
				d="M24.5,0H3.063A3.062,3.062,0,0,0,0,3.063V24.5a3.062,3.062,0,0,0,3.063,3.062H24.5A3.062,3.062,0,0,0,27.563,24.5V3.063A3.062,3.062,0,0,0,24.5,0ZM9.188,21.438H6.125V10.719H9.188Zm6.125,0H12.25V6.125h3.063Zm6.125,0H18.375V15.313h3.063Z"
				transform="translate(0 0)"
			/>
		</svg>
	);
};

const Game = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="37.195"
			height="24.637"
			viewBox="0 0 37.195 24.637"
		>
			<path
				d="M33.869,13.409c-4.913-8.071-12.313-2.456-12.313-2.456a3.836,3.836,0,0,1-1.966.662H17.607a3.81,3.81,0,0,1-1.966-.66S8.24,5.34,3.326,13.411A24.9,24.9,0,0,0,.394,30.267c.347,2.152,1.49,3.587,3.647,3.407S10.86,27.88,10.86,27.88a2.661,2.661,0,0,1,1.794-.841l11.884,0a2.656,2.656,0,0,1,1.793.841S31,33.492,33.155,33.672s3.3-1.257,3.645-3.407A24.9,24.9,0,0,0,33.869,13.409Zm-19.738,6.57H11.583v2.456a2.375,2.375,0,0,1-1.375.4A1.66,1.66,0,0,1,9,22.387V19.98H6.59a1.935,1.935,0,0,1-.381-1.119,2.567,2.567,0,0,1,.332-1.466H9.091V14.846a2.77,2.77,0,0,1,1.278-.259,3.37,3.37,0,0,1,1.307.307l-.01,2.5h2.407a2.4,2.4,0,0,1,.455,1.192A3.01,3.01,0,0,1,14.131,19.979Zm11.689,2.8a2.017,2.017,0,1,1,2.018-2.017A2.014,2.014,0,0,1,25.82,22.778Zm0-5.55a2.017,2.017,0,1,1,2.018-2.016A2.013,2.013,0,0,1,25.82,17.229Zm5.023,2.979a2.017,2.017,0,1,1,2.018-2.017A2.014,2.014,0,0,1,30.843,20.208Z"
				transform="translate(0 -9.052)"
			/>
		</svg>
	);
};

export {
	Loading,
	Loaded,
	AccountAvatar,
	Settings,
	Question,
	More,
	Blog,
	Docs,
	Twitter,
	Telegram,
	Close,
	Copy,
	ExternalLink,
	Stake,
	Swap,
	Pool,
	VRAPBlog,
	VRAPDocs,
	ICO,
	Audit,
	Analytics,
	Game,
};
