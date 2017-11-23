import React from 'react';
import * as d3 from "d3";
// import d3Tip from "d3-tip";
import myData from "../data/Justice League (2017)Nov 18 0-03-49";
// d3.tip = d3Tip;

export default class OChart extends React.Component {

		constructor(props) {
			super(props);
			this.state = {};
		}

		// initializeTip() { 	tip = d3.tip().attr('class', 'd3-tip').html(d => d); }

		componentDidMount() {
			// this.executionFlow();
		}

		render() {
			const overAllRatingData = myData.rNum;
			const chartdata = Object.values(overAllRatingData);
			const xAxisData = Object
				.keys(overAllRatingData)
				.map(i => {
					// eslint-disable-next-line
					return parseInt(i);
				});
			const margin = {
				top: 60,
				right: 20,
				bottom: 50,
				left: 70
			};
			const cheight = 500;
			const cwidth = 620;
			const chartHeight = cheight - margin.top - margin.bottom;
			const chartWidth = cwidth - margin.left - margin.right;
// eslint-disable-next-line
			const yScale = d3
			.scaleLinear()
			.domain([
				0, d3.max(chartdata)
			])
			.range([0, chartHeight]);
			const yAxisScale = d3
			.scaleLinear()
			.domain([
				0, d3.max(chartdata)
			])
			.range([chartHeight, 0]);
			// eslint-disable-next-line
			const xScale = d3
			.scaleBand()
			.domain(xAxisData)
			.range([0, chartWidth]);
			// eslint-disable-next-line
			const colors = d3
			.scaleLinear()
			.domain([
				0, chartdata.length * .33,
				chartdata.length * .66,
				chartdata.length
			])
			.range(['#FF0000', '#F18D05', '#D0D102', '#00A1CB']);
			const xAxis = d3
			.axisBottom().scale(xScale);
			const yAxis = d3
			.axisLeft()
			.scale(yAxisScale)
			.tickFormat(d3.format(",.3s"));
			
			const chart = chartdata.map((d,i)=> <rect
			key = {'rect'+i}
			width = {xScale.bandwidth()}
			x = {xScale(i+1)}
			height = {yScale(d)}
			y = {cheight-yScale(d)}
			style={{fill: colors(i), stroke: d3.color('#00A9E0').darker(.6), "stroke-width": 2}}
			/>) 

			return ( <div className = "imdb" >
				<svg className = "bar-chart1" width = {cwidth} height = {cheight} style = {{background:'#67CDDC'}}>
					<g transform = {`translate(${margin.left}, ${cheight - margin.bottom})`} ref = {node => d3.select(node).call(xAxis)}/>
					<g transform = {`translate(${margin.left}, ${margin.top})`} ref = {node => d3.select(node).call(yAxis)}/>
					<g transform = {`translate(${margin.left}, -${margin.bottom})`} >{chart}</g>
				</svg>
				</div>);
			}
		}