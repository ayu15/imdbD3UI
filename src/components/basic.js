import React from 'react';

export default class Basic extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const cHeight = 500;
    const cWidth = 620;
    const circleRadii = [40, 20, 10];
    const getFillColor = (d)=>{
                         let returnColor;
                         if (d === 40) { returnColor = "green";
                         } else if (d === 20) { returnColor = "purple";
                         } else if (d === 10) { returnColor = "red"; }
                         return returnColor;
                       }
    const circles = circleRadii.map((d,i)=> <circle
    key = {'circle'+i}
    cx = {50}
    cy = {50}
    r = {d}
    style={{fill: getFillColor(d)
    }}
    />)        
    return (<svg width={ cWidth } height={ cHeight }> { circles }</svg>)
  }
}