import React from 'react';
import * as d3 from "d3";
import myData from "../data/Justice League (2017)Nov 18 0-03-49";

export default class AgeGroups extends React.Component {
    
            constructor(props) {
                super(props);
                this.state = {};
                this.avgRating = myData.rAvg;
                this.yAxisData = Object.keys(myData.rNum).map(i => {
                  // eslint-disable-next-line
                  return parseInt(i);
              });
                this.xAxisData = ["All ages","<18", "18-29", "30-44", "45+"];
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
                this.chartdataKids = [myData.rAll.kids, myData.rMale.kids, myData.rFemale.kids];
                this.chartdataYouth = [myData.rAll.youth, myData.rMale.youth, myData.rFemale.youth];
                this.chartdataMiddle = [myData.rAll.middle, myData.rMale.middle, myData.rFemale.middle];
                this.chartdataOld = [myData.rAll.old, myData.rMale.old, myData.rFemale.old];
                this.chartDataAll = Object.values(myData.rAll).map((d, i)=>{
                    return d[0]
                });
                this.chartDataMale = Object.values(myData.rMale).map((d, i)=>{
                    return d[0]
                });
                this.chartDataFemale = Object.values(myData.rFemale).map((d, i)=>{
                    return d[0]
                });
                console.log('all data', this.chartDataAll);
                this.executionFlow = this.executionFlow.bind(this);                
            }

            executionFlow(){
              console.log('max y ', d3.max(this.yAxisData));
              const xAxisScale = d3.scaleBand()
                .domain(this.xAxisData)
                .range([0, this.chartWidth])
                .padding(0.4);
              const yScale = d3.scaleLinear()
                .domain([0, d3.max(this.yAxisData)])
                .range([0, this.chartHeight]);
              const yAxisScale = d3.scaleLinear()
                .domain([0, d3.max(this.yAxisData)])
                .range([this.chartHeight, 0]);
              let dynamicColor;
              const svg = this.node;

              const legendData = [["All",'black'],["Male", 'blue'],["Female",'pink']];

              d3.select(svg)
                .attr('width', this.width)
                .attr('height', this.height)
                .style('background', '#67CDDC')

              //Axes rendering
              const yAxis = d3.axisLeft().scale(yAxisScale);
              d3.select(svg).append('g')
                .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)
                .call(yAxis);
              const xAxis = d3.axisBottom().scale(xAxisScale);
              d3.select(svg).append('g')
                .attr('transform', `translate(${this.margin.left}, ${this.height - this.margin.bottom})`)
                .call(xAxis)
              
              
              const barGenerator = (data, padd, barIndex, fillColor, stokeColor) =>{
                return d3.select(svg).append('g')
                .attr('transform', `translate(${padd + this.margin.left + xAxisScale.step()*xAxisScale.padding() + barIndex* xAxisScale.bandwidth()/3}, -${this.margin.bottom})`)
                .selectAll('rect').data(data)
                .enter().append('rect')
                  .attr('width', xAxisScale.bandwidth()/3)
                  .attr('x', (data, i) => i*xAxisScale.bandwidth()+ i*xAxisScale.step()*xAxisScale.padding())
                  .attr('height', 0)
                  .attr('y', this.height)
                  .style('fill', fillColor)
                  .style('stroke', d3.color(stokeColor).darker(.6))
                  .style('stroke-width', 1)
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
              }

            //   from left to right bars will rise from 0 to their height
            const cTransition = (node) =>{
              node.transition()
              .attr('height', yScale)
              .attr('y', data => this.height - yScale(data))
              .delay((data, i) => i * 20)
              .duration(650)
              .ease(d3.easeSinIn);
            }
            cTransition(barGenerator(this.chartDataAll, 0, 0, legendData[0][1], '#00A9E0'));
            cTransition(barGenerator(this.chartDataMale, 2, 1, legendData[1][1], '#00A9E0'));
            cTransition(barGenerator(this.chartDataFemale, 4, 2, legendData[2][1], '#00A9E0'));
            
              //put texts in svg
              d3.select(svg).append('text')
                  .attr('transform', `translate(${this.margin.left}, ${this.margin.top})rotate(-90)`)
                  .text("Rating given")
                  .attr("y", -this.margin.left + 20)
                .attr("x", -this.chartHeight/2)
                .attr("text-anchor", "middle")  
              
                d3.select(svg).append('text')
                .attr('x', this.width / 2)
                .attr('y', this.margin.top / 2)
                .attr('text-anchor', 'middle')
                .style('fill', 'white')
                .text(`Age group comparison of IMDB ratings of ${myData.title}`);
                
                d3.select(svg).append("text")
                .text("Age group of person in Years")
                .attr("x", this.width / 2)
                .attr("y", this.height - this.margin.bottom/2 +10)
                .attr("text-anchor", "middle")

              d3.select(svg).selectAll(".legend")
                .data(legendData)
                .enter().append("g")
                .attr("class", "legend")
                .attr("transform", (d, i) => { return `translate(-5, ${(i * 20) + this.margin.top/2})`;})
                
                d3.select(svg).selectAll(".legend")
                .append("rect")
                .attr("x", this.width - 18)
                .attr("width", 18)
                .attr("height", 18)
                .style("fill", (d, i)=>{ return d[1]})

                d3.select(svg).selectAll(".legend")
                .append("text")
                .attr("x", this.width - 24)
                .attr("y", 9)
                .attr("dy", ".35em")
                .style("text-anchor", "end")
                .text((d, i) => { return d[0]});
            }

            componentDidMount() {
                this.executionFlow();
            }
    
            componentDidUpdate() {
                this.executionFlow();                
            }

            render() {
                return (<svg className = "age-groups" ref={node => this.node = node}>
                    </svg>);
                }
            }