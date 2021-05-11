import React, { Component } from "react";
import Transaction from "./Transaction";

export default class Transactions extends Component {
	constructor() {
		super();
		this.state = {
			transactions: [],
		};
	}

	componentDidMount() {
		const hashArrayString = localStorage.getItem("hashData");
		if (hashArrayString) {
			let hashArray = JSON.parse(hashArrayString);
			hashArray = hashArray.data.reverse();
			hashArray = hashArray.slice(0, 3);
			this.setState({ transactions: hashArray });
		}
	}

	render() {
		const { transactions } = this.state;
		return (
			<>
				{transactions.length > 0 ? (
					<div>
						<div
							style={{
								display: "flex",
								alignItems: "center",
								justifyContent: "space-between",
								marginBottom: "1rem",
							}}
						>
							<div style={{ fontSize: "20px" }}>Recent transactions</div>
							<a
								href="##"
								style={{ fontSize: "13px" }}
								onClick={(e) => {
									e.preventDefault();
									localStorage.removeItem("hashData");
									this.setState({ transactions: [] });
								}}
							>
								(clear all)
							</a>
						</div>
						{transactions.map((tx) => (
							<Transaction tx={tx} />
						))}
					</div>
				) : (
					"Your transactions will appear here..."
				)}
			</>
		);
	}
}
