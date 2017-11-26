import React from 'react';
import * as d3 from "d3";
import myData from "../data/Justice League (2017) timeline.json";
import myData2 from "../data/Justice League (2017)Nov 18 0-03-49";

export default class TimeLine extends React.Component {

        constructor(props) {
            super(props);
            this.state = {};
            this.avgRatingData = myData.map((item) => {
                return item[2]
            });
            this.xAxisData = myData.map((item) => {
                return item[0]
            });
            this.totalVotesData = myData.map((item) => {
                return item[1]
            });
            this.margin = {
                top: 60,
                right: 65,
                bottom: 50,
                left: 65
            };
            this.height = 480;
            this.width = 600;
            this.chartHeight = this.height - this.margin.top - this.margin.bottom;
            this.chartWidth = this.width - this.margin.left - this.margin.right;
            this.chartBg = '#F3B05A';
            this.y1Color = '#A3586D';
            this.y2Color = '#5C4A72';
            this.xColor = '#040C0E';
            this.executionFlow = this.executionFlow.bind(this);
            this.releaseDate = "Nov 17 17";
            this.releaseDateColor = '#52591F';
        }

        executionFlow() {
            const parseDate = d3.timeParse("%b %d %y");
            const y1Scale = d3.scaleLinear()
                .domain([6, 10])
                .range([0, this.chartHeight]);
            const y1AxisScale = d3.scaleLinear()
                .domain([6, 10])
                .range([this.chartHeight, 0]);
            const y2AxisScale = d3.scaleLinear()
                .domain([0, d3.max(this.totalVotesData) + 10000])
                .range([this.chartHeight, 0]);
            const xScale = d3.scaleTime()
                .domain([parseDate(this.xAxisData[0]), parseDate(this.xAxisData[this.xAxisData.length - 1])])
                .range([0, this.chartWidth]);
            const svg = this.node

            d3.select(svg)
                .attr('width', this.width)
                .attr('height', this.height)
                .style('background', this.chartBg)
                .attr("preserveAspectRatio", "xMinYMin meet")
                .attr("viewBox", `0 0 ${this.width} ${this.height}`)
                .on('click', () => {
                    lineAnimate(chart1, 1500);
                    lineAnimate(chart2, 1500);
                })

            //Axes rendering
            const xAxis = d3.axisBottom().scale(xScale).tickFormat(d3.timeFormat("%a %d"));
            const xAxisRender = d3.select(svg).append('g')
                .attr('transform', `translate(${this.margin.left}, ${this.height - this.margin.bottom})`)
                .call(xAxis);

            xAxisRender
                .selectAll('path.domain')
                .attr("stroke", this.xColor)
                .attr("stroke-width", 2);

            xAxisRender
                .selectAll('.tick > line')
                .attr("stroke", this.xColor)
                .attr("stroke-width", 2);

            xAxisRender
                .selectAll('.tick > text')
                .attr("fill", this.xColor)

            const y1Axis = d3.axisLeft().scale(y1AxisScale).tickFormat(d3.format(",.1s")).ticks(5);
            const y1AxisRender = d3.select(svg).append('g')
                .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)
                .call(y1Axis);

            y1AxisRender
                .selectAll('path.domain')
                .attr("stroke", this.y1Color)
                .attr("stroke-width", 2);

            y1AxisRender
                .selectAll('.tick > line')
                .attr("stroke", this.y1Color)
                .attr("stroke-width", 2);

            y1AxisRender
                .selectAll('.tick > text')
                .attr("fill", this.y1Color)

            const y2Axis = d3.axisRight().scale(y2AxisScale).tickFormat(d3.format(",.2s"));
            const y2AxisRender = d3.select(svg).append('g')
                .attr('transform', `translate(${this.margin.left + this.chartWidth}, ${this.margin.top})`)
                .call(y2Axis)

            y2AxisRender
                .selectAll('path.domain')
                .attr("stroke", this.y2Color)
                .attr("stroke-width", 2);

            y2AxisRender
                .selectAll('.tick > line')
                .attr("stroke", this.y2Color)
                .attr("stroke-width", 2);

            y2AxisRender
                .selectAll('.tick > text')
                .attr("fill", this.y2Color)

            //line rendering
            const valueline1 = d3.line()
                .x(function (d) {
                    return xScale(parseDate(d[0]));
                })
                .y(function (d) {
                    return y1AxisScale(d[2]);
                })
                .curve(d3.curveMonotoneX)

