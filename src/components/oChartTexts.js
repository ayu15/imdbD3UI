import React from 'react';
import OChart from './oChart';

export default class OChartTexts extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    
    return (<div className="oChartCnt">
            <h2>1. Simple visualization of what was the rating given by how many people</h2>
            <OChart />
            <h3>Conclusions</h3>
            <ul>
                <li><strong>Unconventional spikes for 10 and 1:</strong>
                  <div>These people follow the trend of extreme voting, that is if they feel the current average rating is low then they will vote for 10, or if they feel the current average rating is more than what it should be then they will vote for 1. In this way they contribute their best to take the average up or down.</div>
                </li>
                <li><strong>Plenty votes for 7,8,9 too:</strong>
                  <div>These voters gave relative ratings as per their set benchmark of 10. plenty of votes in this range signifies that movie is performing quite well as compared to others.</div>
                  </li> 
            </ul>
        </div>)
  }
}