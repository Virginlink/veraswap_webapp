import React, { Component } from "react";
import { Loaded, Loading } from "../../assets/icons/ReactIcons";
import { PROVIDER } from "../../utils/contracts";
export default class Transaction extends Component {
	constructor() {
		super();
		this.state = {
			txSuccess: false,
		};
	}

	componentDidMount() {
		let txInterval = setInterval(() => {
			PROVIDER.getTransaction(this.props.tx.hash)
				.then((res) => {
					if (res.blockNumber) {
						this.setState(
							{
								txSuccess: true,
							},
							() => clearInterval(txInterval)
						);
					}
				})
				.catch((err) => {
					// console.log(err);
				});
		}, 1000);
	}

	render() {
		const { txSuccess } = this.state;
		return (
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					marginTop: "1rem",
				}}
			>
				<a
					style={{ fontSize: "14px" }}
					href={`https://${
						process.env.NODE_ENV === "development" ? "testnet.bscscan.com" : "bscscan.com"
					}/tx/${this.props.tx.hash}`}
					target="_blank"
					rel="noreferrer noopener"
				>
					{this.props.tx.summary}
				</a>
				{!txSuccess ? (
					<div className="connection-status" style={{ padding: 0 }}>
						<Loading style={{ marginRight: 0 }} />
					</div>
				) : (
					<a
						style={{ color: "rgb(39, 174, 96)" }}
						href={`https://${
							process.env.NODE_ENV === "development" ? "testnet.bscscan.com" : "bscscan.com"
						}/tx/${this.props.tx.hash}`}
						target="_blank"
						rel="noreferrer noopener"
					>
						<Loaded />
					</a>
				)}
			</div>
		);
	}
}
