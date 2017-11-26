import React from 'react';
import AgeGroups from './ageGroups';

export default class AgeGroupTexts extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    
    return (<div className="ageGroupCnt">
            <h2>2. Let's see the reaction from different age groups</h2>
            <AgeGroups />
            <h3>Conclusions</h3>
            <ul>
                <li>Youngsters liked it more and gave higher ratings as compared to elder audience.</li>
                <li>For below 45 audience, movie was received equally by both genders.</li>
                <li>45+ females segment of audience was the least impressed.</li>
            </ul>
        </div>)
  }
}