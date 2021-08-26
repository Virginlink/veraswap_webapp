import { Empty } from "antd";
import React, { Component } from "react";
import Chart from "react-apexcharts";

export default class PurchaseHistoryChart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			options: {
				chart: {
					toolbar: {
						show: false,
					},
				},
				fill: {
					colors: "#E60000",
					type: "gradient",
					gradient: {
						shade: "light",
						type: "diagonal2",
						gradientToColors: "#62181A",
						shadeIntensity: 0,
						opacityFrom: 0.7,
						opacityTo: 0.9,
						stops: [0, 90, 100],
					},
				},
				stroke: {
					curve: "smooth",
					colors: ["#e60000"],
				},
				dataLabels: {
					enabled: false,
				},
				grid: {
					show: false,
				},
				tooltip: {
					theme: props.theme,
					style: {
						fontFamily: "bold",
					},
					x: {
						show: true,
					},
					y: {
						formatter: (value) => `${parseFloat(value).toFixed(4)} ${props.tokenSymbol}`,
					},
					marker: {
						show: false,
					},
				},
				xaxis: {
					labels: {
						show: false,
					},
					axisTicks: {
						show: false,
					},
					axisBorder: {
						show: false,
					},
					tooltip: {
						enabled: false,
					},
				},
				yaxis: {
					labels: {
						show: false,
					},
				},
				plotOptions: {
					bar: {
						columnWidth: "50%",
					},
				},
				states: {
					hover: {
						filter: {
							type: "none",
							value: 0,
						},
					},
					active: {
						allowMultipleDataPointsSelection: false,
						filter: {
							type: "none",
							value: 0,
						},
					},
				},
			},
			series: [
				{
					name: "Tokens sold",
					data: props.series,
				},
			],
		};
	}

	render() {
		const { theme } = this.props;
		const { options, series } = this.state;

		if (series.length === 0) {
			return (
				<div
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						height: "500px",
						width: "100%",
						color: theme === "light" ? "#000" : "#FFF",
					}}
				>
					<Empty description="No recent purchases" />
				</div>
			);
		}

		return <Chart options={options} series={series} type="area" width="100%" height="500" />;
	}
}
