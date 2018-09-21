import React, { Component } from "react";
import Axios from "axios";
import "./App.css";
import Content from "./Content/Content";

class ApiContent extends Component {
  state = { apiContent: {}, 
  strSearch: "", 
  apitable: [] 
};

  searchChangedHandler = event => {
    this.setState({ strSearch: event.target.value });
  };


  handlesubmitGplus = () => {
    let self = this;
    let strSearch = encodeURI(this.state.strSearch);
    let url =
      "https://www.googleapis.com/plus/v1/activities?query=" +
      strSearch +
      "&key=AIzaSyB1cCjFlC8ClD-cphKv1ZOu7C8l9QY-yTs";

    Axios.get(url)
      .then(function (response) {
        try {
          let apic = JSON.parse(JSON.stringify(response.data.items));
          let apitable = [];
          let i = 0;
          for (i = 0; i < apic.length; i++) {
            let strcontent = {
              strTitle: apic[i].actor.displayName,
              imgUrl: apic[i].actor.image.url,
              strlUrl: apic[i].object.url,
              strContent: apic[i].object.content
            };
            apitable.push(strcontent);
          }
          localStorage.setItem(
            "apiContent",
            JSON.stringify(response.data.items)
          );

          self.setState({
            apiContent: JSON.parse(JSON.stringify(response.data.items))
          });

          self.setState({ apitable: apitable });
        } catch (error) { }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
//
  handlesubmitYoutube = () => {
    let self = this;
    let strSearch = encodeURI(this.state.strSearch);
    let url =
      "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" +
      strSearch +
      "&key=AIzaSyB1cCjFlC8ClD-cphKv1ZOu7C8l9QY-yTs";
    Axios.get(url)
      .then(function (response) {
        try {
          let apic = JSON.parse(JSON.stringify(response.data.items));
          let apitable = [];
          let i = 0;

          for (i = 0; i < apic.length; i++) {
            let strcontent = {};
            if (apic[i].id.kind === "youtube#channel") {
              strcontent = {
                strTitle: apic[i].snippet.channelTitle,
                imgUrl: apic[i].snippet.thumbnails.default.url,
                strlUrl:
                  "https://www.youtube.com/channel/" + apic[i].id.channelId,
                strContent: apic[i].snippet.description
              };
            }
            if (apic[i].id.kind === "youtube#video") {
              strcontent = {
                strlUrl:
                  "https://www.youtube.com/watch?v=" + apic[i].id.videoId,
                strContent: apic[i].snippet.description
              };
            }
            apitable.push(strcontent);
          }
          localStorage.setItem(
            "apiContent",
            JSON.stringify(response.data.items)
          );
          self.setState({ apitable: apitable });
        } catch (error) { }
      })
      .catch(function (error) {
        console.log(error);
      });
  };




  render() {
    const style = {
      backgroundColor: 'lightgrey',
      font: 'inherit',
      border: '1px solid grey',
      padding: '8px',
      cursor: 'pointer',
      textAlign : "center",
      width: "50%",
      margin : "auto"
    };


    let contents = null;
    const arr = [
      {name:"albert", title:"proffesor"},
    {name:"brenda", title:"teacher"}
    ];

    contents = (
      this.state.apitable.map(ar=>{
        return <div>
                    <Content
                    title={ar.strTitle} 
                    url={ar.strlUrl}
                    text={ar.strContent}/>
                </div>
            })
    );


    return (
      <div>
            <div style={style}>
              <span>
                <b>Search</b>{" "}
              </span>
<br/>

              <input
                type="text"
                onChange={event => this.searchChangedHandler(event)}
              />{" "}
              <br />
              <br/>
              <button 
              style={
                {
                borderRadius:"8px", 
                margin: "4px 2px",  
                backgroundColor:"red", 
                border: "1px solid transparent",
                color:"white", 
                padding: "10px" 
                }} 
                onClick={this.handlesubmitGplus} >
                Search G+
          </button >
             {"  "}
              <button
                            style={
                              {
                              borderRadius:"4px", 
                              margin: "4px 2px",  
                              backgroundColor:"green", 
                              border: "1px solid transparent",
                              color:"white", 
                              padding: "10px" 
                              }} 
               onClick={this.handlesubmitYoutube} color="blue">
                Search Youtube
          </button>
            </div>
      {contents}
      </div>
    );
  }
}

export default ApiContent;