            const valueline2 = d3.line()
                .x(function (d) {
                    return xScale(parseDate(d[0]));
                })
                .y(function (d) {
                    return y2AxisScale(d[1]);
                })
                .curve(d3.curveMonotoneX)

            const lineGen = (lineData, lValueline, sColor, sWidth) => {
                return d3.select(svg)
                    .append('g')
                    .attr('transform', `translate(${this.margin.left}, ${this.margin.bottom})`)
                    .attr("class", "line")
                    .append("path")
                    .data([lineData])
                    .attr("d", lValueline)
                    .attr("stroke", sColor)
                    .attr("stroke-width", sWidth)
                    .attr("fill", "none")
            }

            // animate line
            const lineAnimate = (line, duration) => {
                const totalLength = line.node().getTotalLength()
                line
                    .attr("stroke-dasharray", totalLength + " " + totalLength)
                    .attr("stroke-dashoffset", totalLength)
                    .transition()
                    .duration(duration)
                    .ease(d3.easeLinear)
                    .attr("stroke-dashoffset", 0);
            }
            const chart1 = lineGen(myData, valueline1, this.y1Color, '2');
            const chart2 = lineGen(myData, valueline2, this.y2Color, '2');
            lineAnimate(chart1, 1500);
            lineAnimate(chart2, 1500);

            d3.select(svg)
                .append('g')
                .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)
                .attr("class", "releaseDateLine")
                .append("line")
                .attr("y1", 13)
                .attr("y2", this.chartHeight)
                .attr("x1", () => {
                    let x;
                    myData.forEach((item, index) => {
                        if (item[0] === this.releaseDate) {
                            x = xScale(parseDate(item[0]))
                        }
                    })
                    return x;
                })
                .attr("x2", () => {
                    let x;
                    myData.forEach((item, index) => {
                        if (item[0] === this.releaseDate) {
                            x = xScale(parseDate(item[0]))
                        }
                    })
                    return x;
                })
                .attr("stroke", this.releaseDateColor)

            d3.select(svg)
                .append('g')
                .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)
                .attr("class", "releaseDate")
                .append("text")
                .text("Release Date")
                .attr("y", 10)
                .attr("x", () => {
                    let x;
                    myData.forEach((item, index) => {
                        if (item[0] === this.releaseDate) {
                            x = xScale(parseDate(item[0]))
                        }
                    })
                    return x;
                })
                .attr("text-anchor", "middle");

            d3.select(svg)
                .append('g')
                .attr('transform', `translate(${this.margin.left}, ${this.margin.bottom})`)
                .selectAll(".dot")
                .data(myData)
                .enter().append("circle")
                .attr("class", "dot")
                .attr("cx", function (d, i) {
                    return xScale(parseDate(d[0]))
                })
                .attr("cy", function (d) {
                    return y1AxisScale(d[2])
                })
                .attr("r", 5)
                .style('fill', this.y1Color);

            d3.select(svg)
                .append('g')
                .attr('transform', `translate(${this.margin.left}, ${this.margin.bottom})`)
                .selectAll(".dot")
                .data(myData)
                .enter().append("circle")
                .attr("class", "dot")
                .attr("cx", function (d, i) {
                    return xScale(parseDate(d[0]))
                })
                .attr("cy", function (d) {
                    return y2AxisScale(d[1])
                })
                .attr("r", 5)
                .style('fill', this.y2Color);

            //put texts in svg
            d3.select(svg).append('text')
                .attr('transform', `translate(${this.margin.left}, ${this.margin.top})rotate(-90)`)
                .text("Average Rating")
                .attr("y", -this.margin.left / 2)
                .attr("x", -this.chartHeight / 2)
                .attr("text-anchor", "middle");

            d3.select(svg).append('text')
                .attr('transform', `translate(${this.margin.left + this.chartWidth}, ${this.margin.top})rotate(-90)`)
                .text("Total number of votes")
                .attr("y", this.margin.right / 2 + 10)
                .attr("x", -this.chartHeight / 2)
                .attr("text-anchor", "middle");

            d3.select(svg).append('text')
                .attr('x', this.width / 2)
                .attr('y', this.margin.top / 2)
                .attr('text-anchor', 'middle')
                .text(`Timeline of average rating and num of votes for ${myData2.title}`);
        }

        componentDidMount() {
            this.executionFlow();
        }

        componentDidUpdate() {
            this.executionFlow();
        }
        render() {
            return ( < svg className = "line-chart"
                ref = {
                    node => this.node = node
                } >
                <
                /svg>);
            }
        }