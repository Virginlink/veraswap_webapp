import React, { Component } from "react";
import Chart from "react-apexcharts";

export default class PurchaseHistoryChart extends Component {
	state = {
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
			dataLabels: {
				enabled: false,
			},
			grid: {
				show: false,
			},
			xaxis: {
				categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
				labels: {
					show: false,
				},
				axisTicks: {
					show: false,
				},
				axisBorder: {
					show: true,
					color: "#4B5563",
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
				data: [30, 40, 45, 50, 49, 60, 70, 91],
			},
		],
	};

	render() {
		return (
			<Chart
				options={this.state.options}
				series={this.state.series}
				type="bar"
				width="100%"
				height="500"
			/>
		);
	}
}
