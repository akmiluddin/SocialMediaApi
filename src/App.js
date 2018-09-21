import React, { Component } from 'react';
// import Orang from "./Orang"; 
// import Uwong from "./Uwong"; 
// import Alamat from "./Alamat"; 
import ApiContent from "./ApiContent";
import Content from "./Content/Content";  
import './App.css';

class App extends Component {
  
  render() {
    return (
      <div className="App">
       <ApiContent/>
      {/* <Content title ="Google" url="https://www.google.com" text="ahead lorem ipsum"/>
      <Content title ="Bing" url="https://www.bing.com" text="lrem ipsum ahead"/>
        */}
      </div>
    );
  }
}

export default App;
