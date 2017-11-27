import React, { Component } from 'react';
import './App.css';
// import Basic from './components/basic';
// import OChartReactApproach from './components/oChartReactApproach';
import OChartTexts from './components/oChartTexts';
import AgeGroupTexts from './components/ageGroupTexts';
import TimelineTexts from './components/timelineTexts';
import Header from './components/header';

// import ProgressArc from './components/ProgressArc';
class App extends Component {

  componentDidMount() {
		document.querySelectorAll("div.loader")[0].setAttribute("style", "display : none");
  }
  
  render() {
    return (
      <div className="app">
        <Header />
        <OChartTexts />
        <AgeGroupTexts />
        <TimelineTexts />
      </div>
    );
  }
}

export default App;
