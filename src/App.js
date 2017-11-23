import React, { Component } from 'react';
import './App.css';
// import Basic from './components/basic';
// import OChartReactApproach from './components/oChartReactApproach';
// import OChartd3 from './components/oChartd3';
import AgeGroups from './components/ageGroups';


// import ProgressArc from './components/ProgressArc';
class App extends Component {
  render() {
    return (
      <div className="App">
        <AgeGroups />
      </div>
    );
  }
}

export default App;
