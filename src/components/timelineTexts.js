import React from 'react';
import TimeLine from './timeline';

export default class TimelineTexts extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    
    return (<div className="timelineCnt">
            <h2>3. Number of people voted and average rating over the period of initial screening and worldwide release</h2>
            <TimeLine />
            <h3>Observations</h3>
            <ul>
                <li>Gradual decline in the average rating as it is received by wider audience.</li>
                <li>Enthusiastic audience watching the movie during early screening gave more rating than casual audience.</li>
                <li>Steep increase in the number of votes after worldwide release and on weekends which justifies that huge crowd watched it on first day and significant increase on weekends.</li>
            </ul>
        </div>)
  }
}