import React, { Component } from 'react';
import DatePiker from './components/appDatePicker';


class App extends Component {
    handleSelect = (date) => {
        console.log('date is',date)
    };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="App-intro">
            <div className="date-picker-box">
                <DatePiker
                    onChange={this.handleSelect}
                    max="2019-06-22"
                    min="2015-06-18"
                />
            </div>
        </div>
      </div>
    );
  }
}

export default App;