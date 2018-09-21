import React, { Component } from "react";
import "./Content.css"
import Axios from "axios";

const contents =(props) =>{


        return (
        <div className="Content">
             <h4>{props.title}</h4>
             <p><a href={props.url}>{props.url}</a></p>
            <label>{props.text}</label>
        </div>
        );

}

export default contents; 