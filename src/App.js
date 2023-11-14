import React, { Component } from 'react';
import './App.css';
import Translator from "./components/Translator";
import 'antd/lib/'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Translator />
      </div>
    );
  }
}

export default App;
