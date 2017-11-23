import React from 'react';
import * as d3 from "d3";
import myData from "../data/Justice League (2017)Nov 18 0-03-49";

export default class OChart extends React.Component {
    
            constructor(props) {
                super(props);
                this.state = {};
                this.overAllRatingData = myData.rNum;
                this.chartdata = Object.values(this.overAllRatingData);
                this.xAxisData = Object
                .keys(this.overAllRatingData)
                .map(i => {
                    // eslint-disable-next-line
                    return parseInt(i);
                });
                this.margin = {
                    top: 60,
                    right: 20,
                    bottom: 50,
                    left: 70
                };
                this.height = 500;
                this.width = 620;
                this.chartHeight = this.height - this.margin.top - this.margin.bottom;
                this.chartWidth = this.width - this.margin.left - this.margin.right;
                this.executionFlow = this.executionFlow.bind(this);
            }

            executionFlow(){
                const yScale = d3.scaleLinear()
                .domain([0, d3.max(this.chartdata)])
                .range([0, this.chartHeight]);
              const yAxisScale = d3.scaleLinear()
                .domain([0, d3.max(this.chartdata)])
                .range([this.chartHeight, 0]);
              const xScale = d3.scaleBand()
                .domain(this.xAxisData)
                .range([0, this.chartWidth]);
              const colors = d3.scaleLinear()
                .domain([0, this.chartdata.length * .33, this.chartdata.length * .66, this.chartdata.length])
                .range(['#CC2211','#F18D05','#D0D102','#00A1CB']);
              let dynamicColor;
              
              //initiate svg container
              const svg = this.node

              d3.select(svg)
                .attr('width', this.width)
                .attr('height', this.height)
                .style('background', '#67CDDC')

              //Axes rendering
              const xAxis = d3.axisBottom().scale(xScale);
              d3.select(svg).append('g')
                .attr('transform', `translate(${this.margin.left}, ${this.height - this.margin.bottom})`)
                .call(xAxis);
              const yAxis = d3.axisLeft().scale(yAxisScale).tickFormat(d3.format(",.3s"));
              d3.select(svg).append('g')
                .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)
                .call(yAxis)
              
              //bars rendering
              const chart =  d3.select(svg).append('g')
                .attr('transform', `translate(${this.margin.left}, -${this.margin.bottom})`)
                .selectAll('rect').data(this.chartdata)
                .enter().append('rect')
                  .attr('width', xScale.bandwidth())
                  .attr('x', (data, i) => xScale(i+1))
                  .attr('height', 0)
                  .attr('y', this.height)
                  .style('fill', (data, i) => colors(i))
                  .style('stroke', d3.color('#00A9E0').darker(.6))
                  .style('stroke-width', 2)
                  .on('mouseover', data => {
                    const { target } = d3.event;
                    dynamicColor = d3.color(target.style.fill);
                    d3.select(target)
                      .style('fill', dynamicColor.brighter(1.5))
                  })
                  .on('mouseout', data => {
                    const { target } = d3.event;
                    d3.select(target)
                      .style('fill', dynamicColor);
                  });
              
              //from left to right bars will rise from 0 to their height
              chart.transition()
                .attr('height', yScale)
                .attr('y', data => this.height - yScale(data))
                .delay((data, i) => i * 20)
                .duration(650)
                .ease(d3.easeSinIn);
              
              //put texts in svg
              d3.select(svg).append('text')
                  .attr('transform', `translate(${this.margin.left}, ${this.margin.top})rotate(-90)`)
                .text("Number of votes")
                .attr("y", -this.margin.left + 20)
                .attr("x", -this.chartHeight/2)
                .attr("text-anchor", "middle")  
              
                d3.select(svg).append('text')
                .attr('x', this.width / 2)
                .attr('y', this.margin.top / 2)
                .attr('text-anchor', 'middle')
                .style('font-family', 'Calibri')
                .style('font-size', 30)
                .style('fill', 'white')
                .text(`IMDB ratings of ${myData.title}`);
              
                d3.select(svg).append("text")
                .text("Rating given")
                .attr("x", this.width / 2)
                .attr("y", this.height - this.margin.bottom/2 +10)
                .attr("text-anchor", "middle")
            }

            componentDidMount() {
                this.executionFlow();
            }
    
            componentDidUpdate() {
                this.executionFlow();                
            }
            render() {
                return (<svg className = "bar-chart" ref={node => this.node = node}>
                    </svg>);
                }
            }