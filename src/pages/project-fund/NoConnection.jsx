import { Empty } from "antd";

const NoConnection = () => {
	return (
		<div style={{ height: "50vh", display: "flex", placeItems: "center" }}>
			<Empty
				className="projects-empty-status"
				description="Connect your wallet to view project details"
			/>
		</div>
	);
};

export default NoConnection;
