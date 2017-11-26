import React from 'react';

export default class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    
    return (<div className="header">
            <h1>Interesting insights from data visualization of IMDB ratings</h1>
            <h3>Below charts will help us derive some results on how the movie performed and on audience behavior
            </h3>
            <div>All Charts are created using D3.js and data scraped from IMDB.</div>
        </div>)
  }
}