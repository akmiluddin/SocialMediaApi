import React, { Component } from "react";
import Axios from "axios";
import {
  Button,
  Input,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Container,
  CardText,
  CardImg,
  Label,
  Row, Col,
  Jumbotron
} from "reactstrap";
import "./App.css";

class ApiContent extends Component {
  state = { apiContent: {}, strSearch: "", apiTable: {} };

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
          let apiTable = [];
          let i = 0;
          for (i = 0; i < apic.length; i++) {
            let strcontent = {
              strTitle: apic[i].actor.displayName,
              imgUrl: apic[i].actor.image.url,
              strlUrl: apic[i].object.url,
              strContent: apic[i].object.content
            };
            apiTable.push(strcontent);
          }
          localStorage.setItem(
            "apiContent",
            JSON.stringify(response.data.items)
          );

          self.setState({
            apiContent: JSON.parse(JSON.stringify(response.data.items))
          });

          self.setState({ apiTable: apiTable });
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
          let apiTable = [];
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
            apiTable.push(strcontent);
          }
          localStorage.setItem(
            "apiContent",
            JSON.stringify(response.data.items)
          );
          self.setState({ apiTable: apiTable });
        } catch (error) { }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  createCard = () => {
    let card = [];

    for (let i = 0; i < this.state.apiTable.length; i++)
     {
      let children = [];
      let url =
        this.state.apiTable[i] == undefined
          ? ""
          : this.state.apiTable[i].strlUrl;
      //Inner loop to create children

      children.push(
        <div>
          <Row>
            <Col sm="6">
             <CardImg href={this.state.apiTable[i].imgUrl} />
            </Col>
          </Row>
          <CardTitle>
            {this.state.apiTable[i].strTitle}
          </CardTitle>
        </div>
      );
      children.push(
        <div>
          <CardSubtitle>
            <a href={"" + url + ""}>{url}</a>
          </CardSubtitle>
        </div>
      );

      //children.push(<td><a href = {this.state.apiContent[i] == undefined  ? "": this.state.apiContent[i].object.url}/> </td>)
      children.push(
        <CardText>{}
          {this.state.apiTable[i] == undefined
            ? ""
            : this.state.apiTable[i].strContent}
        </CardText>
      );

      //Create the parent and add the children
      card.push(
        <Card>

          <CardBody>{children}</CardBody>
        </Card>
      );
    }
    return card;
  };

  createTable = () => {
    let table = [];
    let header = [];

    header.push(<th>Source</th>);
    header.push(<th>Content</th>);
    // Outer loop to create parent
    table.push(<tr>{header}</tr>);
    for (let i = 0; i < this.state.apiTable.length; i++) {
      let children = [];
      //Inner loop to create children
      children.push(
        <td>
          {" "}
          {this.state.apiTable[i] == undefined
            ? ""
            : this.state.apiTable[i].strlUrl}{" "}
        </td>
      );

      //children.push(<td><a href = {this.state.apiContent[i] == undefined  ? "": this.state.apiContent[i].object.url}/> </td>)
      children.push(
        <td>
          {this.state.apiTable[i] == undefined
            ? ""
            : this.state.apiTable[i].strContent}
        </td>
      );

      //Create the parent and add the children
      table.push(<tr>{children}</tr>);
    }
    return table;
  };

  render() {
    return (
      <div>
        <Row>
          <Col sm="12" md={{ size: 8, offset: 2 }}>
            <Jumbotron>
              <Label>
                <b>Search</b>
              </Label>
              <Input
                type="text"
                onChange={event => this.searchChangedHandler(event)}
              />{" "}
              <br />
              <Button onClick={this.handlesubmitGplus} color="warning">
                Search G+
          </Button>
             {"  "}
              <Button onClick={this.handlesubmitYoutube} color="danger">
                Search Youtube
          </Button>
            </Jumbotron>

            <br />
            <div>{this.createCard()}</div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ApiContent;
